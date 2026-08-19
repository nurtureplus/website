import type { Metadata } from "next";
import { CheckCircle2, Cog, Droplets, ShieldCheck, Stethoscope, Truck } from "lucide-react";
import { PageHeader } from "@/components/ui/page-header";
import { RevealGroup, RevealItem } from "@/components/motion/reveal";
import { ClinicalBenefits } from "@/components/sections/clinical-benefits";
import { Standards } from "@/components/sections/standards";
import { CtaBanner } from "@/components/sections/cta-banner";
import { LinkButton } from "@/components/ui/button";
import { whyChooseUs } from "@/data/site";

export const metadata: Metadata = {
  title: "Why Nurture+",
  description:
    "Why hospitals, clinics and distributors choose Nurture+: WHO-GMP certified manufacturing, declared compositions, and a consistent, reliable IV therapy supply.",
};

const icons = [ShieldCheck, Cog, Stethoscope, Droplets, Truck, CheckCircle2];

export default function WhyNurturePlusPage() {
  return (
    <>
      <PageHeader
        eyebrow="Why Nurture+"
        title="A supply partner as consistent as your own standards."
        lede="Everything we do is built around one goal: giving healthcare partners a supply of IV products they can depend on, batch after batch."
        crumbs={[{ label: "Why Nurture+" }]}
      />

      <section className="section-y surface-muted" aria-labelledby="reasons-heading">
        <div className="container container-px">
          <h2 id="reasons-heading" className="sr-only">
            Reasons to choose Nurture+
          </h2>
          <RevealGroup className="grid grid-cols-1 gap-x-10 gap-y-11 sm:grid-cols-2 lg:grid-cols-3">
            {whyChooseUs.map((item, i) => {
              const Icon = icons[i];
              return (
                <RevealItem key={item.title} className="flex gap-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-emerald-50 dark:bg-emerald-400/10">
                    <Icon size={19} className="text-emerald-700 dark:text-emerald-300" strokeWidth={1.9} />
                  </span>
                  <div>
                    <h3 className="text-body-md font-bold">{item.title}</h3>
                    <p className="mt-1.5 text-body-sm text-ink-600 dark:text-white/65">
                      {item.description}
                    </p>
                  </div>
                </RevealItem>
              );
            })}
          </RevealGroup>
        </div>
      </section>

      <ClinicalBenefits />
      <Standards />

      <CtaBanner
        title="See the full product range"
        description="Every formulation, composition and packaging detail in one place."
        actions={
          <LinkButton href="/products" variant="on-dark">
            Explore products
          </LinkButton>
        }
      />
    </>
  );
}
