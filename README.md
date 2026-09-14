# Experts Gate by GES — website

Static, dependency-free website for **Experts Gate by GES** (the business advisory, technology and professional-development arm of Global Experts Services).

Built from the supplied company profile deck, brand assets and the previous LEAP prototype. No build step: open `index.html` or deploy the repository root to any static host (GitHub Pages, Netlify, Cloudflare Pages, S3…).

## Structure

```
index.html            Home
capabilities.html     Three disciplines + practice areas, partners, frameworks & standards
approach.html         Failures → sequence → six-stage lifecycle → outcomes
work.html             Client renders, supporting references, clients by sector
about.html            Heritage, presence/offices, partner ecosystem, people
contact.html          Contact form + office details
assets/css/main.css   Design system (tokens, typography roles, grid, components, motion)
assets/js/main.js     Header, scroll reveals, lifecycle story, gallery strip, contact form
assets/fonts/         Self-hosted Inter (variable) and Instrument Serif
assets/img/           Optimised WebP/PNG assets (see below)
brand-source/         Original supplied PNGs (logo, headshots, partner strip, client renders)
```

## Design system (summary)

- **Colour** — navy `#070B1C` ground, gold `#C9A84C` accent, paper `#F4F5F8`; sections alternate `t-dark` / `t-paper` / `t-white` themes via CSS custom properties.
- **Type** — Instrument Serif for display and section headings; Inter (variable, `opsz`) for body, UI, labels and numerals.
- **Grid** — 12-column, max 1440px, fluid gutters. Utility classes `c-1-6`, `c-8-12`, etc. set explicit column ranges.
- **Motion** — `.reveal` / `.reveal-line` fade-and-rise on scroll; sticky lifecycle story; all motion disabled under `prefers-reduced-motion`.

## Content that still needs input

Nothing on the site is invented; where information was not supplied a visible placeholder is used.

| Item | Where | What to do |
|------|-------|-----------|
| Team roles | `about.html` → `.person .role` (`data-placeholder="team-role"`) | Replace “Role to be confirmed” with each person’s title. Two team members are both named Omar; confirm surnames. |
| Contact form endpoint | `contact.html` → `<form action="REPLACE_WITH_FORM_ENDPOINT">` | Point `action` at a form service (Formspree, Basin, Netlify Forms…) or a backend. Until then, submitting opens a pre-filled email to `info@globalges.net`. |
| Phone numbers / street addresses | `contact.html`, footer | Only `info@globalges.net`, Muharraq (HQ) and Riyadh were supplied. |
| Office cities | `about.html`, `index.html` presence lists | UAE, Jordan, UK, Turkey and Tajikistan are listed by country only. |
| Regulator acronyms | Capabilities / About | NCA, ECC, CCC, DGA, SDAIA, CST, SAMA, GAMA, PDPL are shown as supplied; expand if desired. |

## Assets

- Client building renders: `assets/img/clients/*-{600,1000,1600}.webp` (from the supplied PNGs).
- Client and partner logos: extracted from the company profile deck (`assets/img/logos`, `assets/img/partners`).
- Backgrounds: `assets/img/bg/*.webp` from the deck’s cover art.
- Headshots: `assets/img/team/*.webp`, cropped inside the original signature ring.

## Editing

Every page shares the same header and footer markup; when changing navigation, update all six HTML files (or search for `class="nav"`).
