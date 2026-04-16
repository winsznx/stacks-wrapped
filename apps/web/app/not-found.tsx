import Link from "next/link";
import { ROUTES } from "@/lib/routes";

export default function NotFound() {
  return (
    <main className="not-found-page">
      <div className="not-found-content">
        <h1 className="not-found-code">404</h1>
        <p className="not-found-message">
          The page you&apos;re looking for does not exist.
        </p>
        <Link href={ROUTES.home} className="btn btn-primary">
          Back to Home
        </Link>
      </div>
    </main>
  );
}
