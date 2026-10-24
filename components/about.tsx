import { Section } from "@/components/section";

export function About() {
  return (
    <Section id="about" eyebrow="01 / About" title="About me">
      <div className="grid gap-10 lg:grid-cols-[1.6fr_1fr]">
        <div className="space-y-5 text-base leading-relaxed text-slate-400">
          <p>
            I am a senior Mechatronics Engineering student. Mechatronics sits at
            the intersection of mechanical design, electronics, control and
            software, and that overlap is the part I find most interesting:
            getting a physical system to behave the way the model says it should.
          </p>
          <p>
            My current focus is robotics, embedded systems, industrial automation
            and control systems. Alongside the hardware side, I work in Python
            and data analytics, which is where my first published project came
            from. I prefer projects that end in something measurable rather than
            something that merely compiles.
          </p>
          <p>
            This portfolio is deliberately honest about stage of work. Projects
            that are finished and publicly verifiable are marked as completed and
            linked to their repositories. Projects I intend to build are marked as
            planned, with their scope stated and no results claimed. I would
            rather show a short list of real work than a long list of
            placeholders.
          </p>
        </div>

        <aside
          aria-label="At a glance"
          className="card h-fit space-y-4 text-sm"
        >
          <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-teal-300">
            At a glance
          </h3>
          <dl className="space-y-3">
            <div>
              <dt className="text-slate-500">Discipline</dt>
              <dd className="text-slate-200">Mechatronics Engineering</dd>
            </div>
            <div>
              <dt className="text-slate-500">Stage</dt>
              <dd className="text-slate-200">Senior year, in progress</dd>
            </div>
            <div>
              <dt className="text-slate-500">Core interests</dt>
              <dd className="text-slate-200">
                Robotics, embedded systems, automation, control
              </dd>
            </div>
            <div>
              <dt className="text-slate-500">Software</dt>
              <dd className="text-slate-200">Python, data analytics</dd>
            </div>
          </dl>
        </aside>
      </div>
    </Section>
  );
}
