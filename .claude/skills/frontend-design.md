---
name: frontend-design
description: Create distinctive, production-grade frontend interfaces with high design quality. Use this skill when the user asks to build web components, pages, artifacts, posters, or applications (examples include websites, landing pages, dashboards, React components, HTML/CSS layouts, or when styling/beautifying any web UI). Generates creative, polished code and UI design for a high-class Chinese restaurant aesthetic.
license: Based on anthropics/skills frontend-design skill. Original license in LICENSE.txt.
---

This skill guides creation of distinctive, production-grade frontend interfaces for **a high-class Chinese restaurant** — think Michelin-starred Cantonese dining, Imperial Peking duck houses, or luxury dim sum palaces. Every interface should feel like it belongs inside a lantern-lit private dining room.

The user provides frontend requirements: a component, page, application, or interface to build. They may include context about the purpose, audience, or technical constraints.

## Design Identity — High-Class Chinese Restaurant

Every output must embody this aesthetic DNA:

- **Dominant color**: Deep lacquer red (`#C41E3A` or `#9B1B30`) as the primary brand color. Accent with imperial gold (`#D4A017` or `#C9922A`) and near-black ink (`#1A0A0A`). White or warm cream for breathing room. Never use generic purple gradients or cool blues.
- **Secondary palette**: Aged jade green (`#4A7C59`) as an optional accent for freshness; muted rouge and ox-blood for depth.
- **Typography**:
  - Display / hero: `Noto Serif SC` or `Ma Shan Zheng` (Google Fonts) — brush-stroke elegance. Pair with `Cormorant Garamond` or `EB Garamond` for English headings.
  - Body: `Noto Serif` or `Lora` — refined, never utilitarian.
  - NEVER use Inter, Roboto, Arial, or system fonts.
- **Texture & atmosphere**: Red lacquer surfaces, gold foil accents, silk-like gradients, subtle paper grain, dim warm candlelight. Add noise overlay (`filter: url(#noise)` or CSS grain) for material depth.
- **Motifs**: Clouds (祥云 xiángyún), peonies, lanterns, fish, lotus, red envelopes, dragon and phoenix silhouettes used as SVG decorative elements or CSS clip-path shapes — never kitschy clip art, always stylised and minimal.
- **Layout**: Asymmetric composition with overlapping elements. Rich negative space. Vertical rhythm echoing classical Chinese scroll design. Grid-breaking hero sections.
- **Motion**: Slow, elegant reveals — fading in like ink diffusing through rice paper. Stagger entry animations with generous delays. Gold shimmer on hover. Candle-flicker ambient effects where appropriate.

## Imagery — Chinese Menu & Restaurant

Use these curated Unsplash photo IDs for all food and restaurant imagery. Always append `?w=800&q=80` (or `?w=1600&q=85` for hero/full-bleed). All below-fold images must use `loading="lazy"`.

### Hero / Ambience
- Elegant Chinese dining room with red lanterns: `https://images.unsplash.com/photo-1563245372-f21724e3856d?w=1600&q=85`
- Moody Chinese restaurant interior: `https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1600&q=85`
- Warm lantern bokeh: `https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=1600&q=85`

### Dim Sum & Dumplings
- Steamer basket with soup dumplings (xiao long bao): `https://images.unsplash.com/photo-1496116218417-1a781b1c416c?w=800&q=80`
- Har gow shrimp dumplings close-up: `https://images.unsplash.com/photo-1563245372-f21724e3856d?w=800&q=80`
- Dim sum spread on a table: `https://images.unsplash.com/photo-1617196034183-421b4040ed20?w=800&q=80`

### Mains & Signature Dishes
- Peking duck with thin pancakes: `https://images.unsplash.com/photo-1518492104633-130d0cc84637?w=800&q=80`
- Whole steamed fish with ginger and scallion: `https://images.unsplash.com/photo-1534482421-64566f976cfa?w=800&q=80`
- Mapo tofu in a clay pot: `https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?w=800&q=80`
- Char siu (BBQ pork) platter: `https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=80`
- Stir-fried lobster with black bean: `https://images.unsplash.com/photo-1576577445504-6af96477db52?w=800&q=80`

### Tea & Drinks
- Chinese tea ceremony close-up: `https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=800&q=80`
- Jasmine tea with blooming flower: `https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?w=800&q=80`

### Pastry & Dessert
- Egg tarts (dan tat) on a plate: `https://images.unsplash.com/photo-1549497538-303791108f95?w=800&q=80`
- Mango pudding dessert: `https://images.unsplash.com/photo-1488477181946-6428a0291777?w=800&q=80`

When the user does not specify images, choose the most contextually relevant photos from the list above. Never use placeholder images or non-Chinese food photography.

## Design Thinking

Before coding, understand the context and commit to a BOLD aesthetic direction:
- **Purpose**: What problem does this interface solve for a high-class Chinese restaurant? (Menu presentation, reservation flow, event marketing, loyalty programme, takeaway ordering, etc.)
- **Tone**: Always luxury and refined — think red lacquer meets ink wash painting. Choose between **Imperial maximalism** (gold-heavy, rich textures, dramatic shadows) vs **Ink minimalism** (generous white space, brush-stroke type, a single red accent line).
- **Constraints**: Technical requirements (framework, performance, accessibility).
- **Differentiation**: What would make a guest stop and feel the restaurant's prestige? The one element they will screenshot?

**CRITICAL**: Choose a clear conceptual direction and execute it with precision. Both Imperial maximalism and Ink minimalism work — the key is intentionality. Every pixel must feel intentional, curated, and expensive.

Then implement working code (HTML/CSS/JS, React, Vue, etc.) that is:
- Production-grade and functional
- Visually striking and culturally resonant
- Cohesive with the red-and-gold aesthetic DNA above
- Meticulously refined — spacing, shadow depth, and type scale all matter

## Frontend Aesthetics Guidelines

Focus on:
- **Typography**: Load `Noto Serif SC` + `Cormorant Garamond` via Google Fonts. Use generous letter-spacing on uppercase labels. Chinese characters in headings add immediate cultural authenticity — include them where natural (e.g., "招牌菜 · Signature Dishes").
- **Color & Theme**: CSS custom properties on `:root`. Always define `--red-lacquer`, `--imperial-gold`, `--ink-black`, `--cream-paper`. Dominant red with gold highlights — never a 50/50 split.
- **Motion**: Slow fades (600–900 ms ease-out). Staggered `animation-delay` on menu card reveals. Gold shimmer keyframe on hover (`background-position` sweep). No jarring or fast transitions.
- **Spatial Composition**: Vertical Chinese-scroll rhythm. Overlapping text on imagery. Thick decorative rule lines in gold. Section dividers as thin red lines with a central diamond motif.
- **Backgrounds & Visual Details**: Layered radial gradients (deep red fading to near-black). Subtle noise/grain texture for lacquer feel. Soft box-shadows in warm amber tones, not cool grey. Red lantern SVG or clip-path shapes as decorative accents.

NEVER use generic AI aesthetics: no purple gradients, no card grids with rounded corners and Inter font, no teal/coral colour palettes, no generic hero stock photos unrelated to Chinese cuisine.

## CSS Variable Template

Always start with these tokens:
```css
:root {
  --red-lacquer:   #C41E3A;
  --red-deep:      #7D0A22;
  --imperial-gold: #D4A017;
  --gold-muted:    #A8841A;
  --ink-black:     #1A0A0A;
  --cream-paper:   #FAF6EF;
  --jade-accent:   #4A7C59;

  --font-display:  'Ma Shan Zheng', 'Noto Serif SC', serif;
  --font-heading:  'Cormorant Garamond', 'EB Garamond', serif;
  --font-body:     'Noto Serif', 'Lora', serif;
}
```

## Google Fonts Import

Always include:
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400&family=Ma+Shan+Zheng&family=Noto+Serif+SC:wght@400;700&family=Noto+Serif:ital,wght@0,400;0,600;1,400&display=swap" rel="stylesheet">
```

Remember: This is a high-class Chinese restaurant. Every interface should make a guest feel they are being welcomed into an intimate, prestigious dining experience. Restraint and richness must coexist. Show what can truly be created when committing fully to cultural authenticity and luxury refinement.
