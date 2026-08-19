import { Hero } from "@/components/sections/hero";
import { AudienceTriage } from "@/components/sections/audience-triage";
import { ProductRail } from "@/components/sections/product-rail";
import { Standards } from "@/components/sections/standards";
import { HowItWorks } from "@/components/sections/how-it-works";
import { DistributorForm } from "@/components/sections/distributor-form";
import { Faq } from "@/components/sections/faq";

/**
 * Seven sections, down from fifteen. The retired ones were making arguments
 * the surviving sections already make — About, WhyChooseUs and ClinicalBenefits
 * all restated the quality case, and ProductCategories / ProductShowcase both
 * listed the same four products the rail now carries. Each still lives on its
 * own page, where a reader who wants that depth goes looking for it.
 *
 * Surfaces alternate down the page (plain, plain, tinted, plain, dark, plain)
 * so adjacent sections stay visually separable without needing rules between
 * them.
 */
export default function Home() {
  return (
    <>
      <Hero />
      <AudienceTriage />
      <ProductRail />
      <Standards />
      <HowItWorks />
      <DistributorForm />
      <Faq />
    </>
  );
}
