# Contributing

Thanks for your interest in contributing to Stacks Wrapped.

## Getting Started

```bash
git clone https://github.com/winsznx/stacks-wrapped.git
cd stacks-wrapped
pnpm install
cp apps/web/.env.example apps/web/.env.local
```

## Workflow

1. Create a branch from `main`.
2. Make focused, atomic commits using [Conventional Commits](https://www.conventionalcommits.org/).
3. Run `pnpm build` and `pnpm test` before pushing.
4. Open a pull request with a clear description.

## Commit Types

- `feat` - new functionality
- `fix` - bug fix
- `refactor` - change that neither adds a feature nor fixes a bug
- `test` - add or update tests
- `chore` - tooling, build, config changes
- `style` - formatting, whitespace, CSS-only changes
- `docs` - documentation only

## Code Style

- TypeScript strict mode is enabled and non-negotiable.
- No `any` without justification. Prefer `unknown`.
- Reach for `cn()` from `@/lib/cn` when conditionally composing classNames.
- Export from the nearest `index.ts` barrel where one exists.

## Smart Contract Changes

Run `clarinet check` after any change to `contracts/*.clar`.
Run `pnpm test` to execute the contract test suite.
