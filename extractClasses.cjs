const fs = require('fs');
const path = require('path');

let counter = 1;
const classMap = new Map();

const excludePattern = /^(group.*|peer.*|animate-in|fade-in|slide-.*|prose.*)$/;

function processFile(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    function replacer(match, classes) {
        if (!classes.trim()) return match;
        
        const classArray = classes.trim().split(/\s+/);
        const toApply = [];
        const toKeep = [];

        classArray.forEach(cls => {
            if (excludePattern.test(cls)) {
                toKeep.push(cls);
            } else {
                toApply.push(cls);
            }
        });

        let applyStr = toApply.join(' ');
        let mappedClass = '';
        
        if (applyStr) {
            if (!classMap.has(applyStr)) {
                classMap.set(applyStr, `mun-${counter++}`);
            }
            mappedClass = classMap.get(applyStr);
        }

        const finalClasses = [mappedClass, ...toKeep].filter(Boolean).join(' ');
        
        return match.startsWith('className') ? `className="${finalClasses}"` : `class="${finalClasses}"`;
    }

    content = content.replace(/class="([^"]+)"/g, replacer);
    content = content.replace(/className="([^"]+)"/g, replacer);

    fs.writeFileSync(filePath, content, 'utf8');
}

function walkDir(dir) {
    fs.readdirSync(dir).forEach(file => {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            walkDir(fullPath);
        } else if (fullPath.endsWith('.astro') || fullPath.endsWith('.tsx')) {
            processFile(fullPath);
        }
    });
}

walkDir('src');

let cssAdditions = '\n\n@layer components {\n';
classMap.forEach((className, tailwindClasses) => {
    cssAdditions += `  .${className} { @apply ${tailwindClasses}; }\n`;
});
cssAdditions += '}\n';

fs.appendFileSync('src/styles/global.css', cssAdditions, 'utf8');
console.log(`Successfully mapped ${classMap.size} unique class combinations into global.css`);