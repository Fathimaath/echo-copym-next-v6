const fs = require('fs');
const files = [
  'c:/copymv5/echo.copym-next/src/components/Blog/Glossary/AlphabetNav.jsx',
  'c:/copymv5/echo.copym-next/src/components/ui/button.jsx',
  'c:/copymv5/echo.copym-next/src/components/ui/NewButton.jsx'
];

files.forEach(f => {
  let content = fs.readFileSync(f, 'utf8');
  content = '"use client";\n' + content;
  fs.writeFileSync(f, content);
  console.log('Fixed', f);
});
