# ToolVerse Redesign & Performance TODO

## ✅ Phase 1: Performance Fixes
- [x] Fix layout.tsx: Defer GA4/Clarity via requestIdleCallback
- [x] Fix Footer CLS: reserve space (minHeight + contain)
- [x] Optimize globals.css

## ✅ Phase 2: Design Redesign
- [x] Update globals.css with modern design tokens
- [x] Redesign Hero section (animated, stats, modern)
- [x] Redesign ToolCard (glassmorphism, glow, hover effects, shimmer, wiggle)
- [x] Redesign CategoryCard (hover lift, glow effects, shimmer, wiggle)
- [x] Redesign BlogCard (modern, card-glow class, shimmer, wiggle)
- [x] Update homepage layout (New Hero, Stats, CTA section, scroll reveal, animated counters)
- [x] Update Tools page (gradient header, category filters, scroll reveal)
- [x] Update Blog page (gradient header, modern cards, scroll reveal)
- [x] Update Navbar (gradient logo, underline animation)
- [x] Update Footer (minHeight, gradient logo, reduced padding)

## ✅ Phase 3: Premium Animations
- [x] globals.css: Added shimmer, pop-in, wiggle, pulse-glow, border-spin, float-slow, reveal classes
- [x] New `ScrollReveal` component (IntersectionObserver, staggered by index, 4 types: up/left/right/scale)
- [x] New `AnimatedCounter` component (counts from 0 → target on scroll with ease-out cubic)
- [x] Homepage: stats → animated counters, all sections → scroll reveal, extra floating orbs, spinning rings, shimmer buttons
- [x] Tools page: header + filter + cards → scroll reveal with stagger
- [x] Blog page: header + cards + CTA → scroll reveal with stagger
- [x] All cards: card-shimmer overlay + wiggle-target icon on hover
- [x] All buttons: btn-shimmer sweep on hover
- [x] Extra decorative orbs and spinning border rings in Hero
- [x] Reduced motion support (prefers-reduced-motion: reduce)

## ✅ Phase 4: Launch
- [x] Run `npm run build` to verify ✅ (94 pages, 0 errors)
- [ ] Run Lighthouse
- [x] Deploy to Vercel (auto-deploy via GitHub push ✅)
- [x] Submit sitemap.xml (fixed: stable lastmod dates, deterministic output)
- [ ] Request indexing
- [ ] Start traffic (Reddit, X, LinkedIn)
