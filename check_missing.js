const fs = require('fs');
const path = require('path');

function checkDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      checkDir(fullPath);
    } else if (fullPath.endsWith('.jsx') || fullPath.endsWith('.js')) {
      const content = fs.readFileSync(fullPath, 'utf8');
      const needsClient = /onClick=|onChange=|onSubmit=|forwardRef|createContext|useToast/.test(content);
      const hasClient = /^['"]use client['"];?/.test(content.trim());
      if (needsClient && !hasClient) {
        console.log('MISSING:', fullPath);
      }
    }
  }
}

checkDir('c:/copymv5/echo.copym-next/src');
