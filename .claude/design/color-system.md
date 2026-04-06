# Color System — Sphere (OP Mode)

**Design System**: Vibe Coding
**Category**: Colors (OP Mode) — Source of Truth
**Version**: 2.0.0
**Source file**: `OP.tokens.json`

---

## Raw Colors — OP Blue

The primary brand color palette. Use `600_principal` as the default interactive color.

| Token              | Hex       | Preview |
| ------------------ | --------- | ------- |
| `op-blue-50`       | `#F6F8FF` | Light   |
| `op-blue-100`      | `#F0F3FE` |         |
| `op-blue-200`      | `#DCE3FD` |         |
| `op-blue-300`      | `#C1CFFC` |         |
| `op-blue-400`      | `#97B1F9` |         |
| `op-blue-500`      | `#6689F4` |         |
| `op-blue-600` ★    | `#4361EF` | **Principal** |
| `op-blue-700`      | `#2C40E4` |         |
| `op-blue-800`      | `#242DD1` |         |
| `op-blue-900`      | `#2327AA` |         |
| `op-blue-950`      | `#191A52` | Darkest |

> ★ `op-blue-600` is the principal brand color. Default for buttons, links, and interactive elements.

---

## Semantic Colors

### General Surfaces

Dark-mode surface hierarchy. Each level has a `background` and a `contrast` (foreground text) pair. Use sequentially to create depth — lower levels are darker.

| Level     | Background  | Contrast    | Usage                          |
| --------- | ----------- | ----------- | ------------------------------ |
| `level-0` | `#000000`   | `#FFFFFF`   | True black — outermost canvas  |
| `level-1` | `#080808`   | `#F5F5F5`   | App background                 |
| `level-2` | `#0D0D0D`   | `#DCDCDC`   | Card backgrounds               |
| `level-3` | `#131313`   | `#8C8C8C`   | Nested surfaces, modals        |
| `level-4` | `#191919`   | `#6E6E6E`   | Input backgrounds              |
| `level-5` | `#202020`   | `#545454`   | Disabled / muted surfaces      |
| `level-6` | `#3B3B3B`   | `#3B3B3B`   | Dividers / separator lines     |

---

### Components

#### Button — Principal

The primary CTA button. Uses OP Blue. States go from light (hover) to dark (pressed).

| State          | Color     |
| -------------- | --------- |
| Light (hover)  | `#6689F4` |
| Light medium   | `#4361EF` |
| Medium (default) | `#2C40E4` |
| Dark (pressed) | `#2327AA` |
| Text           | `#FFFFFF` |

#### Button — Disabled

| Role        | Color     |
| ----------- | --------- |
| Fill light  | `#545454` |
| Fill dark   | `#202020` |
| Text        | `#545454` |

---

#### Secondary Actions

Ghost/outline style for secondary interactions.

**Fill**

| State            | Value                      |
| ---------------- | -------------------------- |
| Invisible        | `rgba(255, 255, 255, 0)`   |
| Default (center) | `rgba(255, 255, 255, 0.15)` |
| Hover (center)   | `rgba(255, 255, 255, 0.25)` |

**Stroke**

| State          | Color     |
| -------------- | --------- |
| Default light  | `#DCDCDC` |
| Default shadow | `#131313` |
| Hover light    | `#FFFFFF` |
| Hover shadow   | `#202020` |

---

#### Card

| Role                | Color     |
| ------------------- | --------- |
| Background          | `#0D0D0D` |
| Foreground (text)   | `#FFFFFF` |
| Gradient shadow     | `#131313` |
| Gradient light      | `#191919` |

---

## Transparencies

Alpha scale for each base color. Multiply the base color by the alpha value when compositing.

### White — `#FFFFFF`

| Alpha token | Value |
| ----------- | ----- |
| `white/0`   | 0     |
| `white/5`   | 0.05  |
| `white/15`  | 0.15  |
| `white/25`  | 0.25  |
| `white/35`  | 0.35  |
| `white/45`  | 0.45  |
| `white/55`  | 0.55  |
| `white/65`  | 0.65  |
| `white/75`  | 0.75  |
| `white/85`  | 0.85  |
| `white/95`  | 0.95  |

### Black — `#000000`

| Alpha token | Value |
| ----------- | ----- |
| `black/0`   | 0     |
| `black/5`   | 0.05  |
| `black/15`  | 0.15  |
| `black/25`  | 0.25  |
| `black/35`  | 0.35  |
| `black/45`  | 0.45  |
| `black/55`  | 0.55  |
| `black/65`  | 0.65  |
| `black/75`  | 0.75  |
| `black/85`  | 0.85  |
| `black/95`  | 0.95  |

### Neutral 300 — `#6E6E6E`

| Alpha token        | Value |
| ------------------ | ----- |
| `neutral-300/0`    | 0     |
| `neutral-300/5`    | 0.05  |
| `neutral-300/15`   | 0.15  |
| `neutral-300/25`   | 0.25  |
| `neutral-300/35`   | 0.35  |
| `neutral-300/45`   | 0.45  |
| `neutral-300/55`   | 0.55  |
| `neutral-300/65`   | 0.65  |
| `neutral-300/75`   | 0.75  |
| `neutral-300/85`   | 0.85  |
| `neutral-300/95`   | 0.95  |

### Neutral 700 — `#191919`

| Alpha token        | Value |
| ------------------ | ----- |
| `neutral-700/0`    | 0     |
| `neutral-700/5`    | 0.05  |
| `neutral-700/15`   | 0.15  |
| `neutral-700/25`   | 0.25  |
| `neutral-700/35`   | 0.35  |
| `neutral-700/45`   | 0.45  |
| `neutral-700/55`   | 0.55  |
| `neutral-700/65`   | 0.65  |
| `neutral-700/75`   | 0.75  |
| `neutral-700/85`   | 0.85  |
| `neutral-700/95`   | 0.95  |

### OP Blue 600 Principal — `#4361EF`

| Alpha token         | Value |
| ------------------- | ----- |
| `op-blue-600/0`     | 0     |
| `op-blue-600/5`     | 0.05  |
| `op-blue-600/15`    | 0.15  |
| `op-blue-600/25`    | 0.25  |
| `op-blue-600/35`    | 0.35  |
| `op-blue-600/45`    | 0.45  |
| `op-blue-600/55`    | 0.55  |
| `op-blue-600/65`    | 0.65  |
| `op-blue-600/75`    | 0.75  |
| `op-blue-600/85`    | 0.85  |
| `op-blue-600/95`    | 0.95  |

---

## Usage Rules

- **Always use dark surfaces** — this design system is OP (dark) mode only. Never use white or light backgrounds as the base canvas.
- **Respect the surface hierarchy** — `level-0` is the deepest/outermost; higher levels layer on top.
- **Principal blue is `#4361EF`** — use `op-blue-500` (`#6689F4`) only for hover states, never as default.
- **Text on dark** — use `#FFFFFF` on surfaces up to `level-2`; shift to `#DCDCDC` or `#8C8C8C` for secondary and muted text.
- **Disabled states** — always use the disabled button tokens (`#545454` / `#202020`), never reduce opacity of the active state.
- **Transparencies** — prefer the defined alpha scale over arbitrary `rgba()` values to maintain token consistency.
