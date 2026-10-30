"""Validate the static site's routes, metadata, markup and affiliate-link safety."""
import json
from collections import Counter
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import unquote, urlsplit

ROOT = Path(__file__).resolve().parent.parent


class Page(HTMLParser):
    def __init__(self):
        super().__init__()
        self.ids = []
        self.links = []
        self.h1 = 0
        self.canonical = []
        self.description = []
        self.structured = []
        self.in_json = False
        self.json_text = ''
        self.errors = []
        self.in_paragraph = False

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if self.in_paragraph and tag in ('div', 'section', 'article', 'h1', 'h2', 'h3', 'ul', 'figure', 'p'):
            self.errors.append(f'Block element {tag} inside a paragraph')
        if tag == 'p':
            self.in_paragraph = True
        if 'id' in attrs:
            self.ids.append(attrs['id'])
        if tag == 'h1':
            self.h1 += 1
        if tag == 'link' and attrs.get('rel') == 'canonical':
            self.canonical.append(attrs.get('href', ''))
        if tag == 'meta' and attrs.get('name') == 'description':
            self.description.append(attrs.get('content', ''))
        if tag == 'script' and attrs.get('type') == 'application/ld+json':
            self.in_json = True
            self.json_text = ''
        for key in ('href', 'src'):
            if key in attrs:
                self.links.append(attrs[key])
        if tag == 'a' and urlsplit(attrs.get('href', '')).hostname in ('link.amazon', 'amzn.to'):
            if not {'sponsored', 'nofollow', 'noopener'}.issubset(set(attrs.get('rel', '').split())):
                self.errors.append('Affiliate link lacks required relationship attributes')
            if attrs.get('target') != '_blank':
                self.errors.append('Affiliate link should open in a new tab')

    def handle_data(self, data):
        if self.in_json:
            self.json_text += data

    def handle_endtag(self, tag):
        if tag == 'p':
            self.in_paragraph = False
        if tag == 'script' and self.in_json:
            self.in_json = False
            try:
                self.structured.append(json.loads(self.json_text))
            except json.JSONDecodeError:
                self.errors.append('Invalid JSON-LD')


def main():
    pages = {}
    errors = []
    for path in sorted(ROOT.glob('*.html')):
        page = Page()
        page.feed(path.read_text())
        pages[path.name] = page
        if page.h1 != 1:
            page.errors.append(f'Expected one h1, found {page.h1}')
        if len(page.ids) != len(set(page.ids)):
            page.errors.append('Duplicate HTML IDs')
        if len(page.canonical) != 1 or not page.canonical[0].startswith('https://abdul-muntakim.github.io/setupfinds-uk/'):
            page.errors.append('Missing or unexpected canonical URL')
        if len(page.description) != 1 or not page.description[0]:
            page.errors.append('Missing page description')
        if not page.structured:
            page.errors.append('Missing valid structured metadata')
        errors.extend(f'{path.name}: {e}' for e in page.errors)
    for name, page in pages.items():
        for link in page.links:
            url = urlsplit(link)
            if url.scheme or url.netloc:
                continue
            target = unquote(url.path) or name
            if not (ROOT / target).exists():
                errors.append(f'{name}: Missing local file {target}')
            if url.fragment and target in pages and url.fragment not in pages[target].ids:
                errors.append(f'{name}: Missing anchor {link}')
    index = json.loads((ROOT / 'search-index.json').read_text())
    if len(index) == 0:
        errors.append('Search index is empty')
    duplicates = [url for url, count in Counter(e['url'] for e in index).items() if count > 1]
    if duplicates:
        errors.append(f'Duplicate search entries: {duplicates}')
    for entry in index:
        if entry['url'] not in pages or not entry['title']:
            errors.append(f'Invalid search entry: {entry["url"]}')
    if errors:
        raise SystemExit('\n'.join(errors))
    print(f'Validated {len(pages)} pages, local links and anchors, affiliate attributes, SEO metadata and {len(index)} search entries.')


if __name__ == '__main__':
    main()
