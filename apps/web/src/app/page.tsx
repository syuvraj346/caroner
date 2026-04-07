const categories = [
  {
    title: "Emergency Services",
    description:
      "Roadside support, towing, battery jumpstart, fuel delivery, and flat tire help when urgency matters most.",
  },
  {
    title: "Maintenance Services",
    description:
      "Routine servicing, inspections, repairs, tyres, batteries, AC work, and wash services in one place.",
  },
  {
    title: "Convenience Services",
    description:
      "Insurance renewals, pollution checks, FASTag recharge, rentals, subscriptions, legal help, and more.",
  },
  {
    title: "Enhancement Services",
    description:
      "Detailing, accessories, modifications, ceramic coating, EV charging, concierge, and club services.",
  },
];

const highlights = [
  "Single platform for car ownership workflows",
  "Role-based experience for customers, vendors, and admins",
  "Built for phased launch across web first, then Android and iOS",
];

export default function Home() {
  return (
    <main className="flex-1">
      <section className="container-shell py-8 md:py-12">
        <div className="surface-card rounded-[28px] px-6 py-6 md:px-10 md:py-8">
          <div className="flex flex-col gap-8">
            <div className="flex items-center justify-between gap-4 flex-wrap">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-primary">
                  CarOner Platform
                </p>
                <h1 className="mt-3 max-w-3xl text-4xl font-semibold tracking-tight text-foreground md:text-6xl">
                  One platform for car ownership services, from emergencies to upgrades.
                </h1>
                <p className="mt-4 max-w-2xl text-base leading-7 text-muted md:text-lg">
                  CarOner helps car owners discover nearby providers, make bookings,
                  manage vehicle needs, and stay on top of everyday ownership tasks.
                </p>
              </div>

              <div className="rounded-3xl border border-border bg-accent px-5 py-4 text-sm text-foreground">
                <p className="font-semibold">Phase 1 focus</p>
                <p className="mt-2 text-muted">
                  Web app, vendor portal, admin operations, and shared backend.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <a
                href="/app"
                className="rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground"
              >
                Open customer app shell
              </a>
              <a
                href="/vendor"
                className="rounded-full border border-border bg-card px-5 py-3 text-sm font-semibold text-foreground"
              >
                Open vendor portal shell
              </a>
              <a
                href="/admin"
                className="rounded-full border border-border bg-card px-5 py-3 text-sm font-semibold text-foreground"
              >
                Open admin shell
              </a>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              {highlights.map((highlight) => (
                <div
                  key={highlight}
                  className="rounded-2xl border border-border bg-card px-4 py-4 text-sm text-muted"
                >
                  {highlight}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="container-shell pb-12">
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {categories.map((category) => (
            <article
              key={category.title}
              className="surface-card rounded-[24px] p-5"
            >
              <p className="text-sm font-semibold text-primary">Category</p>
              <h2 className="mt-3 text-2xl font-semibold text-foreground">
                {category.title}
              </h2>
              <p className="mt-3 text-sm leading-6 text-muted">
                {category.description}
              </p>
              <div className="mt-5 text-sm font-medium text-success">
                MVP ready for service catalog and booking flows
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
