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

## Working process rules

1. Before writing any code, describe your approach and wait for approval. Always ask clarifying questions before writing any code if requirements are ambiguous.
2. If a task requires changes to more than 3 files, stop and break it into smaller tasks first.
3. After writing code, list what could break and suggest tests to cover it.
4. When there's a bug, start by writing a test that reproduces it, then fix it until the test passes.
5. Every time the user corrects you, add a new rule to this file so it never happens again.
6. Whenever you judge that a `.md` file (CLAUDE.md, README.md, or others) is out of date or should be updated, update it directly without asking first.
