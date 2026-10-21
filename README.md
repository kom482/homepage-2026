# komarivskyi.com

My personal homepage and CV — a single-page site for Viacheslav Komarivskyi,
a software engineer working on medical imaging (digital pathology, radiology,
ophthalmology) at Roche.

It's a static site: About, CV, and Contact, with an ambient canvas background
that nods to the ROI annotation tools found in medical imaging viewers.

## Tech stack

- **React 19** + **TypeScript**
- **Vite 7** for dev server and build
- Plain CSS (no framework), with CSS custom properties for the palette
- A hand-written **2D canvas** animation (`src/components/AnnotationBackground.tsx`) —
  no WebGL/Three.js dependency; it respects `prefers-reduced-motion` and pauses
  when off-screen or the tab is hidden

## Getting started

Requires **Node 20.19+ or 22.12+** (see `.nvmrc`).

```bash
npm install        # install dependencies
npm run dev        # start the dev server (http://localhost:5173)
npm run build      # type-check + production build into dist/
npm run preview    # serve the production build locally
npm run lint       # run ESLint
```

## Project structure

```
index.html                         # entry HTML, font loading, meta tags
src/
  main.tsx                         # React entry point
  App.tsx                          # the whole page (header, About, CV, Contact)
  App.css                          # page/layout styles
  index.css                        # design tokens, base typography, resets
  components/
    AnnotationBackground.tsx       # the animated canvas background
public/                            # static assets (photo, logo, CV PDF)
```

## Deployment

Static build — the contents of `dist/` can be served by any static host
(Cloudflare Pages, Netlify, Vercel, or plain nginx). The build command is
`npm run build` and the output directory is `dist`.

## A note on how this was built

I built this site with the help of [Claude Code](https://claude.com/claude-code).
The content, structure, and design decisions are mine; Claude Code was the tool
I used to write and refine the code — the same AI-assisted workflow I use in my
day-to-day engineering work.
