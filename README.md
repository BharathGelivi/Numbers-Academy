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

The WhatsApp enquiry form opens a prefilled message to the teacher; the visitor must tap Send. The separate `academy-callback` form stores adult callback requests using Netlify Forms. Form detection must be enabled before deploying. It includes a honeypot, required contact consent and campaign labels. Failed submissions retain entered values. The success page is excluded from the sitemap and marked noindex.

The parent landing page is `free-abacus-session.html`; adult teacher-training enquiries use `teacher-training.html`. Callback enquiries are visible in the existing Netlify project's Forms dashboard. Configure submission notifications there if the teacher wants email alerts. No advertising campaign or outreach message is automatically launched. Ready-to-share drafts are in `outreach-messages.md`.

The operational target for 2–8 October 2026 is two genuine completed enquiry conversations. Form submissions and Call/WhatsApp clicks are not completed calls. The teacher must answer inbound calls and follow up on saved requests. Use Netlify's submitted source/campaign fields plus a simple internal call log to distinguish child-course enquiries from adult training enquiries. Paid ads are excluded from this plan.

Family feedback links directly to WhatsApp. No sample testimonials or unverified ratings are published. The legacy comments-app is retained locally but is not part of the static production release.

## Search visibility after publishing

- Submit https://thenumbersacademy.in/sitemap.xml in the domain's Google Search Console and request indexing of the home, Hyderabad and online abacus pages.
- Claim or update the academy's Google Business Profile with the same teacher phone, address and website. Add genuine classroom photos and keep opening hours accurate.
- Ask families for honest reviews and keep course details, fees and batch availability current.
- The site includes unique titles/descriptions, canonical URLs, social previews, business/course JSON-LD, crawlable internal links, image alt text and a sitemap. Rankings depend on many factors and are not guaranteed. FAQ content is included for visitors; no FAQ rich-result promise is made.

The hero is an AI-generated conceptual learning illustration. Existing course photographs have optimized WebP copies in `assets/images/`.
