import Link from "next/link";

export default function NotFound() {
  return (
    <main className="error-page">
      <div className="error-page-content">
        <h1 className="error-page-title" style={{ fontSize: "4rem", opacity: 0.15 }}>404</h1>
        <h2 style={{ fontSize: "1.25rem", fontWeight: 600, marginBottom: "0.5rem" }}>Page Not Found</h2>
        <p style={{ color: "rgba(255,255,255,0.5)", marginBottom: "1.5rem" }}>
          This Wrapped card doesn&apos;t exist or the address is invalid.
        </p>
        <Link href="/" className="btn btn-primary">
          Go Home
        </Link>
      </div>
    </main>
  );
}
