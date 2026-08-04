import fs from 'fs';
const content = fs.readFileSync('data/blog.ts', 'utf8');
const slugCount = (content.match(/slug: "/g) || []).length;
console.log('Total blog posts (slug count):', slugCount);
