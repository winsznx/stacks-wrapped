# Stacks Wrapped

> Your on-chain year in review — powered by the Stacks blockchain.

[![Vercel](https://img.shields.io/badge/deployed-vercel-black)](https://stacks-wrapped-web.vercel.app)
[![License](https://img.shields.io/badge/license-MIT-blue)](LICENSE)

## Overview

Stacks Wrapped fetches your entire Stacks transaction history and generates a beautiful, shareable "Wrapped" card with your on-chain stats — total transactions, favorite contracts, success rates, and more.

## Architecture

\`\`\`
stacks-wrapped/
├── apps/web           # Next.js 14 frontend
├── packages/parser    # Transaction analysis engine
├── contracts/         # Clarity smart contracts
└── tests/             # Vitest contract tests
\`\`\`

## Getting Started

\`\`\`bash
pnpm install
pnpm dev
\`\`\`

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Blockchain**: Stacks.js v7
- **Smart Contracts**: Clarity
- **Testing**: Vitest + Clarinet
- **Deployment**: Vercel

## License

MIT

## Development Onboarding
Follow these steps to get started...
