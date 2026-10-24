import {
  BarChart3,
  Bot,
  Code2,
  Cpu,
  Factory,
  Gauge,
  type LucideIcon,
} from "lucide-react";

import { Section } from "@/components/section";
import { focusAreas, toolGroups, type DomainKey } from "@/lib/portfolio-data";

const domainIcons: Record<DomainKey, LucideIcon> = {
  robotics: Bot,
  embedded: Cpu,
  automation: Factory,
  control: Gauge,
  software: Code2,
  data: BarChart3,
};

export function Skills() {
  return (
    <Section
      id="skills"
      eyebrow="02 / Skills"
      title="Technical skills"
      description="Focus areas describe where my engineering work is directed. The tools listed below are ones I have actually used in published work — the list grows as the projects do, rather than ahead of them."
    >
      <h3 className="sr-only">Focus areas</h3>
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {focusAreas.map((area) => {
          const Icon = domainIcons[area.key];
          return (
            <li key={area.key} className="card">
              <Icon
                className="h-5 w-5 text-teal-300"
                aria-hidden="true"
              />
              <h4 className="mt-4 text-base">{area.title}</h4>
              <p className="mt-2 text-sm leading-relaxed text-slate-400">
                {area.description}
              </p>
            </li>
          );
        })}
      </ul>

      <h3 className="mt-12 font-mono text-xs uppercase tracking-[0.2em] text-teal-300">
        Tools &amp; technologies
      </h3>
      <dl className="mt-6 grid gap-6 sm:grid-cols-3">
        {toolGroups.map((group) => (
          <div key={group.title}>
            <dt className="text-sm font-medium text-slate-200">
              {group.title}
            </dt>
            <dd className="mt-3">
              <ul className="flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <li key={item} className="tag">
                    {item}
                  </li>
                ))}
              </ul>
            </dd>
          </div>
        ))}
      </dl>
    </Section>
  );
}
