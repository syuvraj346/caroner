export default function AdminPortalPage() {
  return (
    <main className="container-shell flex-1 py-10">
      <section className="surface-card rounded-[28px] p-8">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
          Admin Shell
        </p>
        <h1 className="mt-3 text-4xl font-semibold text-foreground">
          Admin operations and platform control
        </h1>
        <p className="mt-4 max-w-3xl text-base leading-7 text-muted">
          This shell will support vendor approvals, booking oversight, service
          management, support workflows, and platform-level reporting.
        </p>

        <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {[
            "Vendor approvals and suspensions",
            "Booking monitoring and intervention",
            "Service catalog governance",
            "Support tickets, reviews, and audit logs",
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
