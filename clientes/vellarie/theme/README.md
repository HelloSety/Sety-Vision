# Vellarie — Shopify theme

Custom Shopify **Online Store 2.0** theme for Vellarie (`4zevyg-1g.myshopify.com` / `vellarie.store`).
Built by **Sety Studio**. No build step — plain Liquid + one CSS file + one JS file.

## Version 5–6 — mobile polish + functional audit (2026-09-05)

**V5 — mobile + finish**
- **Mobile header fixed**: header is now a solid bar on its own (not transparent over the hero), so
  the header logo never overlaps the hero art's baked logo. Logo centred (`1fr auto 1fr`) at every
  breakpoint. `header_style` setting: Solid (default) / Transparent-over-hero.
- **Hero mobile ratio** `5 / 7` + `max-height: 78svh` — impactful without trapping the viewport (~62%).
- **Mobile quick-add** is a compact underlined "Add to cart →" link, not a full-width button.
- **Best sellers vs New arrivals** differentiated: New arrivals uses `layout: feature` (first card
  spans 2×2) + `style: discovery` (eyebrow + lighter heading).
- **Product image focus**: `card_image_focus` setting + `custom.card_focus` metafield per product.
- **Campaign feature** less tall on mobile (`16/11`). **Footer** columns collapse to accordions on
  mobile (brand + manifesto stay visible). **Promo split** panel fills its half. Cart free-shipping
  bar has an "unlocked" state (still off unless a real threshold is set).
- **Hover image swap** rescoped to `.card__media:hover` only — swapping to the real
  `product.media[1]`, crossfade 300ms + `scale(1.02)`, `@media (hover:hover)` only, instant under
  reduced-motion, nothing when a product has one image. Verified with real hover tests.

**V6 — functional audit**
- Full grep of the theme: **no `href="#"`, no `javascript:`/`void(0)`, no TODO/FIXME/mock/fake,
  no hardcoded store URLs, no `<a>` without href.** Every CTA uses `routes.*` / `collection.url` /
  `product.url` or a Theme Editor `url` setting pointed at a real handle.
- ATC / cart / variants confirmed as **native Shopify**: `{% form 'product' %}`, `routes.cart_add_url`,
  Sections API drawer refresh, `{{ form | payment_button }}` (accelerated checkout / PayPal),
  `results.sort_options` + Search & Discovery `results.filters` on the collection page.
- Removed `locales/pt-BR.json` (US-only store). Fixed V1 streetwear leftovers in schema defaults
  ("Shadow System", "A frequency you live in", "$150", "14-day returns").
- Added `templates/page.about.json` (editable About structure — no fabricated company story).
- `shopify theme check`: **0 errors**.
- **Not deployed / not runtime-tested**: `shopify theme list/push/dev` blocked (CLI account is not
  store staff); `themeCreate` via Admin API blocked by the session's write guard. The buy flow is
  code-verified but not clicked live — needs the deploy first (zip upload, Theme Access token, or the
  merchant running the `themeCreate` mutation).

## Version 4 — polish pass (2026-09-05)

Art-direction + conversion + finish. No new architecture.

- **Product cards** reworked to read as objects, not catalogue rows: bigger media, sentence-case
  title in the body font, refined price, **savings chip** (`−38%`), hairline that draws in on hover,
  subtle image scale. `card_image_fit` default **cover**.
- **New "WOW" section** — `sections/campaign-feature.liquid`: large asymmetric image + short copy +
  CTA, with a clip-path reveal and image scale on scroll (off for reduced-motion). Placed right
  after the category index.
- **Promo banner** got a **50/50 split layout** (image half + solid text panel) — kills the
  text-over-baked-art clash. `layout` setting: split (default) / overlay.
- **Homepage recomposed** and de-duplicated: Hero → Marquee → Trust → Best sellers → Category index →
  **Campaign feature** → New arrivals → Brand story → Reviews → Promo (split). One editorial split
  instead of two.
- **PDP**: price now shows `Save $X (Y%)`; gallery main image is **contain on white** (supplier
  photos are marketing composites — no aggressive crop of important info); framed stage + thumbs.
- **Footer**: manifesto line, refined columns, circled social; **newsletter band** ("Stay in the
  loop") kept premium/minimal. en-US copy throughout.
- **Category index**: label underline-sweep on hover + `:active` touch feedback.
- **Claim audit**: "medical-grade materials" → "durable materials"; trust-bar and promo schemas carry
  "only enter what you actually offer" notes; testimonials ship empty + honest.
- Rhythm: `:has()`-based spacing around full-bleed sections; homepage ≈ 6,600px.
- `shopify theme check`: **0 errors**.

## Version 3 — refinement (2026-09-05)

Audit + fix pass on top of V2 Signature. Highlights:

- **Fixed real bugs:** every product grid rendered as a single column (`.grid--products` had
  `grid-template-columns` but no `display:grid`); the mobile hamburger showed on desktop (a later
  unscoped rule beat the `@media` that hides it); the hero forced `min-height: 100svh` → empty
  white band + cropped campaign art.
- **Hero** is now **aspect-ratio driven** (`3/1` desktop, portrait mobile, `max-height` setting,
  focal-point setting) — the art ends naturally, no empty space, no crop.
- **Category section** is now an **editorial numbered index** (`sections/category-index.liquid`,
  no images): `01 / GROOMING / sub-label / →`, animated hover. Replaces the image tiles.
- **New Arrivals** section added to the homepage.
- **Vertical rhythm** tightened (`section_spacing` 100/52, smaller section-head margin,
  no double gap between consecutive dark sections). Homepage went from ~16000px to ~5200px.
- **Product cards** quieter (1px border, no heavy shadow), `card_image_fit` defaults to **cover**
  (the catalogue photos are marketing composites, not white-bg pack shots — cover crops the
  callout text out); real **quick-add variant popover** for single-option products.
- **Header** shrinks on scroll (58px, logo −6px, subtle shadow); centred logo on desktop.
- **Testimonials** ship **empty and honest** — no fake rating, no invented quotes; rating summary
  off by default; `@app` block slot + "reviews on the way" empty state.
- **Trust bar** quieter; **marquee** slower; **promo** stronger overlay.
- Announcement + all homepage copy in **en-US**.

Skills for future Shopify work: `.claude/skills/shopify-{theme,liquid,ux,performance,conversion,qa}/`.

## Version 2 — "Signature" (2026-09-05)

Direction: **dark premium beauty-tech**, editorial, mobile-first, conversion-first — matched to the
real Vellarie brand (beauty & grooming devices, US market) and the campaign banners the client produced.

- **Default preset:** `Vellarie — Signature` — near-black `#0B0B0C`, electric accent `#2E9BFF`
  (green `#1FBFA8` as secondary), Space Grotesk headings, 4 px radius. Alternates kept:
  `Vellarie — AVANT` (streetwear) and `Vellarie — Timeless Elegance` (gold serif).
- **Bundled brand assets** (`assets/`): `vellarie-logo-light/dark.png`, `vellarie-monogram-*.png`,
  `vellarie-lockup-light.png`, `vellarie-favicon.png` (extracted from the client's logo sheet),
  `hero-a/b-desktop|mobile.{jpg,webp}` (the two campaign banners), `cat-grooming|cat-hair.{jpg,webp}`.
  Header / footer / favicon fall back to these when no Files image is set, so preview looks branded
  out of the box; the merchant overrides any of them in the editor.
- **Hero** rebuilt: "baked-in art" mode (campaign copy is in the image → no double text; whole banner
  is one link + a visually-hidden `<h1>`), `<picture>` desktop/mobile, Ken-Burns load + micro-parallax
  (off on mobile / reduced-motion), slide dots, `built-in campaign art` picker.
- **New sections:** `marquee`, `testimonials` (rating summary + quote blocks + `@app` block slot —
  no invented reviews), `promo-banner` (optional real end-date countdown, hidden when past).
  `collection-list` and `editorial-split` gained a bundled-image fallback.
- **Newsletter popup** (`snippets/newsletter-popup.liquid`) — native Shopify capture, once per session,
  delay or exit-intent, off by default (`Theme settings → Newsletter popup`).
- **Product cards:** `Image fit` setting (default *Contain* — dropship photos have white backgrounds),
  skeleton shimmer while the image loads, hover lift.
- New theme settings: `Accent (on dark)`, `Secondary highlight`, `Image fit`, `Newsletter popup` group.

Homepage (`templates/index.json`): Hero → Marquee → Trust bar → Best sellers → Category tiles →
Brand story → Trending → Editorial → Testimonials → Promo. Collection blocks point at the real
`best-sellers` / `best-offers` collections. Copy is en-US.

`shopify theme check`: **0 errors**, 5 warnings (Google Fonts served from the Google CDN — expected).

---

## Deploy

### Option A — Shopify CLI (recommended)
1. Store owner installs the free **Theme Access** app (Shopify) → creates a password (`shptka_…`).
2. From this folder:
   ```bash
   shopify theme push --store 4zevyg-1g.myshopify.com --password <SHPTKA_TOKEN> --unpublished
   ```
   Uploads as an **unpublished** theme — nothing on the live store changes.
3. Preview it in Shopify admin → *Online Store → Themes → Vellarie → Preview*.
4. When approved: **Publish**.

Local dev with live reload:
```bash
shopify theme dev --store 4zevyg-1g.myshopify.com --password <SHPTKA_TOKEN>
```

### Option B — Zip upload (ready now)
`clientes/vellarie/vellarie-theme-signature-v1.zip` is already built (contents of this folder, `/`
separators). Upload via *Online Store → Themes → Add theme → Upload zip*. It lands **unpublished** —
preview, then publish when approved. Rebuild with:
`cd clientes/vellarie && python -c "import zipfile,os; z=zipfile.ZipFile('vellarie-theme-signature-v1.zip','w',zipfile.ZIP_DEFLATED); [z.write(os.path.join(r,f), os.path.relpath(os.path.join(r,f),'theme').replace(os.sep,'/')) for d in ['assets','config','layout','locales','sections','snippets','templates'] for r,_,fs in os.walk('theme/'+d) for f in fs]; z.close()"`

### Static visual proof (no Shopify needed)
`clientes/vellarie/preview/index.html` — open in a browser (or the PNGs in `preview/shots/`).
Uses the real theme `base.css`, the bundled campaign art and live catalogue images. Not the live store.

---

## Structure

```
layout/       theme.liquid, password.liquid
templates/    *.json (OS 2.0) + customers/*.liquid + gift_card.liquid
sections/     header-group.json, footer-group.json, chrome + main-* + home sections
snippets/     css-variables, meta-tags, structured-data, product-card, price,
              variant-picker, buy-buttons, quantity-input, product-media-gallery,
              facets, pagination, cart chrome, icon, responsive-image, newsletter-form
assets/       base.css (design system + components), theme.js (all interactions)
config/       settings_schema.json (Theme Editor global settings) + settings_data.json (presets)
locales/      en.default.json (primary) + en.default.schema.json + pt-BR.json
```

## Design system

All tokens live in `snippets/css-variables.liquid` (fed by `config/settings_schema.json`) and render as
CSS custom properties on `:root`. Nothing is hard-coded per section — colors, fonts, spacing, radius,
motion and button style are all editable in **Theme Editor → Theme settings**.

- **Presets** (`config/settings_data.json`): `Vellarie — AVANT` (default, dark streetwear) and
  `Vellarie — Timeless Elegance` (gold serif — the alternate brand board).
- **Fonts**: heading + body each pick from a curated list (Archivo / Space Grotesk / Anton / Cinzel /
  Inter / Montserrat) loaded from Google Fonts, or the Shopify font picker.
- **Color schemes per section**: light / surface / dark via each section's `color_scheme` setting
  (`.color-dark` / `.color-surface` remap the tokens).

## Homepage

`templates/index.json`: Hero → Trust bar → New arrivals → Editorial split (drop) →
Collection list → Best sellers → Brand story. Newsletter + Footer come from `footer-group.json`.
Every block is add/remove/reorder-able in the editor.

## Metafields the theme reads (optional — create in Settings → Custom data → Products)

| Metafield | Type | Used for |
|---|---|---|
| `custom.subtitle` | single line text | PDP short description under the title |
| `custom.badge` | single line text | Product card badge label (configurable key) |
| `custom.size_guide` | rich text | "Size guide" link content on the PDP |
| `custom.material`, `custom.care`, `custom.fit`, `custom.shipping`, `custom.returns` | rich text | PDP accordion rows (set the accordion's *Metafield key*) |
| `reviews.rating` + `reviews.rating_count` | rating / integer | Star rating (Shopify Product Reviews / Judge.me / Loox convention) |

## Collections & navigation

Nothing fictional is shipped. Create real collections, then:
- point the homepage **Featured collection** and **Collection list** blocks at them;
- build the `main-menu` and `footer` link lists;
- optionally create a `collection-tabs` menu — the collection page renders it as a tab strip.

## Filtering

Uses native **Shopify Search & Discovery** filters. Install that app and configure filters;
the collection page picks them up automatically (`enable_filtering`).

## Analytics

With **Theme settings → Analytics → Push dataLayer events** on, the theme emits
`view_item`, `select_item`, `add_to_cart`, `search`, `newsletter_signup` to `window.dataLayer`
for GTM. No pixel IDs are hard-coded — add GA4 / Meta / TikTok via Shopify's Customer Events or GTM.

## Localization

Primary locale is **English** (`en.default.json`). `pt-BR.json` is included as a secondary
translation. All UI strings go through `{{ '…' | t }}` — no fixed copy scattered in Liquid.
Currency and country are never hard-coded — `shop.money_format` + Shopify Markets drive them.

## Accessibility

Skip link, focus-visible rings, ARIA on nav/drawers/accordions, `prefers-reduced-motion`
disables all reveal/scroll motion, 44px+ touch targets, semantic landmarks.

## QA checklist before publishing

- [ ] Homepage: hero desktop + mobile images, all sections reorder in editor
- [ ] PDP: variant switch updates price/URL/availability, ATC opens drawer, sticky bar on mobile
- [ ] Collection: filter drawer, sort, pagination, empty state
- [ ] Cart drawer: qty change, remove, free-ship bar, checkout
- [ ] Search overlay: predictive results, empty state, full results page
- [ ] 404, password, gift card, customer login/register/account
- [ ] Lighthouse mobile: LCP < 2.5s, CLS < 0.1, INP < 200ms
- [ ] Real policies/shipping/returns text entered (theme ships with placeholder warnings, no invented terms)
