# Verification — authentic branding update, 16 November 2026

- Inspected EntertainOz HTML and all three full-size gallery assets visually. Identified the band logo separately from the agency navigation logo.
- Inspected the CrowdPleaser gallery contact sheet and full-size IMG_1805.jpeg. Matched all three owner-specified photographs; exact source URLs are in media-sources.json. No uploaded attachment files were assumed to exist on the VM.
- Encoded photographs as WebP with 480px responsive variants, explicit dimensions, descriptive alt text and lazy loading below the fold. Three full-size photos total approximately 206 KiB. Preserved the stage photo watermark.
- Replaced original vinyl/decorative identity, colours, typography treatment, header/footer marks, favicon, app icon and social metadata with authentic band artwork and its gold/turquoise/charcoal theme. Wordmark and icon are crops of the original asset; no generated replacement logo.
- `python3 /var/lib/bazworker/workspace/scripts/bootstrap-dev-tools.py`: baseline tools verified.
- Initial `npm test` could not launch Chromium because the VM lacked shared-library search configuration. Reused existing user-scope browser libraries without system changes.
- `LD_LIBRARY_PATH=/var/lib/bazworker/.local/lib/bazfit-browser/usr/lib/x86_64-linux-gnu npm test`: **7 passed**. Covers 320/375/390/768/1440px, no horizontal overflow, visible hero CTA, zero axe WCAG A/AA violations in tested initial states, menu/Escape, skip link, song search/filter/expansion, click-to-load video embed URLs, reduced motion, genuine logo path and all three photographs loading.
- Visually reviewed mobile 390px and desktop 1440px screenshots. `git diff --check` passed.
- Video requests are mocked in interaction tests. Existing video IDs and booking destinations are preserved; actual audiovisual playback can depend on YouTube policies and region. Automated accessibility checks do not certify every assistive technology combination.
- Push to main triggers the repository's test-and-deploy GitHub Pages workflow. Live deployment verification is reported with the delivered commit.
