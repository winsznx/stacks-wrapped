export const CONTRACT_FUNCTIONS = {
  claimWrappedCard: "claim-wrapped-card",
  getTotalWrapped: "get-total-wrapped",
  hasClaimed: "has-claimed",
  getClaimInfo: "get-claim-info",
} as const;

export const CONTRACT_ERRORS = {
  alreadyClaimed: 100,
  notFound: 404,
} as const;
