# Phase 4 QA Report - Northern Bloom Floral & Events

## Method
Automated checks were run in headless Chromium against the local site files
(file paths, links, headings, alt text, console, overflow, contrast, keyboard
order), followed by visual review of screenshots. The CSS was reorganized and
then compared with the original: computed styles of every element were
identical on all four pages at ten widths and in the menu-open, FAQ-open,
form-error, and form-success states.

## Results

| Area | Check | Result |
|---|---|---|
| Links | Every internal link and asset path resolves to an existing file, exact case | Pass |
| Links | No bare `#` links, no missing anchors | Pass |
| Images | All images load, have alt text and width/height | Pass |
| Images | `York-Flowers.png` was really a WebP file with a .png name and an uppercase filename | Fixed: now `york-flowers.jpg` |
| Images | Hero image 346 KB; About banner 355 KB | Fixed: see sizes below |
| Layout | No horizontal scrolling on any page, 320px to 1600px in 20px steps | Pass |
| Layout | Header items never overlap at any width from 320px to 1600px | Pass |
| Console | No errors, warnings, or failed requests on any page | Pass |
| Console | Pages had no favicon (browsers request /favicon.ico and log a 404 on GitHub Pages) | Fixed: inline icon added |
| SEO | Unique title and unique meta description on every page, one h1 per page | Pass (descriptions rewritten) |
| Headings | No skipped heading levels on any page | Pass |
| Contrast | All text meets 4.5:1 (3:1 for large text), including form error states | Pass |
| Keyboard | Every interactive element is reachable by Tab, in on-screen order, with a visible focus ring | Pass |
| Usability | Phone numbers were plain text | Fixed: now tappable `tel:` links |
| Spacing | Contact page "Our details" card had about 3.5rem of empty space between its heading and first item | Fixed |
| Code | CSS reorganized into logical sections with one Responsive Styles section | Done |
| Code | `toLocaleDateString("en-CA")` is not reliable in every browser | Fixed: date built by hand |
| Code | No `console.log`, `alert`, inline handlers, or leftover test styles | Pass |

Note: the date field in Chrome has several Tab stops (month, day, year, and the
calendar button). The calendar button uses the browser's own focus ring.

## Open items for the developer and client (not changed, because they are client information)
1. Operating hours read "Woden's day to Thunor's day at 23:70 JST". 23:70 is not a valid time. Confirm the exact wording with the client brief.
2. The email address is ForalBloomUSA@gmail.com while the business is Northern Bloom. Confirm it is correct.
3. The Services page repeats "The first / second / third service we offer". Consider rewording with the client's approval.
4. The Services and Contact banner photos are small (516px and 551px wide), so they look slightly soft on wide screens. Larger versions would fix this.
5. If the client brief calls for event packages or a photo gallery, those are not on the site yet.

## Still to do on the live site
- Run Lighthouse on the live homepage (Chrome DevTools > Lighthouse) and screenshot it.
- Open the live site in a second browser (Firefox, Edge, or Safari).
- Take the desktop, mobile, Lighthouse, and console screenshots.
