import { Check } from "lucide-react";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal";
import { certifications, qualityPillars } from "@/data/site";
import { LinkButton } from "@/components/ui/button";

/**
 * The trust block: what "premium" actually means here, stated as verifiable
 * facts rather than adjectives. Merges what used to be two separate sections
 * (Quality Standards and Certifications) — they were making the same argument
 * twice, twenty scroll-seconds apart.
 */
export function Standards() {
  return (
    // Plain surface: this now follows the tinted product rail on the homepage
    // and a tinted block on /about, and two tinted sections in a row read as
    // one long undifferentiated band.
    <section id="quality" className="section-y" aria-labelledby="standards-heading">
      <div className="container container-px">
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
          <Reveal>
            <span className="eyebrow">Quality</span>
            <h2 id="standards-heading" className="mt-4 text-display-md font-bold">
              Feel the difference disciplined manufacturing makes.
            </h2>
            <p className="mt-5 max-w-prose text-body-lg text-ink-600 dark:text-white/70">
              Every Nurture+ formulation is produced under WHO-GMP certified standards, on a valid
              state manufacturing licence, and distributed only through professional healthcare
              channels.
            </p>
            <LinkButton href="/why-nurture-plus" variant="secondary" className="mt-8">
              Why Nurture+
            </LinkButton>
          </Reveal>

          <div>
            <Reveal>
              <ul className="grid gap-px overflow-hidden rounded-xl2 bg-ink-100/70 shadow-card sm:grid-cols-2 dark:bg-white/10">
                {certifications.map((item) => (
                  <li key={item.title} className="bg-white p-6 dark:bg-ink-900">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-50 text-emerald-700 dark:bg-emerald-400/15 dark:text-emerald-300">
                      <Check size={16} strokeWidth={2.5} />
                    </span>
                    <h3 className="mt-4 text-body-md font-bold">{item.title}</h3>
                    <p className="mt-1.5 text-body-sm text-ink-600 dark:text-white/65">
                      {item.description}
                    </p>
                  </li>
                ))}
              </ul>
            </Reveal>

            <RevealGroup className="mt-8 grid gap-x-8 gap-y-5 sm:grid-cols-2">
              {qualityPillars.map((item) => (
                <RevealItem key={item.title} className="flex gap-3">
                  <Check
                    size={17}
                    strokeWidth={2.5}
                    className="mt-1 shrink-0 text-emerald-600 dark:text-emerald-400"
                  />
                  <div>
                    <h3 className="text-body-sm font-bold">{item.title}</h3>
                    <p className="mt-1 text-body-sm text-ink-600 dark:text-white/65">
                      {item.description}
                    </p>
                  </div>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </div>
      </div>
    </section>
  );
}
