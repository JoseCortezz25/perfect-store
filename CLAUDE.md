# CLAUDE.md: Project Context for AI Agents

This file provides guidance to Opencode when working with code in this repository.

## Project Overview

Sphere is an **internal web platform** for centralizing and guaranteeing the technical quality of digital display pieces (banners) before client delivery. It replaces a shared staging link with a structured QC flow: designers upload ZIPs, the platform validates each banner automatically (weight, dimensions, naming, scripts, animations), generates a 0–100 score with a detailed checklist, manages versions with immutable history, and enables client approval through a controlled-access portal.

**Banner lifecycle**: `uploaded → qc_pending → qc_approved / qc_rejected → client_review → client_approved → delivered`

For full business context see `.claude/knowledge/business-context.md`. For the platform sitemap see `.claude/knowledge/sitemap.md`.

**Tech Stack**: Next 15, React 19, TailwindCSS v4, shadcn/ui, TypeScript, zod, React Hook Form

## 🔴 CRITICAL - READ FIRST

**BEFORE doing anything else**, you MUST read:

`.claude/knowledge/critical-constraints.md`

This document contains non-negotiable architectural rules. Violating these rules is unacceptable.

## Available Specialized Agents

**When working on features, you can delegate to these specialized agents:**

**Agents in this project:**

- **Business Analysis & Ideation** → `.claude/agents/business-analyst.md`
- **Next.js 15 & App Router Architecture** → `.claude/agents/nextjs-builder.md`
- **Domain Business Logic & Entities** → `.claude/agents/domain-architect.md`
- **UX/UI Design & Architecture** → `.claude/agents/ux-ui-designer.md`
- **Wireframe Design** → `.claude/agents/wireframe-designer.md`
- **Code Quality Review** → `.claude/agents/code-reviewer.md`

**How to use agents:**

- Read the agent file to understand its role and capabilities
- Use the Task tool to invoke: `Launch {agent-name} with session_id="{id}" to {task}`
- Agent creates plan in `.claude/plans/`, then you execute it

## Workflow Protocol

### For New Features (Automatic Orchestration)

**Parent Agent Process:**

1. **Create session file** automatically with unique session_id
2. **Analyze task** and determine which specialized agents are needed
3. **Invoke specialized agents** to create implementation plans
4. **Execute plans** step-by-step
5. **Update session context** after each phase (append-only)

**Session files**: `.claude/tasks/context_session_{id}.md` (append-only logs)

### For Trivial Changes

Implement directly (typos, simple edits) - no session needed.

## Session Context Protocol

**When session_id is provided:**

1. Read `.claude/tasks/context_session_{id}.md` FIRST
2. Understand previous decisions and progress
3. Continue from where previous work left off
4. **Append** your entry at the end (NEVER overwrite)

**Entry format**: See `.claude/tasks/README.md` for full protocol.

## Documentation Map

**Load strategically - don't read everything upfront!**

### Always Read First

- `.claude/knowledge/critical-constraints.md`- Non-negotiable rules

### Read If Session Exists

- `.claude/tasks/context_session_{id}.md` - Session history

### Load As Needed (Use Grep for sections)

- `.claude/knowledge/business-context.md` - What Sphere is, the problem it solves, banner lifecycle, product phases
- `.claude/knowledge/sitemap.md` - Pages, sections and business features of the platform
- `.claude/knowledge/architecture-patterns.md` - Architecture rules
- `.claude/knowledge/business-rules.md` - Domain rules
- `.claude/knowledge/context-strategy.md` - Context loading strategy
- `.claude/knowledge/file-structure.md` - Naming conventions
- `.claude/knowledge/tech-stack.md` - Technologies, commands

**Strategy**: Use Grep to search specific sections instead of reading full files.

**Example**:

```
❌ Read: architecture-patterns.md
✅ Grep: pattern="## Repository Pattern", path="architecture-patterns.md", -A=30
```

## Key Constraints (Summary)

**Full details in `.claude/knowledge/critical-constraints.md`**

- Use repository pattern for data access (no direct DB imports)
- Externalize all text to text maps (no hardcoded strings)
- Follow architecture dependency rules strictly
- Agents create plans, parent executes
- Session context is append-only (never overwrite)

## Design Guidelines (ALWAYS Follow)

**When designing or implementing any UI**, you MUST consult the files in `.claude/design/`. These are the Source of Truth for all visual decisions in Sphere.

| File | What it defines |
|------|----------------|
| `.claude/design/color-system.md` | OP Blue palette, dark surface hierarchy (level-0→6), button/card/action tokens, transparencies |
| `.claude/design/typography-system.md` | Mulish font, display/heading/body/caption/CTA scales with sizes, weights and line-heights |
| `.claude/design/strokes-and-radius.md` | Border widths (none/thin/medium/thick), border-radius scale (2px→9999px), nested radius rule |
| `.claude/design/spacing-system.md` | Semantic padding/gap for buttons, cards, inputs, containers, navigation and utility gaps |
| `.claude/design/grid-system.md` | 12-column grid, max-widths (1376px / 1135px), 141px static sidebar, desktop margins and gutters |
| `.claude/design/status-colors.md` | Status tokens (approved, rejected, warning, pending, in_review, delivered), QC validation colors |
| `.claude/design/motion-system.md` | Durations (120ms→600ms), easing curves (ui/premium/editorial), per-component animation rules |

**Non-negotiable design rules:**
- This is a **dark-mode only** system — never use white or light backgrounds as base canvas
- Principal brand color is **`#4361EF`** (op-blue-600) — use `#6689F4` only for hover states
- Font is always **Mulish** — no other typeface is permitted
- Always animate with **GPU-composited properties only** (`opacity`, `transform`, `background-position`)
- Respect the **nested radius formula**: `Inner Radius = Outer Radius − Padding`
- Always implement **`prefers-reduced-motion`** when adding animations

---

## Code Rules

**When writing any code in `src/`**, these rules in `.claude/rules/` are enforced automatically. Load the relevant file when the task touches that area.

| File | What it enforces |
|------|-----------------|
| `.claude/rules/code-quality.md` | ESLint rules, no `any`, no unused vars, camelCase, no console in prod |
| `.claude/rules/naming-conventions.md` | kebab-case files, mandatory suffixes (`.store.ts`, `.schema.ts`, `.types.ts`), boolean prefixes (`is/has/should`) |
| `.claude/rules/folder-structure.md` | Full `src/` directory tree, Screaming Architecture + Atomic Design layout |
| `.claude/rules/project-characteristics.md` | RSC-first architecture, state management strategy (React Query / Zustand / useState) |
| `.claude/rules/styling.md` | Tailwind v4, `@apply`, BEM, `cn()` for variants, shadcn/ui wrapping, mobile-first |
| `.claude/rules/text-management.md` | No hardcoded strings — domain `messages.ts` or `config/messages.ts` |
| `.claude/rules/document-component-storybook.md` | `*.stories.tsx` conventions, folder structure mirroring Figma |

---

## MCP Configuration

**Available MCP Servers**: Defined in `.mcp.json`

- **shadcn** (~4.7k tokens) — componentes, registros, ejemplos shadcn/ui
- **playwright** (~14k tokens) — automatización de navegador, pruebas E2E
- **chrome-devtools** — inspección, snapshots, performance, DevTools
- **Figma Desktop** — diseño, contexto de Figma, screenshots, variables

**Strategy**: Enable only what the current task needs in `.claude/settings.local.json`

## General instructions
- Avoid read files from `.opencode/*`

## Available  Skills

### Generic Skills (User Installation → ~/.claude/skills/)

These skills are copied to user's Claude/OpenCode config via the installer.

| Skill | Description | Source |
|-------|-------------|--------|
| `frontend-design` | Distinctive frontend designs, typography, color palettes, motion | [.claude/skills/frontend-design](.claude/skills/frontend-design/SKILL.md) |
| `react-19` | React 19 patterns, React Compiler, no manual memoization | [.claude/skills/react-19](.claude/skills/react-19/SKILL.md) |
| `typescript` | TypeScript strict patterns, types, interfaces, generics | [.claude/skills/typescript](.claude/skills/typescript/SKILL.md) |
| `tailwind-4` | Tailwind CSS v4, cn(), theme variables, no var() in className | [.claude/skills/tailwind-4](.claude/skills/tailwind-4/SKILL.md) |
| `zod-4` | Zod v4 schema validation, breaking changes from v3 | [.claude/skills/zod-4](.claude/skills/zod-4/SKILL.md) |

## How Skills Work

1. **Auto-detection**: Claude Code reads CLAUDE.md which contains skill triggers
2. **Context matching**: When editing Go/TUI code, gentleman-bubbletea loads
3. **Pattern application**: AI follows the exact patterns from the skill
4. **First-time-correct**: No trial and error - skills provide exact conventions

## For Agents: Pre-Work Checklist

Before starting work:

- [ ] Read `.claude/knowledge/critical-constraints.md`?
- [ ] Read session context if `session_id` provided?
- [ ] Understand my role (check `.claude/agents/{my-name}.md` if specialized agent)?
- [ ] Know which MCP tools I have access to?
- [ ] Will append to session context (not overwrite)?
- [ ] Will create plan in `.claude/plans/` (not implement directly)?
- [ ]  If there is information that replaces or modifies the knowledge, run the `project-consult` agent to update the files involved in `.claude/knowledge/`.

If any ❌, STOP and review documentation.

**Token Budget Goal**: ~400-500 tokens for this file. All details are in `.claude/knowledge/` docs.
