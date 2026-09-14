# Global GES — Design System

Source of truth for every later build step. Direction chosen: **Daylight Stone** (Step 1, 2026-09-13), with the display face changed from Space Mono to IBM Plex Serif at the client's request.

---

## Brand & thesis

- **Name:** Global GES (Global Experts for Solutions). Wordmark: "GES" over "GLOBAL EXPERTS SERVICES" with a wireframe globe. Logo file: `assets/logo.png`; mark only: `assets/logo-mark.png`.
- **One line:** A technology solutions and consulting company that helps organisations improve and transform through the right combination of people, processes and technology.
- **Thesis line (the hero, always first):** *Technology alone is never the answer.*
- **The formula (signature phrase):** People × Process × Technology. Written with a true multiplication sign (×, U+00D7), never the letter x.
- **Positioning:** established, capable, international, premium, enterprise-focused. A consultancy, not a software product.
- **Tone:** editorial and plain. Say the true thing in few words. Confident without hype.

## Site structure & files

Multi-page corporate site, built sequentially per the master brief: Home → About Us → Services → Solutions & Partners → Projects → Contact.

- `styles.css` holds every token and component. Pages never restate tokens. `script.js` holds all motion and interaction and degrades to a still, readable page.
- Pages: `index.html` (home), `about.html`, `services.html`, `solutions.html`, `projects.html`, `contact.html`, four case studies (`project-<slug>.html`: Eastern Health Cluster, Saudi Railway Company, Oromia Bank, Bustami & Saheb Group), `privacy.html` (draft for legal review), `404.html`. Plus `sitemap.xml`, `robots.txt`, `site.webmanifest`, favicons in `assets/icons/`, Open Graph image `assets/og-image.jpg`, certification badges in `assets/certs/`, partner marks in `assets/partners/`. Nav marks the current page with `aria-current="page"`.
- Assets: `assets/logo.png`, `assets/logo-mark.png`, `assets/hero-consulting.jpg`, `assets/clients/` (real logos), `assets/GES-Company-Profile.pdf`, `assets/image-brief.md` (prompts for images still to make).
- Homepage architecture (revised after the reference review): Hero with the enlarged intersection diagram → who-we-are strip with the three facts → People × Processes × Technology (sticky diagram) → Capabilities with the Why GES rail → Transformation lifecycle (pinned, horizontal on desktop) → Statement band (one line, navy) → Technology ecosystem (connectors draw and pulse) → Selected projects (first image bleeds to the viewport edge; cards link to case studies) → Clients marquee → Regional presence → Contact form band → Footer. Introduction and Why GES sections were removed as redundant; their content lives in the strip and the rail.
- Grounds in that order: ivory → cream strip → ivory → navy → white → stone → near-black → ivory → white → stone → navy → navy (with a gold rule between presence and CTA) → near-black footer.

## Audience & the one job

- **Audience:** decision-makers and technical leads in government organisations, enterprises, banks, telecoms, healthcare, transport and energy across the Middle East and wider region.
- **What they need from the site:** proof that GES is credible at enterprise scale (clients, partners, certifications), a clear picture of the services, and a low-friction way to start a conversation.
- **The one job:** get the visitor to **contact GES to discuss a requirement, project, partnership or solution.** Every page ends there. Secondary action: download the company profile.

## Palette (OKLCH, named roles)

All colours are OKLCH. Never pure black or pure white. Lights are tinted toward the warm daylight of the scene (hue ~90); darks are tinted toward the brand blue (hue ~250). One saturated accent only.

| Role | Token | Value | Use |
|---|---|---|---|
| Ivory | `--bg` | `oklch(96% 0.012 90)` | Page ground. Carried over from the current site paper. |
| Stone | `--surface` | `oklch(91.5% 0.015 88)` | Panels, quiet cards, table stripes. |
| Charcoal navy | `--ink` | `oklch(24% 0.04 250)` | All running text and headings. |
| Muted | `--ink-2` | `oklch(44% 0.035 250)` | Captions, labels, secondary text. Min 4.5:1 on ivory. |
| GES blue | `--accent` | `oklch(50% 0.135 256)` | The one saturated colour. Primary button, links, the × in the formula, one emphasised word per section at most. Matches the logo (sampled rgb 41 100 173). |
| Accent hover | `--accent-2` | `oklch(44% 0.135 256)` | Hover and active state of accent. |
| Deep navy | `--navy` | `oklch(22% 0.05 250)` | Dark panels and the footer. Ivory text on it. |
| Gold | `--gold` | `oklch(73% 0.072 84)` | Hairlines and rules only. Never a fill, never text. |
| Line | `--line` | `oklch(84% 0.018 90)` | Default borders and dividers. |
| Focus | `--focus` | `oklch(50% 0.135 256)` | Focus ring, 2px solid, 3px offset. |

Do: keep chroma low everywhere except `--accent`. Tint every grey. Use gold as a 1px line.
Don't: introduce a second saturated colour. Don't use the current site's brighter `#168be8` as text on ivory (fails contrast). No gradients.

## Type

- **Display:** IBM Plex Serif (Google Fonts), weight 400 for display sizes, 500 for h3 and smaller, roman only. Fallback stack: Georgia, "Times New Roman", serif. Chosen by the client over Instrument Serif. A transitional serif with a slightly technical edge, which suits a technology consultancy better than a fashion-editorial face.
- **Body:** Atkinson Hyperlegible, 400 and 700. Fallback: "Segoe UI", Arial, sans-serif.
- **Utility:** Space Mono, 400 and 700. Labels, eyebrows, numerals, metadata, the formula. Tracked caps at small sizes (`letter-spacing: .12em`).

Tokens:
```
--font-display: "IBM Plex Serif", Georgia, "Times New Roman", serif;
--font-body: "Atkinson Hyperlegible", "Segoe UI", Arial, sans-serif;
--font-mono: "Space Mono", ui-monospace, "Courier New", monospace;
```

Scale (rem, fluid where noted):
```
--text-display: clamp(2.6rem, 6.5vw, 5.2rem)   line-height 1.02  letter-spacing -.01em
--text-h2:      clamp(1.9rem, 3.4vw, 2.8rem)   line-height 1.1
--text-h3:      1.5rem                          line-height 1.2
--text-lede:    clamp(1.125rem, 1.6vw, 1.35rem) line-height 1.45
--text-body:    1.0625rem                       line-height 1.55
--text-small:   .9rem
--text-label:   .75rem (mono, caps, tracked)
```

Do: headings in the serif at 400, roman, `text-wrap: balance`. Body measure 60–68 characters. Tabular numerals in any column of figures. One serif heading per section, never stacked serif on serif.
Don't: italic headings. Bold serif. Serif for body text. Inter anywhere. Gradient text. All-caps serif.

## Layout & spacing

- 4pt scale: `--space-1: 4px` through `--space-12: 96px`, plus `--space-section: clamp(72px, 10vw, 144px)`.
- Content width 1240px max. Side gutter `clamp(16px, 4vw, 48px)` set once on `body`.
- Grid: 12 columns on desktop, asymmetric by default (7/5 or 8/4 splits), collapsing to one column under 760px. Image-bearing tracks use `minmax(0, 1fr)`.
- Section rhythm alternates ivory, stone and navy grounds so the page never reads as one colour: ivory hero, navy philosophy, stone journey, ivory capabilities, ivory proof, stone credentials, navy contact. Never two of the same ground in a row except ivory. Up to two deep-navy panels per page: the thesis moment and the contact band.
- The page opens with type, not a full-viewport hero. Hero height fits its content.

## Signature element

**The formula and the intersection diagram.** `People × Process × Technology` set in Space Mono with the × in GES blue (lifted blue on navy). Its visual form is the intersection diagram: three overlapping rings (People, Processes, Technology) with the triple intersection filled in GES blue and labelled Transformation. The diagram draws itself in the hero and drives the sticky philosophy section, where scrolling through the three chapters lights each ring in turn and the final chapter fills the core. The formula also appears in the lifecycle foot and beside the final CTA. Related moves: a single gold hairline under section headings; every image sits in a `.frame` with a 12px-inset gold hairline; the wireframe globe from the logo (`#globe` symbol in index.html) drawn large and cropped in gold hairline at low opacity on the navy panels, with a stroke-draw animation on reveal; film grain at 5% over the whole page.

## Motion

Style chosen in Step 2: **Smooth & premium** (inertia scrolling, a soft parallax on the hero, clean reveals).

- **Scroll storytelling:** the philosophy section is sticky-driven (chapters set `data-stage` 1–4 on the section, which lights rings, labels and formula words); the lifecycle sets a `--progress` custom property from its scroll position, filling a blue line along the six stages and activating each in turn. Both resolve to their complete state under reduced motion or without JavaScript.
- **Structural:** inertia scrolling via Lenis (`lerp` 0.09), loaded from a pinned CDN and falling back to native scroll if it fails to load. Anchor links scroll through Lenis with a 72px header offset and move focus to the target.
- **Hero (primitive 1):** a one-time load sequence, each line of the hero rising 18px and fading in over 720ms with a 60 to 400ms stagger; the hero image settles from a 1.03 scale over 1100ms. Then a soft parallax on the hero image, moving at 0.12 of scroll speed, transform only, desktop only, stopped after 1200px.
- **Reveals (primitive 2):** sections rise 22px and fade in over 700ms as they enter the viewport. The hidden state is applied by JavaScript only to sections below the fold at load, so the page is fully visible at rest without JavaScript, above the fold, and in thumbnails. Each section reveals once.
- **Polish (pulled forward from Step 5 at the client's request):** hover on links and buttons (colour, 180ms, `cubic-bezier(.2,.7,.2,1)`), arrow nudge on buttons, underline growth on nav links, capability rows tint to stone and reveal an arrow on hover, reference images scale 1.03 on hover, the nav compacts and gains a soft shadow after 24px of scroll, primary buttons are magnetic (6px max, fine pointers only), the hero image unveils with a clip-path wipe and settles from 1.06 scale, the globe line-draws on reveal, staggered children inside revealed sections. Film grain is a fixed SVG noise layer at 5% multiply. No custom cursor. `transform`, `opacity` and `clip-path` only.
- **Restraint rule:** two scroll-driven primitives per page (hero parallax, section reveals with their stagger and the globe draw). Everything else is hover or load. If removing a motion loses no information, remove it.
- `prefers-reduced-motion: reduce` disables Lenis, the load sequence, the parallax, the reveals, the globe draw and the magnetic buttons, and collapses all transitions to 0ms.

## Components


Reusable primitives in `styles.css` (all support more than one composition): header and nav (`.nav`, mobile menu is a full-width navy list in the serif), hero, section header (`.section-head`, `.wide` variant), statement block (`.statement`), capability row (`.cap`), project card (`.project`, editorial spans), partner identity (`.partner`, typographic, `.lead` for the exclusive partner), lifecycle (`.lifecycle` with scroll progress), technical diagram (`.diagram`, `.eco-flow`), image frame (`.frame`, `.grid` placeholder, `.unveil`), facts (`.intro-facts`, `.count`), client marquee (`.clients-marquee`: two full-bleed rows of white logo tiles drifting in opposite directions with edge fades, paused on hover, colour marks, static wrapped grid under reduced motion; `.logo-field` static grid kept for inner pages), meridian presence strip (`.meridian`, list fallback on mobile), CTA band (`.cta`), footer. Grounds: `.stone`, `.cream`, `.white`, `.on-navy`, `.on-black`.


- **Primary button:** accent fill, ivory text, 2px radius, mono label at 0.85rem. Hover to `--accent-2`. Focus ring 2px `--focus`, 3px offset, never animated. States: default, hover, focus, active, disabled (surface fill, muted text).
- **Secondary button:** no fill, 1px `--ink` border, ink text. Same states.
- **Text link:** ink text with 1px accent underline, underline thickens on hover.
- **Section heading:** mono eyebrow above (optional, only when it carries real information), serif h2 below, gold hairline under.
- **Proof strip:** client and partner logos in greyscale at reduced opacity on stone, one row, scrolling horizontally on mobile, never a carousel.
- **Service list:** numbered only if the order means something; otherwise a plain two-column list with serif titles and body descriptions.
- **Contact block:** deep navy panel, ivory text, email and a short form. This is the page's destination.
- **Footer:** navy, single row: wordmark, email, locations, copyright. No four-column link dump.

## Copy rules

- Headlines under eight words, plain claims. Sentences under twenty words.
- British spelling (organisation, programme), matching the company profile.
- Verbs on buttons: "Discuss a requirement", "Contact GES", "Download the profile". Never "Learn more", "Get started", "Submit".
- No invented numbers. Client counts, years and results only when the company supplies them.
- Name real frameworks and standards (ITIL, PMI, PRINCE2, CMMI, ISO 27001, ISO 20000-1, ISO 22301, ISO 38500, ISO 42001) and real partners (Alemba, Collibra, NAVEX, MetricStream, Lansweeper, Omnissa, Avolution, Run2Biz, Simpliix, Citsmart Central). Never generic "industry-leading".
- Say "people, process and technology" in that order, always.

## Assets plan

Every image shows the scene from the brief: a GES team with a client's leadership in a modern, warm, architectural interior. Stone, glass, soft daylight, ivory tones, a table or a large display. Architecture is the setting, never the subject.

| Asset | Look | Source |
|---|---|---|
| `assets/logo.png`, `assets/logo-mark.png` | Supplied wordmark and globe. | Client. Done. |
| Hero image (Step 3+) | Team and client around a table reviewing an architecture diagram or plan, soft daylight through glass, stone wall behind. Warm, low contrast, no screens glowing. | Reuse the existing `consulting.jpg` from the current site as a starting point; ideally reshoot or commission with the real GES team. |
| Team portraits | The existing circular headshots, re-cropped square, with the blue ring removed and a thin gold rule instead. | Client, existing files in the repo root. |
| Client and partner logos | Greyscale, equal optical weight, on stone. | Existing `assets/clients/` and `assets/partners/` folders from the current site. |
| Globe line drawing | The logo's wireframe globe as a single-colour SVG, used large and cropped once. | Trace from `logo-mark.png`. |

Avoid: the blue neon data-centre aisle from the current site, circuit boards, futuristic AI imagery, people pointing at laptops, stock handshakes.

## Conversion essentials

- "Contact GES" visible in the header at every width.
- Email address (`info@globalges.net`) in plain text in the hero and the footer.
- Contact panel near the end of every page with a short form (name, organisation, email, what to discuss) that opens a mail draft until a backend exists.
- Company profile download as the secondary action.
- Proof before the ask: clients, partners, certifications appear above the contact panel.

## One form per page (no repeated sections)

Each idea has one canonical presentation and is not repeated in the same form elsewhere:

- Intersection diagram and sticky philosophy story: homepage only. About presents the philosophy text-led (formula plus three pillars, no diagram).
- Pinned horizontal lifecycle: homepage only. About presents the approach as a vertical timeline with a question per stage. Solutions presents its six responsibilities as a numbered two-column list.
- Ecosystem flow and bordered partner tile grid: Solutions only. Homepage presents the partners as an open flow of marks with a role under each, Alemba leading, no tiles.
- Meridian presence strip: homepage only. About uses a compact five-hub row.
- Client marquee: homepage only. No testimonials section on the homepage (removed at client request); one placeholder quote remains on Projects.
- Certification badges: About credentials (large) and under the Contact form (small).

## Content still needed from GES

- Measured outcomes for the four case studies (each has a marked outcome block).
- One approved client quote with a name and title, for the Projects page.
- Approval of the privacy notice draft.
- Hosting is Hostinger shared hosting. Both forms post to `contact.php`, which sends via PHP mail() from `info@globalges.net` to `info@globalges.net` (Reply-To set to the visitor) and redirects to `contact-thanks.html`. No extra mailbox is needed; if delivery is unreliable because the domain's email is hosted outside Hostinger, switch the form to a hosted form service or SMTP.

## QA record

- **Responsive (Phase 10, 2026-09-13):** all six pages checked at 320, 375, 414, 768, 1024 and 1440px. No horizontal overflow, no element wider than the viewport outside clipped decorative panels, no two-line buttons or nav links (nav collapses to the menu below 1140px), every button, chip and menu control at least 44px tall.
- **Accessibility (Phase 11):** one h1 per page and no skipped heading levels; every image has alt and dimensions; every form control has a label; skip link and landmarks on every page; focus visible everywhere; reduced motion honoured. Contrast: all ivory-ground pairings above 8:1; navy-panel text lifted so stone text, blue text and gold text on navy or near-black all exceed 4.5:1 (`--stone-on-navy` 81%, `--accent-lift` 75%, `--gold-text` 83%; `--gold` stays for hairlines only).
- **Performance:** fonts preconnected with display swap; images are progressive JPEGs under 300KB with width and height set; below-the-fold images lazy-load; one small dependency (Lenis) with a native fallback; all motion on transform, opacity and clip-path.

## Anti-patterns

- Cream + serif + terracotta, near-black + acid accent, broadsheet hairline grids.
- Gradients, glassmorphism, gradient text, glow effects, neon blue.
- Full-viewport heroes, background video, scroll-jacking, content hidden until scrolled.
- Cards on everything, rounded-lg everywhere, icon grids with three features.
- Italic headings, bold serif, Inter body text.
- Invented statistics, "trusted by" claims without names, generic stock photography.
- Looking like a SaaS product: no dashboards, no fake UI mockups, no pricing-page rhythm.

## References

- Current site (`globalges.net`, LEAP 2026 build): keep its paper, navy and gold tokens; keep its editorial section rhythm; replace Georgia with IBM Plex Serif and Arial with Atkinson Hyperlegible.
- Company profile PDF (`assets/GES-Company-Profile.pdf`) for wording, services, partners and certifications.
- The client's ChatGPT-built site (home, about, services) supplied in Step 2: use its copy (philosophy, delivery journey, four capability groups, references, credentials, regional hubs) as the source text; do not copy its layout.
- Email: `info@globalges.net` (confirmed by the client in Step 2; the `gesglobal.net` address in the newer build is wrong).
- Nyght Serif was the reference the client first named; IBM Plex Serif was the final choice.
- Client's scene: a consulting team with a client's leadership around a table in a warm stone-and-glass interior.
