# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

## [Unreleased]

### Added
- UI primitive component library (Button, Input, Spinner, Skeleton, Badge, Alert, Card, Label, Divider, EmptyState, ExternalLink, VisuallyHidden)
- Custom React hooks (useDebounce, useMediaQuery, useClickOutside, useLocalStorage, useCopyToClipboard, useInterval, useMounted, usePrevious, useScrollLock)
- Shared library utilities (cn, URL builders, share helpers, stacks address validation, clipboard, time/date formatting)
- Parser additions (computeContractCallCount, computeUniqueContractsCount, computeAverageFee, computeSuccessRate, computeTokenTransferCount, groupByType, isValidTransaction)
- Parser type guards (isContractCall, isTokenTransfer)
- PWA manifest, sitemap, and robots.txt generators
- Custom 404, route error boundary, and global error boundary
- Security headers middleware
- Unit test coverage for parsers and lib utilities

## [1.0.0] - 2026-04-14

### Added
- Initial release
- Next.js 14 web app with wallet connect, card generation, leaderboard
- Clarity 5 smart contract wrapped-registry.clar
- @winsznx/stacks-wrapped-parser npm package
