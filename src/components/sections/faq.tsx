import { Reveal } from "@/components/motion/reveal";
import { Accordion } from "@/components/ui/accordion";
import { faqs } from "@/data/site";

export function Faq() {
  return (
    <section id="faq" className="bg-white py-24 md:py-32 dark:bg-ink-950">
      <div className="container container-px grid grid-cols-1 gap-14 lg:grid-cols-[0.8fr_1.2fr]">
        <Reveal>
          <span className="eyebrow">FAQ</span>
          <h2 className="mt-4 text-display-md font-bold text-ink-950 dark:text-white">Frequently Asked Questions</h2>
          <p className="mt-5 max-w-prose text-body-lg text-ink-600 dark:text-white/55">
            Answers to common questions from clinics, hospitals and distribution partners.
          </p>
        </Reveal>

        <Reveal delay={0.08}>
          <Accordion items={faqs} />
        </Reveal>
      </div>
    </section>
  );
}
