import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Reveal } from "@/components/motion/reveal";
import { Accordion } from "@/components/ui/accordion";
import { LinkButton } from "@/components/ui/button";
import { CtaBanner } from "@/components/sections/cta-banner";
import { faqs } from "@/data/site";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Answers to common questions about Nurture+ IV therapy products, distribution and partnerships.",
};

export default function FaqPage() {
  return (
    <>
      <section className="relative overflow-hidden pb-16 pt-4 md:pb-24">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-48 right-[-8%] h-[440px] w-[440px] rounded-full bg-emerald-100/35 blur-[130px] dark:bg-emerald-500/[0.07]"
        />
        <Breadcrumbs items={[{ label: "FAQ" }]} />
        <div className="container container-px relative mt-8 grid grid-cols-1 gap-14 lg:grid-cols-[0.72fr_1.28fr]">
          {/* The question list is the page; the intro stays out of its way. */}
          <Reveal>
            <div className="lg:sticky lg:top-28">
              <span className="eyebrow">FAQ</span>
              <h1 className="mt-4 text-display-lg font-bold text-ink-950 dark:text-white">
                Frequently asked questions
              </h1>
              <p className="mt-5 max-w-[38ch] text-body-md text-ink-600 dark:text-white/70">
                Can&rsquo;t find what you&rsquo;re looking for? Our team answers distributor and
                clinical enquiries directly.
              </p>
              <LinkButton href="/contact" variant="secondary" className="mt-6">
                Contact our team
              </LinkButton>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <Accordion items={faqs} />
          </Reveal>
        </div>
      </section>

      <CtaBanner
        title="Still deciding?"
        description="Review the full portfolio, with composition and packaging detail on every product."
        actions={
          <LinkButton href="/products" variant="on-dark">
            Explore products
          </LinkButton>
        }
      />
    </>
  );
}
