"use client";

import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Loader2, Send } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { Label, inputClass } from "@/components/ui/form-field";
import { Button } from "@/components/ui/button";
import { springSheet } from "@/lib/motion";
import { haptic } from "@/lib/haptics";

const businessTypes = [
  "Hospital",
  "Functional Medicine Clinic",
  "IV Therapy Clinic",
  "Wellness Center",
  "Medical Distributor",
  "Other Healthcare Business",
];

export function DistributorForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");
  const [whatsappUrl, setWhatsappUrl] = useState<string>("");

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const companyName = (formData.get("companyName") as string) || "";
    const contactPerson = (formData.get("contactPerson") as string) || "";
    const email = (formData.get("email") as string) || "";
    const phone = (formData.get("phone") as string) || "";
    const country = (formData.get("country") as string) || "";
    const businessType = (formData.get("businessType") as string) || "";
    const message = (formData.get("message") as string) || "";

    const lines = [
      "✨ *NURTURE+ | DISTRIBUTOR INQUIRY*",
      "────────────────────────",
      "",
      `🏢 *Company Name:* ${companyName}`,
      `👤 *Contact Person:* ${contactPerson}`,
      `📧 *Email:* ${email}`,
      `📞 *Phone:* ${phone}`,
      `🌍 *Country:* ${country}`,
      `💼 *Business Type:* ${businessType}`,
      "",
      "📝 *Message / Requirements:*",
      message.trim() ? message.trim() : "Interested in becoming an authorized distributor.",
      "",
      "────────────────────────",
      "_Submitted via nurtureplus.in official website_",
    ];

    const text = lines.join("\n");
    const waUrl = `https://wa.me/918886878873?text=${encodeURIComponent(text)}`;
    setWhatsappUrl(waUrl);
    setStatus("loading");

    window.setTimeout(() => {
      setStatus("success");
      haptic("commit");
      window.open(waUrl, "_blank");
    }, 600);
  }

  return (
    <section id="distributor" className="section-y">
      <div className="container container-px grid grid-cols-1 gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        <Reveal>
          <span className="eyebrow">Partnership</span>
          <h2 className="mt-4 text-display-md font-bold text-ink-950 dark:text-white">Become a Distributor</h2>
          <p className="mt-5 max-w-prose text-body-lg text-ink-600 dark:text-white/70">
            Partner with Nurture+ to bring premium IV therapy products to your
            hospital, clinic or distribution network. Tell us about your business
            and our team will get in touch.
          </p>
          <div className="mt-8 rounded-xl2 border border-emerald-100 bg-emerald-50/50 p-6 dark:border-emerald-400/20 dark:bg-emerald-400/[0.06]">
            <p className="text-body-sm text-ink-600 dark:text-white/70">
              For B2B inquiries only. All Nurture+ products are distributed through
              professional healthcare channels for use as directed by a registered
              medical practitioner.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          {status === "success" ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.97, filter: "blur(8px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              transition={springSheet}
              className="flex h-full min-h-[420px] flex-col items-center justify-center rounded-xl2 border border-ink-100/70 bg-gray-50 p-10 text-center dark:border-white/10 dark:bg-white/[0.03]"
            >
              <CheckCircle2 size={40} className="text-emerald-600 dark:text-emerald-400" strokeWidth={1.5} />
              <h3 className="mt-4 text-display-sm font-bold text-ink-950 dark:text-white">Thank you for reaching out</h3>
              <p className="mt-2 max-w-[38ch] text-body-md text-ink-600 dark:text-white/65">
                Opening WhatsApp to send your partnership details...
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
            <form onSubmit={handleSubmit} className="rounded-xl2 border border-ink-100/70 bg-white p-7 shadow-card sm:p-9 dark:border-white/10 dark:bg-ink-900">
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div>
                  <Label htmlFor="companyName">Company Name</Label>
                  <input id="companyName" name="companyName" required className={inputClass} placeholder="Your organization" />
                </div>
                <div>
                  <Label htmlFor="contactPerson">Contact Person</Label>
                  <input id="contactPerson" name="contactPerson" required className={inputClass} placeholder="Full name" />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <input id="email" name="email" type="email" required className={inputClass} placeholder="you@company.com" />
                </div>
                <div>
                  <Label htmlFor="phone">Phone</Label>
                  <input id="phone" name="phone" type="tel" required className={inputClass} placeholder="+1 234 567 8900" />
                </div>
                <div>
                  <Label htmlFor="country">Country</Label>
                  <input id="country" name="country" required className={inputClass} placeholder="Country" />
                </div>
                <div>
                  <Label htmlFor="businessType">Business Type</Label>
                  <select id="businessType" name="businessType" required defaultValue="" className={inputClass}>
                    <option value="" disabled>
                      Select business type
                    </option>
                    {businessTypes.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="mt-5">
                <Label htmlFor="message">Message</Label>
                <textarea id="message" name="message" rows={4} className={inputClass} placeholder="Tell us about your business and requirements" />
              </div>

              <Button type="submit" disabled={status === "loading"} className="mt-7 w-full sm:w-auto">
                {status === "loading" ? (
                  <Loader2 size={17} className="animate-spin" />
                ) : (
                  <Send size={16} />
                )}
                Partner with Nurture+
              </Button>
            </form>
          )}
        </Reveal>
      </div>
    </section>
  );
}
