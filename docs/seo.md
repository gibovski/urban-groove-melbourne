# SEO audit and maintenance — 16 November 2026

## Before changes

Live homepage returned HTTP 200 over HTTPS. Repository was clean and matched origin/main. Canonical already correctly used https://gibovski.github.io/urban-groove-melbourne/. Existing strengths: one H1, basic title/description/OG/MusicGroup, real social card, descriptive photo alt text, responsive WebP with dimensions, lazy below-fold photos, system fonts, deferred JavaScript, click-to-load YouTube, accessible skip link and reduced motion.

Gaps: all 130 songs required a JSON fetch and JS; only 12 initially appeared. H1 and service/repertoire headings were vague. Navigation lacked an events link; home anchors used empty fragments. Credits lacked description/canonical and sitemap inclusion. Twitter had only a card type; OG lacked locale/site name/dimensions. MusicGroup lacked a stable entity ID, descriptive summary and service area.

## Implemented

Static, source-attributed song rows are generated from assets/songs.json; JS progressively adds the existing search/filter/pagination. Run `npm run build` after editing that JSON; `npm test` rejects stale HTML. No separate duplicate song page. Factual service headings, internal links, descriptive metadata on both HTML pages, full OG/Twitter card metadata, correct 1200×600 image dimensions, stable MusicGroup ID and Melbourne service area. Existing real photography, alt text, fast media and consent-gated videos retained. No ratings, reviews, FAQ/Event/LocalBusiness/offer schema, unsupported prices or availability.

Sources rechecked through public search on 16 November 2026:
- https://www.crowdpleaser.com.au/Urban-Groove — Melbourne trio, rock/pop, weddings, private/corporate events, pubs/parties, acoustic formats and equipment. Copy is independently written; package inclusions require confirmation.
- https://www.entertainoz.com.au/bands-musicians/cover-bands/urban-groove — existing repertoire and band profile; existing provenance is in sources.html.
- https://events.humanitix.com/urban-groove-live-cyan-dj-jps?hxchl=hex-pfl — corroborates names/instruments; no future lineup guarantee.
- https://schema.org/MusicGroup — MusicGroup inherits Organization; areaServed accepts Place (City). JSON syntax, expected types and visible-copy consistency checked; no Google rich-result eligibility implied. No external validator certification claimed.

## Crawl files and owner steps

sitemap.xml lists the two canonical HTML URLs, with the project prefix. robots.txt is provided with an absolute sitemap URL. **Only host-root `/robots.txt` is authoritative**, not `/urban-groove-melbourne/robots.txt`. Host-root returned 404 during audit; missing robots does not block crawling. This repository cannot install the host-root file. See https://developers.google.com/search/docs/crawling-indexing/robots/intro . Submit the absolute project sitemap directly in Search Console.

Account/property owner must verify a Search Console URL-prefix property for the current live URL, submit sitemap.xml, inspect both URLs and monitor indexing and real-user Core Web Vitals. No account verification, DNS edits or tracking performed. Automated layout/axe checks and lab measurements do not establish field CWV or rankings.

## Custom domain migration checklist (owner-authorized future work)

1. Obtain/verify the domain and configure GitHub Pages custom domain and HTTPS only with explicit authorization; this pass changes no DNS or CNAME.
2. Choose one canonical HTTPS origin, e.g. `https://www.example.com/`. A project Pages custom domain normally serves this project at `/`, without `/urban-groove-melbourne/`. Confirm actual routes before changing URLs.
3. Replace every production base `https://gibovski.github.io/urban-groove-melbourne/` in index.html (canonical, og:url, og:image, twitter:image, JSON-LD @id/url/image/logo), docs/sources.html canonical, sitemap.xml locs, robots.txt Sitemap, tests/seo.spec.js base and README live link. Retain `#musicgroup` on the entity ID. Relative asset and internal links continue to work from the new root. Update documentation examples/evidence separately; do not treat old verification evidence as current.
4. Keep exactly one self-canonical per page. Set both sitemap entries to new HTTPS routes. Publish robots.txt at the new host root, with `Sitemap: https://www.example.com/sitemap.xml`. Ensure deployment artifact includes CNAME if Pages configuration requires it.
5. Run build/tests; check new homepage, credits, assets, social image, robots and sitemap return 200. Verify old Pages URLs redirect to equivalent new routes and avoid chains/loops. Check canonical/OG/schema all agree; re-scrape social previews if cached.
6. Owner verifies new Search Console property (DNS verification for a Domain property), submits new sitemap and uses migration tools where applicable. Monitor old/new indexing and field CWV. Keep old redirects; do not leave a second indexable copy.

## Verification before deployment

- `python3 /var/lib/bazworker/workspace/scripts/bootstrap-dev-tools.py`: baseline tools available.
- `git diff --check`: passed. `xml.etree.ElementTree.parse('sitemap.xml')`: passed.
- `LD_LIBRARY_PATH=/var/lib/bazworker/.local/lib/bazfit-browser/usr/lib/x86_64-linux-gnu npm test`: 9 passed, including 320/375/390/768/1440 layouts, axe WCAG A/AA, interactions, no-JS 130-song/navigation availability, metadata, JSON-LD assertions, sitemap and local links. Initial plain npm test could not launch Chromium due to missing libatk; reusing existing user-local shared libraries resolved it without system changes. CI installs browser dependencies explicitly.

## Live lab follow-up

First live Lighthouse mobile/simulated-throttling run after deployment: performance 81, accessibility 100, SEO 100; FCP 1.1 s, LCP 1.9 s, TBT 770 ms, CLS 0. These are a single lab run, not field CWV; INP was not measured. It identified oversized logo/wordmark delivery and a non-scored visible-label mismatch on video buttons. Follow-up adds responsive 640px logo / 420px wordmark variants, corrects hero logo intrinsic ratio to the actual 1200×600, and aligns video button names with visible labels. GitHub Pages' 600-second cache policy cannot be configured here. Full Chrome failed due to absent libcups; Lighthouse ran successfully with Playwright's headless shell and user-local libraries.

Second live mobile Lighthouse run after responsive image deployment: performance 93, accessibility 100, SEO 100; LCP 1.5 s, TBT 310 ms, CLS 0. Lab results vary and do not measure field INP. A non-scored label check still objected to the order of video button text; the final follow-up uses the visible song title and play caption directly as the accessible name rather than overriding them. Final local suite: 9 passed (24.3 s).
