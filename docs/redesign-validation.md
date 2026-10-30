# Redesign validation

Verified on 30 October 2026 before deployment.

- Frozen npm install, production effects build, search generation and JavaScript syntax checks passed.
- `scripts/check_site.py` validated 40 HTML pages, local files and anchors, valid paragraph boundaries, affiliate attributes, SEO metadata and 37 search entries.
- Compared all 40 page heads against the starting revision: titles, descriptions, canonical URLs and structured data are unchanged; only the stylesheet version changed. All affiliate destinations and their multiplicity are unchanged.
- Chromium performed 94 page/viewport checks at 1440, 768, 390 and 320px, including all 40 pages at desktop and phone widths: no document overflow, missing primary images or JavaScript exceptions.
- Eleven interaction assertions passed: consent offered, rejection persisted without tracking, mobile menu, Escape/focus restoration, keyboard setup tabs, reduced motion, catalogue matching, catalogue empty state, filter clearing, search matching and search empty state.
- Desktop/mobile screenshots were inspected for the homepage, catalogue, product guide, buying-guide index, comparison and budget build. Tablet homepage also inspected.
- Independent Impeccable visual and detector assessments were used. Corrected catalogue section IDs, missing headings, font-dependent arrows, small captions, consent size, product-image height and mobile word spacing.
- Rendered Impeccable scan found no contrast warnings. Static contrast findings inferred black text despite the computed light foreground; computed browser colors were checked. Initial small-caption findings were fixed to 13px. Prose uses pretty wrapping.
- Motion is optional and never conceals content. Hover and focus feedback remain useful with animation disabled. No video was added: existing still imagery is appropriate to the subject and avoids unnecessary downloads.

The screenshots here document the implementation. Deployment uses the existing GitHub Pages workflow; publishing a cloud environment is not part of website deployment. Confirm the corresponding GitHub Actions run and request the live page before reporting it live.
