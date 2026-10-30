# Approved-reference implementation QA

Source visual truth: the user attachment in the request “Implement the attached design”, 1435×1096 pixels, displayed in this conversation. The target itself was not flattened into the website.

Implementation: `docs/screenshots/home-desktop.jpg`, 1435×1096 pixels at 1435×1096 CSS pixels, device scale factor 1. The screenshot matches the source viewport and reading state, with optional analytics rejected so consent does not obscure the comparison. Other evidence: `docs/screenshots/home-tablet.jpg` at 768×1024 and `docs/screenshots/home-mobile.jpg` at 390×844. Full-page and 320 px captures are retained in the session's `/workspace/design-review/bright/`.

## Comparison and fixes

The supplied target and browser-rendered captures were both visually inspected. Full-view comparison covers header, hero, category strip and oak section. Focused passes checked headline wrapping/weight, navigation/disclosure, the real blue discovery action, product-image identities, category captions, oak image crop and guide link.

1. Initial tablet capture showed copy over the plant/monitor. Fixed with separate copy and photo columns at 761–1000 px. Refreshed 768 px capture shows readable text on a neutral surface.
2. Initial 320 px capture wrapped the search icon and clipped the disclosure. Fixed with a compact three-column header, smaller wordmark and a normally wrapping disclosure. Refreshed 320 px capture has no clipped text or document overflow.
3. Initial desktop oak row was 380 px versus roughly 332 px in the target. Reduced it to 334 px at the target width, increased heading scale toward 44 px, and recaptured at 1435×1096. The complete section now lands aroundy 750–1084, close to the source's y 748–1080. Independent visual review cleared the earlier P2.

## Required fidelity surfaces

- Typography: self-hosted modern sans-serif, strong near-black headings, readable grey body, matched two-line hero title and compact navigation. No fallback-font failures.
- Spacing/layout: desktop 60 px header, 488 px hero, restrained category dividers, 39/61 oak split, compact continuation. Tablet and phone layouts compose the content without overlaps.
- Colors: white/cool-grey surfaces and vivid blue actions replace the former dark green system across the existing page types. Rendered contrast exceeds WCAG AA for measured text/actions.
- Images: independently generated daylight white/silver hero and natural oak inspiration match the reference's subject and lighting. Named products reuse existing exact assets. Generated category imagery is explicitly captioned.
- Copy/content: requested headline, discovery action and setup title are implemented. Five supported categories intentionally replace the mockup's eight; unsupported monitor/chair/desk catalogue categories were not invented. All 40 page heads and affiliate destinations are preserved apart from the stylesheet cache version; published URLs remain unchanged.

## Functional checks

Frozen dependency install, both production generators, JavaScript syntax and static-site validation passed. Chromium completed 94 page/viewport checks and 11 interaction assertions: consent choices, mobile menu and Escape/focus restoration, keyboard setup tabs, reduced motion, catalogue matching/empty/clear paths, and search matching/empty states. Separate checks verify the new discovery anchor and navigation destinations. No document overflow or JavaScript exceptions found. Impeccable's rendered scan had no contrast findings; its sole section-label warning is an intentional match to the approved target.

Accepted constraints: actual catalogue product colours differ from generic mockup objects; five supported categories; visibly captioned generic category illustrations; stacked phone composition. No remaining actionable P0/P1/P2 findings. No side-by-side image artifact is claimed; comparison used the source attachment and the matching rendered captures.

final result: passed
