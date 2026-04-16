import { Spinner } from "@/components/ui/Spinner";

export default function WrappedLoading() {
  return (
    <main className="wrapped-page">
      <div className="wrapped-loading">
        <Spinner />
        <p>Preparing your Wrapped...</p>
      </div>
    </main>
  );
}
