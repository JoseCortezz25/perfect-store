# Status Colors — Sphere

**Design System**: Vibe Coding
**Category**: Semantic Status Colors — Sphere Product
**Version**: 1.0.0

Semantic color mapping for status indicators. Used in `StatusBadge`, validator checklists, and any system state indicator. Complements `color-system.md` with domain-specific tokens.

---

## Status Colors

Each status has four tokens: `background`, `text`, `border`, and `icon`.

| Status            | Background                    | Text / Icon | Border                        | Usage |
| ----------------- | ----------------------------- | ----------- | ----------------------------- | ----- |
| `approved`        | `rgba(34, 197, 94, 0.15)`     | `#22C55E`   | `rgba(34, 197, 94, 0.3)`      | QC approved, passing checks, successful validation |
| `client_approved` | `rgba(21, 128, 61, 0.15)`     | `#15803D`   | `rgba(21, 128, 61, 0.3)`      | Client approved — darker green to differentiate from QC approved |
| `rejected`        | `rgba(239, 68, 68, 0.15)`     | `#EF4444`   | `rgba(239, 68, 68, 0.3)`      | QC rejected, critical failing checks, blocking errors |
| `warning`         | `rgba(245, 158, 11, 0.15)`    | `#F59E0B`   | `rgba(245, 158, 11, 0.3)`     | Needs fix, important failing checks, non-blocking warnings |
| `pending`         | `rgba(107, 114, 128, 0.15)`   | `#9CA3AF`   | `rgba(107, 114, 128, 0.3)`    | QC pending, uploaded, waiting states |
| `in_review`       | `rgba(139, 92, 246, 0.15)`    | `#8B5CF6`   | `rgba(139, 92, 246, 0.3)`     | Client review, currently under review |
| `delivered`       | `rgba(67, 97, 239, 0.15)`     | `#4361EF`   | `rgba(67, 97, 239, 0.3)`      | Delivered. Uses `op-blue-600` principal from the color system |

---

## Validation Check Colors

Used specifically in the QC validator checklist to indicate the severity of each check result.

| Severity    | Background                   | Text / Icon | Description |
| ----------- | ---------------------------- | ----------- | ----------- |
| `critical`  | `rgba(239, 68, 68, 0.10)`    | `#EF4444`   | Critical checks — block progression |
| `important` | `rgba(245, 158, 11, 0.10)`   | `#F59E0B`   | Important checks — warnings, do not block |
| `info`      | `rgba(34, 197, 94, 0.10)`    | `#22C55E`   | Informational checks — passes correctly |

---

## Banner Status → Color Map

Maps banner/asset workflow states to their corresponding status color token.

| Banner Status    | Color Token       |
| ---------------- | ----------------- |
| `uploaded`       | `pending`         |
| `error`          | `rejected`        |
| `needs_fix`      | `warning`         |
| `qc_pending`     | `pending`         |
| `qc_approved`    | `approved`        |
| `qc_rejected`    | `rejected`        |
| `client_review`  | `in_review`       |
| `client_approved`| `client_approved` |
| `delivered`      | `delivered`       |

---

## Usage Rules

- **Always use the full token set** (background + text + border + icon) — never mix tokens from different statuses.
- **`delivered` uses the principal OP Blue** (`#4361EF`) — it is intentionally consistent with the brand primary action color.
- **`client_approved` vs `approved`** — use `client_approved` (darker green) only when the actor is the client, not QC.
- **Validator checks vs status badges** — use `validation_check_colors` for inline checklist rows, use `status_colors` for badges and tags.
- **Do not invent new status colors** — if a new state is required, extend this file rather than using arbitrary colors.
- **Background opacity is intentional** — `0.15` for status badges, `0.10` for validator checks. Do not increase opacity.
