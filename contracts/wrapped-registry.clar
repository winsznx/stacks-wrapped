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
