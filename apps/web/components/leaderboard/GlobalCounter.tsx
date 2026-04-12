"use client";

interface GlobalCounterProps {
  total: number | null;
  isLoading: boolean;
}

export function GlobalCounter({ total, isLoading }: GlobalCounterProps) {
  return (
    <div className="global-counter">
      <div className="global-counter-number">
        {isLoading ? (
          <span className="counter-loading">---</span>
        ) : (
          <span className="counter-value">{total ?? 0}</span>
        )}
      </div>
      <p className="global-counter-label">Wrapped Cards Generated On-Chain</p>
    </div>
  );
}
