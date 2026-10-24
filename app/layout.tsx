import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";

import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { siteConfig, siteUrl } from "@/lib/site";

import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${siteConfig.name} — ${siteConfig.role}`,
    template: `%s | ${siteConfig.shortName}`,
  },
  description: siteConfig.description,
  applicationName: `${siteConfig.shortName} Portfolio`,
  authors: [{ name: siteConfig.name, url: siteConfig.github }],
  creator: siteConfig.name,
  keywords: [
    "Eslam Mohammed Mrwan",
    "Mechatronics Engineering",
    "Robotics",
    "Embedded Systems",
    "Industrial Automation",
    "Control Systems",
    "Python",
    "Data Analytics",
    "Engineering portfolio",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: `${siteConfig.name} — Portfolio`,
    title: `${siteConfig.name} — ${siteConfig.role}`,
    description: siteConfig.description,
    url: siteUrl,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} — ${siteConfig.role}`,
    description: siteConfig.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  category: "technology",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#080b12",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} dark scroll-smooth`}>
      <body className="min-h-dvh font-sans">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-teal-300 focus:px-4 focus:py-2 focus:font-medium focus:text-ink"
        >
          Skip to main content
        </a>
        <SiteHeader />
        <main id="main">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
