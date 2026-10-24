import { CheckCircle2, Clock, ExternalLink, Github } from "lucide-react";

import { Section } from "@/components/section";
import {
  completedProjects,
  plannedProjects,
  type Project,
} from "@/lib/portfolio-data";

function StatusBadge({ status }: { status: Project["status"] }) {
  if (status === "completed") {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-md border border-teal-300/30 bg-teal-300/10 px-2 py-1 font-mono text-xs text-teal-300">
        <CheckCircle2 className="h-3.5 w-3.5" aria-hidden="true" />
        Completed
      </span>
    );
  }

  return (
    <span className="inline-flex items-center gap-1.5 rounded-md border border-amber-300/30 bg-amber-300/10 px-2 py-1 font-mono text-xs text-amber-300">
      <Clock className="h-3.5 w-3.5" aria-hidden="true" />
      Planned
    </span>
  );
}

function ProjectCard({ project }: { project: Project }) {
  const headingId = `project-${project.slug}`;

  return (
    <li className="card flex flex-col">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <h4 id={headingId} className="text-lg">
          {project.title}
        </h4>
        <StatusBadge status={project.status} />
      </div>

      <p className="mt-3 text-sm leading-relaxed text-slate-400">
        {project.summary}
      </p>

      <ul className="mt-4 space-y-2">
        {project.details.map((detail) => (
          <li
            key={detail}
            className="flex gap-2.5 text-sm leading-relaxed text-slate-400"
          >
            <span
              aria-hidden="true"
              className="mt-[0.45rem] h-1 w-1 shrink-0 rounded-full bg-slate-600"
            />
            {detail}
          </li>
        ))}
      </ul>

      <ul
        className="mt-5 flex flex-wrap gap-2"
        aria-label={`Technologies used in ${project.title}`}
      >
        {project.stack.map((item) => (
          <li key={item} className="tag">
            {item}
          </li>
        ))}
      </ul>

      {project.repo || project.demo ? (
        <div className="mt-6 flex flex-wrap items-center gap-4 border-t border-line pt-4">
          {project.repo ? (
            <a
              href={project.repo}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-md text-sm font-medium text-slate-300 transition-colors hover:text-teal-300"
            >
              <Github className="h-4 w-4" aria-hidden="true" />
              Repository
              <span className="sr-only"> for {project.title}</span>
            </a>
          ) : null}
          {project.demo ? (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-md text-sm font-medium text-slate-300 transition-colors hover:text-teal-300"
            >
              <ExternalLink className="h-4 w-4" aria-hidden="true" />
              Live site
              <span className="sr-only"> for {project.title}</span>
            </a>
          ) : null}
        </div>
      ) : null}
    </li>
  );
}

export function Projects() {
  return (
    <Section
      id="projects"
      eyebrow="04 / Projects"
      title="Featured projects"
      description="Completed work is published and linked to its repository. Planned work states its intended scope only — no results, measurements or demonstrations are claimed for anything not yet built."
    >
      <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-teal-300">
        Completed
      </h3>
      <ul className="mt-6 grid gap-4 lg:grid-cols-2">
        {completedProjects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </ul>

      <h3 className="mt-14 font-mono text-xs uppercase tracking-[0.2em] text-amber-300">
        Planned
      </h3>
      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-500">
        These are not built yet. They are listed so the direction of the work is
        clear, and each will move to the completed section only once it exists in
        a public repository.
      </p>
      <ul className="mt-6 grid gap-4 lg:grid-cols-2">
        {plannedProjects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </ul>
    </Section>
  );
}
