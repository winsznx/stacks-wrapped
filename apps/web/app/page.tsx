import dynamic from "next/dynamic";
import Link from "next/link";

export default function LandingPage() {
  return (
    <main className="landing-page">
      <section className="hero">
        <h1 className="hero-title">
          STACKS <span className="hero-highlight">WRAPPED</span>
        </h1>
        <p className="hero-tagline">
          Your on-chain story, committed to the chain.
        </p>

        <Link href="/wrapped" className="btn btn-primary btn-lg">
          Generate My Wrapped
        </Link>

        <div className="hero-explainer">
          <ul>
            <li>Fetch your lifetime Stacks on-chain stats from the Hiro API</li>
            <li>
              Generate a shareable PNG Wrapped Card with your transaction history
            </li>
            <li>
              Claim your card on-chain via a Clarity smart contract for
              verifiable proof
            </li>
          </ul>
        </div>

        <Link href="/leaderboard" className="btn btn-secondary">
          View Leaderboard
        </Link>
      </section>
    </main>
  );
}

// Selective hydration implemented
