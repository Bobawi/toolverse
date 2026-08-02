# 🚀 ToolVerse

**Free Online Tools** — Fast, secure, and privacy-friendly tools for images, PDFs, developers, text, AI, and everyday tasks. No sign-up required. Everything runs in your browser.

Built with **Next.js 16 (App Router)** + **Tailwind CSS v4** + **TypeScript**.

---

## ✨ Features

- **50+ free tools** — Image, PDF, Developer, Text, Calculator, Security & QR categories
- **100% client-side** — Files are processed in your browser, never uploaded to a server
- **SEO-first architecture** — Dynamic metadata, JSON-LD schema, sitemap, robots.txt, Open Graph/Twitter images
- **Blog** — Data-driven articles with internal linking to tools
- **Privacy-ready** — Analytics placeholders (Google Analytics 4 + Microsoft Clarity) ready to activate
- **Security headers** — X-Content-Type-Options, X-Frame-Options, HSTS, Referrer-Policy, Permissions-Policy

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16 (App Router, Turbopack) |
| UI | React 19 + Tailwind CSS v4 |
| Language | TypeScript |
| PDF | pdf-lib, pdfjs-dist |
| Fonts | Geist (next/font) |

---

## 📁 Project Structure

```
toolverse/
├── app/
│   ├── tools/[slug]/     → Dynamic tool pages + tool components
│   ├── blog/             → Blog list + article pages
│   ├── categories/[slug]/→ Category pages
│   ├── layout.tsx        → Root layout (metadata, analytics placeholders)
│   └── ...
├── components/
│   ├── layout/           → Navbar, Footer
│   ├── home/             → Hero, SearchTools
│   ├── tools/            → Tool-specific components
│   ├── blog/             → BlogCard, BlogArticle
│   ├── tool-layout/      → ToolHeader, ToolFAQ, ToolHowToUse, etc.
│   └── ui/               → Button, Input, ToolLayout, UploadArea
├── data/                 → tools.ts, categories.ts, blog.ts
├── types/                → TypeScript interfaces
└── lib/                  → Utilities
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18.18+ (20 LTS recommended)
- npm or pnpm

### Install & Run

```bash
# Install dependencies
npm install

# Start development server
npm run dev
# Open http://localhost:3000

# Production build
npm run build

# Start production server
npm start

# Lint
npm run lint
```

---

## 📦 Deployment on Vercel

1. **Push your code to GitHub/GitLab** (e.g. `git push origin main`).
2. Go to **[vercel.com/new](https://vercel.com/new)** and import your repository.
3. Vercel auto-detects Next.js. Use these settings (defaults are fine):
   - **Framework Preset:** Next.js
   - **Build Command:** `npm run build`
   - **Output Directory:** `.next`
   - **Install Command:** `npm install`
4. Click **Deploy**.
5. Once deployed, **add your custom domain** under *Settings → Domains*.

### Environment Variables

None are required. If you later add external services, add them in *Settings → Environment Variables*.

---

## 🚀 Live

- **Production:** https://toolverse-steel.vercel.app
- **GitHub:** https://github.com/Bobawi/toolverse
- **Vercel Dashboard:** https://vercel.com/httpsthegamekesugcom/toolverse

## 📊 Post-Launch Checklist

### 1. Analytics (in `app/layout.tsx`)
- [x] **Google Analytics 4** — Active (`G-Z3D2TSGYJ7`)
- [ ] **Microsoft Clarity** — Create a project, copy the Project ID, and replace `XXXXXXXX` in the placeholder script.

### 2. Google Search Console
- [ ] Verify your domain (DNS TXT record or HTML tag).
- [ ] Submit your **sitemap**: `https://toolverse-steel.vercel.app/sitemap.xml`
- [ ] Request indexing for key pages.

### 3. Bing Webmaster Tools
- [ ] Import from Search Console (one click).

### 4. AdSense (after you have traffic)
- [ ] Apply after reaching ~10k monthly sessions for faster approval.
- [ ] Place ad units in `ToolLayout` and blog article templates.

### 5. Performance
- [ ] Run **Lighthouse** (aim 95+ Performance/SEO).
- [ ] Verify Core Web Vitals in Search Console.

---

## 🔒 Security

Security headers are set in `next.config.ts`:

- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: DENY`
- `Strict-Transport-Security` (HSTS)
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Permissions-Policy` (blocks camera, microphone, geolocation)

---

## 📝 License

Private project. All rights reserved.

