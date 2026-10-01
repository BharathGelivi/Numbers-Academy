"""Validate generated pages, local links, images and SEO without dependencies."""
import json
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urlparse, unquote
import xml.etree.ElementTree as ET

ROOT = Path(__file__).resolve().parents[1]

class Page(HTMLParser):
    def __init__(self):
        super().__init__()
        self.links, self.images, self.ids, self.meta, self.schemas = [], [], [], {}, []
        self.h1 = 0
        self.schema = None
        self.canonical = None
    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if 'id' in attrs:
            assert attrs['id'] not in self.ids, f'Duplicate id: {attrs["id"]}'
            self.ids.append(attrs['id'])
        if tag == 'h1': self.h1 += 1
        if tag == 'meta': self.meta[attrs.get('name',attrs.get('property'))] = attrs.get('content')
        if tag == 'link' and attrs.get('rel') == 'canonical': self.canonical = attrs['href']
        if tag == 'img': self.images.append(attrs)
        if tag in ('a','link','script','img'):
            value = attrs.get('href') or attrs.get('src')
            if value: self.links.append(value)
        if tag == 'script' and attrs.get('type') == 'application/ld+json': self.schema = ''
    def handle_data(self, data):
        if self.schema is not None: self.schema += data
    def handle_endtag(self, tag):
        if tag == 'script' and self.schema is not None:
            self.schemas.append(json.loads(self.schema)); self.schema = None

pages = []
for path in sorted(ROOT.glob('*.html')):
    text = path.read_text(encoding='utf-8')
    page = Page(); page.feed(text)
    if page.meta.get('robots') == 'noindex,follow': continue
    pages.append(path)
    assert page.h1 == 1, f'{path.name}: expected one H1'
    assert page.meta.get('description'), f'{path.name}: missing description'
    assert page.canonical and page.canonical.startswith('https://thenumbersacademy.in/'), f'{path.name}: canonical'
    assert '7893125586' not in text, f'{path.name}: developer number exposed'
    assert '9866219903' in text, f'{path.name}: teacher phone missing'
    for value in page.links:
        parsed = urlparse(value)
        if parsed.scheme or parsed.netloc: continue
        if parsed.path:
            target = ROOT / unquote(parsed.path.lstrip('/'))
            assert target.exists(), f'{path.name}: missing {value}'
        if parsed.fragment and not parsed.path:
            assert parsed.fragment in page.ids, f'{path.name}: broken anchor {value}'
    for img in page.images:
        assert 'alt' in img and img.get('width') and img.get('height'), f'{path.name}: image accessibility/dimensions'
    for schema in page.schemas:
        assert schema['@context'] == 'https://schema.org'
ns={'s':'http://www.sitemaps.org/schemas/sitemap/0.9'}
sitemap=ET.parse(ROOT / 'sitemap.xml')
urls=[node.text for node in sitemap.findall('.//s:loc',ns)]
assert len(urls) == len(pages) == 10
assert len(set(urls)) == len(urls)
assert 'Sitemap: https://thenumbersacademy.in/sitemap.xml' in (ROOT/'robots.txt').read_text()
print(f'PASS: {len(pages)} pages; local links, images, headings, metadata, structured data, phone and sitemap.')
