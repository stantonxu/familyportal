# Repository Guidelines

Use this guide to keep contributions consistent while the stack is being set up.

## Project Structure & Module Organization
- Keep application code in `src/` grouped by domain; share utilities in `src/lib`.
- Mirror code layout in `tests/` so each module has a matching test file.
- Store developer tooling in `scripts/` and reusable docs in `docs/`; place static assets in `assets/`.
- Track runtime configuration with `.env` (local only) and document required variables in `.env.example`.

## Build, Test, and Development Commands
- `make setup` — install dependencies and prepare hooks once the tooling is defined.
- `make lint` — run the formatter/linter chain; required to stay clean before committing.
- `make test` — execute the full automated suite; prefer this before every push.
- `make run` — start the local entrypoint (dev server, CLI, or worker) for manual checks.
- If a `Makefile` is not present, provide equivalent npm/poetry/pipenv scripts with the same names.

## Coding Style & Naming Conventions
- Prefer 2-space indent for JS/TS and 4-space for Python; keep lines under 100 characters.
- Use camelCase for variables/functions, PascalCase for classes/components, and kebab-case for files and directories.
- Favor small, pure functions with explicit imports; avoid shared mutable globals.
- Run your formatter (Prettier/Black/ruff) before pushing; commit the config used so all agents stay aligned.

## Testing Guidelines
- Mirror module names in `tests/` (`module.test.ts`, `test_module.py`, etc.) and keep fixtures in `tests/fixtures/`.
- Add regression tests with each bug fix; target at least 80% coverage once instrumentation is enabled.
- Default to fast unit tests; clearly mark slower integration/e2e cases via filenames or markers.
- Clean up external resources and temporary files in teardown to keep reruns deterministic.

## Commit & Pull Request Guidelines
- Use Conventional Commits (`feat: ...`, `fix: ...`, `chore: ...`) with subjects under 72 characters.
- PRs should include a concise summary, testing performed, linked issues, and screenshots or recordings for UI changes.
- Keep PRs scoped and incremental; note rollout/rollback steps when changing prod-critical paths.

## Security & Configuration Tips
- Never commit secrets; load from `.env` locally and share defaults via `.env.example`.
- Pin dependencies and review lockfiles; run the available security scanner when it is added.
