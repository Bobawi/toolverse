const fs = require('fs');
const content = fs.readFileSync('data/tools.ts', 'utf8');
const toolBlocks = content.split(/^\s*{\s*$/m).filter(b => b.includes('slug:'));
const results = [];
for (const block of toolBlocks) {
  const slugMatch = block.match(/slug: "([^"]+)"/);
  if (!slugMatch) continue;
  const slug = slugMatch[1];
  const faqMatch = block.match(/faq: \[([\s\S]*?)\n\s*\],/);
  const faqCount = faqMatch ? (faqMatch[1].match(/\{ question:/g) || []).length : 0;
  const seoMatch = block.match(/seo: \{[\s\S]*?title: "([^"]+)"/);
  results.push({ slug, faqCount, hasSeoTitle: !!seoMatch });
}
console.log('Tools with < 5 FAQs:');
results.filter(r => r.faqCount < 5).forEach(r => console.log('  ' + r.slug + ': ' + r.faqCount + ' FAQ'));
console.log('Total tools: ' + results.length);
console.log('Tools with 5+ FAQs: ' + results.filter(r => r.faqCount >= 5).length);
console.log('Tools missing seo.title: ' + results.filter(r => !r.hasSeoTitle).length);
