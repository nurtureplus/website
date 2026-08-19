import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

/**
 * tailwind-merge has to be told about custom `fontSize` keys.
 *
 * Without this it cannot tell `text-control-sm` (a size) from `text-white` (a
 * colour), groups them together, and silently drops whichever came first. That
 * is exactly what happened to the header's primary button: `text-white` was
 * stripped from the rendered class list and the label fell back to inheriting
 * near-black on a green fill.
 *
 * The failure is invisible — no error, no warning, just a wrong colour — so
 * every custom size key below must stay in sync with `tailwind.config.ts`.
 */
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": [
        {
          text: [
            "display-2xl",
            "display-xl",
            "display-lg",
            "display-md",
            "display-sm",
            "body-lg",
            "body-md",
            "body-sm",
            "caption",
            "control",
            "control-sm",
          ],
        },
      ],
    },
  },
});

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
