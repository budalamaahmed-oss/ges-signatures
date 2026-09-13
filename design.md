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
- Sections are separated by generous space and at most one gold hairline, not by background-colour bands stacked one after another. One deep-navy panel per page at most.
- The page opens with type, not a full-viewport hero. Hero height fits its content.

## Signature element

**The formula.** `People × Process × Technology` set in Space Mono with the × in GES blue. It appears once in the hero lede and once near the contact call, and is the visual thread of the site. Related moves: a single gold hairline under section headings, and the wireframe globe from the logo used once, large and cropped, as a quiet line drawing rather than an icon.

## Motion

Style chosen in Step 2: **Smooth & premium** (inertia scrolling, a soft parallax on the hero, clean reveals).

- **Structural:** inertia scrolling via Lenis (`lerp` 0.09), loaded from a pinned CDN and falling back to native scroll if it fails to load. Anchor links scroll through Lenis with a 72px header offset and move focus to the target.
- **Hero (primitive 1):** a one-time load sequence, each line of the hero rising 18px and fading in over 720ms with a 60 to 400ms stagger; the hero image settles from a 1.03 scale over 1100ms. Then a soft parallax on the hero image, moving at 0.12 of scroll speed, transform only, desktop only, stopped after 1200px.
- **Reveals (primitive 2):** sections rise 22px and fade in over 700ms as they enter the viewport. The hidden state is applied by JavaScript only to sections below the fold at load, so the page is fully visible at rest without JavaScript, above the fold, and in thumbnails. Each section reveals once.
- **Polish:** hover on links and buttons (colour, 160ms, `cubic-bezier(.2,.7,.2,1)`), underline growth on nav links, a 1px lift on primary button press. `transform` and `opacity` only. Grain, custom cursor and magnetic buttons are deferred to Step 5 and must not be added before then.
- **Restraint rule:** two motion primitives per page, spent on the hero and the reveals. Nothing else animates on scroll. If removing a motion loses no information, remove it.
- `prefers-reduced-motion: reduce` disables Lenis, the load sequence, the parallax and the reveals, and collapses all transitions to 0ms.

## Components

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
