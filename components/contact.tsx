import { Github, Linkedin, Mail } from "lucide-react";

import { Section } from "@/components/section";
import { siteConfig } from "@/lib/site";

export function Contact() {
  const hasEmail = siteConfig.email.length > 0;
  const hasLinkedin = siteConfig.linkedin.length > 0;

  return (
    <Section
      id="contact"
      eyebrow="05 / Contact"
      title="Get in touch"
      description="Open to internships, graduate roles and collaboration on robotics, embedded or automation projects."
    >
      <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
        {hasEmail ? (
          <a
            href={`mailto:${siteConfig.email}`}
            className="inline-flex items-center gap-2 rounded-lg bg-teal-300 px-5 py-2.5 text-sm font-semibold text-ink transition-colors hover:bg-teal-200"
          >
            <Mail className="h-4 w-4" aria-hidden="true" />
            Email me
          </a>
        ) : null}

        <a
          href={siteConfig.github}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-lg border border-line px-5 py-2.5 text-sm font-medium text-slate-300 transition-colors hover:border-slate-500 hover:text-white"
        >
          <Github className="h-4 w-4" aria-hidden="true" />
          github.com/ESLAMMRWAN456
        </a>

        {hasLinkedin ? (
          <a
            href={siteConfig.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg border border-line px-5 py-2.5 text-sm font-medium text-slate-300 transition-colors hover:border-slate-500 hover:text-white"
          >
            <Linkedin className="h-4 w-4" aria-hidden="true" />
            LinkedIn
          </a>
        ) : null}
      </div>

      {!hasEmail ? (
        <p className="mt-6 max-w-2xl text-sm leading-relaxed text-slate-500">
          For engineering collaborations or professional inquiries, feel free to
          connect through my GitHub profile. More contact channels will be added soon.
        </p>
      ) : null}
    </Section>
  );
}
