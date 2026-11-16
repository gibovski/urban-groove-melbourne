# Urban Groove — Melbourne

Buildless static showcase using the genuine Urban Groove artwork and three owner-approved band photographs. Independent production; band endorsement and future lineup are not implied. Public deployment was explicitly requested by the project owner.

Live: https://gibovski.github.io/urban-groove-melbourne/

## Update

- Edit content in `index.html`, styles in `style.css`, behavior in `app.js`.
- Edit `assets/songs.json` for repertoire; preserve song/artist pairing and source attribution. `set` must be `Party set` or `Chilled set`.
- Check agency quote routes before changing booking links. No email or availability is invented.
- Media provenance, research and approved image provenance: [docs/sources.html](docs/sources.html).
- Update absolute canonical, OG, JSON-LD, robots and sitemap URLs if the repository is renamed.
- No analytics, backend, form storage, web fonts or third-party JavaScript. YouTube loads only on click; external platforms have their own privacy policies.

## Run and check

Requires Node 22 and Python 3. `npm ci`; `node node_modules/playwright/cli.js install --with-deps chromium`; `npm test`. Preview: `npm run serve`, then http://localhost:4173.

Tests cover 320/375/390/768/1440 widths, no horizontal overflow, hero/CTA visibility, axe WCAG A/AA checks, menu/Escape, skip link, repertoire search/filter/expansion, consent-gated video URL construction and reduced motion. Video requests are mocked in interaction tests; real IDs/uploader metadata were separately verified via YouTube oEmbed. Automated accessibility is not a substitute for human assistive-technology testing.

Push to main runs tests, packages only static public files, then publishes via GitHub Pages Actions. GitHub Pages settings must use Actions. Screenshots appear locally in ignored `test-results/`; release verification evidence is in `docs/verification.md`.

The project owner authorised the three specified photographs; exact gallery sources and image transformations are documented. No general third-party photography licence is claimed. No testimonials, prices, availability or direct contact details are invented. This project does not touch Radio Remedy.
