import type { Metadata } from "next";
import { LegalPage } from "@/components/ui/legal-page";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description: "Terms and conditions governing use of the Nurture+ website.",
};

export default function TermsPage() {
  return (
    <LegalPage title="Terms &amp; Conditions" crumbLabel="Terms &amp; Conditions">
      <p>
        This is placeholder terms text prepared as part of the Nurture+ website build. It should be
        reviewed and finalized by {site.name}&rsquo;s legal counsel before the site goes live.
      </p>
      <div>
        <h2>Professional use only</h2>
        <p>
          Content on this website is intended for healthcare professionals, hospitals, clinics and
          distributors. Products described on this site are to be administered only as directed by a
          registered medical practitioner.
        </p>
      </div>
      <div>
        <h2>No medical advice</h2>
        <p>
          Information on this website is provided for general informational purposes and does not
          constitute medical advice. It is not a substitute for professional clinical judgment.
        </p>
      </div>
      <div>
        <h2>Contact</h2>
        <p>
          Questions about these terms can be sent to{" "}
          <a href={`mailto:${site.email}`}>{site.email}</a>.
        </p>
      </div>
    </LegalPage>
  );
}
