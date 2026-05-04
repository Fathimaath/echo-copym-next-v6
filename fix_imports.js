const fs = require('fs');
const path = require('path');

function processDirectory(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      processDirectory(fullPath);
    } else if (/\.(jsx?|tsx?)$/.test(fullPath)) {
      let content = fs.readFileSync(fullPath, 'utf8');
      let changed = false;

      const regexes = [
        { re: /(['"])(?:\.\.\/)+components\//g, rep: '$1@/components/' },
        { re: /(['"])(?:\.\.\/)+utils\//g, rep: '$1@/utils/' },
        { re: /(['"])(?:\.\.\/)+hooks\//g, rep: '$1@/hooks/' },
        { re: /(['"])(?:\.\.\/)+services\//g, rep: '$1@/services/' },
        { re: /(['"])(?:\.\.\/)+data\//g, rep: '$1@/data/' }
      ];

      for (const {re, rep} of regexes) {
        if (re.test(content)) {
          content = content.replace(re, rep);
          changed = true;
        }
      }

      if (changed) {
        fs.writeFileSync(fullPath, content);
        console.log('Fixed imports in:', fullPath);
      }
    }
  }
}

processDirectory('c:/copymv5/echo.copym-next/src');
