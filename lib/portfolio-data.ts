/**
 * Portfolio content.
 *
 * EDITING RULES — please keep these:
 *
 * 1. Everything in `projects` with `status: "completed"` must point at work that
 *    genuinely exists and is publicly verifiable. Anything not yet built belongs
 *    under `status: "planned"`, which the UI labels clearly and separately.
 * 2. Do not add metrics, accuracy figures, award claims or certifications unless
 *    you can link to evidence. An honest portfolio is a stronger portfolio.
 * 3. `tools` lists only technologies evidenced by published work or stated as a
 *    focus area. See the TODO in `toolGroups` before adding more.
 */

export type ProjectStatus = "completed" | "planned";

export type Project = {
  slug: string;
  title: string;
  status: ProjectStatus;
  /** One-paragraph factual description. No invented results. */
  summary: string;
  /** Concrete bullets. For planned work, phrase these as intended scope. */
  details: string[];
  stack: string[];
  domain: DomainKey;
  repo?: string;
  demo?: string;
};

export type DomainKey =
  | "robotics"
  | "embedded"
  | "automation"
  | "control"
  | "software"
  | "data";

export type FocusArea = {
  key: DomainKey;
  title: string;
  description: string;
};

/** The six areas stated as the current engineering focus. */
export const focusAreas: FocusArea[] = [
  {
    key: "robotics",
    title: "Robotics",
    description:
      "Mobile robot platforms, actuation and sensing, and the mechanical and electrical integration needed to make them move predictably.",
  },
  {
    key: "embedded",
    title: "Embedded Systems",
    description:
      "Microcontroller-based control, reading sensors over serial protocols, and writing firmware that behaves deterministically.",
  },
  {
    key: "automation",
    title: "Industrial Automation",
    description:
      "Programmable logic control, process sequencing and the instrumentation used on production lines.",
  },
  {
    key: "control",
    title: "Control Systems",
    description:
      "System modelling, feedback design and controller tuning — including PID — with validation against the modelled response.",
  },
  {
    key: "software",
    title: "Python & Software",
    description:
      "Automation scripts, tooling and small web applications, written with version control and reproducible builds.",
  },
  {
    key: "data",
    title: "Data Analytics",
    description:
      "Cleaning and exploring real datasets, then communicating what they show through clear visualisation.",
  },
];

export type ToolGroup = {
  title: string;
  items: string[];
};

/**
 * TODO (Eslam): add the hardware, CAD and simulation tools you have actually
 * used — for example Arduino, STM32, SolidWorks, MATLAB/Simulink, Altium, KiCad,
 * a specific PLC family. They are deliberately omitted right now because nothing
 * in this repository evidences them yet, and the portfolio should not claim them
 * until it can. Add them here as you build the projects below.
 */
export const toolGroups: ToolGroup[] = [
  {
    title: "Programming",
    items: ["Python", "TypeScript", "JavaScript"],
  },
  {
    title: "Data & Analysis",
    items: ["pandas", "NumPy", "Jupyter", "Matplotlib", "Seaborn"],
  },
  {
    title: "Web & Tooling",
    items: ["Next.js", "Tailwind CSS", "Git & GitHub", "GitHub Actions", "VS Code"],
  },
];

export type ExperienceEntry = {
  title: string;
  /** Leave empty to omit from the UI. */
  organisation: string;
  period: string;
  kind: "education" | "project";
  points: string[];
};

/**
 * TODO (Eslam): add internships, university laboratory work, student
 * competition teams (Formula Student, robotics clubs), workshops and training
 * here as entries. Only add what actually happened, with real dates.
 */
export const experience: ExperienceEntry[] = [
  {
    title: "B.Sc. Mechatronics Engineering — Senior Year",
    organisation: "Horus University, Egypt",
    period: "In progress",
    kind: "education",
    points: [
      "Senior-year undergraduate studying across the mechanical, electrical, control and software disciplines that make up mechatronics.",
      "Coursework and self-study focused on robotics, embedded systems, industrial automation and control systems.",
      "Applying Python and data-analysis techniques alongside core engineering subjects.",
    ],
  },
  {
    title: "Independent Data Analysis Project",
    organisation: "Self-directed",
    period: "2025",
    kind: "project",
    points: [
      "Took a public dataset from raw spreadsheet through to published notebooks and visualisations.",
      "Practised data cleaning, exploratory analysis and the visual communication of findings.",
      "Published the notebooks and a deployed summary site publicly on GitHub.",
    ],
  },
];

export const projects: Project[] = [
  {
    slug: "social-media-time-analysis",
    title: "Social Media Time-Waster Analysis",
    status: "completed",
    summary:
      "An exploratory data-analysis project examining how social media usage relates to time management, productivity and sleep, built from a public Kaggle dataset of roughly 1,000 records.",
    details: [
      "Cleaned and normalised the raw dataset: missing values, duplicate records and inconsistent time fields.",
      "Explored relationships between platform usage, self-reported productivity and sleep hours in Jupyter.",
      "Produced visualisations covering usage patterns, effective-user segments and addiction-level breakdowns.",
      "Published as three Jupyter notebooks plus a deployed summary site.",
    ],
    stack: ["Python", "pandas", "NumPy", "Jupyter", "Matplotlib", "Seaborn"],
    domain: "data",
    repo: "https://github.com/ESLAMMRWAN456/S1-Deep-Vision-",
    demo: "https://s1-deep-vision.vercel.app",
  },
  {
    slug: "engineering-portfolio",
    title: "Engineering Portfolio Website",
    status: "completed",
    summary:
      "This site. A statically rendered Next.js portfolio built to present engineering work honestly, keeping completed and planned work clearly separated.",
    details: [
      "Next.js 15 App Router with TypeScript in strict mode and Tailwind CSS.",
      "Responsive and accessible: semantic landmarks, skip-to-content link, keyboard-visible focus states and reduced-motion support.",
      "SEO through generated metadata, a sitemap, a robots policy, an Open Graph image and Person structured data.",
      "Continuous integration runs typecheck, lint and a production build on every push.",
    ],
    stack: ["Next.js 15", "TypeScript", "Tailwind CSS", "GitHub Actions"],
    domain: "software",
    repo: "https://github.com/ESLAMMRWAN456/eslam_portfolio",
  },
  {
    slug: "line-following-robot",
    title: "Line-Following Mobile Robot",
    status: "planned",
    summary:
      "A planned differential-drive robot that tracks a path using reflectance sensing, with a tuned feedback controller rather than fixed-speed switching.",
    details: [
      "Intended scope: chassis and motor-driver selection, sensor array mounting and calibration.",
      "Intended scope: implement and tune a PID controller for steering correction.",
      "Intended scope: compare controller performance against a simple bang-bang baseline and record the results.",
    ],
    stack: ["Microcontroller", "C/C++", "PID control", "Sensor calibration"],
    domain: "robotics",
  },
  {
    slug: "embedded-motor-control",
    title: "Closed-Loop Motor Speed Control",
    status: "planned",
    summary:
      "A planned embedded project holding a DC motor at a commanded speed under changing load using encoder feedback.",
    details: [
      "Intended scope: read quadrature encoder counts and derive speed on a fixed timer interrupt.",
      "Intended scope: drive the motor through PWM and an H-bridge, with a closed feedback loop.",
      "Intended scope: log the step response and document the tuning method used.",
    ],
    stack: ["Microcontroller", "C/C++", "PWM", "Encoder feedback"],
    domain: "embedded",
  },
  {
    slug: "plc-process-control",
    title: "PLC-Based Process Sequencing",
    status: "planned",
    summary:
      "A planned industrial-automation exercise implementing a multi-stage process sequence with interlocks and fault handling.",
    details: [
      "Intended scope: define the process states, transitions and safety interlocks.",
      "Intended scope: implement the sequence in ladder logic and simulate the I/O.",
      "Intended scope: add an operator view for status and fault indication.",
    ],
    stack: ["PLC", "Ladder logic", "Process interlocks"],
    domain: "automation",
  },
  {
    slug: "control-system-modelling",
    title: "Control System Modelling & Simulation",
    status: "planned",
    summary:
      "A planned modelling study deriving the transfer function of a physical plant, then designing and simulating a controller against it.",
    details: [
      "Intended scope: derive the plant model and validate it against measured behaviour.",
      "Intended scope: design a controller and examine stability margins.",
      "Intended scope: simulate the closed-loop response and compare it to the physical system.",
    ],
    stack: ["System modelling", "Transfer functions", "Simulation"],
    domain: "control",
  },
];

export const completedProjects = projects.filter((p) => p.status === "completed");
export const plannedProjects = projects.filter((p) => p.status === "planned");
