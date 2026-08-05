# ToolVerse Arabic Deep Translation — TODO

## Phase 1: UI Shell
- [x] Add new UI translation keys (section headings, badges, footer categories, homepage, tool detail headings) to `lib/i18n.ts` (en/fr/ar)
- [x] Wire homepage `app/page.tsx` hardcoded text through `t()`
- [x] Wire `components/layout/Footer.tsx` categories through `t()`
- [x] Wire `components/tools/ToolCard.tsx` badges/tags through `t()`
- [x] Localize category names (`data/categories.ts` + helper)

## Phase 2: Tool Deep Translation
- [x] Create `data/tool-translations.ts` with Arabic name/description/features/faq/howToUse for all 50+ tools
- [x] Add `localizeTool(tool, locale)` helper
- [x] Wire `components/tools/ToolCard.tsx` to localized names
- [x] Wire `app/tools/page.tsx` category + tool names
- [x] Wire `app/page.tsx` popular tools + categories

## Phase 3: Tool Detail Pages
- [x] Wire `components/tool-layout/ToolFeatures.tsx`, `ToolHowToUse.tsx`, `ToolFAQ.tsx` localized via `tool` prop
- [x] Update `app/tools/[slug]/page.tsx` to pass `tool` to localized layout components
- [x] Localize "Features", "How to Use", "Frequently Asked Questions" headings
- [x] Localize `ToolRelatedTools` subtitle via `related.subtitle` key
- [x] Localize `ToolShareButtons` (share.title, share.copy, share.copied, share.on keys)

## Phase 4: Verification
- [ ] TypeScript build passes
- [ ] RTL rendering check
