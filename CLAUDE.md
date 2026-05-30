# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Running the site

Open `index.html` directly in a browser — no build step, no server required. All three files are standalone:

- `index.html` — all markup and content
- `styles.css` — all styling (linked via `<link>`)
- `script.js` — all interactivity (loaded at end of `<body>`)

For a local dev server with live reload you can use any static file server, e.g.:
```
npx serve .
# or
python3 -m http.server 8080
```

## Architecture

Single-page site for **Maison Lumière**, an upscale French restaurant. No frameworks, no dependencies beyond Google Fonts (loaded via CDN `<link>`).

### CSS (`styles.css`)
All design tokens are CSS custom properties on `:root` — colours, fonts, spacing, and effects are all defined there. The file is organised in order: reset → utilities → header/nav → hero → menu → testimonials → reservations → footer → animations → media queries. Breakpoints are mobile-first: `480px`, `768px`, `1024px`, `1280px`.

### JavaScript (`script.js`)
Six self-contained init functions called from a single `DOMContentLoaded` listener:

| Function | Responsibility |
|---|---|
| `initNavScroll()` | rAF-throttled scroll listener; toggles `.site-header--scrolled` at 80 px |
| `initHamburger()` | Mobile nav toggle; manages `aria-expanded`, body scroll lock, Escape-to-close |
| `initFadeIn()` | `IntersectionObserver` on every `.fade-in` element; adds `.is-visible` once on entry |
| `initCarousel()` | Testimonials auto-carousel (5 s interval); prev/next/dot controls; pauses on hover/focus |
| `initForm()` | Client-side validation, inline error display, success message with interpolated values, 10 s auto-reset |
| `initCopyrightYear()` | Writes current year into `#copyright-year` |

### Scroll animations
CSS defines `.fade-in` as invisible + translated; JS adds `.is-visible` via `IntersectionObserver`. A `prefers-reduced-motion` media query in CSS disables the transition entirely — do not add motion in JS.

### Form validation
`initForm()` validates on submit (not on blur). Each field has a paired `<span class="form__error" id="{field}-error">` in the HTML. Errors are shown by calling `showError(inputId, errorId, message)` and cleared by `clearError()`. User input is passed through `escapeHtml()` before being written into `innerHTML` in the success message.

### Images
All food/hero photos are Unsplash direct URLs (`https://images.unsplash.com/photo-{ID}?w=800&q=80`). The hero uses `w=1600&q=85`. All `<img>` tags below the fold use `loading="lazy"`.
