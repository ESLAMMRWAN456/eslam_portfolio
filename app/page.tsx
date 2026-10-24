import { About } from "@/components/about";
import { Contact } from "@/components/contact";
import { Experience } from "@/components/experience";
import { Hero } from "@/components/hero";
import { Projects } from "@/components/projects";
import { Skills } from "@/components/skills";
import { completedProjects, focusAreas } from "@/lib/portfolio-data";
import { siteConfig, siteUrl } from "@/lib/site";

/**
 * Person structured data. Only facts that are stated on the page itself, so the
 * markup and the rendered content never disagree.
 */
function StructuredData() {
  const sameAs: string[] = [siteConfig.github];
  if (siteConfig.linkedin) sameAs.push(siteConfig.linkedin);

  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: siteConfig.name,
    url: siteUrl,
    jobTitle: siteConfig.role,
    description: siteConfig.description,
    knowsAbout: focusAreas.map((area) => area.title),
    sameAs,
    subjectOf: completedProjects
      .filter((project) => project.repo)
      .map((project) => ({
        "@type": "CreativeWork",
        name: project.title,
        abstract: project.summary,
        url: project.repo,
      })),
  };

  return (
    <script
      type="application/ld+json"
      // Static, build-time content only — no user input is interpolated here.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
    />
  );
}

export default function HomePage() {
  return (
    <>
      <StructuredData />
      <Hero />
      <About />
      <Skills />
      <Experience />
      <Projects />
      <Contact />
    </>
  );
}
