import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/page-header";
import { Contact } from "@/components/sections/contact";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with the Nurture+ team about products, partnerships or general enquiries.",
};

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Get in Touch"
        title="Contact us"
        lede="Have a question about our products or the partnership process? Reach out directly, or send us a message and we'll come back to you."
        crumbs={[{ label: "Contact" }]}
      />
      <Contact />
    </>
  );
}
