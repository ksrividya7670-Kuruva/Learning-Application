const fs = require('fs');
const path = require('path');

function walk(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(file => {
        file = path.join(dir, file);
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) {
            results = results.concat(walk(file));
        } else {
            if (file.endsWith('.jsx') || file.endsWith('.js') || file.endsWith('.tsx') || file.endsWith('.ts')) {
                results.push(file);
            }
        }
    });
    return results;
}

const files = walk('./src');

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    
    // Replace background gradients with flat colors
    // bg-gradient-to-r from-orange-500 to-orange-600 -> bg-primary
    // or just remove bg-gradient-to-X, from-X, to-X, via-X and replace with a flat color like bg-primary
    
    // Let's do a regex to catch all from-* to-* via-* and bg-gradient-to-*
    let newContent = content.replace(/bg-gradient-to-[a-z-]+\s+/g, '')
                            .replace(/from-[a-z]+-[0-9]+\s+/g, 'bg-primary ')
                            .replace(/to-[a-z]+-[0-9]+\s+/g, '')
                            .replace(/via-[a-z]+-[0-9]+\s+/g, '')
                            // remove cases where they are at the end of the string
                            .replace(/bg-gradient-to-[a-z-]+/g, '')
                            .replace(/from-[a-z]+-[0-9]+/g, 'bg-primary')
                            .replace(/to-[a-z]+-[0-9]+/g, '')
                            .replace(/via-[a-z]+-[0-9]+/g, '');

    if (content !== newContent) {
        fs.writeFileSync(file, newContent);
        console.log(`Updated ${file}`);
    }
});
