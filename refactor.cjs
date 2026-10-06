const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'src');

const replacements = [
  // Corners
  { from: /\brounded-(xl|2xl|3xl|lg|md)\b/g, to: 'rounded-none' },
  
  // Base Shadows
  { from: /\bshadow-sm\b/g, to: 'shadow-[2px_2px_0px_0px_rgba(15,23,42,0.05)]' },
  { from: /\bshadow-md\b/g, to: 'shadow-[4px_4px_0px_0px_rgba(15,23,42,0.1)]' },
  { from: /\bshadow-lg\b/g, to: 'shadow-[4px_4px_0px_0px_rgba(15,23,42,0.1)]' },
  { from: /\bshadow-xl\b/g, to: 'shadow-[6px_6px_0px_0px_rgba(15,23,42,0.1)]' },
  { from: /\bshadow-2xl\b/g, to: 'shadow-[8px_8px_0px_0px_rgba(15,23,42,0.1)]' },
  
  // Hover Shadows
  { from: /\bhover:shadow-sm\b/g, to: 'hover:shadow-[2px_2px_0px_0px_rgba(15,23,42,0.6)]' },
  { from: /\bhover:shadow-md\b/g, to: 'hover:shadow-[4px_4px_0px_0px_rgba(15,23,42,0.6)]' },
  { from: /\bhover:shadow-lg\b/g, to: 'hover:shadow-[4px_4px_0px_0px_rgba(15,23,42,0.6)]' },
  { from: /\bhover:shadow-xl\b/g, to: 'hover:shadow-[6px_6px_0px_0px_rgba(15,23,42,0.6)]' },
  { from: /\bhover:shadow-2xl\b/g, to: 'hover:shadow-[8px_8px_0px_0px_rgba(15,23,42,0.6)]' },
  
  // Scales -> translations for Framer Motion
  { from: /whileHover=\{\{ scale: 1\.05 \}\}/g, to: 'whileHover={{ y: -4, x: -4 }}' },
  { from: /whileHover=\{\{ scale: 1\.03 \}\}/g, to: 'whileHover={{ y: -4, x: -4 }}' },
  { from: /whileHover=\{\{ scale: 1\.02 \}\}/g, to: 'whileHover={{ y: -2, x: -2 }}' },
  { from: /whileHover=\{\{ scale: 1\.1 \}\}/g, to: 'whileHover={{ y: -4, x: -4 }}' },
  
  // Tailwind scales
  { from: /\bhover:scale-105\b/g, to: 'hover:-translate-y-1 hover:-translate-x-1' },
  { from: /\bhover:scale-110\b/g, to: 'hover:-translate-y-1 hover:-translate-x-1' }
];

function processDirectory(directory) {
  const files = fs.readdirSync(directory);
  
  for (const file of files) {
    const fullPath = path.join(directory, file);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory()) {
      processDirectory(fullPath);
    } else if (fullPath.endsWith('.jsx') || fullPath.endsWith('.js')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      let original = content;
      
      // Do replacements
      for (const rule of replacements) {
        content = content.replace(rule.from, rule.to);
      }
      
      if (content !== original) {
        fs.writeFileSync(fullPath, content, 'utf8');
        console.log(`Updated: ${fullPath}`);
      }
    }
  }
}

processDirectory(srcDir);
console.log('Refactor complete.');
