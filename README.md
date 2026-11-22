# Northern Bloom Floral & Events Website

## Project Overview

This project is a responsive website for Northern Bloom Floral & Events, a florist and event design studio in Bangor, Maine. The site introduces the studio, shows a floral gallery, explains the floral services and event packages with approved starting prices, answers common questions, and lets visitors prepare an inquiry.

It was built in stages, from semantic HTML through CSS styling, responsive design and accessibility, JavaScript interactivity, quality assurance, and client revisions. It uses plain HTML, CSS, and JavaScript with no frameworks or templates.

## Client

Northern Bloom Floral & Events (client: Sophia Bennett)

## Website Pages

- Home
- About
- Floral Services
- Events & Packages
- Contact

## Technologies Used

- HTML5
- CSS3
- JavaScript
- JSON (service information in `data/services.json`)
- Git
- GitHub
- GitHub Pages

## Website Features

- Responsive layouts for desktop, laptop, tablet, and smartphone
- Mobile navigation menu that opens and closes with a button
- Home page with the approved introduction, a floral gallery, featured floral services, and event packages
- Three service offerings (General Floral Design, Event Planning, Custom Floral Design) shown from a JSON file
- Five floral categories with starting prices, and three event packages with included services
- Approved pricing, substitution, and cancellation notices where they apply
- Service finder: visitors choose what they need and see the matching service, with a Start Over button and a helpful message when they are unsure
- Inquiry form that is clearly a demonstration: it checks the answers, then shows an editable preview
- "Prepare an Inquiry" links that open the form with the matching service already selected (the visitor can change it)
- FAQ accordion
- About page with the studio story, design approach, seasonal inspiration, collaboration process, and team
- Studio hours, phone, and email on every page

## Accessibility Features

- Semantic HTML5 structure
- Alternative text for every meaningful image
- Logical heading structure with one h1 per page
- Properly associated form labels, with required fields identified in text
- Error messages and notices that use words, not color alone
- Keyboard-accessible navigation, menu button, finder, FAQ, and form
- Visible focus states and a "Skip to main content" link
- `aria-expanded` and `aria-controls` on the menu button and FAQ buttons
- Readable text contrast
- Descriptive link and button text
- Responsive typography
- Respects the reduced-motion preference

## Live Website

https://husson-webdesign.github.io/McBride-P5-Northern-Bloom/

## Repository

https://github.com/husson-webdesign/McBride-P5-Northern-Bloom

(Confirm both links match your actual repository before submitting.)

## Project Structure

```
index.html
about.html
services.html
events.html
contact.html
css/style.css
js/script.js
data/services.json
images/
README.md
design-notes.md
```

## Phase 5 Client Revision Requests

Check each item only after it has been tested on the live website.

- [ ] 1. Homepage introduction: added the approved introduction, the kinds of occasions served, and the Bangor, Maine location.
- [ ] 2. About page: added the studio story, design approach, seasonal inspiration, how the studio works with clients, and the team. The founding date was removed until the client confirms it.
- [ ] 3. Services explained: each of the three services has a clear description and example occasions. The five floral categories are listed with starting prices.
- [ ] 4. Consistent look: the same headings, buttons, cards, spacing, and colors are used on every page.
- [ ] 5. Gallery: added a floral gallery to the home page, replaced the repeated tulip image on the About page, and documented image sources.
- [ ] 6. Clear next steps: buttons now say exactly what they do (for example, "Prepare an Inquiry About Event Planning").
- [ ] 7. Navigation: kept the logo link, the current-page highlight, and the skip link. The menu collapses into a button on smaller screens.
- [ ] 8. Phone comfort: tested text, images, cards, buttons, and form fields from 320px to 1600px.
- [ ] 9. Services shown consistently: image, name, description, example occasions, and an inquiry button on every service card.
- [ ] 10. FAQ: replaced the questions with the approved questions and answers, plus one about what to prepare before contacting the studio. Works by mouse, touch, and keyboard.
- [ ] 11. Contact information: replaced the placeholder phone number and hours with the details from the client brief and labeled them as sample information.
- [ ] 12. Inquiry form: added a demonstration notice before the form, renamed the button "Preview Inquiry," added an editable preview, and kept the service pre-selection for all three services.
- [ ] 13. Service finder: added a simple way to find a matching service, with a Start Over button and a helpful message when no option fits.
- [ ] 14. JSON service data: service information is kept in `data/services.json` and used to build the cards, the finder, and the contact form menu.
- [ ] 15. Final check: pages, links, images, buttons, keyboard use, contrast, and layouts at phone, tablet, and desktop sizes.
- [ ] 16. Handoff: this README, screenshots, image sources, questions for the client, and developer instructions.

## Updating Service Information

The three service offerings, the five floral categories, and the three event packages are stored in **`data/services.json`**. The website builds its cards from that file, so editing the file changes the site.

| Section in the file | Where it appears |
|---|---|
| `services` | Home page "Our Services", Floral Services page, service finder, contact form service menu |
| `floralCategories` | Home page "Featured Floral Services" (entries with `"featured": true`), Floral Services page |
| `packages` | Home page "Event Packages", Events & Packages page |
| `finder` | Wording used by the service finder when a visitor is not sure |

Each entry in `services` has:

- `id` - used in links such as `contact.html?service=event`. Do not change an id without updating those links.
- `name`, `summary` (short), `description` (full), `occasions` (a list)
- `needLabel` - the answer shown in the service finder
- `image` - `src`, `alt` (a useful description), `width`, `height`
- `inquiry` and `learnMore` - the button/link `label` and `href`

Each floral category has `name`, `description`, `homeSummary`, `includesLabel`, `includes`, `note`, `featured`, and `startingPrice` (a number, with no dollar sign). Each package has `name`, `description`, `includes`, `note`, and `startingPrice`.

To change something:

1. Edit `data/services.json`. Keep the quotation marks and commas exactly as they are. JSON does not allow comments or a comma after the last item.
2. To use a new image, put it in `images/` and update the `image` entry, including the `alt` text.
3. Test with a local web server (for example, the VS Code "Live Server" extension). Browsers block `fetch` when a page is opened directly from the computer, so the services appear only on a web server or on GitHub Pages.
4. Do not add prices, services, or claims the client has not approved.

The approved pricing notices are written directly in the HTML (`index.html`, `services.html`, `events.html`) so they stay visible even if the data file cannot load. If the wording changes, update it on each page. If the data file cannot load, visitors see a message with a link to the contact page.

## Details Still Needing the Client's Confirmation

1. **Founding date:** the first version of the site said the business began in 2006, but the client brief does not include a date. It was removed from the site.
2. **Contact details:** the phone number (207-555-0105) and email (sophia@northernbloom.example) come from the brief but look like sample information. They are labeled as samples. Replace them with real details before launch.
3. **Service area and address:** the brief says "Bangor, Maine" and "throughout the Bangor area." No street address, delivery area, or time zone was provided, so none is shown.
4. **Service names:** the three services (General Floral Design, Event Planning, Custom Floral Design) came from the first version and the client's feedback. The brief lists five floral categories and three packages. The site shows all of them. Please confirm this is how the client wants services described.
5. **Example occasions:** the occasions listed under each of the three services were taken from the brief's lists. Please confirm they match how the client thinks about each service.
6. **Delivery:** the brief says delivery is available and charges depend on location, order size, timing, and setup. No delivery fees, delivery area, or same-day availability were provided, so none are shown.
7. **Lead times:** the brief gives six to twelve months for weddings only. No lead time was provided for other orders.
8. **Photographs:** the images are sample photographs, not the studio's own work. Real photographs of the studio's work and events would be better, with permission confirmed.
9. **Team:** the team members are the sample staff from the brief. No photographs were provided.

## Image Sources

The photographs were supplied for this class project. Their original sources and licenses have **not** been verified, so the table below must be completed before the site is shown as final. They are presented on the site as sample images, not as the studio's own work.

| File in `images/` | Original file name | Used on | Source / license |
|---|---|---|---|
| `york-flowers.jpg` | York-Flowers.png | Home hero | To be confirmed |
| `banner-about.jpg` | bouquet-flowers-bouquet-of-flowers-emotions-9a9537-1024.jpg | About banner | To be confirmed |
| `banner-services.webp`, `service-custom.jpg` | images (5).jpg | Floral Services banner, Custom Floral Design card | To be confirmed |
| `banner-contact.webp` | images (6).jpg | Contact banner | To be confirmed |
| `portfolio-pink-rose-bouquet.jpg`, `service-general.jpg`, `banner-events.webp` | flower-bouquet-with-pink-roses-blue-thistle-mimosa-white-roses_75.jpg | Home gallery, General Floral Design card, Events banner | To be confirmed |
| `portfolio-red-white-bouquet.jpg`, `service-event.jpg` | top-view-bouquet-with-white-color-roses-red-tulips-pink-hydrangea-greenery_31.jpg | Home gallery, Event Planning card | To be confirmed |
| `portfolio-autumn-bouquet.jpg` | colorful-flowers-vase_50.jpg | Home gallery, About page | To be confirmed |

All images were resized and compressed for the web. Each has a text description for screen readers.

## Known Limitations

- The inquiry form is a front-end demonstration only. Nothing is sent, emailed, stored, or booked.
- The service cards, prices, packages, service finder, and service menu need JavaScript and a web server. If they cannot load, visitors see a message with a link to the contact page.
- The photographs are samples (see above), and the contact details and team are sample information.
- There is no online ordering, payment, map, or street address.
- The gallery is written directly in the page. It is not read from the JSON file.

## Developer Notes

- JavaScript is in `js/script.js`, divided into sections: page setup, mobile navigation, service data, inquiry form, service shortcut and description, service finder, and FAQ accordion.
- Main styling is in `css/style.css`, organized into sections, with all media queries grouped in the Responsive Styles section near the end.
- The navigation collapses into the menu button at 1100px and below, because five links need more room than four. The layout switches (cards, hero, columns) happen at 900px and 600px.
- The menu button, FAQ answers, and service data only change the page when JavaScript is running, so the pages stay readable if the script fails to load.
- GitHub Pages file paths are case-sensitive, so all file names are lowercase.
- No backend, database, or third-party library is used.
- Design decisions are in `design-notes.md`.

## Final Client Requirements Audit

Items marked `[x]` were checked against the client brief and by testing. Items marked `[ ]` need the live site, a second browser, or the client.

- [x] All approved pages are present: Home, About, Floral Services, Events & Packages, Contact.
- [x] Business name, client name, Bangor location, phone, email, and studio hours match the client brief.
- [x] The five floral categories are included, each with a description and starting price.
- [x] The three event packages (Essential, Signature, Full-Service) are included with included services and starting prices.
- [x] The approved floral and package pricing notices appear wherever prices are shown.
- [x] The approved FAQs, floral order policies, event policies, substitution notice, and cancellation guidance are included.
- [x] The event planning process (four steps) and the staff information are included.
- [x] No catering, locally grown claims, guarantees, refund terms, payment processing, or extra locations were added.
- [x] Website is responsive (checked from 320px to 1600px).
- [x] Website navigation works.
- [x] JavaScript features work: mobile menu, service finder, inquiry preview, service shortcut, FAQ, and JSON-driven services.
- [x] The inquiry form clearly states that it is a demonstration and never claims anything was sent or booked.
- [ ] Client revision requests are tested on the live website and ticked above.
- [ ] Final website is published through GitHub Pages and tested in at least two browsers.
- [ ] Image sources and licenses are confirmed.

## Final Project Status

Ready for client handoff once the unchecked live-site items above are confirmed.
