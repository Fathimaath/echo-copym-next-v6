import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const ROOT = process.cwd();

async function optimizeLogo() {
  console.log('Optimizing logo to display size...');
  const inputLogo = path.join(ROOT, 'public/assets/copym/png/Copym-02-1.png');
  const outPng = path.join(ROOT, 'public/assets/copym/png/copym-logo-header.png');
  const outWebp = path.join(ROOT, 'public/assets/copym/png/copym-logo-header.webp');

  if (fs.existsSync(inputLogo)) {
    // Target display height is ~52px; @2x retina width is ~320px
    await sharp(inputLogo)
      .resize({ width: 320, fit: 'inside' })
      .png({ quality: 90, compressionLevel: 9 })
      .toFile(outPng);

    await sharp(inputLogo)
      .resize({ width: 320, fit: 'inside' })
      .webp({ quality: 90 })
      .toFile(outWebp);

    const statOrig = fs.statSync(inputLogo);
    const statPng = fs.statSync(outPng);
    const statWebp = fs.statSync(outWebp);
    console.log(`Original logo: ${(statOrig.size / 1024).toFixed(1)} KB (2633px)`);
    console.log(`Display PNG: ${(statPng.size / 1024).toFixed(1)} KB (320px)`);
    console.log(`Display WebP: ${(statWebp.size / 1024).toFixed(1)} KB (320px)`);
  }
}

async function convertMock2() {
  console.log('\nConverting mock2.png to WebP...');
  const inputPng = path.join(ROOT, 'public/assets/Images/mock2.png');
  const outWebp = path.join(ROOT, 'public/assets/Images/mock2.webp');

  if (fs.existsSync(inputPng)) {
    await sharp(inputPng)
      .webp({ quality: 85, effort: 6 })
      .toFile(outWebp);

    const orig = fs.statSync(inputPng);
    const webp = fs.statSync(outWebp);
    console.log(`mock2.png: ${(orig.size / 1024).toFixed(1)} KB -> mock2.webp: ${(webp.size / 1024).toFixed(1)} KB (${Math.round((1 - webp.size / orig.size) * 100)}% reduction)`);
  }
}

function wrapText(text, maxCharsPerLine = 38) {
  const words = text.split(/\s+/);
  const lines = [];
  let currentLine = '';

  for (const word of words) {
    if ((currentLine + ' ' + word).trim().length <= maxCharsPerLine) {
      currentLine = (currentLine + ' ' + word).trim();
    } else {
      if (currentLine) lines.push(currentLine);
      currentLine = word;
    }
    if (lines.length >= 3) break; // Limit to 3 lines
  }
  if (currentLine && lines.length < 3) {
    lines.push(currentLine);
  } else if (lines.length >= 3 && currentLine) {
    lines[2] = lines[2].replace(/\.*$/, '...');
  }
  return lines;
}

function escapeXml(unsafe = '') {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

async function generateCardImage({ title, category = 'RWA INFRASTRUCTURE', subtitle = '', filename }) {
  const outDir = path.join(ROOT, 'public/assets/og');
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }

  const lines = wrapText(title, 34);
  const titleY = lines.length === 1 ? 300 : lines.length === 2 ? 260 : 225;
  const lineHeight = 64;

  const titleSvgLines = lines
    .map((line, idx) => `<text x="90" y="${titleY + idx * lineHeight}" font-family="Arial, Helvetica, sans-serif" font-size="52" font-weight="800" fill="#FFFFFF" letter-spacing="-0.02em">${escapeXml(line)}</text>`)
    .join('\n');

  const cleanSubtitle = subtitle ? escapeXml(wrapText(subtitle, 65).slice(0, 2).join(' ')) : '';
  const subtitleY = titleY + lines.length * lineHeight + 20;

  const svgCard = `<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#070a0e" />
        <stop offset="50%" stop-color="#0a1218" />
        <stop offset="100%" stop-color="#05080c" />
      </linearGradient>
      <radialGradient id="glow1" cx="85%" cy="20%" r="55%">
        <stop offset="0%" stop-color="#15a36e" stop-opacity="0.32" />
        <stop offset="60%" stop-color="#15a36e" stop-opacity="0.04" />
        <stop offset="100%" stop-color="#070a0e" stop-opacity="0" />
      </radialGradient>
      <radialGradient id="glow2" cx="15%" cy="85%" r="50%">
        <stop offset="0%" stop-color="#0d5b41" stop-opacity="0.25" />
        <stop offset="70%" stop-color="#070a0e" stop-opacity="0" />
      </radialGradient>
      <linearGradient id="brandBar" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#15a36e" />
        <stop offset="100%" stop-color="#2a867f" />
      </linearGradient>
    </defs>

    <!-- Background -->
    <rect width="1200" height="630" fill="url(#bgGrad)" />
    <rect width="1200" height="630" fill="url(#glow1)" />
    <rect width="1200" height="630" fill="url(#glow2)" />

    <!-- Subtle Grid Lines -->
    <line x1="90" y1="0" x2="90" y2="630" stroke="#ffffff" stroke-opacity="0.03" stroke-width="1" />
    <line x1="1110" y1="0" x2="1110" y2="630" stroke="#ffffff" stroke-opacity="0.03" stroke-width="1" />
    <line x1="0" y1="120" x2="1200" y2="120" stroke="#ffffff" stroke-opacity="0.03" stroke-width="1" />
    <line x1="0" y1="510" x2="1200" y2="510" stroke="#ffffff" stroke-opacity="0.03" stroke-width="1" />

    <!-- Header: Logo & Badge -->
    <g transform="translate(90, 60)">
      <!-- CopyM Logo Icon Mark -->
      <rect x="0" y="2" width="40" height="40" rx="10" fill="url(#brandBar)" />
      <path d="M12 22 L18 16 L24 22 L28 14" stroke="#ffffff" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" fill="none" />
      <text x="54" y="31" font-family="Arial, Helvetica, sans-serif" font-size="28" font-weight="800" fill="#FFFFFF" letter-spacing="-0.03em">CopyM</text>
      <text x="148" y="31" font-family="Arial, Helvetica, sans-serif" font-size="14" font-weight="600" fill="#15a36e" letter-spacing="0.1em">RWA</text>
    </g>

    <!-- Category Pill Badge -->
    <g transform="translate(850, 60)">
      <rect x="0" y="4" width="260" height="36" rx="18" fill="#15a36e" fill-opacity="0.15" stroke="#15a36e" stroke-opacity="0.4" stroke-width="1.5" />
      <circle cx="20" cy="22" r="4" fill="#15a36e" />
      <text x="34" y="27" font-family="Arial, Helvetica, sans-serif" font-size="13" font-weight="700" fill="#15a36e" letter-spacing="0.08em">${escapeXml(category.toUpperCase())}</text>
    </g>

    <!-- Page Title Lines -->
    ${titleSvgLines}

    <!-- Optional Subtitle -->
    ${cleanSubtitle ? `<text x="90" y="${subtitleY}" font-family="Arial, Helvetica, sans-serif" font-size="22" font-weight="400" fill="#94A3B8">${cleanSubtitle}</text>` : ''}

    <!-- Footer Meta -->
    <g transform="translate(90, 545)">
      <rect x="0" y="0" width="8" height="26" rx="4" fill="url(#brandBar)" />
      <text x="22" y="19" font-family="Arial, Helvetica, sans-serif" font-size="18" font-weight="700" fill="#E2E8F0">copym.xyz</text>
      <text x="140" y="19" font-family="Arial, Helvetica, sans-serif" font-size="16" font-weight="500" fill="#64748B">· Institutional Tokenization Platform · Masdar City Licence No. MC 14225</text>
    </g>
  </svg>`;

  const outPath = path.join(outDir, filename);
  await sharp(Buffer.from(svgCard))
    .png({ quality: 92 })
    .toFile(outPath);
}

async function generateAllShareImages() {
  console.log('\nGenerating 1200x630 share images with page titles...');

  const corePages = [
    {
      title: 'CopyM — The Complete Tokenization Platform',
      category: 'INSTITUTIONAL PLATFORM',
      subtitle: 'Compliant issuance, investor onboarding, custody rails and secondary transfer controls.',
      filename: 'og-home.png'
    },
    {
      title: 'Tokenization Platform Overview',
      category: 'PLATFORM OVERVIEW',
      subtitle: 'Complete infrastructure for issuing and managing tokenized real-world assets.',
      filename: 'og-tokenization.png'
    },
    {
      title: 'White-Label Tokenization Platform',
      category: 'WHITE-LABEL SOLUTION',
      subtitle: 'Launch a branded tokenization platform for banks, wealth platforms and asset managers.',
      filename: 'og-white-label.png'
    },
    {
      title: 'Real Estate Tokenization Infrastructure',
      category: 'SOLUTION · REAL ESTATE',
      subtitle: 'SPV ownership records, investor eligibility checks and distribution rails.',
      filename: 'og-solutions-real-estate.png'
    },
    {
      title: 'Carbon Credit Tokenization Platform',
      category: 'SOLUTION · CARBON & ESG',
      subtitle: 'Verifiable registry records, retirement tracking and green asset transparency.',
      filename: 'og-solutions-carbon-credits.png'
    },
    {
      title: 'Security and Compliance Infrastructure',
      category: 'TRUST & ARCHITECTURE',
      subtitle: 'Permissioned smart contracts, institutional custody integration and regulatory alignment.',
      filename: 'og-security-compliance.png'
    },
    {
      title: 'Compliant Secondary Marketplace',
      category: 'MARKETPLACE',
      subtitle: 'Permissioned liquidity for verified wallets and licensed venues.',
      filename: 'og-marketplace.png'
    },
    {
      title: 'About CopyM Limited',
      category: 'COMPANY',
      subtitle: 'Masdar City Free Zone licensed institutional digital asset infrastructure.',
      filename: 'og-about.png'
    },
    {
      title: 'Book a Platform Walkthrough',
      category: 'DEMO & ONBOARDING',
      subtitle: 'Schedule a 30-minute tailored platform walkthrough for your asset class.',
      filename: 'og-signup.png'
    },
    {
      title: 'Contact CopyM Limited',
      category: 'CONTACT',
      subtitle: 'Get in touch with our institutional partnerships team in Abu Dhabi.',
      filename: 'og-contact.png'
    },
    {
      title: 'CopyM Research & Insights',
      category: 'EDITORIAL & ANALYSIS',
      subtitle: 'Expert guides, regulatory analysis and institutional RWA research.',
      filename: 'og-blog.png'
    },
    {
      title: 'RWA & Tokenization Glossary',
      category: 'KNOWLEDGE BASE',
      subtitle: 'Clear definitions of digital securities, SPVs, KYC/AML and blockchain rails.',
      filename: 'og-glossary.png'
    }
  ];

  for (const page of corePages) {
    await generateCardImage(page);
    console.log(`  ✓ Generated ${page.filename} (${page.title})`);
  }

  // Load blog posts from blog-posts-data.json
  const blogDataPath = path.join(ROOT, 'blog-posts-data.json');
  if (fs.existsSync(blogDataPath)) {
    const posts = JSON.parse(fs.readFileSync(blogDataPath, 'utf8'));
    console.log(`\nGenerating share images for ${posts.length} blog posts...`);
    for (const post of posts) {
      const filename = `og-blog-${post.slug}.png`;
      await generateCardImage({
        title: post.seoTitle || post.title,
        category: post.category || 'RWA ARTICLE',
        subtitle: post.seoDescription || post.excerpt || '',
        filename
      });
      console.log(`  ✓ Generated ${filename}`);
    }
  }

  console.log('\nAll 1200x630 share images generated successfully in public/assets/og/!');
}

async function main() {
  try {
    await optimizeLogo();
    await convertMock2();
    await generateAllShareImages();
    console.log('\nAsset optimization and image generation complete!');
  } catch (err) {
    console.error('Error during asset optimization:', err);
    process.exit(1);
  }
}

main();
