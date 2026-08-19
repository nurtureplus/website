"use client";

import { motion } from "framer-motion";

const WHATSAPP_PHONE = "918886878873";
const DEFAULT_MESSAGE = "Hello Nurture+, I would like to know more about your IV wellness products.";
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(DEFAULT_MESSAGE)}`;

export function WhatsAppFloatingButton() {
  return (
    <aside aria-label="WhatsApp quick contact" className="fixed bottom-6 right-6 z-50 flex items-center gap-3 sm:bottom-8 sm:right-8">
      {/* Tooltip / Label that shows on hover for desktop */}
      <motion.span
        initial={{ opacity: 0, x: 10, scale: 0.95 }}
        whileHover={{ opacity: 1, x: 0, scale: 1 }}
        className="pointer-events-none hidden rounded-full bg-ink-900/90 px-3.5 py-1.5 text-caption font-semibold text-white shadow-lifted backdrop-blur-md dark:bg-white/90 dark:text-ink-950 md:inline-block opacity-0 transition-opacity duration-200 group-hover:opacity-100"
      >
        Chat on WhatsApp
      </motion.span>

      <motion.a
        href={WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with Nurture+ on WhatsApp"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.92 }}
        transition={{ type: "spring", stiffness: 350, damping: 22 }}
        className="group relative flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_8px_24px_rgba(37,211,102,0.4)] transition-colors duration-200 hover:bg-[#20ba5a] hover:shadow-[0_12px_28px_rgba(37,211,102,0.55)] focus:outline-none focus-visible:ring-4 focus-visible:ring-[#25D366]/40"
      >
        {/* Subtle pulsing radar ring */}
        <span
          aria-hidden
          className="absolute -inset-1 animate-ping rounded-full bg-[#25D366] opacity-30 duration-1000 group-hover:hidden"
        />

        {/* WhatsApp Icon */}
        <svg
          viewBox="0 0 24 24"
          width="30"
          height="30"
          fill="currentColor"
          className="relative z-10 drop-shadow-sm transition-transform duration-200 group-hover:scale-105"
        >
          <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.04 14.69 2 12.04 2ZM12.04 3.67C14.25 3.67 16.31 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 16.46 16.58 20.16 12.04 20.16C10.66 20.16 9.3 19.8 8.09 19.11L7.8 18.94L4.69 19.76L5.52 16.73L5.33 16.42C4.55 15.08 4.14 13.51 4.14 11.91C4.14 7.37 7.84 3.67 12.04 3.67ZM8.53 7.33C8.37 7.33 8.1 7.39 7.87 7.64C7.65 7.89 7 8.5 7 9.73C7 10.96 7.89 12.14 8.02 12.31C8.14 12.48 9.77 14.99 12.27 16.07C12.87 16.33 13.33 16.48 13.7 16.6C14.3 16.79 14.84 16.76 15.28 16.7C15.76 16.63 16.77 16.09 16.98 15.5C17.19 14.91 17.19 14.4 17.13 14.3C17.06 14.19 16.9 14.13 16.65 14C16.4 13.88 15.17 13.27 14.95 13.19C14.72 13.11 14.56 13.06 14.39 13.31C14.22 13.56 13.75 14.13 13.6 14.3C13.46 14.48 13.31 14.5 13.06 14.38C12.82 14.25 12.02 13.99 11.08 13.15C10.35 12.5 9.85 11.69 9.71 11.45C9.57 11.2 9.7 11.07 9.82 10.95C9.93 10.84 10.07 10.66 10.19 10.51C10.32 10.37 10.36 10.26 10.44 10.1C10.53 9.93 10.48 9.79 10.42 9.67C10.36 9.54 9.87 8.34 9.67 7.85C9.47 7.37 9.27 7.44 9.12 7.43C8.98 7.42 8.81 7.42 8.65 7.42L8.53 7.33Z" />
        </svg>
      </motion.a>
    </aside>
  );
}
