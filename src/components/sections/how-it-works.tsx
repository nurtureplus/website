import { Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal";
import { howItWorks } from "@/data/site";

/**
 * The band runs on the brand green (#4C9A38) rather than near-black.
 *
 * Text had to move with it. Against a mid-tone green the previous treatment
 * would have collapsed: the emerald-400 eyebrow and step numbers were chosen to
 * glow against near-black and sit almost on top of this green, and the 60%-white
 * body copy dropped to roughly 2:1. Everything is now solid white, and the
 * ambient blue wash was removed — it muddied the green rather than adding depth.
 */
export function HowItWorks() {
  return (
    <section className="relative overflow-hidden bg-emerald-600 py-24 md:py-32">
      {/* A darker wash of the same green keeps some depth without introducing a
          second hue. */}
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-0 left-0 h-[420px] w-[420px] rounded-full bg-emerald-700/40 blur-[120px]"
      />
      <div className="container container-px relative">
        <Reveal className="max-w-[56ch]">
          <span className="eyebrow eyebrow-on-green">How It Works</span>
          <h2 className="mt-4 text-display-md font-bold text-white">From Consultation to Administration</h2>
        </Reveal>

        <RevealGroup className="mt-16 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {howItWorks.map((step, i) => (
            <RevealItem key={step.step} className="relative">
              <span className="text-caption font-bold uppercase tracking-[0.12em] text-white/85">
                {step.step}
              </span>
              <h3 className="mt-3 text-body-lg font-bold text-white">{step.title}</h3>
              <p className="mt-2 text-body-sm text-white">{step.description}</p>
              {i < howItWorks.length - 1 && (
                <span
                  aria-hidden
                  className="absolute right-[-20px] top-1.5 hidden h-px w-10 bg-white/30 lg:block"
                />
              )}
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
