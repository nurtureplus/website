import { Activity, Dna, ShieldPlus, Stethoscope } from "lucide-react";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal";
import { clinicalBenefits } from "@/data/site";

const icons = [Dna, ShieldPlus, Activity, Stethoscope];

export function ClinicalBenefits() {
  return (
    <section className="section-y" aria-labelledby="benefits-heading">
      <div className="container container-px">
        <Reveal className="max-w-prose">
          <span className="eyebrow">Clinical Benefits</span>
          <h2 id="benefits-heading" className="mt-4 text-display-md font-bold">
            Formulated for purpose
          </h2>
          <p className="mt-5 text-body-lg text-ink-600 dark:text-white/70">
            Each formulation is built around a specific clinical goal — not a general-purpose blend.
          </p>
        </Reveal>

        <RevealGroup className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {clinicalBenefits.map((b, i) => {
            const Icon = icons[i];
            return (
              <RevealItem
                key={b.title}
                className="rounded-xl2 border border-ink-100/70 bg-white p-7 shadow-card dark:border-white/10 dark:bg-ink-900"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-50 dark:bg-blue-400/10">
                  <Icon size={19} className="text-blue-700 dark:text-blue-300" strokeWidth={1.9} />
                </span>
                <h3 className="mt-4 text-body-md font-bold">{b.title}</h3>
                <p className="mt-2 text-body-sm text-ink-600 dark:text-white/65">{b.description}</p>
              </RevealItem>
            );
          })}
        </RevealGroup>
      </div>
    </section>
  );
}
