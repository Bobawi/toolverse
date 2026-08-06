# ToolVerse — SEO & AdSense Setup Guide

This guide walks you through getting indexed by Google and approved for AdSense.

---

## 🥇 Step 1: Google Search Console (Mandatory)

This is the #1 most important step. Without it, Google won't reliably index your site.

### 1. Create / Sign in
- Go to [https://search.google.com/search-console](https://search.google.com/search-console)
- Sign in with your Google account.

### 2. Add your property
- Click **"Add property"**.
- Choose **"Domain"** type and enter: `toolverse.app`
- (or choose **"URL prefix"** and enter `https://toolverse.app`)

### 3. Verify ownership — easiest method: DNS TXT
- Google gives you a DNS TXT record (e.g. `google-site-verification=...`).
- Add it in your DNS provider (Vercel, Cloudflare, Namecheap, etc.).
- Click **"Verify"**.

> ⚠️ Note: The site already has a `google-site-verification` meta tag in `app/layout.tsx`. Both methods work — use whichever is easiest.

### 4. Submit your sitemap
- In the left menu, click **"Sitemaps"**.
- Enter: `sitemap.xml`
- Click **"Submit"**.
- Wait — Google will start crawling. It can take a few days to a few weeks.

### 5. Request indexing for key pages
- Use the **URL Inspection** tool to request indexing of your homepage, /tools, and top pages.

---

## 🥈 Step 2: Submit to Google AdSense

You can apply as soon as the site is indexed. Apply early — review takes time.

### 1. Go to AdSense
- [https://adsense.google.com](https://adsense.google.com)
- Click **"Sign up now"**.

### 2. Connect your site
- Enter your site URL: `https://toolverse.app`
- Choose your payment country (e.g. Morocco).

### 3. Complete the reviewer checklist
Before applying, make sure you have:
- ✅ **Privacy Policy** — already at `/privacy`
- ✅ **Terms of Service** — already at `/terms`
- ✅ **About page** — already at `/about`
- ✅ **Contact page** — already at `/contact`
- ✅ **Original content** — 100+ tool pages + 30+ blog articles
- ✅ **Navigation** — clean and working

### 4. Submit
- Fill in your details and submit.
- Google will review. **This can take 2-4 weeks.**

### 5. IMPORTANT during review
- **Do NOT show any ads** while under review. Google rejects sites that show ads before approval.
- The site is already configured to show NO ads by default (see AdSense env vars below).

---

## 🥉 Step 3: Activate Ads AFTER Approval

Once AdSense approves your site, activate ads in 3 steps:

### 1. Create ad units
- In AdSense dashboard → **Ads** → **By ad unit** → **Create ad unit**.
- Create a **Display** ad and copy the **Ad slot ID** and your **Publisher ID** (`pub-...`).

### 2. Set environment variables
On Vercel:
- Go to your project → **Settings** → **Environment Variables**.
- Add:
  - `NEXT_PUBLIC_ADSENSE_ENABLED` = `true`
  - `NEXT_PUBLIC_ADSENSE_CLIENT` = `ca-pub-XXXXXXXXXXXXXXXX`
  - `NEXT_PUBLIC_ADSENSE_SLOT` = `1234567890`
- Redeploy the site.

### 3. Ads appear automatically
The `AdSlot` component is already placed on:
- Every tool page (below the tool)
- Blog articles (in the middle)

Once the env vars are set and the site is redeployed, ads will show.

---

## 🚀 Ongoing SEO Tips

### Content
- Publish more blog articles in **Arabic** and **French** (Moroccan keywords).
- Target keywords: "impôt sur le revenu maroc", "convertir dirham euro", "tva maroc".

### Backlinks
- Get links from other sites (directories, forums, social profiles).
- Google respects quality backlinks.

### Speed
- Run [PageSpeed Insights](https://pagespeed.web.dev) — aim for 90+.
- The site is Next.js so it's already fast.

### Analytics
- Connect Google Analytics 4 to see where traffic comes from.

---

## ✅ Checklist

- [ ] Google Search Console property added & verified
- [ ] Sitemap submitted (`sitemap.xml`)
- [ ] Got approved for AdSense
- [ ] Set `NEXT_PUBLIC_ADSENSE_ENABLED=true` + client/slot env vars
- [ ] Ads showing on the site
- [ ] Publishing regular Arabic/French blog content
