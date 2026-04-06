# Motion System — Sphere

**Design System**: Vibe Coding
**Category**: Motion & Micro-interactions
**Version**: 1.0.0

Animation and micro-interaction tokens. Focused on performance, the "Shine" hierarchy, and compound timing.

---

## Raw Tokens

### Duration

| Token              | Value  | Usage | Notes |
| ------------------ | ------ | ----- | ----- |
| `duration-fast`    | 120ms  | Immediate tactile feedback: Checkboxes, Toggles, state changes | Previously "Quick" — unified for consistency |
| `duration-standard`| 300ms  | Standard UI: openings, closings, smooth layout changes, Tabs | **The system base time** |
| `duration-slow`    | 400ms  | Premium hover (gradients), large Modals, light travel | Required so the eye perceives gradient movement |
| `duration-story`   | 600ms  | Punctual storytelling. Rare and intentional (Onboarding) | **Never use in daily navigation** |

### Easing

| Token              | Curve                           | Usage |
| ------------------ | ------------------------------- | ----- |
| `easing-ui`        | `cubic-bezier(0.2, 0, 0, 1)`   | Clean and modern. **Use in 90% of the interface** |
| `easing-premium`   | `cubic-bezier(0.16, 1, 0.3, 1)`| Soft and luxurious. For gradients, overlays, featured elements |
| `easing-editorial` | `cubic-bezier(0, 0, 0.58, 1)`  | Dramatic. **Exclusive for "Story" moments** |

---

## Displacement Scale

Linked to the spacing grid.

| Token                | Spacing Ref | Usage |
| -------------------- | ----------- | ----- |
| `displacement-micro` | `xs`        | Small jumps on hover or icon animations |
| `displacement-enter-exit` | `md`   | Standard entry of Modals, Drawers, Toasts |
| `displacement-page`  | `xl`        | Larger displacement between screens (if applicable) |

---

## Semantic Animations

### Button

#### Hover — Premium Composite Rule
> The background/glow travels slowly, content responds quickly.

Two independent animation layers run simultaneously:

| Layer               | Properties                                   | Duration             | Easing             |
| ------------------- | -------------------------------------------- | -------------------- | ------------------ |
| `background_glow`   | `background-position`, `box-shadow`, `opacity` | `duration-slow` (400ms) | `easing-premium` |
| `content_response`  | `color`, `transform`, `scale`                | `duration-standard` (300ms) | `easing-ui` |

> The "Shine" needs 400ms to travel through space visually. Text/icon responds in 300ms so it doesn't feel slow.

#### Press
Immediate tactile feedback.

| Properties                       | Duration           | Easing       |
| -------------------------------- | ------------------ | ------------ |
| `transform`, `background-color`  | `duration-fast` (120ms) | `easing-ui` |

#### Loading
Direct transition to loading state.

| Duration           | Easing       |
| ------------------ | ------------ |
| `duration-fast` (120ms) | `easing-ui` |

---

### Card

#### Default Hover
Light elevation for standard cards.

| Properties               | Duration               | Easing       |
| ------------------------ | ---------------------- | ------------ |
| `transform`, `box-shadow`| `duration-standard` (300ms) | `easing-ui` |

#### Featured Hover
Only for featured cards with an active gradient.

| Properties                             | Duration           | Easing           |
| -------------------------------------- | ------------------ | ---------------- |
| `background-position`, `box-shadow`    | `duration-slow` (400ms) | `easing-premium` |

---

### Modal & Drawer

| Layer              | Duration           | Easing           | Notes |
| ------------------ | ------------------ | ---------------- | ----- |
| `container_entry`  | `duration-slow` (400ms) | `easing-premium` | Smooth entry of the main panel |
| `overlay_fade`     | `duration-standard` (300ms) | `easing-ui` | Background overlay enters faster to provide context first |

---

### Dropdown & Accordion

| Interaction    | Duration               | Easing           | Notes |
| -------------- | ---------------------- | ---------------- | ----- |
| `toggle`       | `duration-standard` (300ms) | `easing-premium` | Fluid content opening (avoid `height: auto` in CSS) |
| `item_hover`   | `duration-fast` (120ms) | `easing-ui`     | Fast selection in option lists |

---

### Tooltip

| Layer   | Duration           | Easing       | Notes |
| ------- | ------------------ | ------------ | ----- |
| `entry` | `duration-fast` (120ms) | `easing-ui` | Near-instant appearance — no theatrics |

---

## Implementation

### Allowed vs Forbidden Properties

Animate only GPU-composited properties for performance:

| Allowed ✅                                                             | Forbidden ❌                              |
| ---------------------------------------------------------------------- | ----------------------------------------- |
| `opacity`, `transform`, `background-position`, `color`, `box-shadow`  | `width`, `height`, `top`, `left`, `margin`, `padding` |

### Gradient Animation Technique
To animate gradients performantly, **do not animate `background`** directly. Use:

```css
/* ✅ Correct approach */
background-size: 200% 200%;
transition: background-position 400ms cubic-bezier(0.16, 1, 0.3, 1);

/* On hover */
background-position: right center;
```

### Accessibility — `prefers-reduced-motion`

Always wrap motion in a reduced-motion media query:

```css
@media (prefers-reduced-motion: reduce) {
  * {
    transition: opacity 0ms !important;
    animation: none !important;
  }
}
```

> **Exception**: Allow fast color/opacity changes (no displacement) to maintain state feedback for accessibility.

---

## Quick Reference

| Need                        | Duration    | Easing       |
| --------------------------- | ----------- | ------------ |
| Toggle, checkbox, press     | 120ms       | `easing-ui`  |
| Standard open/close, tabs   | 300ms       | `easing-ui`  |
| Gradient hover, modal entry | 400ms       | `easing-premium` |
| Onboarding / story moment   | 600ms       | `easing-editorial` |
| Button content on hover     | 300ms       | `easing-ui`  |
| Button glow/bg on hover     | 400ms       | `easing-premium` |
