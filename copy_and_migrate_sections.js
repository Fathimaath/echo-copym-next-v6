const fs = require('fs');
const path = require('path');

const mappings = {
  'aboutus/sections': 'AboutUs',
  'Blog/sections': 'Blog',
  'HomePage/sections': 'Home',
  'Marketplace/sections': 'Marketplace',
  'PrivacyAi/sections': 'PrivacyAi',
  'TokenizationHub/sections': 'TokenizationHub',
  'Zerogas/sections': 'ZeroGas'
};

const srcBase = 'c:/copymv5/echo.copym-v5/src/pages';
const destBase = 'c:/copymv5/echo.copym-next/src/components';

function copyDir(src, dest) {
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }
  const entries = fs.readdirSync(src, { withFileTypes: true });
  for (let entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
      console.log('Copied:', srcPath, '->', destPath);
      migrateFile(destPath);
    }
  }
}

function migrateFile(filePath) {
  if (!filePath.endsWith('.jsx') && !filePath.endsWith('.js')) return;
  
  let content = fs.readFileSync(filePath, 'utf8');
  let changed = false;

  // 1. Add "use client" if needed
  const needsClient = /useState|useEffect|useRef|window\.|document\.|framer-motion|gsap|useNavigate|useLocation|onClick=|onChange=|onSubmit=|forwardRef|react-router-dom/.test(content);
  const hasClient = /^['"]use client['"];?/.test(content.trim());
  if (needsClient && !hasClient) {
    content = '"use client";\n' + content;
    changed = true;
  }

  // 2. Routing replacements
  if (content.includes('react-router-dom')) {
    let newContent = content
      .replace(/import\s*\{\s*Link\s*\}\s*from\s*['"]react-router-dom['"];?/g, 'import Link from "next/link";')
      .replace(/import\s*\{\s*useNavigate\s*\}\s*from\s*['"]react-router-dom['"];?/g, 'import { useRouter } from "next/navigation";')
      .replace(/import\s*\{\s*Link\s*,\s*useNavigate\s*\}\s*from\s*['"]react-router-dom['"];?/g, 'import Link from "next/link";\nimport { useRouter } from "next/navigation";')
      .replace(/import\s*\{\s*useNavigate\s*,\s*Link\s*\}\s*from\s*['"]react-router-dom['"];?/g, 'import Link from "next/link";\nimport { useRouter } from "next/navigation";');

    newContent = newContent.replace(/import\s*\{([^}]*)\}\s*from\s*['"]react-router-dom['"];?/g, (match, p1) => {
      let imports = p1.split(',').map(i => i.trim());
      let nextImports = [];
      let navImports = [];
      let keptImports = [];

      imports.forEach(i => {
        if (i === 'Link') nextImports.push('import Link from "next/link";');
        else if (i === 'useNavigate') navImports.push('useRouter');
        else if (i === 'useLocation') navImports.push('usePathname');
        else keptImports.push(i);
      });

      let res = '';
      if (nextImports.length) res += nextImports.join('\n') + '\n';
      if (navImports.length) res += `import { ${navImports.join(', ')} } from "next/navigation";\n`;
      if (keptImports.length) res += `import { ${keptImports.join(', ')} } from "react-router-dom";\n`;
      return res;
    });

    content = newContent;
    changed = true;
  }

  if (content.includes('useNavigate(')) {
    content = content.replace(/useNavigate\(\)/g, 'useRouter()');
    changed = true;
  }

  if (content.includes('to=') && content.includes('Link')) {
    const linkRegex = /<Link\b[^>]*to={?[^>]*>?/g;
    content = content.replace(linkRegex, (match) => {
      return match.replace(/\bto=/, 'href=');
    });
    content = content.replace(/<Link[\s\S]*?>/g, (match) => {
      return match.replace(/\bto=/, 'href=');
    });
    changed = true;
  }

  if (changed) {
    fs.writeFileSync(filePath, content);
    console.log('Migrated:', filePath);
  }
}

for (const [srcFolder, destFolder] of Object.entries(mappings)) {
  const fullSrc = path.join(srcBase, srcFolder);
  const fullDest = path.join(destBase, destFolder);
  if (fs.existsSync(fullSrc)) {
    console.log(`\nProcessing ${srcFolder} -> ${destFolder}`);
    copyDir(fullSrc, fullDest);
  }
}
