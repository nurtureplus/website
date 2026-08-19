import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CheckCircle2, Download, PackageCheck, Snowflake, Syringe } from "lucide-react";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal";
import { ProductCard } from "@/components/ui/product-card";
import { LinkButton } from "@/components/ui/button";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { ImageLightbox } from "@/components/ui/image-lightbox";
import { Tabs } from "@/components/ui/tabs";
import { products, getProduct } from "@/data/products";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return {};
  return {
    title: `${product.name} — ${product.category}`,
    description: product.shortDescription,
    openGraph: {
      title: `${product.name} | Nurture+`,
      description: product.shortDescription,
      images: [{ url: product.image }],
    },
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const related = products.filter((p) => p.slug !== product.slug).slice(0, 3);

  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.shortDescription,
    brand: { "@type": "Brand", name: "Nurture+" },
    category: product.category,
    image: `https://www.nurtureplus.in${product.image}`,
  };

  const tabItems = [
    {
      id: "overview",
      label: "Overview",
      content: (
        <div className="space-y-4">
          {product.description.map((para, i) => (
            <p key={i} className="text-body-md text-ink-600 dark:text-white/70">
              {para}
            </p>
          ))}
        </div>
      ),
    },
    {
      // The FAQ promises every product page lists full composition, and the
      // data has always carried it — it just was never rendered.
      id: "composition",
      label: "Composition",
      content: (
        <table className="w-full border-collapse text-left">
          <caption className="sr-only">Declared composition per vial</caption>
          <thead>
            <tr className="border-b border-ink-100 dark:border-white/10">
              <th scope="col" className="pb-3 text-caption font-bold uppercase tracking-[0.12em] text-ink-500 dark:text-white/45">
                Active ingredient
              </th>
              <th scope="col" className="pb-3 text-right text-caption font-bold uppercase tracking-[0.12em] text-ink-500 dark:text-white/45">
                Per vial
              </th>
            </tr>
          </thead>
          <tbody>
            {product.composition.map((row) => (
              <tr key={row.label} className="border-b border-ink-100/60 last:border-0 dark:border-white/5">
                <th scope="row" className="py-3.5 pr-4 text-body-sm font-medium text-ink-800 dark:text-white/85">
                  {row.label}
                </th>
                <td className="py-3.5 text-right text-body-sm font-bold tabular-nums text-ink-950 dark:text-white">
                  {row.value}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ),
    },
    {
      id: "benefits",
      label: "Benefits",
      content: (
        <RevealGroup className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {product.benefits.map((b) => (
            <RevealItem key={b} className="flex items-start gap-2.5">
              <CheckCircle2 size={17} className="mt-0.5 shrink-0 text-emerald-600 dark:text-emerald-400" />
              <span className="text-body-sm text-ink-700 dark:text-white/75">{b}</span>
            </RevealItem>
          ))}
        </RevealGroup>
      ),
    },
    {
      id: "administration",
      label: "Administration & Dosage",
      content: (
        <ul className="space-y-2.5">
          {product.recommendedUse.map((line, i) => (
            <li key={i} className="flex items-start gap-2.5 text-body-sm text-ink-600 dark:text-white/65">
              <Syringe size={15} className="mt-0.5 shrink-0 text-blue-600 dark:text-blue-400" />
              {line}
            </li>
          ))}
        </ul>
      ),
    },
    {
      id: "packaging",
      label: "Packaging & Storage",
      content: (
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
          <div>
            <h3 className="flex items-center gap-2 text-caption font-bold uppercase tracking-[0.12em] text-ink-500 dark:text-white/45">
              <PackageCheck size={16} className="text-blue-600 dark:text-blue-400" />
              Packaging
            </h3>
            <ul className="mt-3 space-y-2">
              {product.packaging.map((line, i) => (
                <li key={i} className="text-body-sm text-ink-600 dark:text-white/65">
                  {line}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="flex items-center gap-2 text-caption font-bold uppercase tracking-[0.12em] text-ink-500 dark:text-white/45">
              <Snowflake size={16} className="text-blue-600 dark:text-blue-400" />
              Storage
            </h3>
            <ul className="mt-3 space-y-2">
              {product.storage.map((line, i) => (
                <li key={i} className="text-body-sm text-ink-600 dark:text-white/65">
                  {line}
                </li>
              ))}
            </ul>
          </div>
        </div>
      ),
    },
    {
      id: "safety",
      label: "Safety",
      content: (
        <p className="text-body-sm text-ink-600 dark:text-white/65">
          For use by or under the supervision of a registered medical practitioner only. This product
          is distributed exclusively through professional healthcare channels and is not intended for
          direct-to-consumer sale. Do not use if the tamper-evident seal is broken or the reconstituted
          solution shows any visible particles or discoloration. Discontinue use and consult a physician
          immediately if any adverse reaction occurs.
        </p>
      ),
    },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
      <section className="pt-4 pb-20 md:pb-28">
        <Breadcrumbs items={[{ label: "Products", href: "/products" }, { label: product.name }]} />
        <div className="container container-px mt-6">
          <div className="grid grid-cols-1 gap-14 lg:grid-cols-2 lg:items-start">
            <Reveal className="lg:sticky lg:top-28">
              <ImageLightbox src={product.image} alt={`${product.name} by Nurture+ — ${product.category}`} />
            </Reveal>

            <Reveal delay={0.06}>
              <span className="inline-flex rounded-full bg-emerald-50 px-3 py-1 text-caption font-semibold text-emerald-700 dark:bg-emerald-400/10 dark:text-emerald-400">
                {product.category}
              </span>
              <h1 className="mt-4 text-display-md font-bold text-ink-950 dark:text-white">{product.name}</h1>
              {product.tagline ? (
                <p className="mt-2 text-body-md font-medium italic text-emerald-700 dark:text-emerald-300">{product.tagline}</p>
              ) : null}
              <p className="mt-2 text-body-sm font-semibold text-ink-500 dark:text-white/50">{product.strength}</p>

              <p className="mt-6 text-body-lg text-ink-600 dark:text-white/70">{product.shortDescription}</p>

              <div className="mt-8 flex flex-wrap gap-3">
                <LinkButton href="/#distributor">Enquire as a Distributor</LinkButton>
                <LinkButton href="/contact" variant="secondary">
                  Contact Us
                </LinkButton>
                <a
                  href={product.brochure}
                  download
                  className="inline-flex items-center gap-2 rounded-full border border-gray-300 px-6 py-3.5 text-body-sm font-semibold text-ink-800 transition-colors duration-160 ease-out-strong hover:border-ink-300 active:scale-[0.97] dark:border-white/15 dark:text-white dark:hover:border-white/35"
                >
                  <Download size={16} />
                  Download Brochure
                </a>
              </div>

              <div className="mt-12">
                <Tabs items={tabItems} />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="section-y surface-muted">
          <div className="container container-px">
            <Reveal>
              <span className="eyebrow">Related</span>
              <h2 className="mt-4 text-display-md font-bold text-ink-950 dark:text-white">More from Nurture+</h2>
            </Reveal>
            <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((p, i) => (
                <ProductCard key={p.slug} product={p} index={i} />
              ))}
            </div>
            <div className="mt-10 text-center">
              <Link
                href="/products"
                className="text-body-sm font-semibold text-ink-800 hover:text-emerald-700 transition-colors dark:text-white/80 dark:hover:text-emerald-400"
              >
                View all products
              </Link>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
