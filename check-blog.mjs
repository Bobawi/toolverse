import fs from 'fs';
const content = fs.readFileSync('data/blog.ts', 'utf8');

// Count ONLY the top-level blog post slugs (8-space indent, as the first key
// in each blogPost object). This excludes toolCta.slug references inside articles.
const topLevelSlugs = content.match(/^\s{8}slug: "/gm) || [];
console.log('Total blog posts (real articles):', topLevelSlugs.length);
