# ToolVerse Redesign & Performance TODO

## ✅ Phase 1: Performance Fixes
- [x] Fix layout.tsx: Defer GA4/Clarity via requestIdleCallback
- [x] Fix Footer CLS: reserve space (minHeight + contain)
- [x] Optimize globals.css

## ✅ Phase 2: Design Redesign
- [x] Update globals.css with modern design tokens
- [x] Redesign Hero section (animated, stats, modern)
- [x] Redesign ToolCard (glassmorphism, glow, hover effects)
- [x] Redesign CategoryCard (hover lift, glow effects)
- [x] Redesign BlogCard (modern, card-glow class)
- [x] Update homepage layout (New Hero, Stats, CTA section)
- [x] Update Tools page (gradient header, category filters)
- [x] Update Blog page (gradient header, modern cards)
- [x] Update Navbar (gradient logo, underline animation)
- [x] Update Footer (minHeight, gradient logo, reduced padding)

## ✅ Phase 3: Launch
- [x] Run `npm run build` to verify ✅ (94 pages, 0 errors)
- [ ] Run Lighthouse
- [ ] Deploy to Vercel
- [ ] Submit sitemap.xml
- [ ] Request indexing
- [ ] Start traffic (Reddit, X, LinkedIn)
