import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/page-header";
import { ProductsExplorer } from "@/components/sections/products-explorer";
import { CtaBanner } from "@/components/sections/cta-banner";
import { LinkButton } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Products",
  description:
    "Browse the full Nurture+ IV therapy product range — NAD+, glutathione and mineral formulations for hospitals, clinics and distributors.",
};

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category } = await searchParams;

  return (
    <>
      <PageHeader
        eyebrow="Full Catalog"
        title="Our product range"
        lede="A focused portfolio of IV formulations, each manufactured to a single consistent specification and labeled clearly for professional use."
        crumbs={[{ label: "Products" }]}
      />

      <section className="pb-20 md:pb-28">
        <div className="container container-px">
          <ProductsExplorer initialCategory={category} />
        </div>
      </section>

      <CtaBanner
        title="Ordering for a clinic or territory?"
        description="Tell us what you need and our team will come back with pricing and availability."
        actions={
          <LinkButton href="/#distributor" variant="on-dark">
            Start an enquiry
          </LinkButton>
        }
      />
    </>
  );
}
