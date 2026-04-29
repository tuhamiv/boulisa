import { Link } from "react-router"
import { ArrowRight, Package, Users, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import Logo from "@/components/shared/logo"
import PricingCards from "@/components/shadcn-studio/pricing-block"

const menuItems = [
  { id: 1, href: "#features", name: "Features" },
  { id: 2, href: "#solution", name: "Solution" },
  { id: 3, href: "#pricing", name: "Pricing" }
]

const cards = [
  {
    id: 1,
    icon: Package,
    title: "Smart Waybills",
    description:
      "Digital management of your 'Boulisa' from creation to\ndelivery. Track every step with complete visibility and\ncontrol.",
  },
  {
    id: 2,
    icon: Users,
    title: "Managed Ecosystem",
    description:
      "Carriers have total control. Invite Shippers and Couriers to\nyour private network with granular permissions.",
  },
  {
    id: 3,
    icon: Zap,
    title: "Real-Time Logistics",
    description: "Live tracking and status history for every package. Get\ninstant updates and manage your fleet efficiently."
  },
]

const pricingData = [
  {
    id: 1,
    title: "Plan",
    description: "Ideal for delivery offices!",
    monthly: 9999,
    annual: 99999,
  },
]

function Home() {
  return (
    <>
      <div className="min-h-screen bg-background">
        <nav className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
            <Logo />
            <div className="hidden items-center gap-8 md:flex">
              {menuItems.map((item) => (
                <Link
                  key={item.id}
                  to={item.href}
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  {item.name}
                </Link>
              ))}
            </div>
            <Button size="sm" variant="default">
              Login
            </Button>
          </div>
        </nav>

        <section className="relative overflow-hidden">
          <div className="mx-auto max-w-7xl px-6 py-24 md:py-32 lg:py-40">
            <div className="grid items-center gap-12 lg:grid-cols-2">
              <div className="space-y-6">
                <div className="inline-flex items-center rounded-full bg-secondary px-4 py-2">
                  <span className="text-xs font-medium text-secondary-foreground">
                    Join our Active Carriers
                  </span>
                </div>
                <h1 className="text-4xl leading-tight font-bold text-balance text-foreground md:text-5xl lg:text-6xl">
                  Your Delivery Office, Optimized.
                </h1>
                <p className="max-w-2xl text-lg leading-relaxed text-muted-foreground">
                  The all-in-one platform for Carriers to manage Waybills
                  (Boulisas), invite Shippers, and track Couriers in real-time.
                </p>
                <div className="flex flex-col gap-4 pt-4 sm:flex-row">
                  <Link to="/signup">
                    <Button
                      size="lg"
                      className="bg-primary text-primary-foreground hover:bg-primary/90"
                    >
                      Start as a Carrier
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                  {/*<Button size="lg" variant="outline" className="border-border hover:bg-muted">Watch Demo</Button>*/}
                </div>
              </div>
              <div className="relative h-full min-h-80">
                <div className="absolute inset-0 rounded-2xl bg-linear-to-br from-primary/10 to-primary/5 blur-3xl" />
                <div className="relative space-y-4 rounded-2xl border border-border bg-card p-8 shadow-sm">
                  <div className="space-y-3">
                    <div className="h-3 w-3/4 rounded bg-muted" />
                    <div className="h-3 w-1/2 rounded bg-muted" />
                  </div>
                  <div className="space-y-2 pt-4">
                    <div className="h-2 w-full rounded bg-border" />
                    <div className="h-2 w-5/6 rounded bg-border" />
                    <div className="h-2 w-4/5 rounded bg-border" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="features" className="py-24 md:py-32">
          <div className="mx-auto max-w-7xl px-6">
            <div className="mb-16 text-center">
              <h2 className="mb-4 text-3xl font-bold text-balance text-foreground md:text-4xl">
                Everything You Need to Scale
              </h2>
              <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
                Powerful features designed for delivery management professionals
              </p>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {cards.map((card) => (
                <Card
                  key={card.id}
                  className="border-border bg-card p-8 transition-shadow hover:shadow-md"
                >
                  <div className="mb-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                      {<card.icon className="h-6 w-6 text-primary" />}
                    </div>
                  </div>
                  <h3 className="mb-3 text-xl font-semibold text-foreground">
                    {card.title}
                  </h3>
                  <p className="leading-relaxed text-muted-foreground">
                    {card.description}
                  </p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section id="solution" className="flex min-h-screen flex-col items-center justify-center border-y border-border bg-muted/30 px-6 pt-18">
          <div className="mx-auto w-full max-w-7xl">
            <div className="mb-16 text-center">
              <h2 className="mb-4 text-3xl font-bold text-foreground md:text-4xl">
                The Invitation Logic
              </h2>
              <p className="text-lg text-muted-foreground">
                Get started in three simple steps
              </p>
            </div>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              <div className="relative">
                <div className="flex flex-col items-center">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-lg font-bold text-primary-foreground">
                    1
                  </div>
                  <h3 className="mb-2 text-lg font-semibold text-foreground">
                    Sign Up as a Carrier
                  </h3>
                  <p className="text-center text-sm text-muted-foreground">
                    Create your account and set up your carrier profile in
                    minutes
                  </p>
                </div>
                <div className="absolute top-6 -right-4 hidden h-1 w-8 bg-border md:block" />
              </div>
              <div className="relative">
                <div className="flex flex-col items-center">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-lg font-bold text-primary-foreground">
                    2
                  </div>
                  <h3 className="mb-2 text-lg font-semibold text-foreground">
                    Invite Shippers & Couriers
                  </h3>
                  <p className="text-center text-sm text-muted-foreground">
                    Send invitations via email to your network and build your
                    ecosystem
                  </p>
                </div>
                <div className="absolute top-6 -right-4 hidden h-1 w-8 bg-border md:block" />
              </div>
              <div className="relative">
                <div className="flex flex-col items-center">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-lg font-bold text-primary-foreground">
                    3
                  </div>
                  <h3 className="mb-2 text-lg font-semibold text-foreground">
                    Manage & Track
                  </h3>
                  <p className="text-center text-sm text-muted-foreground">
                    Start managing orders and tracking revenue in real-time
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="pricing" className="flex min-h-screen flex-col items-center justify-center bg-background px-6 pt-18">
          <div className="w-full max-w-7xl">
            <PricingCards pricingData={pricingData} />
          </div>
        </section>

        <footer className="border-t border-border bg-muted/50">
          <div className="mx-auto max-w-7xl">
            <div className="flex flex-col items-center justify-between border-t border-border p-4 md:flex-row">
              <p className="text-sm text-muted-foreground">
                © 2026 Boulisa. All rights reserved.
              </p>
              <div className="mt-4 text-sm text-muted-foreground md:mt-0">
                Made with precision for delivery professionals
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  )
}

export default Home;
