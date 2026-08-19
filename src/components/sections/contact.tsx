"use client";

import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, CheckCircle2, Send } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { Label, inputClass } from "@/components/ui/form-field";
import { Button } from "@/components/ui/button";
import { site } from "@/data/site";
import { springSheet } from "@/lib/motion";
import { haptic } from "@/lib/haptics";

const channels = [
  { icon: Mail, label: "Email", value: site.email, href: `mailto:${site.email}` },
  { icon: Phone, label: "Phone", value: site.phone, href: `tel:${site.phoneHref}` },
  { icon: MapPin, label: "Business Address", value: site.address.join(", "), href: null },
];

export function Contact() {
  const [sent, setSent] = useState(false);
  const [whatsappUrl, setWhatsappUrl] = useState("");
  const mapQuery = encodeURIComponent(site.address.join(", "));

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = (formData.get("name") as string) || "";
    const email = (formData.get("email") as string) || "";
    const subject = (formData.get("subject") as string) || "";
    const message = (formData.get("message") as string) || "";

    const lines = [
      "📩 *NURTURE+ | CONTACT INQUIRY*",
      "────────────────────────",
      "",
      `👤 *Name:* ${name}`,
      `📧 *Email:* ${email}`,
      subject.trim() ? `📌 *Subject:* ${subject.trim()}` : "",
      "",
      "💬 *Message:*",
      message.trim() ? message.trim() : "No message provided.",
      "",
      "────────────────────────",
      "_Submitted via nurtureplus.in official website_",
    ].filter((line) => line !== "");

    const text = lines.join("\n");
    const waUrl = `https://wa.me/918886878873?text=${encodeURIComponent(text)}`;
    setWhatsappUrl(waUrl);
    setSent(true);
    haptic("commit");
    window.open(waUrl, "_blank");
  }

  return (
    <section id="contact" className="pb-20 md:pb-28">
      <div className="container container-px grid grid-cols-1 gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        <Reveal>
          <ul className="space-y-5">
            {channels.map(({ icon: Icon, label, value, href }) => (
              <li key={label} className="flex items-start gap-3.5">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-50 dark:bg-emerald-400/10">
                  <Icon size={17} className="text-emerald-700 dark:text-emerald-300" strokeWidth={1.9} />
                </span>
                <div className="min-w-0">
                  <p className="text-caption font-bold uppercase tracking-[0.12em] text-ink-500 dark:text-white/45">
                    {label}
                  </p>
                  {href ? (
                    <a
                      href={href}
                      className="text-body-md font-semibold text-ink-800 transition-colors hover:text-emerald-700 dark:text-white/85 dark:hover:text-emerald-300"
                    >
                      {value}
                    </a>
                  ) : (
                    <p className="text-body-md font-semibold text-ink-800 dark:text-white/85">{value}</p>
                  )}
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-8 aspect-[4/3] w-full overflow-hidden rounded-xl2 border border-ink-100/70 shadow-card dark:border-white/10">
            <iframe
              title="Nurture+ location on Google Maps"
              src={`https://www.google.com/maps?q=${mapQuery}&output=embed`}
              className="h-full w-full grayscale-[15%] dark:grayscale-[40%] dark:invert-[0.92] dark:hue-rotate-180"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          {sent ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.97, filter: "blur(8px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              transition={springSheet}
              className="flex h-full min-h-[360px] flex-col items-center justify-center rounded-xl2 border border-ink-100/70 bg-white p-10 text-center shadow-card dark:border-white/10 dark:bg-ink-900"
            >
              <CheckCircle2 size={40} className="text-emerald-600 dark:text-emerald-400" strokeWidth={1.5} />
              <h2 className="mt-4 text-display-sm font-bold">Message ready to send</h2>
              <p className="mt-2 max-w-[38ch] text-body-sm text-ink-600 dark:text-white/65">
                Opening WhatsApp to send your inquiry...
              </p>
              {whatsappUrl && (
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-flex items-center gap-2 rounded-full bg-emerald-600 px-6 py-3 text-body-sm font-semibold text-white transition-colors hover:bg-emerald-500"
                >
                  <Send size={16} />
                  Continue to WhatsApp
                </a>
              )}
            </motion.div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="rounded-xl2 border border-ink-100/70 bg-white p-7 shadow-card sm:p-9 dark:border-white/10 dark:bg-ink-900"
            >
              <h2 className="text-display-sm font-bold">Send a message</h2>
              <div className="mt-7 grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div>
                  <Label htmlFor="c-name">Name</Label>
                  <input id="c-name" name="name" required className={inputClass} placeholder="Your name" />
                </div>
                <div>
                  <Label htmlFor="c-email">Email</Label>
                  <input
                    id="c-email"
                    name="email"
                    type="email"
                    required
                    className={inputClass}
                    placeholder="you@company.com"
                  />
                </div>
              </div>
              <div className="mt-5">
                <Label htmlFor="c-subject">Subject</Label>
                <input id="c-subject" name="subject" className={inputClass} placeholder="How can we help?" />
              </div>
              <div className="mt-5">
                <Label htmlFor="c-message">Message</Label>
                <textarea
                  id="c-message"
                  name="message"
                  rows={5}
                  required
                  className={inputClass}
                  placeholder="Write your message"
                />
              </div>
              <Button type="submit" className="mt-7 w-full sm:w-auto">
                Send message
              </Button>
            </form>
          )}
        </Reveal>
      </div>
    </section>
  );
}
