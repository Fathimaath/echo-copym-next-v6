const fs = require('fs');
const path = require('path');

function processDirectory(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      // skip asset folders
      if (!['icons', 'images', 'lotties', 'Videos'].includes(file)) {
        processDirectory(fullPath);
      }
    } else if (fullPath.endsWith('.jsx') || fullPath.endsWith('.js')) {
      processFile(fullPath);
    }
  }
}

function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let changed = false;

  // 1. Add "use client" if needed
  const needsClient = /useState|useEffect|useRef|window\.|document\.|framer-motion|gsap|useNavigate|useLocation|react-router-dom/.test(content);
  const hasClient = /^['"]use client['"];?/.test(content.trim());
  if (needsClient && !hasClient) {
    content = '"use client";\n' + content;
    changed = true;
  }

  // 2. Routing replacements
  if (content.includes('react-router-dom')) {
    // Replace imports
    let newContent = content
      .replace(/import\s*\{\s*Link\s*\}\s*from\s*['"]react-router-dom['"];?/g, 'import Link from "next/link";')
      .replace(/import\s*\{\s*useNavigate\s*\}\s*from\s*['"]react-router-dom['"];?/g, 'import { useRouter } from "next/navigation";')
      .replace(/import\s*\{\s*Link\s*,\s*useNavigate\s*\}\s*from\s*['"]react-router-dom['"];?/g, 'import Link from "next/link";\nimport { useRouter } from "next/navigation";')
      .replace(/import\s*\{\s*useNavigate\s*,\s*Link\s*\}\s*from\s*['"]react-router-dom['"];?/g, 'import Link from "next/link";\nimport { useRouter } from "next/navigation";');

    // If still has react-router-dom (e.g. useLocation), replace it
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

  // 3. Replace useNavigate hooks
  if (content.includes('useNavigate(')) {
    content = content.replace(/useNavigate\(\)/g, 'useRouter()');
    changed = true;
  }

  // 4. Replace <Link to="..."> with <Link href="...">
  if (content.includes('to=') && content.includes('Link')) {
    // Simple regex for Link tags
    const linkRegex = /<Link\b[^>]*to={?[^>]*>?/g;
    content = content.replace(linkRegex, (match) => {
      return match.replace(/\bto=/, 'href=');
    });
    // Also handle Link tags spread over multiple lines where `to=` is on a new line
    content = content.replace(/<Link[\s\S]*?>/g, (match) => {
      return match.replace(/\bto=/, 'href=');
    });
    changed = true;
  }

  if (changed) {
    fs.writeFileSync(filePath, content);
    console.log('Processed:', filePath);
  }
}

processDirectory('c:/copymv5/echo.copym-next/src/components');
