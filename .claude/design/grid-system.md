# Grid System — Sphere

**Design System**: Vibe Coding
**Category**: Layout Grid
**Version**: 1.1.0
**Base unit**: `px`

---

## Grid

| Property | Value | Description |
| -------- | ----- | ----------- |
| Columns  | 12    | Standard 12-column system for maximum design flexibility |

---

## Containers

| Token               | Max Width | When to use |
| ------------------- | --------- | ----------- |
| `container-main`    | 1376px    | Primary content container when the sidebar is **not** present |
| `container-altern`  | 1135px    | Primary content container when the sidebar **is** present |

---

## Margins (Desktop)

Outer lateral page margins.

| Token              | Value | Usage |
| ------------------ | ----- | ----- |
| `margin-default`   | 32px  | Standard desktop layout |
| `margin-compact`   | 24px  | Compact desktop variant |

---

## Gutters (Column Gap)

Spacing between columns (medianil).

| Token           | Value | Usage |
| --------------- | ----- | ----- |
| `gutter-default`| 24px  | Standard column gap |
| `gutter-dense`  | 16px  | Dense / information-heavy layouts |

---

## Sidebar

The sidebar is a **fixed-width static** element.

| Property        | Value | Notes |
| --------------- | ----- | ----- |
| Width           | 141px | Fixed — never resize |
| Gap             | 0     | No gap between sidebar and content area |
| Margin          | 32px  | Outer margin applied to sidebar |
| Gutter          | 24px  | Internal sidebar gutter |

---

## Layout Rules

### Grid Alignment
All content must align to the 12 columns of the **active container** (Main or Altern). Never lay out content outside the column grid.

### Sidebar Behavior
The sidebar is static at 141px. When present, the main content container switches from `container-main` (1376px) to `container-altern` (1135px). The layout must account for this automatically — do not manually subtract sidebar width from content widths.

### Container Selection

```
Sidebar visible?
  ├── NO  → use container-main  (max-width: 1376px)
  └── YES → use container-altern (max-width: 1135px)
```

### Margin & Gutter Combination
Default desktop layout:

```
margin-default (32px) | [12-column grid] | margin-default (32px)
                        gutter-default (24px) between columns
```

---

## Quick Reference

| Element                     | Value  |
| --------------------------- | ------ |
| Columns                     | 12     |
| Max-width (no sidebar)      | 1376px |
| Max-width (with sidebar)    | 1135px |
| Sidebar width               | 141px  |
| Desktop margin (default)    | 32px   |
| Desktop margin (compact)    | 24px   |
| Column gutter (default)     | 24px   |
| Column gutter (dense)       | 16px   |
