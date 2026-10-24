import type { NextConfig } from "next";

/**
 * Baseline security headers.
 *
 * The CSP is deliberately strict: this site loads no third-party scripts and no
 * remote images. `'unsafe-inline'` is required for style-src because Next.js
 * injects inline styles, and for script-src because the App Router inlines its
 * hydration payload. Revisit if an analytics or embed provider is added.
 */
const contentSecurityPolicy = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline'",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "font-src 'self' data:",
  "connect-src 'self'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  "upgrade-insecure-requests",
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: contentSecurityPolicy },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), payment=()",
  },
];

const nextConfig: NextConfig = {
  outputFileTracingRoot: process.cwd(),
  poweredByHeader: false,
  reactStrictMode: true,
  images: {
    // WebP only. AVIF is intentionally not enabled: it is the slowest format to
    // encode and has carried the heavier CVE history in the optimizer.
    formats: ["image/webp"],
    // No remote hosts are allowed. Add entries here deliberately if that changes.
    remotePatterns: [],
    dangerouslyAllowSVG: false,
  },
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

export default nextConfig;
