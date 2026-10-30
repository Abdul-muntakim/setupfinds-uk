# Setup Finds UK visual system

## Approved visual target

The user-supplied 1435×1096 reference is the visual authority: white backgrounds, restrained cool-grey surfaces, near-black headings, readable grey body copy, vivid blue actions and natural oak/white/silver desk imagery. The reference overrides conflicting Taste or Impeccable aesthetic defaults. The site retains plain HTML/CSS/JavaScript.

## Composition and tokens

- Base `#ffffff`; surface `#f5f7fa`; raised `#edf1f6`; divider `#e2e7ee`.
- Heading/body ink `#101215`; secondary text `#596272`; action blue `#075bfa`, white action text.
- Existing self-hosted Clash Grotesk at 400/500/600, with a stronger display weight, follows the target's compact modern sans-serif character.
- Shared frame: up to 1440px; desktop inset around 76px; phone inset 20px. Main text measure up to 68 characters.
- Header 60px on desktop: branding, Gear / Setup ideas / Buying guides, search and affiliate disclosure. Phone menu supports Escape/focus restoration.
- Desktop hero is approximately 488px at 1435px width. Its image is a standalone environmental asset, with real HTML copy and the real discovery link laid over its quiet left side. Tablet text and imagery use separate columns; phones stack the copy and crop.
- Five category links reflect the actual content, not the mockup's unsupported monitor/chair/desk catalogue. Use “Gaming mouse” while retaining the published `gaming-mice.html` URL. Three existing exact product images are reused; generic PS5 and desk images carry visible category-illustration captions.
- The oak setup section uses a 39/61 split and 334px desktop height. The copy and guide link remain real HTML; the image is cropped naturally.
- Existing recommendations, the keyboard-accessible budget/performance/premium selector, buying-guide links and a compact useful footer continue below the reference.

## Interaction and accessibility

Taste is used for composition and cross-page consistency, Impeccable for independent visual/accessibility checks, and Animate for restrained 150–280ms interaction feedback. The approved reference's thin dividers, small disclosure and section label are intentional exceptions to generic skill preferences.

Animate only brief transform/opacity entrances and small hover/press feedback. Photography remains still. Content starts visible, and active animations cancel when reduced motion changes. Native links, visible focus, tab semantics, search, catalogue loading/empty/error states and analytics choices remain functional.

Computed contrast checks: primary ink 18.76:1; secondary text 6.15:1; tablet hero copy 5.96:1; blue/white actions 5.40:1. Body copy is 17px desktop, 16px phones. Secondary illustration captions are 12px.

## Assets and verification

See `docs/asset-sources.md` for generated-asset provenance and exact-product thumbnail sources. Existing fonts and their licence remain in `assets/fonts`. New imagery is optimized WebP, with explicit dimensions and lazy loading below the hero. No product prices, specifications, reviews or testing claims were added.

Run `npm ci`, `npm run build`, `python3 scripts/build_search.py`, and `python3 scripts/check_site.py`; then inspect desktop/tablet/phone screenshots and exercise the real navigation, discovery anchor, setup tabs, catalogue filtering, search and consent. `design-qa.md` records the approved-target comparison and fixes.
