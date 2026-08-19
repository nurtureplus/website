import type { ReactNode } from "react";
import { Reveal } from "@/components/motion/reveal";

/**
 * The closing call to action, shared across inner pages so every route ends the
 * same way — one green band, one clear next step.
 *
 * It runs on the brand green to match the How It Works band on the homepage.
 * Text is solid white throughout: the 65%-white description that worked against
 * near-black drops to roughly 2:1 on a mid-tone green.
 */
export function CtaBanner({
  title,
  description,
  actions,
}: {
  title: string;
  description: string;
  actions: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden bg-emerald-600 section-y">
      <div
        aria-hidden
        // A deeper wash of the same green — depth from one hue, not two.
        className="pointer-events-none absolute bottom-[-30%] left-[-5%] h-[420px] w-[420px] rounded-full bg-emerald-700/40 blur-[130px]"
      />
      <Reveal className="container container-px relative">
        <div className="flex flex-col items-start justify-between gap-7 md:flex-row md:items-center">
          <div className="max-w-prose">
            <h2 className="text-display-md font-bold text-white">{title}</h2>
            <p className="mt-3 text-body-lg text-white">{description}</p>
          </div>
          <div className="flex flex-wrap gap-3">{actions}</div>
        </div>
      </Reveal>
    </section>
  );
}
