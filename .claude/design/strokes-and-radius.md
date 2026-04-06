# Strokes & Border Radius — Sphere

**Design System**: Vibe Coding
**Category**: Strokes & Border Radius
**Version**: 1.0.0
**Base unit**: `px`

---

## Strokes (Border Width)

| Token           | Value | Description |
| --------------- | ----- | ----------- |
| `stroke-none`   | 0px   | No border. Used for ghost elements or flat surfaces. |
| `stroke-thin`   | 1px   | Standard thickness for dividers, input borders, and cards. |
| `stroke-medium` | 2px   | Visual emphasis. Used for Focus states or outline-style buttons. |
| `stroke-thick`  | 4px   | Maximum emphasis. Used for strong selection indicators or decorative elements. |

### Usage Rules

| Context               | Token           |
| --------------------- | --------------- |
| Default border        | `stroke-thin`   |
| Active / Focus state  | `stroke-medium` |
| Component separation  | `stroke-none` — prefer background color differences over borders to separate sections |

---

## Border Radius

### Scale

| Token             | Value  | Usage |
| ----------------- | ------ | ----- |
| `radius-2`        | 2px    | Micro-elements, checkboxes, very small internal badges. |
| `radius-4`        | 4px    | Compact internal elements, keyboard keys, small tags. |
| `radius-6`        | 6px    | Sub-containers, tooltips, dropdown items. |
| `radius-8`        | 8px    | **Standard UI**: Small buttons, inputs, dense cards. |
| `radius-10`       | 10px   | Modern variant for medium/large buttons. |
| `radius-12`       | 12px   | **Standard UI**: Main cards, modals, section containers. |
| `radius-16`       | 16px   | Large containers, drawers, prominent floating elements. |
| `radius-24`       | 24px   | Large-scale modals, Hero-style sections with soft edges. |
| `radius-32`       | 32px   | Large decorative elements or ultra-soft containers. |
| `radius-infinite` | 9999px | Pill buttons (fully rounded), circular avatars, status indicators. |

### Rules

#### Nested Radius
When an element sits inside a container with padding, apply this formula to maintain visual harmony:

```
Inner Radius = Outer Radius − Padding
```

> Example: container has `radius-16` and `padding-8` → inner element must use `radius-8`.

#### Consistency
Do not mix `radius-8` and `radius-10` within the same visual context. Pick one as the component standard and apply it uniformly.

---

## Quick Reference — Component Defaults

| Component              | Radius         | Stroke        |
| ---------------------- | -------------- | ------------- |
| Input                  | `radius-8`     | `stroke-thin` |
| Input (focused)        | `radius-8`     | `stroke-medium` |
| Button (primary/secondary) | `radius-8` or `radius-10` | `stroke-none` |
| Button (pill)          | `radius-infinite` | `stroke-none` |
| Button (outline)       | `radius-8`     | `stroke-thin` → `stroke-medium` on hover |
| Card                   | `radius-12`    | `stroke-thin` or `stroke-none` |
| Modal                  | `radius-12` / `radius-24` | `stroke-none` |
| Drawer                 | `radius-16`    | `stroke-none` |
| Tooltip                | `radius-6`     | `stroke-none` |
| Dropdown item          | `radius-6`     | `stroke-none` |
| Badge / Tag            | `radius-4`     | `stroke-none` |
| Avatar (circular)      | `radius-infinite` | `stroke-none` |
| Status indicator       | `radius-infinite` | `stroke-none` |
| Checkbox               | `radius-2`     | `stroke-thin` |
