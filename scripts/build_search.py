"""Rebuild the static search index from published page content (no dependencies)."""
import json
from html.parser import HTMLParser
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent


class Page(HTMLParser):
    def __init__(self):
        super().__init__()
        self.main = False
        self.heading = False
        self.hidden = 0
        self.title = []
        self.text = []
        self.description = ''

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if tag == 'main': self.main = True
        if tag == 'h1': self.heading = True
        if tag in ('script', 'style'): self.hidden += 1
        if tag == 'meta' and attrs.get('name') == 'description':
            self.description = attrs.get('content', '')

    def handle_endtag(self, tag):
        if tag == 'main': self.main = False
        if tag == 'h1': self.heading = False
        if tag in ('script', 'style'): self.hidden = max(0, self.hidden - 1)

    def handle_data(self, data):
        if self.main and not self.hidden:
            self.text.append(data)
            if self.heading: self.title.append(data)


def build():
    entries = []
    for path in sorted(ROOT.glob('*.html')):
        if path.name in ('search.html', 'privacy.html', 'affiliate-disclosure.html'):
            continue
        page = Page()
        page.feed(path.read_text())
        title = ' '.join(' '.join(page.title).split())
        if not title: continue
        entries.append(dict(url=path.name, title=title, description=page.description,
                            text=' '.join(' '.join(page.text).split())))
    (ROOT / 'search-index.json').write_text(json.dumps(entries, ensure_ascii=False, separators=(',', ':')) + '\n')
    print(f'Indexed {len(entries)} pages')


if __name__ == '__main__':
    build()
