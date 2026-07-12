# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project status

This repository is currently empty — no code, dependencies, or configuration exist yet. It is intended to become a project management tool (tracking projects, tasks, or workflows).

There are no build, lint, or test commands to document yet, and no architecture to describe.

## Next steps for future sessions

When code is added to this repository, update this file with:
- Setup/build/lint/test commands
- The chosen tech stack and why
- High-level architecture (how major pieces fit together) once it exists

Until then, don't assume a framework, language, or structure — ask the user or check for freshly added files before scaffolding anything.

## Git workflow (autonomous)

At the end of every development task (a meaningful chunk of code/config changes complete and working), perform the full git procedure yourself, without asking for confirmation first:

1. `git status` / `git diff` to review what changed.
2. Stage the relevant files (avoid `git add -A`/`.` if it would sweep in unrelated or sensitive files).
3. Commit with a clear, concise message describing the *why*.
4. Push to the remote (once one is configured), including creating/pushing a new branch if needed.

This standing authorization covers commit and push as routine steps of finishing a task. It does **not** cover destructive or history-rewriting operations (force-push, reset --hard, rebase of shared history, deleting branches) — those still require asking first, per standard git safety practice.
