import fs from 'fs';
const content = fs.readFileSync('data/tools.ts', 'utf8');

// Count ONLY the top-level tool slugs (8-space indent, the first key in each
// tool object). This excludes any nested slug references.
const slugCount = (content.match(/^\s{8}slug: "/gm) || []).length;
console.log('Total tools in data/tools.ts:', slugCount);

// Check home page for outdated hard-coded numbers
const home = fs.readFileSync('app/page.tsx', 'utf8');
const matches = home.match(/41|\d+\+ Free Online Tools|Free Tools/g);
console.log('Home page count references:', matches);
