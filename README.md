# Setup Finds UK

Static HTML website deployed to GitHub Pages from `main`.

## Editing

- Shared styles live in `styles.css`; all pages load this one stylesheet.
- Product images are explicit `<img>` elements in each card and product page. Match assets to product URLs, never card order. Category illustrations carry a visible caption and must not be presented as exact product photos.
- The existing `assets/exact/g502.webp` image is reused for the G502 card and product guide. Other catalogue images remain labelled category illustrations until verified product photographs are available.
- Keep affiliate links on the intended product variant when updating content or imagery.

## Search

Run `python3 scripts/build_search.py` after editing page content. GitHub Actions also runs it on every deployment. The index reads the main content of published HTML pages, excluding the search and legal pages. `search.js` searches the index in the browser and ranks title matches first. There are no external search services or API keys.

## Preview

Run `python3 -m http.server 8000`, then open `http://localhost:8000`. Use an HTTP server so the search index can load.

## Deploy

Push to `main`. The workflow rebuilds search, copies public website files to `_site`, and publishes that directory to GitHub Pages. Development scripts and repository metadata are not published.

## Visual effects

Motion's mini API powers one-time entrance transitions; Vanilla Tilt powers subtle depth on the four homepage product cards. The hero lighting follows a mouse pointer. Touch input and reduced-motion preferences disable pointer effects; changing reduced-motion preferences also cancels active animations. Content stays visible if JavaScript fails.

Edit `src/effects.js`, then run `npm ci` and `npm run build` to regenerate `effects.js`. GitHub Actions also builds this bundle before deployment. The runtime needs no CDN, API key, React, 3D model or WebGL. Keep the notices in `THIRD_PARTY_NOTICES.md` when distributing the bundle.

## Design and validation

The shared responsive system is documented in `DESIGN.md`. The homepage setup selector supports arrow keys, Home and End. The all-gear catalogue supports local filtering; the original category links work without JavaScript. Motion respects reduced-motion settings and never hides the underlying content.

After editing, run:

```sh
npm ci
npm run build
python3 scripts/build_search.py
python3 scripts/check_site.py
```

The static check validates local routes and anchors, affiliate-link attributes, page descriptions, canonical URLs, JSON-LD and the generated search index. Also inspect desktop and mobile layouts and exercise the menu, catalogue filter, setup tabs, search and analytics choice before deployment.
