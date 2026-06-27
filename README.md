# Eslam Mrwan Python Automation Website

A high-converting freelance website for **Eslam Mrwan**, positioned as a **Python Automation Developer** for founders, agencies, and small businesses.

The site focuses on client acquisition, not recruiting. Visitors should quickly understand what Eslam does, who he helps, why the work is credible, and how to contact him.

## Stack

- Next.js 15 with App Router
- TypeScript
- Tailwind CSS
- Framer Motion
- SEO metadata, sitemap, robots, structured data, and Open Graph image
- Responsive dark interface optimized for Vercel

## Services Presented

- Python Automation
- Data Processing
- Web Scraping
- Excel Automation
- Data Cleaning
- Reporting Scripts

## Getting Started

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Production Build

```bash
npm run build
npm run start
```

## Environment Variables

Copy `.env.example` to `.env.local` and update the public URL after deployment:

```bash
NEXT_PUBLIC_SITE_URL=https://your-vercel-domain.vercel.app
CONTACT_TO_EMAIL=eslambahloul33@gmail.com
```

`NEXT_PUBLIC_SITE_URL` powers canonical URLs, sitemap, robots, LinkedIn previews, WhatsApp previews, and Open Graph sharing.

## Deployment on Vercel

1. Push this project to a GitHub repository.
2. Import the repository into Vercel.
3. Keep the framework preset as **Next.js**.
4. Add `NEXT_PUBLIC_SITE_URL` in Vercel project settings after the first deployment.
5. Redeploy so previews and sitemap use the final public domain.

After deployment, the site can be shared as one public URL on LinkedIn, WhatsApp, cold outreach, proposals, and freelance profiles.

## Project Structure

```text
app/
  layout.tsx       SEO metadata and root layout
  page.tsx         Structured data and page entry
  robots.ts        Search crawler policy
  sitemap.ts       Sitemap generation
components/
  portfolio-page.tsx
lib/
  portfolio-data.ts
public/
  Eslam_Marwan_CV.pdf
  og-image.png
  case-studies/
```

## Customization Notes

- Update `profile.github` in `lib/portfolio-data.ts` only if your GitHub profile changes.
- Add case-study GitHub links only when a real public repository exists.
- Keep incomplete projects clearly marked as under development or repository coming soon.
- Keep the About section under 120 words so the page stays buyer-focused.
- The contact form opens the visitor's email app with a prepared project brief. It can later be upgraded to an API route or email provider.
