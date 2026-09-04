# Vegas Haul Co. — one-page site (layout preview)

Static one-pager for a Las Vegas dump-trailer rental / junk removal / demolition
business. Plain HTML + CSS + a little vanilla JS. No build step, no framework,
no dependencies.

**This is a layout preview.** Business name, phone number, copy and imagery are
placeholders to be replaced with the real details.

- `index.html` — the whole page
- `assets/styles.css` — all styling
- `assets/app.js` — year stamp, scroll reveals, contact-form handling
- `assets/hero-vegas.jpg` — placeholder hero photo, “Night in Las Vegas” by
  Michael Rehfeldt, CC BY 2.0 (via Wikimedia Commons). Credited in the footer;
  both the photo and the credit go away once the client's own photos land.

The trailer in the hero is an SVG illustration, not a photo — it is a stand-in
for a photograph of the client's actual trailer.

The contact form is in demo mode: `ENDPOINT` in `assets/app.js` is `null`, so
nothing is sent. Pointing it at a form handler (Web3Forms / Netlify Forms) makes
it live without any other change.
