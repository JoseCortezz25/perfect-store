# Business Context — Sphere

## What is Sphere?

Sphere is an internal web platform designed to centralize and guarantee the technical quality of digital display pieces (banners) before delivery to the client.

---

## The Problem it Solves

The team used a shared staging link (`prevwork.quadi.io`) with critical issues:

- No technical validation
- No access control
- No traceability
- Unreliable history

Sphere replaces that chaotic system with a structured QC flow.

---

## What Sphere Does

1. **Receives ZIPs** with digital banners uploaded by designers.
2. **Validates each banner automatically** — weight, dimensions, naming, scripts, animations, etc.
3. **Generates a score from 0 to 100** per version, with a detailed checklist of critical, important, and informational checks.
4. **Manages versions** of each piece (V1, V2, V3…) with an immutable activity history.
5. **Previews banners** at real size, with light/dark mode.
6. **Facilitates client approval** through a controlled-access portal.

---

## Banner Lifecycle

A banner goes through a defined lifecycle:

```
uploaded → qc_pending → qc_approved / qc_rejected → client_review → client_approved → delivered
```

See `status-colors.md` in `.claude/design/` for the color mapping of each state.

---

## Product Phases

### Phase 1 — MVP (current)
- File upload (ZIP)
- Automatic technical validation
- QC checklist (critical / important / informational)
- Internal preview
- Version management

### Phase 2 — Planned
- Client portal with controlled access
- Executive dashboard with metrics
- Client-side approvals

---

## Summary

> Sphere is the QC hub for the banner production team — from the moment the designer uploads the file to the moment the client approves it.

**Primary users**: internal production team (designers, QC reviewers).
**Secondary users (Phase 2)**: clients, via a controlled-access portal.
