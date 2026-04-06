# Spacing System — Sphere

**Design System**: Vibe Coding
**Category**: Spacing & Gapping (Semantic)
**Version**: 1.0.0
**Base unit**: `px`

---

## Button Spacing

### Padding X (horizontal)

| Token         | Value |
| ------------- | ----- |
| `btn-px-xl`   | 80px  |
| `btn-px-l`    | 32px  |
| `btn-px-md`   | 24px  |
| `btn-px-sm`   | 16px  |
| `btn-px-xs`   | 8px   |
| `btn-px-xxs`  | 4px   |

### Padding Y (vertical)

| Token         | Value |
| ------------- | ----- |
| `btn-py-xl`   | 32px  |
| `btn-py-l`    | 24px  |
| `btn-py-md`   | 16px  |
| `btn-py-sm`   | 8px   |
| `btn-py-xs`   | 4px   |

### Gap

| Token               | Value |
| ------------------- | ----- |
| `btn-gap-icon-text` | 8px   |

---

## Card Spacing

### Padding

| Token          | Value |
| -------------- | ----- |
| `card-p-xxl`   | 120px |
| `card-p-xl`    | 36px  |
| `card-p-l`     | 32px  |
| `card-p-md`    | 24px  |
| `card-p-sm`    | 16px  |
| `card-p-xs`    | 8px   |

### Gap

| Token          | Value |
| -------------- | ----- |
| `card-gap-xl`  | 24px  |
| `card-gap-l`   | 16px  |
| `card-gap-md`  | 8px   |
| `card-gap-sm`  | 6px   |
| `card-gap-xs`  | 4px   |

---

## Field (Input) Spacing

### Padding X

| Token           | Value |
| --------------- | ----- |
| `field-px-l`    | 18px  |
| `field-px-md`   | 16px  |
| `field-px-sm2`  | 10px  |
| `field-px-sm`   | 8px   |

### Padding Y

| Token           | Value |
| --------------- | ----- |
| `field-py-l`    | 22px  |
| `field-py-md`   | 12px  |
| `field-py-sm2`  | 10px  |
| `field-py-sm`   | 8px   |

### Gap

| Token                      | Value |
| -------------------------- | ----- |
| `field-gap-label-input`    | 8px   |
| `field-gap-input-helper`   | 6px   |
| `field-gap-group-h`        | 16px  |
| `field-gap-group-v`        | 16px  |

---

## Container Spacing

### Padding

| Token                   | Value |
| ----------------------- | ----- |
| `container-p-spacious`  | 32px  |
| `container-p-default`   | 24px  |
| `container-p-compact`   | 16px  |

### Gap

| Token                      | Value |
| -------------------------- | ----- |
| `container-gap-elements`   | 16px  |
| `container-gap-sections`   | 48px  |
| `container-gap-text-stack` | 5px   |

---

## Navigation

| Token          | Value |
| -------------- | ----- |
| `nav-px`       | 32px  |

---

## Utility Gaps

### Positive

| Token      | Value |
| ---------- | ----- |
| `gap-4`    | 4px   |
| `gap-6`    | 6px   |
| `gap-8`    | 8px   |
| `gap-12`   | 12px  |
| `gap-16`   | 16px  |
| `gap-24`   | 24px  |
| `gap-32`   | 32px  |

### Negative

| Token          | Value  | Usage |
| -------------- | ------ | ----- |
| `gap-tight`    | -1px   | Fine-tuning alignment |
| `gap-overlap`  | -32px  | Overlapping element compositions |

---

## Usage Notes

- **Reserved structural widths**: `141px` (Sidebar), `1376px` (Main max-width), `1135px` (Alt layout max-width) — do not use these values as generic spacing.
- **Odd / low-scale values** (`1`, `3`, `5`, `7`): reserved for fine alignment adjustments or specific stroke corrections only.
- **Infinite** (`9999px`): used exclusively for fully rounded borders (Pills or Circles) — see `strokes-and-radius.md`.
- **Default button combination**: `btn-px-md` (24px) + `btn-py-sm` (8px) for standard size.
- **Sections vs elements**: always separate sections with `container-gap-sections` (48px), not with `container-gap-elements` (16px).
