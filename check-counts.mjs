import fs from 'fs';
const content = fs.readFileSync('data/tools.ts', 'utf8');
const slugCount = (content.match(/slug: "/g) || []).length;
console.log('Total tools in data/tools.ts (slug count):', slugCount);

// Check home page for outdated numbers
const home = fs.readFileSync('app/page.tsx', 'utf8');
const matches = home.match(/41|\d+\+ Free Online Tools|Free Tools/g);
console.log('Home page "41" or tool-count references:', matches);
