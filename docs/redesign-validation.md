# Approved bright redesign validation

Verified 30 October 2026. `design-qa.md` records the approved-reference comparison and resolved responsive issues.

- Frozen dependency installation, production effects build, search generation, JavaScript syntax checks and `git diff --check` passed.
- Static validation covered all 40 pages: local routes/assets and anchors, one h1, paragraph boundaries, canonical URLs, descriptions, JSON-LD, affiliate-link attributes and 37 search entries.
- All 40 page heads were compared with the starting revision: metadata unchanged apart from the stylesheet cache version. Every affiliate destination and occurrence is preserved. Analytics code, dependencies and deployment workflow are unchanged.
- Chromium completed 94 page/viewport checks at 1440, 768, 390 and 320px, including all pages at desktop and phone widths. No document overflow, missing primary images or JavaScript exceptions.
- Eleven existing interaction assertions passed: first-visit consent, persisted rejection without tracking, mobile menu, Escape/focus restoration, keyboard setup tabs, reduced motion, catalogue match/empty/clear states and search match/empty states.
- Additional browser pointer tests verify the new discovery CTA at desktop, tablet and phone widths, including its five actual category destinations. Static checks validate the new header routes and setup-guide anchor.
- Exact-reference capture at 1435×1096 and responsive captures at 768×1024, 390×844 and 320×844 were visually inspected. Independent Impeccable visual and accessibility assessments cleared P0/P1/P2 findings. The final oak section is 334px at the reference width.
- Rendered detector: no contrast findings. Its one section-label warning intentionally matches the approved source. Measured body/secondary/action contrast exceeds WCAG AA.

Screenshots are committed in `docs/screenshots`. New assets are standalone optimized images, with provenance in `docs/asset-sources.md`. GitHub Pages remains the existing hosting/deployment mechanism. Publication of a cloud environment does not deploy this website.
