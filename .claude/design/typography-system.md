# Typography System — Sphere

**Design System**: Vibe Coding
**Category**: Typography (Mulish) — Source of Truth
**Version**: 2.2.0
**Source file**: `typography.tokens.json`

---

## Settings

| Property     | Value              |
| ------------ | ------------------ |
| Font family  | `Mulish, sans-serif` |
| Base unit    | `px`               |

---

## Display

High-impact typography for hero sections and main page titles. Never use for body or UI copy.

**Available weights**: `700` (bold) · `800` (extrabold) · `500` (medium)

| Token        | Font Size | Line Height | Paragraph Spacing | Letter Spacing |
| ------------ | --------- | ----------- | ----------------- | -------------- |
| `display-xl` | 60px      | 62px        | 60px              | 0              |
| `display-l`  | 40px      | 42px        | 40px              | 0              |
| `display-m`  | 32px      | 34px        | 32px              | 0              |

---

## Headings

Structural content hierarchy. Weights are fixed per level — do not override.

| Token | Font Size | Line Height | Paragraph Spacing | Weight |
| ----- | --------- | ----------- | ----------------- | ------ |
| `h1`  | 48px      | 50px        | 48px              | `700`  |
| `h2`  | 32px      | 34px        | 32px              | `700`  |
| `h3`  | 24px      | 26px        | 22px              | `600`  |
| `h4`  | 20px      | 22px        | 20px              | `600`  |

---

## Body

General content and UI text. Weights can be applied freely to any size variant.

**Available weights**: `700` (bold) · `500` (medium) · `400` (regular) · `300` (light)

| Token          | Font Size | Line Height | Paragraph Spacing |
| -------------- | --------- | ----------- | ----------------- |
| `body-large`   | 18px      | 20px        | 16px              |
| `body-regular` | 16px      | 18px        | 16px              |
| `body-small`   | 14px      | 16px        | 14px              |
| `body-xsmall`  | 12px      | 14px        | 12px              |

---

## Caption

Micro-text for labels, metadata, timestamps, and annotations.

**Base**: 10px / 12px line-height / 10px paragraph spacing / letter-spacing 0

| Variant          | Weight |
| ---------------- | ------ |
| `caption-bold`   | `700`  |
| `caption-medium` | `500`  |
| `caption-light`  | `300`  |

---

## CTA (Call to Action)

Typography tokens specifically for button labels and interactive text.

### Primary & Secondary Buttons

| Variant                  | Font Size | Line Height | Paragraph Spacing | Weight |
| ------------------------ | --------- | ----------- | ----------------- | ------ |
| `cta-primary-medium`     | 16px      | 18px        | 16px              | `500`  |
| `cta-primary-bold`       | 16px      | 18px        | 16px              | `700`  |

### Small Button

| Token       | Font Size | Line Height | Paragraph Spacing | Weight |
| ----------- | --------- | ----------- | ----------------- | ------ |
| `cta-small` | 12px      | 14px        | 12px              | `500`  |

### Tertiary / Ghost Actions

| Variant                   | Font Size | Line Height | Paragraph Spacing | Weight |
| ------------------------- | --------- | ----------- | ----------------- | ------ |
| `cta-tertiary-medium`     | 14px      | 16px        | 14px              | `300`  |
| `cta-tertiary-small`      | 12px      | 14px        | 12px              | `300`  |

---

## Usage Rules

- **Always use Mulish** — no other font family is permitted in this design system.
- **Display tokens are for heroes only** — never use `display-xl/l/m` for UI components, cards, or body text.
- **Heading weights are fixed** — `h1/h2` are always `700`, `h3/h4` are always `600`. Do not override.
- **CTA tokens are exclusive to buttons** — do not reuse `cta-*` tokens for general body or heading text.
- **Prefer body-regular (16px) as the default** — use `body-small` for secondary/muted text, `body-xsmall` for metadata only.
- **Caption is for micro-annotations only** — never use 10px for primary readable content.
- **Line height is tight by design** — do not add extra line-height beyond the defined tokens.
- **Letter spacing is 0 across all tokens** — do not add tracking unless explicitly required by a specific design decision.
