# Xerox Designs — Landing Page (Next.js)

This recodes the site's landing page to match the reference video's layout,
motion and type language, built for Xerox Designs (design studio) content.

## Run locally

```bash
npm install
npm run dev
```

Then open http://localhost:3000

## Build for production

```bash
npm run build
npm run start
```

## Structure

- `app/layout.js` — root layout, loads Archivo + Inter from Google Fonts
- `app/page.js` — the full landing page (nav, hero, sections, footer)
- `app/globals.css` — all design tokens + styles

## Notes

- Visuals are CSS/SVG-crafted "artifact" panels (pen tool, layers, grid,
  crop marks) standing in for photography — swap any `.art-*` div content
  for real project photos/screens when you have them.
- Update contact details, copy and nav links in `app/page.js` as needed.
- Deploys to Vercel with zero config (`vercel deploy`).
