import { FolderGit2, GraduationCap } from "lucide-react";

import { Section } from "@/components/section";
import { experience } from "@/lib/portfolio-data";

export function Experience() {
  return (
    <Section
      id="experience"
      eyebrow="03 / Experience"
      title="Engineering experience"
      description="Academic standing and self-directed engineering work. Internships and laboratory experience will be added here as they are completed."
    >
      <ol className="space-y-4">
        {experience.map((entry) => {
          const Icon = entry.kind === "education" ? GraduationCap : FolderGit2;
          return (
            <li key={entry.title} className="card">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="flex items-start gap-3">
                  <span
                    aria-hidden="true"
                    className="mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-line bg-white/[0.03]"
                  >
                    <Icon className="h-4 w-4 text-teal-300" />
                  </span>
                  <div>
                    <h3 className="text-base">{entry.title}</h3>
                    {entry.organisation ? (
                      <p className="mt-1 text-sm text-slate-400">
                        {entry.organisation}
                      </p>
                    ) : null}
                  </div>
                </div>
                <span className="tag shrink-0">{entry.period}</span>
              </div>

              <ul className="mt-4 space-y-2 border-l border-line pl-4 sm:ml-12">
                {entry.points.map((point) => (
                  <li
                    key={point}
                    className="text-sm leading-relaxed text-slate-400"
                  >
                    {point}
                  </li>
                ))}
              </ul>
            </li>
          );
        })}
      </ol>
    </Section>
  );
}
