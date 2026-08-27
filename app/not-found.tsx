import Link from "next/link";

export default function NotFound() {
  return (
    <div className="px-8 py-16">
      <div className="label">Not in the case file</div>
      <h1 className="mt-3 text-3xl font-semibold tracking-tight text-ink-primary">No record at this address.</h1>
      <p className="mt-3 max-w-xl text-base leading-relaxed text-ink-secondary">
        The route does not exist. Use search (press ⌘K) or return to the command view.
      </p>
      <Link href="/" className="mt-6 inline-block border border-line px-3 py-2 text-sm text-ink-primary hover:border-line-strong">Command view</Link>
    </div>
  );
}
