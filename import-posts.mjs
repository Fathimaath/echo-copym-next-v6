/**
 * Import CopyM blog posts into the deployed Node backend.
 *
 *   node import-posts.mjs --dry-run     preview only, creates nothing
 *   node import-posts.mjs               actually create the posts
 *
 * Reads blog-posts-data.json from the same folder.
 * Your password is read here in the terminal and never sent anywhere
 * except api.copym.xyz.
 */

import fs from 'fs';
import path from 'path';
import readline from 'readline';
import { fileURLToPath } from 'url';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const DATA_FILE = path.join(HERE, 'blog-posts-data.json');

const API = process.env.COPYM_API || 'https://api.copym.xyz/api';
const DRY_RUN = process.argv.includes('--dry-run');

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

const ask = (q) => new Promise((res) => rl.question(q, res));

// Prisma Json columns arrive as strings - send real JSON instead
function parseMaybeJson(value, field, slug) {
  if (value === null || value === undefined || value === '') return null;
  if (typeof value !== 'string') return value;
  try {
    return JSON.parse(value);
  } catch {
    console.warn(`      ! ${slug}: ${field} was not valid JSON, sending null`);
    return null;
  }
}

// Prisma maps String -> MySQL VARCHAR(191). Anything longer is rejected,
// so long text fields get cut at a word boundary instead of failing.
const VARCHAR_LIMIT = 191;

function clamp(value) {
  if (typeof value !== 'string' || value.length <= VARCHAR_LIMIT) return value;
  const cut = value.slice(0, VARCHAR_LIMIT - 3);
  const lastSpace = cut.lastIndexOf(' ');
  const body = lastSpace > VARCHAR_LIMIT * 0.6 ? cut.slice(0, lastSpace) : cut;
  return `${body.trimEnd()}...`;
}

async function api(pathname, { method = 'GET', body, token } = {}) {
  const headers = { Accept: 'application/json' };
  if (body) headers['Content-Type'] = 'application/json';
  if (token) headers.Authorization = `Bearer ${token}`;

  const res = await fetch(`${API}${pathname}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });

  let json = null;
  const text = await res.text();
  try { json = JSON.parse(text); } catch { /* non-JSON error page */ }

  return { status: res.status, ok: res.ok, json, text };
}

async function main() {
  console.log('\n=============================================');
  console.log('  CopyM  ->  blog post importer');
  console.log('=============================================');
  console.log(`  Target : ${API}`);
  console.log(`  Mode   : ${DRY_RUN ? 'DRY RUN (nothing will be created)' : 'LIVE IMPORT'}`);
  console.log(`  Data   : ${DATA_FILE}\n`);

  if (!fs.existsSync(DATA_FILE)) {
    console.error(`\nCannot find ${DATA_FILE}\n`);
    process.exit(1);
  }

  const posts = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
  console.log(`  ${posts.length} posts loaded\n`);

  // A plain preview needs no credentials. Pass --check-login to also
  // verify the admin account before importing for real.
  const CHECK_LOGIN = process.argv.includes('--check-login');
  const SKIP_LOGIN = DRY_RUN && !CHECK_LOGIN;

  let token = null;

  if (!SKIP_LOGIN) {
    const email = (await ask('  Admin email   : ')).trim();
    const password = await ask('  Admin password: ');
    rl.close();

    if (!email || !password) {
      console.error('\n  Email and password are required.\n');
      process.exit(1);
    }

    // ---------- login ----------
    process.stdout.write('\n  Logging in');
    const login = await api('/auth/login', { method: 'POST', body: { email, password } });
    process.stdout.write('\r');

    if (!login.ok || !login.json?.token) {
      console.error('\n  LOGIN FAILED\n');
      console.error(`  HTTP ${login.status}: ${login.json?.error || login.text.slice(0, 200)}`);
      console.error('\n  Check the email/password and that the account is ADMIN.\n');
      process.exit(1);
    }

    token = login.json.token;
    const role = login.json.user?.role || '?';
    console.log(`  Logged in as ${email} (role: ${role})`);
    if (login.json.requires2FA) {
      console.log('\n  ! This account has 2FA enabled - the token may be rejected.');
      console.log('    Turn 2FA off for this admin account, or the import will fail.\n');
    }
  } else {
    rl.close();
    console.log('  Preview only - no login, nothing created.');
  }

  // ---------- create ----------
  console.log('\n  ---------------------------------------------');
  let created = 0, skipped = 0, failed = 0;

  for (const [i, p] of posts.entries()) {
    const label = `${String(i + 1).padStart(2)}/${posts.length}  ${p.slug}`;

    // posts already in the database -> skip, do not touch
    if (p.slug) {
      const existing = await api(`/blog-posts/${p.slug}`, { token });
      if (existing.status === 200 && existing.json?.success) {
        console.log(`  - ${label}  already exists, skipped`);
        skipped++;
        continue;
      }
    }

    const body = {
      title: p.title,
      slug: p.slug,
      subtitle: p.subtitle || '',
      content: p.content,
      contentBlocks: parseMaybeJson(p.contentBlocks, 'contentBlocks', p.slug),
      excerpt: p.excerpt || '',
      authorName: p.authorName || 'CopyM Team',
      authorRole: p.authorRole || '',
      authorBio: p.authorBio || '',
      reviewerName: p.reviewerName || '',
      reviewerRole: p.reviewerRole || '',
      reviewerBio: p.reviewerBio || '',
      imageUrl: p.imageUrl || '',
      category: p.category || 'Articles',
      tags: p.tags || '',
      status: 'PUBLISHED',
      featured: !!p.featured,
      featuredPriority: p.featuredPriority ?? 0,
      readTime: String(p.readTime ?? 5),
      seoTitle: p.seoTitle || p.title,
      seoDescription: p.seoDescription || p.excerpt || '',
      ogImage: p.ogImage || p.imageUrl || '',
      disclaimer: p.disclaimer || '',
      faq: parseMaybeJson(p.faq, 'faq', p.slug),
    };

    // every String column is VARCHAR(191) in MySQL
    for (const [key, value] of Object.entries(body)) {
      if (typeof value === 'string') body[key] = clamp(value);
    }

    if (DRY_RUN) {
      const blocks = Array.isArray(body.contentBlocks) ? body.contentBlocks.length : 0;
      console.log(`  o ${label}  would create  content=${body.content.length}ch blocks=${blocks}`);
      created++;
      continue;
    }

    const res = await api('/admin/blog-posts', { method: 'POST', body, token });

    if (res.ok && res.json?.success) {
      console.log(`  + ${label}  created`);
      created++;
    } else {
      const err = res.json?.error || res.text.slice(0, 160);
      console.log(`  x ${label}  FAILED  ${err}`);
      failed++;
    }

    await new Promise((r) => setTimeout(r, 400));
  }

  // ---------- report ----------
  console.log('  ---------------------------------------------');
  console.log(`\n  ${DRY_RUN ? 'would create' : 'created'} : ${created}`);
  console.log(`  skipped    : ${skipped}`);
  console.log(`  failed     : ${failed}\n`);

  if (!DRY_RUN) {
    const check = await api('/blog-posts?limit=50', { token });
    const total = check.json?.pagination?.total;
    console.log(`  Server now reports ${total} published post(s).\n`);
    console.log(`  Check: https://admin.copym.xyz/dashboard/blog`);
    console.log(`  Next : upload your images, then change the 2 API URLs`);
    console.log(`         in .env.production and rebuild the website.\n`);
  }
}

main().catch((e) => {
  console.error('\n  Unexpected error:', e.message, '\n');
  process.exit(1);
});