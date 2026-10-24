import { Github } from "lucide-react";

import { siteConfig } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-line py-10">
      <div className="container-page flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <p className="text-sm text-slate-500">
          {siteConfig.name} &middot; {siteConfig.role}
        </p>
        <a
          href={siteConfig.github}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-md text-sm text-slate-400 transition-colors hover:text-teal-300"
        >
          <Github className="h-4 w-4" aria-hidden="true" />
          GitHub
        </a>
      </div>
    </footer>
  );
}
