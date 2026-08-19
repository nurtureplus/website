import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { audiences } from "@/data/site";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal";
import { PressableCard } from "@/components/motion/pressable";

/**
 * Wayfinding, immediately below the hero: who are you, and where do you go?
 * Each card is a single large target with the destination named on it.
 */
export function AudienceTriage() {
  return (
    <section className="section-y" aria-labelledby="audience-heading">
      <div className="container container-px">
        <Reveal>
          <span className="eyebrow">Get Started</span>
          <h2 id="audience-heading" className="mt-4 max-w-2xl text-display-md font-bold">
            Find the right path for your practice.
          </h2>
        </Reveal>

        <RevealGroup className="mt-12 grid gap-5 md:grid-cols-3">
          {audiences.map((audience) => (
            <RevealItem key={audience.id}>
              <PressableCard className="h-full">
                <Link
                  href={audience.href}
                  className="group flex h-full flex-col justify-between rounded-xl2 border border-ink-100/70 bg-white p-7 shadow-card transition-[box-shadow,border-color] duration-300 ease-out-strong hover:border-emerald-200 hover:shadow-lifted dark:border-white/10 dark:bg-white/[0.03] dark:hover:border-emerald-400/30"
                >
                  <div>
                    <h3 className="text-display-sm font-bold">{audience.title}</h3>
                    <p className="mt-3 text-body-md text-ink-600 dark:text-white/70">
                      {audience.description}
                    </p>
                  </div>

                  <span className="mt-8 inline-flex items-center gap-2 text-body-sm font-semibold text-emerald-700 dark:text-emerald-300">
                    {audience.action}
                    <ArrowUpRight
                      size={16}
                      strokeWidth={2.25}
                      className="transition-transform duration-300 ease-out-strong group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
                  </span>
                </Link>
              </PressableCard>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
