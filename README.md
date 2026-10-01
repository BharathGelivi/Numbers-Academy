# The Numbers Academy

Lightweight, responsive static site for abacus classes in Hyderabad and online.

## Update and preview

Edit `site-config.json` for the domain and teacher contact details. Edit page content in `tools/build_site.py`, shared styling in `assets/site.css`, and interactions in `assets/site.js`.

```sh
python tools/build_site.py
python tools/check_site.py
node --check assets/site.js
python -m http.server 8080 --bind 127.0.0.1
```

Open http://127.0.0.1:8080. Generated HTML is committed and requires no build service or runtime dependencies to publish.

## Deployment

Publish the root static HTML pages, `assets/` (excluding `learning-hero-source.png`), `robots.txt`, `sitemap.xml`, `_headers`, and `_redirects` to the existing hosting project. Canonical URLs target https://thenumbersacademy.in. Netlify recognizes the redirects and cache headers automatically. Keep deployment connected to the existing project so the domain and TLS settings remain intact.

The enquiry form opens a prefilled WhatsApp message to the teacher; the visitor must tap Send. There is no email delivery service or enquiry database.

Family feedback links directly to WhatsApp. No sample testimonials or unverified ratings are published. The legacy comments-app is retained locally but is not part of the static production release.

## Search visibility after publishing

- Submit https://thenumbersacademy.in/sitemap.xml in the domain's Google Search Console and request indexing of the home, Hyderabad and online abacus pages.
- Claim or update the academy's Google Business Profile with the same teacher phone, address and website. Add genuine classroom photos and keep opening hours accurate.
- Ask families for honest reviews and keep course details, fees and batch availability current.
- The site includes unique titles/descriptions, canonical URLs, social previews, business/course JSON-LD, crawlable internal links, image alt text and a sitemap. Rankings depend on many factors and are not guaranteed. FAQ content is included for visitors; no FAQ rich-result promise is made.

The hero is an AI-generated conceptual learning illustration. Existing course photographs have optimized WebP copies in `assets/images/`.
