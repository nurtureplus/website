"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { Linkedin, Instagram, Facebook, Phone, Mail, MapPin, ArrowRight, CheckCircle2 } from "lucide-react";
import { navLinks, site } from "@/data/site";
import { products } from "@/data/products";
import { springSheet } from "@/lib/motion";
import { haptic } from "@/lib/haptics";

const socialMeta = [
  { key: "linkedin", Icon: Linkedin, label: "LinkedIn" },
  { key: "instagram", Icon: Instagram, label: "Instagram" },
  { key: "facebook", Icon: Facebook, label: "Facebook" },
] as const;

/**
 * The footer used to be `bg-ink-950` — the same near-black as the CTA banner
 * that sits directly above it on most inner pages, so the two fused into one
 * undifferentiated wall, and on a light, airy page the whole end of the site
 * landed like a slab.
 *
 * It now sits one step down the neutral ink ramp. Material weight still encodes
 * hierarchy — a hairline top edge and a slightly darker surface mark it as the
 * outermost structural region — but the page no longer switches to black at the
 * end, and a dark CTA above it reads as deliberate contrast rather than a
 * collision. Colour is left entirely to the emerald accent.
 */
export function SiteFooter() {
  const year = new Date().getFullYear();
  const socials = socialMeta
    .map((s) => ({ ...s, href: site.social[s.key] }))
    .filter((s) => s.href.length > 0);
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  function handleSubscribe(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!email.trim()) return;
    setSubscribed(true);
    setEmail("");
    haptic("commit");
  }

  return (
    <footer className="border-t border-ink-900/10 bg-ink-50 text-ink-700 dark:border-white/10 dark:bg-white/[0.03] dark:text-white/85">
      <div className="container container-px py-14 md:py-16">
        {/* The newsletter block is the one interactive thing down here, so it
            gets the lighter, brighter material — attention goes to the control,
            not the region around it. */}
        <div className="flex flex-col items-start justify-between gap-6 rounded-xl2 border border-ink-100/70 bg-white p-8 shadow-card md:flex-row md:items-center md:p-10 dark:border-white/10 dark:bg-white/[0.04]">
          <div className="max-w-[38ch]">
            <h3 className="text-display-sm font-bold text-ink-950 dark:text-white">
              Stay ahead on new formulations
            </h3>
            <p className="mt-1.5 text-body-sm text-ink-600 dark:text-white/65">
              Occasional updates on new products, certifications and distributor programs. No spam.
            </p>
          </div>
          {subscribed ? (
            <motion.p
              initial={{ opacity: 0, scale: 0.97, filter: "blur(8px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              transition={springSheet}
              className="flex items-center gap-2 text-body-sm font-semibold text-emerald-700 dark:text-emerald-300"
            >
              <CheckCircle2 size={18} />
              You&rsquo;re subscribed — thank you.
            </motion.p>
          ) : (
            <form onSubmit={handleSubscribe} className="flex w-full max-w-sm items-center gap-2 md:w-auto">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@company.com"
                aria-label="Email address"
                className="w-full rounded-full border border-gray-300 bg-white px-4 py-2.5 text-control text-ink-900 outline-none transition-[border-color,box-shadow] duration-160 ease-out-strong placeholder:text-ink-400/70 focus:border-emerald-400 focus:ring-4 focus:ring-emerald-100 dark:border-white/15 dark:bg-white/5 dark:text-white dark:placeholder:text-white/35 dark:focus:border-emerald-400/60 dark:focus:ring-emerald-400/10"
              />
              <button
                type="submit"
                aria-label="Subscribe"
                className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-600 text-white transition-[background-color,transform] duration-160 ease-out-strong before:absolute before:-inset-1 before:content-[''] hover:bg-emerald-500 active:scale-[0.94]"
              >
                <ArrowRight size={17} />
              </button>
            </form>
          )}
        </div>

        <div className="mt-14 grid grid-cols-1 gap-12 md:grid-cols-4">
          <div className="md:col-span-1">
            {/* On a light surface the logo needs its own colours; only dark mode
                inverts it. */}
            <Image
              src="/brand/logo.png"
              alt="Nurture+ — Adds Life"
              width={176}
              height={44}
              className="h-9 w-auto dark:brightness-0 dark:invert"
            />
            <p className="mt-4 max-w-[26ch] text-body-md text-ink-600 dark:text-white/65">
              Premium IV therapy formulations for healthcare professionals.
            </p>
            {socials.length > 0 && (
              <div className="mt-6 flex items-center gap-3">
                {socials.map(({ key, href, Icon, label }) => (
                  <a
                    key={key}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Nurture+ on ${label}`}
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-ink-700 ring-1 ring-ink-900/10 transition-colors duration-160 ease-out-strong hover:bg-emerald-600 hover:text-white hover:ring-emerald-600 dark:bg-white/10 dark:text-white/80 dark:ring-white/10 dark:hover:bg-emerald-500"
                  >
                    <Icon size={16} />
                  </a>
                ))}
              </div>
            )}
          </div>

          <div>
            <h3 className="text-caption font-bold uppercase tracking-[0.12em] text-ink-500 dark:text-white/50">
              Quick Links
            </h3>
            <ul className="mt-5 space-y-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-body-md text-ink-700 transition-colors duration-160 hover:text-emerald-700 dark:text-white/75 dark:hover:text-emerald-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-caption font-bold uppercase tracking-[0.12em] text-ink-500 dark:text-white/50">
              Products
            </h3>
            <ul className="mt-5 space-y-3">
              {products.map((p) => (
                <li key={p.slug}>
                  <Link
                    href={`/products/${p.slug}`}
                    className="text-body-md text-ink-700 transition-colors duration-160 hover:text-emerald-700 dark:text-white/75 dark:hover:text-emerald-300"
                  >
                    {p.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-caption font-bold uppercase tracking-[0.12em] text-ink-500 dark:text-white/50">
              Contact
            </h3>
            <ul className="mt-5 space-y-3 text-body-md text-ink-700 dark:text-white/75">
              <li className="flex items-start gap-2.5">
                <Phone size={16} className="mt-1 shrink-0 text-emerald-700 dark:text-emerald-400" />
                <a
                  href={`tel:${site.phoneHref}`}
                  className="transition-colors duration-160 hover:text-emerald-700 dark:hover:text-emerald-300"
                >
                  {site.phone}
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <Mail size={16} className="mt-1 shrink-0 text-emerald-700 dark:text-emerald-400" />
                <a
                  href={`mailto:${site.email}`}
                  className="break-all transition-colors duration-160 hover:text-emerald-700 dark:hover:text-emerald-300"
                >
                  {site.email}
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin size={16} className="mt-1 shrink-0 text-emerald-700 dark:text-emerald-400" />
                <address className="not-italic">{site.address.join(", ")}</address>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col-reverse items-center gap-4 border-t border-ink-900/10 pt-8 md:flex-row md:justify-between dark:border-white/10">
          <p className="text-caption text-ink-500 dark:text-white/50">
            {/* Copyright carries the registered entity, not the brand string. */}
            © {year} {site.legalName}, {site.parentGroup}. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-caption">
            <Link
              href="/privacy-policy"
              className="text-ink-500 transition-colors duration-160 hover:text-ink-900 dark:text-white/50 dark:hover:text-white"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms-conditions"
              className="text-ink-500 transition-colors duration-160 hover:text-ink-900 dark:text-white/50 dark:hover:text-white"
            >
              Terms &amp; Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
