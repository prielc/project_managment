# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project status

A task management system for the user (single-user, no auth). First feature being built: **projects** (a `Task` model tracking individual tasks-within-a-project is planned but not yet built).

## Tech stack

- **Next.js 16** (App Router, TypeScript, `src/` dir, Tailwind CSS v4) — full-stack app, frontend + Route Handlers in one deployable.
- **Prisma 7** ORM with **SQLite** (`better-sqlite3` driver adapter — Prisma 7 requires an explicit driver adapter, there is no implicit runtime connection from `datasource.url` anymore).
- Prisma client is generated to `src/generated/prisma` (gitignored, regenerate with `npx prisma generate`). Import it via the shared singleton at `src/lib/prisma.ts`, not directly.
- The installed Next.js/Prisma versions are newer than typical training data — **check `node_modules/next/dist/docs/` (and the actual generated Prisma client types) before assuming an API**, per the `AGENTS.md` warning generated into this repo.

## Commands

```bash
npm run dev       # start dev server (localhost:3000)
npm run build     # production build
npm run lint      # eslint
npm run db:seed   # seed lookup tables (ContentDomain, WeaponSystem, Analyst) with placeholder values
npx prisma migrate dev --name <name>   # create + apply a migration after editing prisma/schema.prisma
npx prisma generate                     # regenerate the client (needed after schema changes / fresh install)
npx prisma studio                       # browse the SQLite DB visually
```

## Data model

- `Project`: name, plus three required FKs — `contentDomain` (עולם תוכן), `weaponSystem` (אמל"ח מוביל), `analyst` (אנליסט).
- `ContentDomain`, `WeaponSystem`, `Analyst`: simple `id` + unique `name` lookup tables. These are **closed lists** managed through the UI (not hardcoded) — seeded with placeholder values via `prisma/seed.ts`, expected to be edited/extended by the user.
- Task-level model (tasks within a project) is intentionally not built yet — projects are the first slice.

## Next steps for future sessions

Keep this section current as the data model and architecture evolve — update it whenever a new model, route group, or major structural decision is added, per the self-updating `.md` rule below.

## Git workflow (autonomous)

At the end of every development task (a meaningful chunk of code/config changes complete and working), perform the full git procedure yourself, without asking for confirmation first:

1. `git status` / `git diff` to review what changed.
2. Stage the relevant files (avoid `git add -A`/`.` if it would sweep in unrelated or sensitive files).
3. Commit with a clear, concise message describing the *why*.
4. Push to the remote (once one is configured), including creating/pushing a new branch if needed.

This standing authorization covers commit and push as routine steps of finishing a task. It does **not** cover destructive or history-rewriting operations (force-push, reset --hard, rebase of shared history, deleting branches) — those still require asking first, per standard git safety practice.

## Working process rules

1. Before writing any code, describe your approach and wait for approval. Always ask clarifying questions before writing any code if requirements are ambiguous.
2. If a task requires changes to more than 3 files, stop and break it into smaller tasks first.
3. After writing code, list what could break and suggest tests to cover it.
4. When there's a bug, start by writing a test that reproduces it, then fix it until the test passes.
5. Every time the user corrects you, add a new rule to this file so it never happens again.
6. Whenever you judge that a `.md` file (CLAUDE.md, README.md, or others) is out of date or should be updated, update it directly without asking first.

## Plugins

- `frontend-design@claude-plugins-official` is installed (user scope). Use it for any frontend/UI work in this project — it establishes a design direction (purpose, audience, aesthetic) before coding and helps avoid generic AI-default styling.
- `ui-ux-pro-max@ui-ux-pro-max-skill` is installed (user scope), from third-party marketplace `nextlevelbuilder/ui-ux-pro-max-skill` (github.com/nextlevelbuilder/ui-ux-pro-max-skill). Provides a searchable database of UI styles, color palettes, font pairings, charts, and stack-specific guidance (React, Next.js, Vue, Svelte, Tailwind, shadcn/ui, SwiftUI, Flutter, etc.), plus brand/design-system/logo/banner sub-skills with executable scripts. Note: this is unverified third-party code (not the official Anthropic marketplace) — installed at the user's explicit request despite an anomalous star/fork count relative to the repo's age.
