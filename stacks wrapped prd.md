# PRD: Stacks Wrapped
**Version:** 1.0  
**Author:** Winszn / SolidWorks  
**Target:** Coding Agent  
**Network:** Stacks Mainnet  
**Status:** Ready for Implementation

---

## 0. Agent Directives

These rules are non-negotiable for every file in this project:

- No hardcoded values. All constants (API URLs, contract addresses, network config) go in a single `constants.ts` file.
- No mocks, stubs, or placeholder data. Every data path must be a real API call or real contract read.
- No TODOs, no partial implementations, no `// implement later` comments.
- No generic naming. Variables, functions, components, and files must be named for what they actually do.
- All async operations must have proper error boundaries and loading states.
- TypeScript strict mode on everything.
- Ship complete, working code or nothing.

---

## 1. Project Overview

**Stacks Wrapped** is a web application where users connect their Stacks wallet, fetch their lifetime on-chain stats from the Hiro API, and generate a shareable PNG "Wrapped Card." To unlock and download the final card, users must call a Clarity smart contract (`wrapped-registry.clar`), creating verifiable on-chain proof of participation.

A public leaderboard reads directly from the contract to show total cards generated and the most recent claimers — driving organic FOMO.

The project also ships a standalone npm package (`@winsznx/stacks-wrapped-parser`) that contains all stat-computation logic, allowing it to be reused across other Stacks projects.

---

## 2. Repository Structure

**Type:** Monorepo using npm workspaces.

```
stacks-wrapped/
├── package.json                     # Root workspace config
├── turbo.json                       # Turborepo pipeline config
├── apps/
│   └── web/                         # Next.js 14 App Router application
│       ├── app/
│       │   ├── layout.tsx
│       │   ├── page.tsx             # Landing / home
│       │   ├── wrapped/
│       │   │   └── page.tsx         # Main wrapped experience
│       │   └── leaderboard/
│       │       └── page.tsx         # Leaderboard page
│       ├── components/
│       │   ├── wallet/
│       │   │   ├── WalletConnectButton.tsx
│       │   │   └── WalletProvider.tsx
│       │   ├── wrapped/
│       │   │   ├── AddressInput.tsx
│       │   │   ├── StatsLoader.tsx
│       │   │   ├── WrappedCard.tsx
│       │   │   ├── WrappedCardPreview.tsx
│       │   │   └── ClaimButton.tsx
│       │   └── leaderboard/
│       │       ├── LeaderboardTable.tsx
│       │       └── GlobalCounter.tsx
│       ├── lib/
│       │   ├── constants.ts
│       │   ├── hiro-api.ts
│       │   ├── contract-reads.ts
│       │   └── card-generator.ts
│       ├── hooks/
│       │   ├── useWrappedStats.ts
│       │   └── useLeaderboard.ts
│       └── public/
│           └── fonts/
└── packages/
    └── stacks-wrapped-parser/       # npm package: @winsznx/stacks-wrapped-parser
        ├── package.json
        ├── tsconfig.json
        ├── src/
        │   ├── index.ts
        │   ├── types.ts
        │   ├── parsers/
        │   │   ├── computeTotalTransactions.ts
        │   │   ├── computeTotalFeesPaid.ts
        │   │   ├── computeFirstTransactionDate.ts
        │   │   ├── computeFavoriteContract.ts
        │   │   └── computeBiggestSTXTransfer.ts
        │   └── utils/
        │       └── microToSTX.ts
        └── dist/                    # Built output
```

---

## 3. Smart Contract — `wrapped-registry.clar`

**Network:** Stacks Mainnet  
**Deployer:** Configured via environment variable `NEXT_PUBLIC_CONTRACT_DEPLOYER`  
**Contract Name:** `wrapped-registry`

### Storage

```clarity
(define-data-var total-wrapped-generated uint u0)

(define-map wrapped-claimers
  principal
  { claimed-at-block: uint }
)
```

### Public Functions

```clarity
(define-public (claim-wrapped-card))
```

**Behavior:**
1. Check if `tx-sender` has already claimed. If yes, return `(err u100)` — duplicate claim error.
2. If not, insert `tx-sender` into `wrapped-claimers` map with `block-height`.
3. Increment `total-wrapped-generated` by 1.
4. Return `(ok true)`.

### Read-Only Functions

```clarity
(define-read-only (get-total-wrapped))
;; Returns: (ok uint) — the current value of total-wrapped-generated

(define-read-only (has-claimed (user principal)))
;; Returns: (ok bool) — whether the principal has already claimed

(define-read-only (get-claim-info (user principal)))
;; Returns: (ok { claimed-at-block: uint }) or (err u404)
```

### Error Codes

| Code | Meaning |
|------|---------|
| u100 | Already claimed |
| u404 | Principal not found |

---

## 4. NPM Package — `@winsznx/stacks-wrapped-parser`

**Registry:** npm public, under `@winsznx` org.

### `src/types.ts`

```typescript
export interface RawTransaction {
  tx_id: string;
  tx_type: string;
  burn_block_time_iso: string;
  fee_rate: string;
  sender_address: string;
  token_transfer?: {
    recipient_address: string;
    amount: string;
  };
  contract_call?: {
    contract_id: string;
    function_name: string;
  };
}

export interface WrappedStats {
  totalTransactions: number;
  totalFeesPaidSTX: number;      // converted from microSTX
  firstTransactionDate: string;  // ISO date string
  favoriteContract: string;      // contract ID with most calls
  biggestSTXTransferSTX: number; // converted from microSTX
}
```

### `src/parsers/computeTotalTransactions.ts`

Takes `RawTransaction[]`, returns `number` — length of the array.

### `src/parsers/computeTotalFeesPaid.ts`

Takes `RawTransaction[]`, returns `number` — sum of all `fee_rate` values converted from microSTX to STX via `microToSTX()`.

### `src/parsers/computeFirstTransactionDate.ts`

Takes `RawTransaction[]`, returns `string` — the ISO date of the transaction with the earliest `burn_block_time_iso`. Returns `"N/A"` if the array is empty.

### `src/parsers/computeFavoriteContract.ts`

Takes `RawTransaction[]`, returns `string` — filters for `tx_type === "contract_call"`, groups by `contract_call.contract_id`, returns the ID with the highest call count. Returns `"None"` if no contract calls exist.

### `src/parsers/computeBiggestSTXTransfer.ts`

Takes `RawTransaction[]`, returns `number` — filters for `tx_type === "token_transfer"`, finds the max `token_transfer.amount`, converts from microSTX via `microToSTX()`. Returns `0` if no transfers exist.

### `src/utils/microToSTX.ts`

```typescript
export function microToSTX(microSTX: string | number): number {
  return Number(microSTX) / 1_000_000;
}
```

### `src/index.ts`

Exports: `computeWrappedStats(txs: RawTransaction[]): WrappedStats` — a single orchestrator that calls all five parsers and returns a complete `WrappedStats` object.

Also individually exports each parser function and the `microToSTX` utility.

---

## 5. Next.js Application — `apps/web`

### 5.1 Environment Variables

All required. App must throw a build error if any are missing.

```
NEXT_PUBLIC_HIRO_API_BASE=https://api.hiro.so
NEXT_PUBLIC_CONTRACT_DEPLOYER=<mainnet deployer address>
NEXT_PUBLIC_CONTRACT_NAME=wrapped-registry
NEXT_PUBLIC_NETWORK=mainnet
```

### 5.2 `lib/constants.ts`

Single source of truth. Exports:

```typescript
export const HIRO_API_BASE = process.env.NEXT_PUBLIC_HIRO_API_BASE!;
export const CONTRACT_DEPLOYER = process.env.NEXT_PUBLIC_CONTRACT_DEPLOYER!;
export const CONTRACT_NAME = process.env.NEXT_PUBLIC_CONTRACT_NAME!;
export const CONTRACT_IDENTIFIER = `${CONTRACT_DEPLOYER}.${CONTRACT_NAME}`;
export const STACKS_NETWORK = process.env.NEXT_PUBLIC_NETWORK!; // "mainnet"
export const TX_FETCH_LIMIT = 50; // Hiro API page limit per request
export const TX_MAX_PAGES = 10;   // Max pages to fetch (500 txs total)
```

### 5.3 `lib/hiro-api.ts`

Exports one function: `fetchAllTransactions(address: string): Promise<RawTransaction[]>`

**Behavior:**
- Fetches paginated results from `GET /extended/v1/address/{address}/transactions` on `api.hiro.so`.
- Iterates through pages using `offset` param until fewer results than `TX_FETCH_LIMIT` are returned or `TX_MAX_PAGES` is reached.
- Concatenates all pages and returns the full array.
- On non-200 HTTP status, throws a typed error: `class HiroAPIError extends Error`.

### 5.4 `lib/contract-reads.ts`

Uses `@stacks/transactions` to make read-only contract calls on mainnet.

Exports:
- `getTotalWrapped(): Promise<number>` — calls `get-total-wrapped`, parses the Clarity `uint` response.
- `hasClaimed(address: string): Promise<boolean>` — calls `has-claimed` with the given principal.

### 5.5 `lib/card-generator.ts`

Exports: `generateWrappedCardPNG(elementId: string): Promise<Blob>`

Uses `html2canvas` to capture the DOM element with the given ID and returns a `Blob` in PNG format at 2x device pixel ratio for high-res output.

---

## 6. Application Pages & User Flow

### 6.1 Landing Page (`app/page.tsx`)

- Hero section: App name, tagline ("Your on-chain story, committed to the chain."), CTA button "Generate My Wrapped".
- Brief explainer of what the app does (3 bullet points max, no buzzwords).
- Link to Leaderboard.
- No wallet connection required on this page.

### 6.2 Wrapped Experience Page (`app/wrapped/page.tsx`)

**State machine — four discrete states:**

#### State 1: Address Input
- `AddressInput` component renders a text field.
- User pastes any Stacks mainnet address (or wallet connection auto-fills it).
- "Connect Wallet" button via `WalletConnectButton` (supports both Leather and Xverse via `@stacks/connect`).
- "Preview with address" allows read-only entry without connecting.
- On submit, transitions to State 2.

#### State 2: Loading
- `StatsLoader` component.
- Shows a terminal-style animated log of what's being fetched: "Scanning transactions...", "Computing fees...", "Finding your favorite contract...", etc.
- Actually calls `fetchAllTransactions(address)` then `computeWrappedStats(txs)` from the parser package.
- On success, transitions to State 3.
- On error, shows the specific error message (never a generic "Something went wrong").

#### State 3: Preview Card (Blurred / Locked)
- `WrappedCardPreview` renders the stats card with a blur/frosted overlay.
- All 5 stats are visible but visually obscured.
- Overlay text: "Connect wallet & claim on-chain to unlock your card."
- If wallet is already connected AND `hasClaimed(address)` returns `true`, skip to State 4 automatically.
- If wallet connected and not yet claimed: `ClaimButton` is shown. Clicking it calls `claim-wrapped-card` on the contract via `@stacks/connect` `openContractCall`. On confirmed transaction, transitions to State 4.
- If in read-only mode (no wallet): "Connect Wallet to Claim" button — clicking it opens wallet connect flow.

#### State 4: Unlocked Card
- `WrappedCard` renders the full, unblurred card.
- "Download PNG" button calls `generateWrappedCardPNG('wrapped-card')` and triggers browser download.
- "Share on X" button opens a pre-composed tweet: `"Just generated my Stacks Wrapped! 🔗 [X txs | Y STX fees | since DATE] — claim yours at [app URL] #StacksWrapped"`
- "View Leaderboard" link.

### 6.3 Leaderboard Page (`app/leaderboard/page.tsx`)

- `GlobalCounter` component: Large hero number showing `getTotalWrapped()` — "X Wrapped Cards Generated On-Chain".
- `LeaderboardTable` component: Reads contract events from Hiro API (`GET /extended/v1/contract/{contract_id}/events`) to display the last 20 principals who called `claim-wrapped-card`, with their block height and a relative time (e.g., "3 hours ago").
- Auto-refreshes every 30 seconds via `useLeaderboard` hook.
- Each row links to the user's wrapped preview (read-only mode for that address).

---

## 7. WrappedCard Component — Visual Spec

**Element ID:** `wrapped-card` (used by `html2canvas` capture)

**Design System:**

| Token | Value |
|---|---|
| Background | `#0a0a0f` (near-black) |
| Primary Neon | `#00ff94` (terminal green) |
| Secondary Neon | `#7b61ff` (electric violet) |
| Accent | `#ff3c6e` (hot pink — used sparingly for biggest transfer) |
| Text Primary | `#e8e8f0` |
| Text Muted | `#5a5a7a` |
| Font Display | `JetBrains Mono` (monospace, all stat numbers) |
| Font Body | `Syne` (clean geometric, for labels) |
| Card Size | `800 × 450px` (16:9, optimized for social sharing) |

**Card Layout:**

```
┌────────────────────────────────────────────────────┐
│  STACKS WRAPPED 2025         [address truncated]   │  <- header row
│  ─────────────────────────────────────────────     │
│                                                    │
│   TX COUNT        FEE TOTAL        FIRST TX DATE   │
│   [number]        [X.XX STX]       [DATE]          │
│                                                    │
│   ─────────────────────────────────────────────   │
│                                                    │
│   FAV CONTRACT                   BIGGEST TRANSFER  │
│   [contract.id]                  [X.XX STX]        │
│                                                    │
│  ─────────────────────────────────────────────     │
│  stacks-wrapped.xyz              #StacksWrapped    │  <- footer
└────────────────────────────────────────────────────┘
```

- Stat numbers rendered in `JetBrains Mono`, large (2.5–3rem), neon green.
- Labels in `Syne`, small (0.7rem), muted color, uppercase tracked.
- Subtle CRT scanline texture overlay via CSS (repeating linear gradient, 2px lines, 3% opacity).
- Thin neon border (`1px solid rgba(0, 255, 148, 0.3)`), inner glow via `box-shadow`.
- Favorite contract truncated to 28 chars with ellipsis.

---

## 8. Hooks

### `useWrappedStats(address: string)`

```typescript
return {
  stats: WrappedStats | null,
  isLoading: boolean,
  error: string | null,
  refetch: () => void
}
```

Calls `fetchAllTransactions` then `computeWrappedStats`. Memoizes result by address.

### `useLeaderboard()`

```typescript
return {
  totalGenerated: number | null,
  recentClaimers: { address: string; blockHeight: number; relativeTime: string }[],
  isLoading: boolean,
  error: string | null
}
```

Fetches from `getTotalWrapped()` and Hiro contract events endpoint. Polls every 30 seconds via `setInterval` with proper cleanup on unmount.

---

## 9. Wallet Integration

**Package:** `@stacks/connect`

**WalletProvider.tsx:**
- Wraps the app in `Connect` context from `@stacks/connect`.
- Provides `userSession` and `appConfig` configured for mainnet.

**WalletConnectButton.tsx:**
- Renders a single "Connect Wallet" button.
- On click: calls `showConnect` from `@stacks/connect` with `appDetails` (name: "Stacks Wrapped", icon: app logo URL).
- Both Leather and Xverse respond to this standard connect flow.
- When connected, displays truncated address (first 6 + last 4 chars) and a "Disconnect" option.

**ClaimButton.tsx:**
- Only renders when wallet is connected and `hasClaimed(address)` is `false`.
- On click: calls `openContractCall` with:
  - `contractAddress`: `CONTRACT_DEPLOYER`
  - `contractName`: `CONTRACT_NAME`
  - `functionName`: `"claim-wrapped-card"`
  - `functionArgs`: `[]`
  - `network`: mainnet `StacksMainnet` instance
  - `onFinish`: callback that sets local state to "claimed" and triggers State 4 transition
  - `onCancel`: no-op (user dismissed the wallet popup)
- Shows a loading spinner while the transaction is pending (use `onFinish` for confirmation).

---

## 10. Package Configuration

### Root `package.json`

```json
{
  "name": "stacks-wrapped",
  "private": true,
  "workspaces": ["apps/*", "packages/*"],
  "scripts": {
    "dev": "turbo run dev",
    "build": "turbo run build",
    "lint": "turbo run lint",
    "publish:parser": "cd packages/stacks-wrapped-parser && npm publish --access public"
  }
}
```

### `packages/stacks-wrapped-parser/package.json`

```json
{
  "name": "@winsznx/stacks-wrapped-parser",
  "version": "1.0.0",
  "main": "./dist/index.js",
  "types": "./dist/index.d.ts",
  "files": ["dist"],
  "scripts": {
    "build": "tsc",
    "prepublishOnly": "npm run build"
  },
  "devDependencies": {
    "typescript": "^5.0.0"
  }
}
```

### `apps/web` Key Dependencies

```json
{
  "dependencies": {
    "@stacks/connect": "^7.x",
    "@stacks/transactions": "^6.x",
    "@winsznx/stacks-wrapped-parser": "*",
    "html2canvas": "^1.4.1",
    "next": "14.x",
    "react": "^18.x",
    "react-dom": "^18.x"
  }
}
```

---

## 11. Clarity Contract — Full Implementation

```clarity
;; wrapped-registry.clar
;; Stacks Wrapped — on-chain participation registry
;; Network: Mainnet

(define-data-var total-wrapped-generated uint u0)

(define-map wrapped-claimers
  principal
  { claimed-at-block: uint }
)

(define-public (claim-wrapped-card)
  (let ((caller tx-sender))
    (asserts! (is-none (map-get? wrapped-claimers caller)) (err u100))
    (map-set wrapped-claimers caller { claimed-at-block: block-height })
    (var-set total-wrapped-generated (+ (var-get total-wrapped-generated) u1))
    (ok true)
  )
)

(define-read-only (get-total-wrapped)
  (ok (var-get total-wrapped-generated))
)

(define-read-only (has-claimed (user principal))
  (ok (is-some (map-get? wrapped-claimers user)))
)

(define-read-only (get-claim-info (user principal))
  (match (map-get? wrapped-claimers user)
    entry (ok entry)
    (err u404)
  )
)
```

---

## 12. Deployment Checklist

**Contract:**
- [ ] Deploy `wrapped-registry.clar` to Stacks Mainnet via Leather wallet
- [ ] Copy deployer address and contract name into `.env.local`
- [ ] Verify `get-total-wrapped` returns `u0` via Hiro explorer

**NPM Package:**
- [ ] `cd packages/stacks-wrapped-parser && npm run build`
- [ ] Verify `dist/` contains `index.js` and `index.d.ts`
- [ ] `npm publish --access public` under `@winsznx` org

**Web App:**
- [ ] All env vars set in Vercel dashboard
- [ ] `turbo run build` passes with zero TypeScript errors
- [ ] Deploy to Vercel with Next.js preset
- [ ] Test full flow: paste address → stats load → connect wallet → claim → download PNG
- [ ] Test leaderboard auto-refresh on a second browser tab

---

## 13. Out of Scope (V1)

- No auth, no database, no backend API routes — everything is Hiro API + contract reads.
- No NFT minting of the card.
- No external indexers beyond `api.hiro.so`.
- No custom subdomain/ENS linking.
- No email capture or waitlist.

## Sprint Completion Notes

All 8 days of the modernization sprint have been completed. Key deliverables include Stacks.js v7 migration, comprehensive error handling, hook refactoring, and performance optimization.

## Implemented Features Sync
- V7 migration complete
- Resilience hardening complete
