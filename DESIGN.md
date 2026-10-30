# Setup Finds UK visual system

The website helps UK readers find a worthwhile gaming or desk upgrade, compare trade-offs and build a balanced shortlist. It is research-led, not a claim of hands-on testing. Prices remain on the retailer's listing.

## Direction

Taste's split-stage composition makes the desk itself one half of the homepage and the buying advice the other. The name's “finds” becomes an editorial shortlist: browse by the problem to solve, inspect selected gear, then plan the whole setup. Inner reading pages prioritize comprehension over display effects.

One family, Clash Grotesk, carries the visual system. Deep green-black (#101412), off-white (#f0f3eb) and lime (#c5f36b) are the primary roles. The palette preserves the existing brand's green and the use scene of an evening gaming desk, replacing the dealt light palette. Paper (#edf0e8) marks the setup planner and positive buying considerations. Use flat fills and square corners; no glass or decorative gradients. Neutral image scrims are for legibility only.

## Layout and components

Use the shared `--space` outer margin and a 1440px maximum width. Give distinct sections breathing room; keep paragraph measures near 68 characters. Hero typography is oversized, editorial reading headings are quieter. Every page shares the header, category wayfinding where useful, and the designed footer. Catalogue cards prioritize the product image, suitability, then the internal guide. Retailer links retain the exact original variant and affiliate destination.

The setup choice is a real keyboard-accessible tablist. The catalogue filter has a live count, empty state and a clearing path. The static catalogue and links remain available without JavaScript. Search keeps its existing URL, ranking, loading/error states and query history.

## Motion and access

Animate's 150–280ms timing and exponential easing are adapted to static HTML and the existing Motion mini API. Animate only transform and opacity, never leave content hidden, cancel active animations when reduced motion changes, and keep visible keyboard focus. Avoid perpetual motion, pointer spotlights and tilt. Shared actions use authored SVG arrows rather than font-dependent icon glyphs.

## Sources and maintenance

- Taste Skill: https://github.com/Leonxlnx/taste-skill — composition and screenshot inspection.
- Impeccable: https://github.com/pbakaus/impeccable — independent critique, rendered evidence and finishing pass.
- Animate: https://github.com/delphi-ai/animate-skill — timing, performance and accessibility.
- Clash Grotesk is supplied by Indian Type Foundry / Fontshare. Original, unmodified webfonts are self-hosted for this website; licence is in `assets/fonts/FFL.txt`.
- All imagery is reused from the existing repository. Existing category illustrations remain visibly captioned. No external stock assets, fabricated product photographs, prices, reviews or specifications were added. The header mark is an original SVG.

Run `npm ci`, `npm run build`, `python3 scripts/build_search.py`, then `python3 scripts/check_site.py`. Inspect desktop and mobile views after shared CSS or navigation changes. Keep analytics consent and affiliate tracking intact.
