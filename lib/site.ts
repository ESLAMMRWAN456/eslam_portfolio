/**
 * Site-wide configuration.
 *
 * Personal contact details are intentionally NOT committed to this repository.
 * They are read from environment variables at build time and the UI degrades
 * gracefully when they are absent. See `.env.example` and the README.
 */

const FALLBACK_SITE_URL = "https://eslam-portfolio.vercel.app";

/** Absolute origin with any trailing slash removed. */
export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL?.trim() || FALLBACK_SITE_URL
).replace(/\/+$/, "");

export const siteConfig = {
  name: "Eslam Mohammed Mrwan",
  shortName: "Eslam Mrwan",
  role: "Mechatronics Engineering Student",
  headline:
    "Senior Mechatronics Engineering student working across robotics, embedded systems and industrial automation.",
  description:
    "Portfolio of Eslam Mohammed Mrwan, a senior Mechatronics Engineering student focused on robotics, embedded systems, industrial automation, control systems, Python and data analytics.",
  url: siteUrl,
  github: "https://github.com/ESLAMMRWAN456",
  /** Set NEXT_PUBLIC_CONTACT_EMAIL to publish a contact address. */
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL?.trim() ?? "",
  /** Set NEXT_PUBLIC_LINKEDIN_URL to show a LinkedIn link. */
  linkedin: process.env.NEXT_PUBLIC_LINKEDIN_URL?.trim() ?? "",
} as const;

export const navItems = [
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#experience", label: "Experience" },
  { href: "#projects", label: "Projects" },
  { href: "#contact", label: "Contact" },
] as const;
