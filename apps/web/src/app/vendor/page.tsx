export default function VendorPortalPage() {
  return (
    <main className="container-shell flex-1 py-10">
      <section className="surface-card rounded-[28px] p-8">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
          Vendor Portal Shell
        </p>
        <h1 className="mt-3 text-4xl font-semibold text-foreground">
          Manage services, requests, and visibility
        </h1>
        <p className="mt-4 max-w-3xl text-base leading-7 text-muted">
          This shell will support vendor onboarding, service listing management,
          booking request handling, ratings, and operational settings.
        </p>

        <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {[
            "Vendor onboarding and verification",
            "Service catalog and pricing setup",
            "Booking inbox and status updates",
            "Reviews, analytics, and settings",
          ].map((item) => (
            <div key={item} className="rounded-2xl border border-border bg-card p-4 text-sm text-muted">
              {item}
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
