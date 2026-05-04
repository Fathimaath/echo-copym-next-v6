const fs = require('fs');
const path = require('path');

const assetFolders = ['SVG', 'Videos', 'icons', 'images', 'lotties'];
const srcBase = 'c:/copymv5/echo.copym-next/src/components';
const publicBase = 'c:/copymv5/echo.copym-next/public';

// 1. Move directories
for (const folder of assetFolders) {
  const srcPath = path.join(srcBase, folder);
  const destPath = path.join(publicBase, folder);
  if (fs.existsSync(srcPath)) {
    if (!fs.existsSync(destPath)) {
      // Move folder
      fs.renameSync(srcPath, destPath);
      console.log('Moved', folder, 'to public/');
    } else {
      // If already exists, maybe copy files inside
      console.log('Warning:', destPath, 'already exists, skipped moving');
    }
  }
}

// 2. Fix imports in codebase
function processDirectory(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      processDirectory(fullPath);
    } else if (/\.(jsx?|tsx?)$/.test(fullPath)) {
      let content = fs.readFileSync(fullPath, 'utf8');
      let changed = false;

      // Regex to find import of media (images, SVG, Videos, icons)
      const mediaRe = /import\s+([a-zA-Z0-9_]+)\s+from\s+['"]@\/components\/(images|SVG|Videos|icons)\/([^'"]+)['"];?/g;
      if (mediaRe.test(content)) {
        content = content.replace(mediaRe, "const $1 = '/$2/$3';");
        changed = true;
      }

      // Regex for lotties (keep import but point to public)
      const lottieRe = /import\s+([a-zA-Z0-9_]+)\s+from\s+['"]@\/components\/lotties\/([^'"]+)['"];?/g;
      if (lottieRe.test(content)) {
        content = content.replace(lottieRe, "import $1 from '@/../public/lotties/$2';");
        changed = true;
      }

      if (changed) {
        fs.writeFileSync(fullPath, content);
        console.log('Fixed asset imports in:', fullPath);
      }
    }
  }
}

processDirectory('c:/copymv5/echo.copym-next/src');
