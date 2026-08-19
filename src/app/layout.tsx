import type { Metadata } from "next";
import "@fontsource/montserrat/400.css";
import "@fontsource/montserrat/500.css";
import "@fontsource/montserrat/600.css";
import "@fontsource/montserrat/700.css";
import "@fontsource/montserrat/800.css";
import "@fontsource/montserrat/400-italic.css";
import "@fontsource/montserrat/500-italic.css";
import "@fontsource/montserrat/600-italic.css";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { PageTransition } from "@/components/page-transition";
import { WhatsAppFloatingButton } from "@/components/ui/whatsapp-button";

const siteUrl = "https://www.nurtureplus.in";

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Nurture+",
  alternateName: "Nurture+ (A unit of Bhadrakali Groups)",
  url: siteUrl,
  logo: `${siteUrl}/brand/logo.png`,
  slogan: "Adds Life.",
  email: "nurtureplusaddslife@gmail.com",
  telephone: "+91-888-687-8873",
  address: {
    "@type": "PostalAddress",
    streetAddress: "43-4-12/1, SF-301, Opp. Indian Oil Petrol Bunk, Railway New Colony",
    addressLocality: "Visakhapatnam",
    addressRegion: "Andhra Pradesh",
    postalCode: "530016",
    addressCountry: "IN",
  },
};


export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Nurture+ | Premium Intravenous Wellness Solutions for Healthcare Professionals",
    template: "%s | Nurture+",
  },
  description:
    "Nurture+ manufactures premium IV therapy formulations — Elixir+NAD, GLUTA+ Ultra, GLUTA+ and Zinco+ — for hospitals, clinics and healthcare distributors. WHO-GMP certified manufacturing.",
  keywords: [
    "IV therapy products",
    "IV glutathione manufacturer",
    "NAD+ IV therapy supplier",
    "wellness clinic IV distributor",
    "hospital IV therapy supplier",
    "Nurture+",
  ],
  authors: [{ name: "Nurture+" }],
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: "Nurture+",
    title: "Nurture+ | Premium Intravenous Wellness Solutions",
    description:
      "Premium IV therapy formulations for hospitals, clinics and healthcare distributors. WHO-GMP certified manufacturing.",
    images: [{ url: "/brand/og-image.jpg", width: 1200, height: 630, alt: "Nurture+ — Adds Life" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Nurture+ | Premium Intravenous Wellness Solutions",
    description: "Premium IV therapy formulations for hospitals, clinics and healthcare distributors.",
    images: ["/brand/og-image.jpg"],
  },
  icons: {
    icon: "/brand/mark.png",
    apple: "/brand/mark.png",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('nurture-theme');var d=t?t==='dark':window.matchMedia('(prefers-color-scheme: dark)').matches;if(d){document.documentElement.classList.add('dark');document.documentElement.style.colorScheme='dark';}}catch(e){}})();`,
          }}
        />
      </head>
      <body suppressHydrationWarning>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:z-[100] focus:top-4 focus:left-4 focus:bg-ink-900 focus:text-white focus:px-4 focus:py-2 focus:rounded-md"
        >
          Skip to content
        </a>
        <SiteHeader />
        <main id="main">
          <PageTransition>{children}</PageTransition>
        </main>
        <SiteFooter />
        <WhatsAppFloatingButton />
      </body>
    </html>
  );
}
