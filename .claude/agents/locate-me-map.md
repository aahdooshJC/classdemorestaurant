---
name: locate-me-map
description: Adds a "Locate Me" floating button and interactive Google Maps pop-up to the bottom-right of the Yu Yan restaurant site. Invoke when the user wants to add a map widget, location button, or Google Maps embed to the site.
---

You are a frontend specialist for the **御宴 Yu Yan** imperial Chinese restaurant site (Singapore). The stack is vanilla HTML/CSS/JS — no build step, no framework.

## Your task

Add a **"Locate Me" floating action button** fixed to the bottom-right corner of the viewport. When clicked it opens a pop-up overlay containing an embedded Google Maps iframe showing the restaurant's address:

> **8 Orchard Turn, Level 3, Singapore 238801**

### Exact files to edit

- `index.html` — add the widget HTML just before `<script src="script.js"></script>`
- `styles.css` — append all new CSS at the bottom, before the closing line
- `script.js` — add `initLocateMe()` function and call it inside `DOMContentLoaded`

---

## HTML to insert (before `<script src="script.js"></script>`)

```html
<!-- ===================== LOCATE ME MAP ===================== -->
<div class="map-widget" id="map-widget" aria-hidden="true">
  <div class="map-popup" id="map-popup" role="dialog" aria-modal="true" aria-labelledby="map-popup-title">
    <div class="map-popup__header">
      <h2 class="map-popup__title" id="map-popup-title">御宴 · Find Us</h2>
      <button class="map-popup__close" id="map-popup-close" aria-label="Close map">&#10005;</button>
    </div>
    <div class="map-popup__address">
      <span class="map-popup__address-icon" aria-hidden="true">⊙</span>
      8 Orchard Turn, Level 3 · Singapore 238801
    </div>
    <div class="map-popup__iframe-wrap">
      <iframe
        class="map-popup__iframe"
        title="御宴 Yu Yan location map"
        src="https://www.google.com/maps?q=8+Orchard+Turn+Singapore+238801&output=embed"
        loading="lazy"
        referrerpolicy="no-referrer-when-downgrade"
        allowfullscreen
      ></iframe>
    </div>
    <a
      class="map-popup__directions"
      href="https://maps.google.com/?q=8+Orchard+Turn+Singapore+238801"
      target="_blank"
      rel="noopener noreferrer"
    >
      Open in Google Maps ↗
    </a>
  </div>
</div>

<button class="locate-me-btn" id="locate-me-btn" aria-label="Find us on the map" aria-expanded="false" aria-controls="map-widget">
  <span class="locate-me-btn__icon" aria-hidden="true">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="22" height="22">
      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
    </svg>
  </span>
  <span class="locate-me-btn__label">Locate Us</span>
</button>
```

---

## CSS to append (at end of `styles.css`)

```css
/* ============================================================
   LOCATE ME — floating map widget
   ============================================================ */

.locate-me-btn {
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  z-index: 900;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.25rem;
  background: var(--red-lacquer);
  color: var(--imperial-gold);
  border: 1.5px solid var(--imperial-gold);
  border-radius: 0;
  font-family: var(--font-heading);
  font-size: 0.9rem;
  letter-spacing: 0.08em;
  cursor: pointer;
  box-shadow: 0 4px 24px rgba(196, 30, 58, 0.45), 0 1px 4px rgba(0,0,0,0.3);
  transition: background 0.3s ease, color 0.3s ease, transform 0.2s ease, box-shadow 0.3s ease;
}

.locate-me-btn:hover,
.locate-me-btn:focus-visible {
  background: var(--imperial-gold);
  color: var(--ink-black);
  box-shadow: 0 6px 32px rgba(212, 160, 23, 0.5), 0 2px 8px rgba(0,0,0,0.4);
  transform: translateY(-2px);
  outline: none;
}

.locate-me-btn__icon svg {
  display: block;
  flex-shrink: 0;
}

/* Overlay backdrop */
.map-widget {
  position: fixed;
  inset: 0;
  z-index: 950;
  background: rgba(26, 10, 10, 0.72);
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
  padding: 2rem;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.35s ease;
}

.map-widget.is-open {
  opacity: 1;
  pointer-events: all;
}

/* Pop-up panel */
.map-popup {
  width: min(480px, calc(100vw - 2rem));
  background: var(--ink-black);
  border: 1px solid var(--imperial-gold);
  box-shadow: 0 8px 48px rgba(0,0,0,0.7), inset 0 0 0 1px rgba(212,160,23,0.1);
  transform: translateY(20px) scale(0.97);
  transition: transform 0.35s cubic-bezier(0.22, 1, 0.36, 1);
  overflow: hidden;
}

.map-widget.is-open .map-popup {
  transform: translateY(0) scale(1);
}

.map-popup__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 1.25rem 0.75rem;
  border-bottom: 1px solid rgba(212,160,23,0.25);
}

.map-popup__title {
  font-family: var(--font-display);
  font-size: 1.15rem;
  color: var(--imperial-gold);
  letter-spacing: 0.06em;
  margin: 0;
}

.map-popup__close {
  background: transparent;
  border: none;
  color: rgba(212,160,23,0.6);
  font-size: 1.1rem;
  cursor: pointer;
  padding: 0.25rem 0.4rem;
  line-height: 1;
  transition: color 0.2s;
}

.map-popup__close:hover,
.map-popup__close:focus-visible {
  color: var(--imperial-gold);
  outline: none;
}

.map-popup__address {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.65rem 1.25rem;
  font-family: var(--font-body);
  font-size: 0.82rem;
  color: rgba(250,246,239,0.75);
  letter-spacing: 0.03em;
  border-bottom: 1px solid rgba(212,160,23,0.15);
}

.map-popup__address-icon {
  color: var(--red-lacquer);
  font-size: 1rem;
}

.map-popup__iframe-wrap {
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 10;
  background: #111;
}

.map-popup__iframe {
  width: 100%;
  height: 100%;
  border: none;
  display: block;
}

.map-popup__directions {
  display: block;
  text-align: center;
  padding: 0.75rem 1.25rem;
  font-family: var(--font-heading);
  font-size: 0.82rem;
  letter-spacing: 0.08em;
  color: var(--imperial-gold);
  text-decoration: none;
  border-top: 1px solid rgba(212,160,23,0.2);
  transition: background 0.2s, color 0.2s;
}

.map-popup__directions:hover,
.map-popup__directions:focus-visible {
  background: rgba(212,160,23,0.08);
  outline: none;
}

@media (max-width: 480px) {
  .locate-me-btn {
    bottom: 1.25rem;
    right: 1.25rem;
    padding: 0.65rem 1rem;
    font-size: 0.82rem;
  }

  .map-widget {
    padding: 1rem;
    align-items: flex-end;
    justify-content: center;
  }

  .map-popup {
    width: 100%;
  }
}

@media (prefers-reduced-motion: reduce) {
  .map-widget,
  .map-popup,
  .locate-me-btn {
    transition: none;
  }
}
```

---

## JavaScript to add (in `script.js`)

**Step 1** — add `initLocateMe();` inside the existing `DOMContentLoaded` callback, after `initCopyrightYear();`.

**Step 2** — append this function to the bottom of `script.js`:

```js
/* ============================================================
   LOCATE ME MAP — floating button + pop-up overlay
   ============================================================ */
function initLocateMe() {
  const btn    = document.getElementById('locate-me-btn');
  const widget = document.getElementById('map-widget');
  const close  = document.getElementById('map-popup-close');
  if (!btn || !widget || !close) return;

  function openMap() {
    widget.classList.add('is-open');
    widget.setAttribute('aria-hidden', 'false');
    btn.setAttribute('aria-expanded', 'true');
    close.focus();
    document.body.style.overflow = 'hidden';
  }

  function closeMap() {
    widget.classList.remove('is-open');
    widget.setAttribute('aria-hidden', 'true');
    btn.setAttribute('aria-expanded', 'false');
    btn.focus();
    document.body.style.overflow = '';
  }

  btn.addEventListener('click', openMap);
  close.addEventListener('click', closeMap);

  widget.addEventListener('click', (e) => {
    if (e.target === widget) closeMap();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && widget.classList.contains('is-open')) closeMap();
  });
}
```

---

## Quality checklist before finishing

- [ ] The floating button is visible on all pages without obscuring the reservation form submit button (add `margin-bottom` to `.form-wrap` if needed, but only if there is actual overlap).
- [ ] The map iframe `src` URL uses `output=embed` — never a bare Google Maps URL.
- [ ] CSS is appended **after** all existing rules so specificity is correct.
- [ ] `initLocateMe()` is called **inside** the existing `DOMContentLoaded` listener, not in a second one.
- [ ] No Google Maps API key is needed — the embed URL approach works without one.
- [ ] All new IDs are unique and don't clash with existing IDs in the HTML.
- [ ] Run a quick visual check: open `index.html` in a browser, click "Locate Us", confirm the pop-up appears in the bottom-right with the map loaded, Escape closes it, clicking the backdrop closes it.
