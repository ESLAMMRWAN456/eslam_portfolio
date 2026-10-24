import { ArrowRight, Github } from "lucide-react";

import { focusAreas } from "@/lib/portfolio-data";
import { siteConfig } from "@/lib/site";

export function Hero() {
  return (
    <section
      id="hero"
      aria-labelledby="hero-heading"
      className="relative overflow-hidden"
    >
      {/* Decorative only: a soft accent wash behind the heading. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-32 left-1/2 h-72 w-[42rem] max-w-[120vw] -translate-x-1/2 rounded-full bg-teal-400/10 blur-3xl"
      />

      <div className="container-page relative py-20 sm:py-28">
        <p className="eyebrow">{siteConfig.role}</p>

        <h1
          id="hero-heading"
          className="mt-4 text-3xl leading-tight tracking-tight sm:text-5xl"
        >
          {siteConfig.name}
        </h1>

        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-400">
          {siteConfig.headline}
        </p>

        <div className="mt-8 flex flex-wrap items-center gap-3">
          <a
            href="#projects"
            className="inline-flex items-center gap-2 rounded-lg bg-teal-300 px-5 py-2.5 text-sm font-semibold text-ink transition-colors hover:bg-teal-200"
          >
            View projects
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </a>
          <a
            href={siteConfig.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg border border-line px-5 py-2.5 text-sm font-medium text-slate-300 transition-colors hover:border-slate-500 hover:text-white"
          >
            <Github className="h-4 w-4" aria-hidden="true" />
            GitHub
          </a>
        </div>

        <ul className="mt-12 flex flex-wrap gap-2" aria-label="Focus areas">
          {focusAreas.map((area) => (
            <li key={area.key} className="tag">
              {area.title}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
