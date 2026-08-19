import type { Metadata } from "next";
import { LegalPage } from "@/components/ui/legal-page";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How Nurture+ collects, uses and protects information submitted through this website.",
};

export default function PrivacyPolicyPage() {
  return (
    <LegalPage title="Privacy Policy" crumbLabel="Privacy Policy">
      <p>
        This is placeholder policy text prepared as part of the Nurture+ website build. It should be
        reviewed and finalized by {site.name}&rsquo;s legal counsel before the site goes live, to
        ensure it accurately reflects actual data handling practices and applicable regulations.
      </p>
      <div>
        <h2>Information we collect</h2>
        <p>
          We collect information you provide directly to us, such as your name, company, email
          address, phone number and message content, when you submit the distributor enquiry form or
          contact form on this website.
        </p>
      </div>
      <div>
        <h2>How we use information</h2>
        <p>
          Information submitted through this website is used solely to respond to your enquiry,
          evaluate distributor partnerships, and communicate about {site.name} products and
          services.
        </p>
      </div>
      <div>
        <h2>Contact</h2>
        <p>
          Questions about this policy can be sent to{" "}
          <a href={`mailto:${site.email}`}>{site.email}</a>.
        </p>
      </div>
    </LegalPage>
  );
}
