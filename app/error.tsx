"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-950 text-white">
      <div className="max-w-md text-center">
        <h1 className="text-4xl font-bold mb-4">Something went wrong</h1>
        <p className="text-slate-400 mb-8">{error.message}</p>
        <button
          onClick={() => reset()}
          className="px-6 py-2 bg-sky-500 hover:bg-sky-600 rounded-lg font-semibold transition"
        >
          Try again
        </button>
      </div>
    </div>
  );
}
