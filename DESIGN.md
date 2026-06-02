# Geniestudio — Style Reference
> White canvas, friendly illustrations.

**Theme:** light

Geniestudio presents a friendly, open design language against a bright, airy backdrop. Softly rounded elements and a distinctive dark button color punctuate a largely monochromatic interface. The design uses gradients sparingly for visual flair, primarily on illustration assets, maintaining a neat and approachable aesthetic. Typography feels modern and clean, with nuanced letter spacing creating a premium yet comfortable reading experience. Overall, the system feels inviting and lightweight, focusing on clarity and ease of use.

## Tokens — Colors

| Name | Value | Token | Role |
|------|-------|-------|------|
| Midnight Ink | `#181d27` | `--color-midnight-ink` | Primary action buttons, prominent interactive elements — a deep, near-black that grounds interactive components |
| Arctic Mist | `#fafdff` | `--color-arctic-mist` | Card backgrounds, secondary container surfaces — a subtle off-white providing depth on the canvas |
| Canvas White | `#ffffff` | `--color-canvas-white` | Main page background, default text color for dark buttons, subtle borders |
| Obsidian | `#0a0d12` | `--color-obsidian` | Primary headings and prominent text — a rich, dark tone for high contrast |
| Silver Pine | `#535862` | `--color-silver-pine` | Secondary text, muted links, detailed descriptions and iconography |
| Ash Gray | `#93979f` | `--color-ash-gray` | Muted text, form placeholders, minor divider lines, inactive states |
| Sky Wash | `#ebf5ff` | `--color-sky-wash` | Base canvas background, light decorative fills — provides a soft, cool tint to the overall page |
| Ghostly Blue | `#cce7ff` | `--color-ghostly-blue` | Light background fills for secondary cards and decorative elements |
| Electric Blue | `#0069e0` | `--color-electric-blue` | Accent borders, infographic elements, decorative strokes — a vibrant hue often used in illustrations |
| Lavender Mist | `#f1e6ff` | `--color-lavender-mist` | Background for accent cards, soft decorative fills |
| Mint Glaze | `#d3f6e3` | `--color-mint-glaze` | Background for accent cards, soft decorative fills |
| Sunburst Yellow | `#bb9915` | `--color-sunburst-yellow` | Decorative highlights, infographic elements, specific accent text/icons |
| Deep Violet | `#9552e0` | `--color-deep-violet` | Decorative highlights, infographic elements, specific accent text/icons |
| Ocean Spray | `#4fbeff` | `--color-ocean-spray` | Decorative highlights, infographic elements, specific accent text/icons |
| Zesty Orange | `#f26110` | `--color-zesty-orange` | Decorative highlights, infographic elements, specific accent text/icons |
| Luminous Blue | `#0099ff` | `--color-luminous-blue` | Blue outline accent for tags, dividers, and focused UI edges. Do not promote it to the primary CTA color |
| Whisper Fade Yellow | `linear-gradient(rgb(255, 249, 224) 0%, rgb(255, 236, 163) 100%)` | `--color-whisper-fade-yellow` | Soft gradient background for decorative features |
| Whisper Fade Violet | `linear-gradient(rgb(244, 235, 255) 0%, rgb(228, 204, 255) 100%)` | `--color-whisper-fade-violet` | Soft gradient background for decorative features |
| Whisper Fade Blue | `linear-gradient(rgb(229, 246, 255) 0%, rgb(194, 233, 255) 100%)` | `--color-whisper-fade-blue` | Soft gradient background for decorative features |
| Whisper Fade Orange | `linear-gradient(rgb(255, 242, 235) 0%, rgb(255, 209, 184) 100%)` | `--color-whisper-fade-orange` | Soft gradient background for decorative features |

## Tokens — Typography

### Geist — Body text, navigation links, button text, and all supportive details. · `--font-geist`
- **Substitute:** Inter
- **Weights:** 500, 600
- **Sizes:** 10px, 12px, 14px, 16px, 18px, 20px
- **Line height:** 1.14, 1.33, 1.35, 1.40, 1.50
- **Letter spacing:** -0.01
- **OpenType features:** `'case'`

### Aeonik (Montserrat substitute) — Headlines and prominent display text. · `--font-aeonik` / `--font-serif`
- **Substitute:** Montserrat
- **Weights:** 500
- **Sizes:** 20px, 24px, 32px, 48px, 72px, 148px
- **Line height:** 1.05, 1.11, 1.17, 1.20, 1.25
- **Letter spacing:** -0.02
- **OpenType features:** `'case'`

### Type Scale

| Role | Size | Line Height | Letter Spacing | Token |
|------|------|-------------|----------------|-------|
| body-lg | 14px | 1.33 | -0.14px | `--text-body-lg` |
| heading-sm | 18px | 1.5 | -0.18px | `--text-heading-sm` |
| heading | 20px | 1.25 | -0.4px | `--text-heading` |
| heading-lg | 24px | 1.2 | -0.48px | `--text-heading-lg` |
| display | 32px | 1.17 | -0.64px | `--text-display` |
| display-lg | 48px | 1.11 | -0.96px | `--text-display-lg` |
| display-xl | 72px | 1.05 | -1.44px | `--text-display-xl` |

## Tokens — Spacing & Shapes

**Base unit:** 8px

**Density:** comfortable

### Spacing Scale

| Name | Value | Token |
|------|-------|-------|
| 8 | 8px | `--spacing-8` |
| 16 | 16px | `--spacing-16` |
| 24 | 24px | `--spacing-24` |
| 32 | 32px | `--spacing-32` |
| 40 | 40px | `--spacing-40` |
| 48 | 48px | `--spacing-48` |
| 56 | 56px | `--spacing-56` |
| 64 | 64px | `--spacing-64` |
| 80 | 80px | `--spacing-80` |
| 88 | 88px | `--spacing-88` |
| 120 | 120px | `--spacing-120` |
| 160 | 160px | `--spacing-160` |

### Border Radius

| Element | Value |
|---------|-------|
| cards | 32px |
| icons | 16px |
| badges | 90px |
| images | 16px |
| buttons | 32px |

### Shadows

| Name | Value | Token |
|------|-------|-------|
| lg / genie | `rgba(4, 69, 144, 0.08) 0px 14px 20px 4px` | `--shadow-lg` / `--shadow-genie` |

### Layout

- **Section gap:** 24px
- **Card padding:** 40px
- **Element gap:** 24px

## Components

### Primary Action Button
Filled, `--color-midnight-ink` background, `#ffffff` text, 32px border-radius, 12px/32px padding.

### Feature Card
`--color-arctic-mist` background, 32px border-radius, 40px padding. Aeonik 24px `#0a0d12` title + Geist 16px `#535862` description + Electric Blue icon.

### Testimonial Card
`--color-arctic-mist` background, 32px border-radius, 40px padding. Caption Geist 500 16px `#0a0d12`. Attribution Geist 500 14px `#93979f`.

## Do's and Don'ts

### Do
- Prioritize Obsidian (`#0a0d12`) for headings — contrast ≥ 18:1 on light backgrounds.
- Use Midnight Ink (`#181d27`) exclusively for primary button backgrounds.
- Apply Arctic Mist (`#fafdff`) as card background.
- 32px border-radius for buttons, feature cards, and larger elements.
- Aeonik/Montserrat for all headings ≥ 20px, letter-spacing -0.02em.
- 24px standard gap between major layout elements.
- Geist weight 500–600 for body, letter-spacing -0.01em.

### Don't
- No highly saturated colors for large background areas.
- No deviating from Geist/Aeonik font stacks and letter-spacing.
- Never use `#0000ee` for links — use Luminous Blue (`#0099ff`).
- No sharp corners — all elements follow the radius scale.
- No heavy/multiple shadows — elevation is always `rgba(4, 69, 144, 0.08) 0px 14px 20px 4px`.
- No dark backgrounds for content sections — light theme only.

## Surfaces

| Level | Name | Value | Purpose |
|-------|------|-------|---------|
| 0 | Sky Wash Canvas | `#ebf5ff` | Page background — ethereal cool tint |
| 1 | Canvas White Base | `#ffffff` | Primary section/content background |
| 2 | Arctic Mist Card | `#fafdff` | Elevated card backgrounds |

## Quick Start CSS

```css
:root {
  --color-midnight-ink: #181d27;
  --color-arctic-mist: #fafdff;
  --color-canvas-white: #ffffff;
  --color-obsidian: #0a0d12;
  --color-silver-pine: #535862;
  --color-ash-gray: #93979f;
  --color-sky-wash: #ebf5ff;
  --color-ghostly-blue: #cce7ff;
  --color-electric-blue: #0069e0;
  --color-lavender-mist: #f1e6ff;
  --color-mint-glaze: #d3f6e3;
  --color-sunburst-yellow: #bb9915;
  --color-deep-violet: #9552e0;
  --color-ocean-spray: #4fbeff;
  --color-zesty-orange: #f26110;
  --color-luminous-blue: #0099ff;
  --shadow-lg: rgba(4, 69, 144, 0.08) 0px 14px 20px 4px;
  --radius-cards: 32px;
  --radius-buttons: 32px;
}
```