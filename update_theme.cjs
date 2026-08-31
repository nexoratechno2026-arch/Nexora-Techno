const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'src', 'lms');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(function(file) {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(file));
    } else {
      if (file.endsWith('.jsx') || file.endsWith('.js')) {
        results.push(file);
      }
    }
  });
  return results;
}

const files = walk(srcDir);

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let originalContent = content;
  
  // Revert text-slate-900 to text-white if it's on a blue background (bg-sky-500 or from-sky-)
  content = content.replace(/(bg-sky-500|from-sky-\d+)([^>]*?)text-slate-900/g, '$1$2text-white');
  content = content.replace(/text-slate-900([^>]*?)(bg-sky-500|from-sky-\d+)/g, 'text-white$1$2');

  if (content !== originalContent) {
    fs.writeFileSync(file, content, 'utf8');
    console.log(`Fixed text-white on blue backgrounds in ${file}`);
  }
});
