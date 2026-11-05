# Northern Bloom Floral & Events

Client website for a floral design and event planning business.
Built with plain HTML, CSS, and JavaScript (no frameworks or libraries).

## Project structure

```
index.html  about.html  services.html  contact.html
css/style.css
js/script.js
images/york-flowers.jpg
```

## Phase 3 interactive features

- **Mobile navigation:** a Menu button opens and closes the navigation on
  tablets and phones. It updates `aria-expanded`, and Escape closes it.
- **Contact form validation:** checks name, email, phone (optional), service,
  event date (optional), and message. Messages appear under each field, and
  invalid submissions are stopped. A valid form shows a success message.
  This is a front-end demonstration only. Nothing is sent to a server.
- **Services shortcut:** "Request ..." links on the Services page open the
  contact form with that service already selected, and the form shows a short
  description of the chosen service.
- **FAQ accordion:** on the Services page, using real buttons with
  `aria-expanded` and `aria-controls`.

All of it works without a mouse, and the site still works if JavaScript fails.

## Phase 4 Client Requirements Audit

Check each item against the original client brief before submitting.
Items marked `[x]` were verified by testing the pages. Items marked `[ ]`
depend on the client brief and need to be confirmed and ticked by the developer.

- [x] All pages in the site structure are included: Home, About, Services, Contact.
- [ ] Every page the client brief requires is included (confirm against the brief).
- [ ] Business name, phone number, email address, and hours match the client brief exactly.
- [ ] Required services are included and worded as approved.
- [ ] Required policies, FAQs, packages, and prices are included where the brief asks for them.
- [x] No new prices, services, policies, or testimonials were invented.
- [x] Website navigation works (header, footer, buttons, and call-to-action links).
- [x] Website is responsive (checked from 320px to 1800px).
- [x] JavaScript features work: mobile menu, form validation, service shortcut, FAQ accordion.
- [x] The form validation message states that nothing is actually sent (demonstration only).
- [ ] Website has been tested through GitHub Pages (live URL).
- [ ] Website has been tested in at least two browsers.

See `QA-REPORT.md` for the detailed testing log.
