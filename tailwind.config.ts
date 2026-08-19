import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    container: {
      center: true,
      padding: "1.5rem",
      screens: { "2xl": "1240px" },
    },
    extend: {
      colors: {
        white: "#FFFFFF",
        /**
         * Brand ink — every step generated at hue 108°, the exact hue of the
         * brand green #4C9A38, with chroma rising toward the dark end so large
         * surfaces read clearly as that green rather than as grey.
         *
         * Lightness is not a guess: each step's HSL lightness was solved so its
         * L* matches the ramp it replaced, which is why contrast ratios across
         * the site are unchanged.
         */
        ink: {
          50: "#EFF4ED",
          100: "#D7E5D3",
          300: "#99BB91",
          400: "#3E6335",
          500: "#34552C",
          600: "#233A1D",
          700: "#1B2E16",
          800: "#142410",
          900: "#101E0D",
          950: "#0B1408",
        },
        blue: {
          50: "#EFF6FC",
          100: "#DCEBF8",
          200: "#B7D6EF",
          300: "#8DBDE3",
          400: "#5B9BD1",
          500: "#3379B8",
          600: "#295F93",
          700: "#204A73",
        },
        emerald: {
          50: "#F0FAEC",
          100: "#DCF3D3",
          200: "#B7E5A8",
          300: "#93D77D",
          400: "#78C85E",
          500: "#60BB49",
          600: "#4C9A38",
          700: "#3C7A2C",
        },
        rose: {
          50: "#FBEFF3",
          100: "#F5DCE5",
          200: "#E8B3C8",
          300: "#DD8FAF",
          400: "#CC5F8F",
          600: "#B23A63",
          700: "#8F2E4F",
        },
        violet: {
          50: "#F1EFFB",
          100: "#E1DDF5",
          200: "#C3BEEB",
          300: "#A79FDE",
          400: "#8B7FCE",
          600: "#5B4FC4",
          700: "#473CA3",
        },
        magenta: {
          50: "#F9EEF7",
          100: "#F0D9EC",
          200: "#DDAED4",
          300: "#CB84BE",
          400: "#B85CA8",
          600: "#9B3E85",
          700: "#7C3169",
        },
        /** Surfaces and borders: same 108° hue at low chroma, so they sit
         *  as quiet paper next to `ink` rather than as a foreign neutral. */
        gray: {
          50: "#F8F9F7",
          100: "#F0F3EF",
          200: "#E4EAE2",
          300: "#CFDACD",
          400: "#9AB294",
          500: "#6B8964",
          600: "#4E6549",
          700: "#374633",
          800: "#242E22",
          900: "#161D15",
        },
      },
      fontFamily: {
        display: ["Montserrat", "system-ui", "sans-serif"],
        body: ["Montserrat", "system-ui", "sans-serif"],
      },
      /**
       * Tracking is size-specific, never one value for every size. Large text
       * reads too loose as it grows, so display sizes tighten; small text needs
       * a little air, so caption sizes go slightly positive. Leading moves
       * inversely to size — tight on display, comfortable on body.
       */
      fontSize: {
        "display-2xl": ["clamp(2.75rem, 5.2vw, 4.25rem)", { lineHeight: "1.02", letterSpacing: "-0.033em" }],
        "display-xl": ["clamp(2.75rem, 5vw, 5rem)", { lineHeight: "1.03", letterSpacing: "-0.03em" }],
        "display-lg": ["clamp(2.25rem, 3.6vw, 3.5rem)", { lineHeight: "1.06", letterSpacing: "-0.03em" }],
        "display-md": ["clamp(1.75rem, 2.4vw, 2.5rem)", { lineHeight: "1.12", letterSpacing: "-0.02em" }],
        "display-sm": ["clamp(1.375rem, 1.7vw, 1.75rem)", { lineHeight: "1.2", letterSpacing: "-0.015em" }],
        "body-lg": ["1.125rem", { lineHeight: "1.6", letterSpacing: "-0.003em" }],
        "body-md": ["1rem", { lineHeight: "1.65", letterSpacing: "0" }],
        "body-sm": ["0.875rem", { lineHeight: "1.6", letterSpacing: "0.004em" }],
        caption: ["0.78125rem", { lineHeight: "1.5", letterSpacing: "0.012em" }],
        /**
         * Controls get their own sizes. Body leading (1.6–1.65) is right for
         * paragraphs and wrong inside a button, where it inflates the hit area
         * and pushes the label off centre.
         *
         * `control` is deliberately 16px: iOS Safari zooms the viewport when a
         * focused input's font-size is below that, and every form field on the
         * site was previously 14–15px.
         */
        control: ["1rem", { lineHeight: "1.2", letterSpacing: "0" }],
        "control-sm": ["0.875rem", { lineHeight: "1.2", letterSpacing: "0.004em" }],
      },
      maxWidth: {
        prose: "72ch",
      },
      boxShadow: {
        soft: "0 1px 2px rgba(11,20,8,0.05), 0 6px 16px -6px rgba(11,20,8,0.10)",
        lifted: "0 2px 6px rgba(11,20,8,0.06), 0 20px 36px -16px rgba(11,20,8,0.18)",
        card: "0 1px 2px rgba(11,20,8,0.04), 0 3px 10px -4px rgba(11,20,8,0.08)",
        /* Larger surfaces read as thicker material — deeper, softer shadow. */
        material: "0 4px 12px -4px rgba(11,20,8,0.08), 0 24px 64px -24px rgba(11,20,8,0.28)",
      },
      transitionTimingFunction: {
        "out-strong": "cubic-bezier(0.23, 1, 0.32, 1)",
        "in-out-strong": "cubic-bezier(0.77, 0, 0.175, 1)",
      },
      borderRadius: {
        xl2: "1.25rem",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(14px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
