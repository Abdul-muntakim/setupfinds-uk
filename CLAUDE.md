# Working on Setup Finds UK

Static site on GitHub Pages: https://abdul-muntakim.github.io/setupfinds-uk/ (deploys when `main` is pushed).
See `README.md`, `DESIGN.md` and `PRODUCT.md` for the design system and content rules.

## Ground rules from the owner

- Never change existing links or URLs (page filenames, affiliate links, anchors). Adding new links is fine.
- Show the owner before/after screenshots and get a "yes" before pushing to `main` (that publishes the site).
- Never add `noindex`, remove pages from `sitemap.xml`, or change canonical URLs without asking.

## After every change: SEO and indexing check (always do this)

1. Build and validate:
   ```sh
   npm ci && npm run build
   python3 scripts/build_search.py
   python3 scripts/check_site.py
   ```
2. For every page whose content changed, update its `<lastmod>` in `sitemap.xml` to today's date. Any new page must be added to `sitemap.xml` and have a unique `<title>`, meta description, canonical URL and `og:` tags like the existing pages.
3. Confirm no links changed: compare `href` values against the previous commit for each edited HTML file.
4. If a CSS/JS file changed, bump its `?v=` query string in every HTML file so visitors get the new version.
5. After pushing to `main`, wait until the live site serves the change (curl the page and look for the new `?v=` or text), then confirm `sitemap.xml` returns 200.
6. Google index status: if `GSC_SERVICE_ACCOUNT_JSON` is set, run
   ```sh
   python3 scripts/check_google_index.py            # all sitemap pages
   python3 scripts/check_google_index.py page.html  # just the pages you changed
   ```
   (needs `pip install cryptography` if missing). Report to the owner which pages are indexed, which are not and why, and which changed pages they should "Request indexing" for in Search Console (about 10 per day). If the variable is not set, say so and list the changed URLs to request manually.
