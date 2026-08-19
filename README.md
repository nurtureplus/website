# Nurture+ Website

Premium B2B IV therapy website for Nurture+, built with Next.js 15 (App Router),
TypeScript, Tailwind CSS, Framer Motion and Lucide icons.

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Build

```bash
npm run build
npm start
```

## Structure

- `src/app` — routes: homepage (`page.tsx`), `products/[slug]`, `privacy-policy`,
  `terms-conditions`, plus `sitemap.ts` and `robots.ts`.
- `src/components/sections` — homepage sections (Hero, About, Product Showcase,
  Why Choose Us, Industries, Quality, Distributor form, Contact).
- `src/components/ui` — reusable UI (product card, form fields).
- `src/components/motion` — shared scroll-reveal animation wrapper.
- `src/data/products.ts` — the 4 real Nurture+ products (Elixir+, GLUTA+ Ultra,
  GLUTA+, Zinco+), transcribed only from the packaging/labels and the Elixir+
  brochure provided — no invented claims.
- `src/data/site.ts` — company info, nav, industries, why-choose-us, quality copy.
- `public/products` — product photography, cropped from the supplied packaging
  renders (IV Labels folder).
- `public/brand` — logo and mark, extracted from `NLOGO.pdf` / `Leaf.pdf`.
- `public/fonts` — the original Montserrat Bold/Italic files (site uses
  `@fontsource/montserrat` for the full weight range, loaded locally with no
  external font requests).

## Known gaps to close before launch

1. **Forms have no backend.** The distributor and contact forms currently just
   show a success state client-side. Wire `handleSubmit` in
   `src/components/sections/distributor-form.tsx` and `contact.tsx` to an email
   service (e.g. Resend, Formspree) or your CRM.
2. **Legal pages are placeholders.** `privacy-policy` and `terms-conditions`
   contain clearly-marked placeholder text — replace with real content from
   legal counsel.
3. **Only 4 products are live** (the ones with real packaging/brochure assets
   available: Elixir+, GLUTA+ Ultra, GLUTA+, Zinco+). To add more (e.g. a
   standalone Vitamin C or NAD+ variant), add an entry to `src/data/products.ts`
   and drop a product photo in `public/products/`.
4. **OG image** at `public/brand/og-image.jpg` is a simple generated placeholder
   — swap for a designed social-share image before launch.
5. **Domain**: metadata assumes `https://www.nurtureplus.in` — update
   `siteUrl` in `src/app/layout.tsx` and `src/app/sitemap.ts`/`robots.ts` if
   that changes.
