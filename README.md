# Stacks Wrapped

Your on-chain story, committed to the chain.

Stacks Wrapped is a full-stack Web3 app on Stacks Mainnet. Connect your wallet, fetch your lifetime on-chain stats from the Hiro API, and generate a shareable PNG Wrapped Card. To unlock and download the card, claim it on-chain via a Clarity smart contract — creating verifiable proof of participation.

A public leaderboard reads directly from the contract to show total cards generated and the most recent claimers.

---

## Features

- **On-chain stats** — Total transactions, fees paid, first transaction date, favorite contract, biggest STX transfer
- **Shareable card** — High-res PNG export with rounded corners, CRT scanline overlay, and cyberpunk terminal aesthetic
- **On-chain claim** — Clarity smart contract records each claim with block height
- **Leaderboard** — Live counter and recent claimers table, auto-refreshes every 30 seconds
- **Wallet support** — Leather and Xverse via `@stacks/connect`
- **OG previews** — Dynamic Open Graph image for link previews on every route

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | Next.js 14 (App Router), React 18, TypeScript |
| Styling | CSS with brutalist hard-shadow design system |
| Smart Contract | Clarity 5 (Stacks Mainnet, Epoch 3.4) |
| Wallet | @stacks/connect (Leather, Xverse) |
| API | Hiro REST API v2 |
| Card Export | html2canvas |
| OG Images | @vercel/og (Edge) |
| Monorepo | pnpm workspaces, Turborepo |
| Deploy | Vercel |

---

## Repository Structure

```
stacks-wrapped/
├── apps/
│   └── web/                          # Next.js application
│       ├── app/                      # Pages and API routes
│       ├── components/               # React components
│       ├── hooks/                    # Custom hooks
│       └── lib/                      # Constants, API, contract reads, card export
├── contracts/
│   └── wrapped-registry.clar        # Clarity smart contract
├── packages/
│   └── stacks-wrapped-parser/       # @winsznx/stacks-wrapped-parser npm package
│       └── src/
│           ├── parsers/              # Individual stat computation functions
│           ├── utils/                # microSTX conversion
│           ├── types.ts              # RawTransaction, WrappedStats
│           └── index.ts             # computeWrappedStats orchestrator
├── turbo.json
├── pnpm-workspace.yaml
└── vercel.json
```

---

## Getting Started

### Prerequisites

- Node.js 18+
- pnpm 10+

### Setup

```bash
# Clone the repo
git clone https://github.com/winsznx/stacks-wrapped.git
cd stacks-wrapped

# Install dependencies
pnpm install

# Copy environment template
cp apps/web/.env.example apps/web/.env.local
```

Edit `apps/web/.env.local` with your values:

```
NEXT_PUBLIC_HIRO_API_BASE=https://api.hiro.so
NEXT_PUBLIC_CONTRACT_DEPLOYER=<your mainnet deployer address>
NEXT_PUBLIC_CONTRACT_NAME=wrapped-registry
NEXT_PUBLIC_NETWORK=mainnet
NEXT_PUBLIC_APP_URL=https://stacks-wrapped.xyz
```

### Development

```bash
pnpm dev
```

### Build

```bash
pnpm build
```

### Test

```bash
pnpm test
```

Runs Clarity contract unit tests via Clarinet SDK and vitest.

---

## Smart Contract

The `wrapped-registry.clar` contract is deployed on Stacks Mainnet.

### Public Functions

| Function | Description |
|---|---|
| `claim-wrapped-card` | Records the caller in the registry with block height. Fails with `u100` if already claimed. |

### Read-Only Functions

| Function | Description |
|---|---|
| `get-total-wrapped` | Returns total number of cards claimed |
| `has-claimed (user)` | Returns whether a principal has claimed |
| `get-claim-info (user)` | Returns claim block height or `u404` if not found |

---

## NPM Package

The `@winsznx/stacks-wrapped-parser` package exports all stat computation logic:

```typescript
import { computeWrappedStats, RawTransaction } from '@winsznx/stacks-wrapped-parser';

const stats = computeWrappedStats(transactions);
// { totalTransactions, totalFeesPaidSTX, firstTransactionDate, favoriteContract, biggestSTXTransferSTX }
```

Individual parsers and the `microToSTX` utility are also exported.

---

## Deployment

### Vercel

1. Import the repo on Vercel
2. Set **Root Directory** to empty (repo root)
3. Framework preset: **Next.js**
4. Add all environment variables from `.env.example`
5. Deploy

### Contract

1. Deploy `contracts/wrapped-registry.clar` to Stacks Mainnet via Leather
2. Copy the deployer address into `NEXT_PUBLIC_CONTRACT_DEPLOYER`
3. Verify `get-total-wrapped` returns `u0` on the Hiro Explorer

---

## License

MIT
