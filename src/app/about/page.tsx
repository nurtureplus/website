import type { Metadata } from "next";
import { BadgeCheck, Building2, FlaskConical, HeartHandshake } from "lucide-react";
import { PageHeader } from "@/components/ui/page-header";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal";
import { LinkButton } from "@/components/ui/button";
import { Standards } from "@/components/sections/standards";
import { CtaBanner } from "@/components/sections/cta-banner";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Nurture+ formulates and supplies premium IV therapy products for hospitals, clinics and wellness centers, manufactured under WHO-GMP certified standards.",
};

const pillars = [
  {
    icon: FlaskConical,
    title: "A scientific approach",
    description:
      "Every formulation starts from pharmacopeia-grade actives and disciplined process control, not shortcuts.",
  },
  {
    icon: BadgeCheck,
    title: "Premium ingredients",
    description:
      "Compositions are declared clearly on every label — no proprietary blends, no guesswork for prescribing clinicians.",
  },
  {
    icon: Building2,
    title: "Manufacturing standards",
    description:
      "Manufactured under WHO-GMP certified standards, with single-dose, tamper-evident packaging.",
  },
  {
    icon: HeartHandshake,
    title: "Healthcare partnerships",
    description:
      "Built for hospitals, clinics and distributors who need a supply partner as consistent as their own standards.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About Nurture+"
        title="Quality is our foundation."
        lede="At Nurture+, we believe true wellness begins at the cellular level. Every product we make is developed with care, science and trust — we don't just make products, we promote healthier lives."
        crumbs={[{ label: "About" }]}
      >
        <p className="mt-5 text-body-md text-ink-600 dark:text-white/65">
          We formulate and supply premium IV therapy products for healthcare professionals:
          hospitals, functional medicine clinics, IV therapy clinics, wellness centers and medical
          distributors who need a partner they can rely on. Our portfolio spans cellular wellness,
          antioxidant therapy and essential mineral formulations — a focused range rather than an
          unfocused catalog.
        </p>
      </PageHeader>

      <section className="section-y surface-muted" aria-labelledby="principles-heading">
        <div className="container container-px">
          <Reveal>
            <span className="eyebrow">What We Stand For</span>
            <h2 id="principles-heading" className="mt-4 text-display-md font-bold">
              Our principles
            </h2>
          </Reveal>
          <RevealGroup className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2">
            {pillars.map((p) => (
              <RevealItem
                key={p.title}
                className="rounded-xl2 border border-ink-100/70 bg-white p-7 shadow-card dark:border-white/10 dark:bg-ink-900"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-50 dark:bg-emerald-400/10">
                  <p.icon size={19} className="text-emerald-700 dark:text-emerald-300" strokeWidth={1.9} />
                </span>
                <h3 className="mt-4 text-body-md font-bold">{p.title}</h3>
                <p className="mt-2 text-body-sm text-ink-600 dark:text-white/65">{p.description}</p>
              </RevealItem>
            ))}
          </RevealGroup>

          <Reveal className="mt-12">
            <div className="rounded-xl2 border border-ink-100/70 bg-white p-8 shadow-card dark:border-white/10 dark:bg-ink-900">
              <h2 className="text-caption font-bold uppercase tracking-[0.14em] text-ink-500 dark:text-white/50">
                Registered Office
              </h2>
              <p className="mt-3 text-body-lg font-bold">
                {site.legalName}, {site.parentGroup}
              </p>
              <address className="mt-5 not-italic text-body-md text-ink-600 dark:text-white/65">
                {site.address.join(", ")}
              </address>
            </div>
          </Reveal>
        </div>
      </section>

      <Standards />

      <CtaBanner
        title="Want to work with us?"
        description="Explore the product range or start a distributor conversation."
        actions={
          <>
            <LinkButton href="/products" variant="on-dark">
              Explore products
            </LinkButton>
            <LinkButton
              href="/#distributor"
              variant="secondary"
              className="border-white/25 bg-transparent text-white hover:border-white/45 hover:bg-white/5"
            >
              Become a distributor
            </LinkButton>
          </>
        }
      />
    </>
  );
}
