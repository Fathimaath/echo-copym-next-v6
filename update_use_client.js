const fs = require('fs');
const path = require('path');

function processDirectory(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      if (!['icons', 'images', 'lotties', 'Videos'].includes(file)) {
        processDirectory(fullPath);
      }
    } else if (fullPath.endsWith('.jsx') || fullPath.endsWith('.js')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      const needsClient = /onClick=|onChange=|onSubmit=|forwardRef|useToast|cva|class-variance-authority/.test(content);
      const hasClient = /^['"]use client['"];?/.test(content.trim());
      if (needsClient && !hasClient) {
        content = '"use client";\n' + content;
        fs.writeFileSync(fullPath, content);
        console.log('Added use client to:', fullPath);
      }
    }
  }
}

processDirectory('c:/copymv5/echo.copym-next/src/components');
