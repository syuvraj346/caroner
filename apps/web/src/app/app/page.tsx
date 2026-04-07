export default function CustomerAppPage() {
  return (
    <main className="container-shell flex-1 py-10">
      <section className="surface-card rounded-[28px] p-8">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
          Customer App Shell
        </p>
        <h1 className="mt-3 text-4xl font-semibold text-foreground">
          Customer booking experience
        </h1>
        <p className="mt-4 max-w-3xl text-base leading-7 text-muted">
          This shell will host service discovery, booking flow, vehicle profiles,
          booking history, and support experiences for car owners.
        </p>

        <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {[
            "Home and category discovery",
            "Booking flow and provider selection",
            "Vehicle and profile management",
            "My bookings and support",
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
