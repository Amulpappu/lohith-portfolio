// Edit all site content here.

export type ProjectLink = { label: string; url: string };

export type Project = {
  title: string;
  subtitle?: string;
  /** One-line problem statement. */
  problem: string;
  /** "What I built" — 2–3 short bullets, based only on the real repo. */
  built: string[];
  tags: string[];
  /** Honest status label. */
  status: string;
  /** Exact repository URL. Leave it out until the real link exists. */
  repoUrl?: string;
  /** GitHub repo preview image. */
  image: string;
  featured?: boolean;
  /** Extra links shown inside the card (other repos, live demos). */
  links?: ProjectLink[];
};

const og = (repo: string) => `https://opengraph.githubassets.com/1/Amulpappu/${repo}`;

const projects: Project[] = [
  {
    title: "Jiraiya Bot Monitor",
    subtitle: "Mechanic shop management · Admin panel",
    problem:
      "A mechanic shop tracked services, kits and invoices by hand across Discord messages.",
    built: [
      "Discord bot that reads service, kit and invoice messages — including screenshots via OCR",
      "Logs entries to Google Sheets with kit/service pricing",
      "Web admin dashboard with a login portal and role-based access control",
    ],
    tags: ["Python", "Discord.py", "OCR", "Google Sheets API", "Flask", "Render"],
    status: "Deployed (Render)",
    repoUrl: "https://github.com/Amulpappu/jiraiya-bot-monitor",
    image: og("jiraiya-bot-monitor"),
    featured: true,
  },
  {
    title: "Manjummel",
    problem: "Discord servers juggle many single-purpose bots.",
    built: [
      "Music player with button controls",
      "Welcome cards, invite tracker and server stats",
      "Moderation with audit logs",
    ],
    tags: ["Python", "discord.py", "Pillow"],
    status: "Working bot",
    repoUrl: "https://github.com/Amulpappu/Manjummel",
    image: og("Manjummel"),
  },
  {
    title: "AgriGuard",
    problem: "Indian farmers lack quick access to crop disease screening.",
    built: [
      "AI crop disease detection",
      "Crop health monitoring for farmers",
    ],
    tags: ["TypeScript", "AI/ML"],
    status: "Prototype · in development",
    repoUrl: "https://github.com/Amulpappu/AgriGuard",
    image: og("AgriGuard"),
  },
  {
    title: "SpendWise",
    problem: "Tracking bank and UPI spending without giving up privacy.",
    built: [
      "Android expense tracker with on-device privacy",
      "Live Google Sheets sync",
      "Bank-statement generator",
    ],
    tags: ["Kotlin", "Android", "Firebase Auth"],
    status: "Android app (APK)",
    repoUrl: "https://github.com/Amulpappu/SpendWise",
    image: og("SpendWise"),
  },
  {
    title: "Moonlight ML Workshop",
    problem: "Showing how machine learning works in real time, in the browser.",
    built: [
      "Webcam/mic ML apps trained with Google Teachable Machine",
      "Separate image, audio and pose recognition projects",
    ],
    tags: ["ml5.js", "p5.js", "JavaScript"],
    status: "Workshop projects",
    image: og("MoonLight-Machine-Learning-Workshop"),
    links: [
      { label: "Image", url: "https://github.com/Amulpappu/MoonLight-Machine-Learning-Workshop" },
      { label: "Audio", url: "https://github.com/Amulpappu/MoonLight-Machine-Learning-Workshop-Audio-" },
      { label: "Pose", url: "https://github.com/Amulpappu/MoonLight-Machine-Learning-Workshop-Pose-" },
    ],
  },
  {
    title: "Gamer Portfolio",
    problem: "A personal site that feels like a game, not a résumé.",
    built: [
      "Gaming-themed portfolio with a terminal intro",
      "Live Discord/Steam status",
    ],
    tags: ["HTML", "CSS", "JavaScript"],
    status: "Live on Vercel",
    repoUrl: "https://github.com/Amulpappu/Designer",
    image: og("Designer"),
    links: [{ label: "Live", url: "https://designer-coral.vercel.app" }],
  },
];

export const site = {
  name: "Lohith K",
  monogram: "LK",
  chips: ["Cyber Security", "Full-stack", "Python · TypeScript · Kotlin"],
  headline: "Lohith K — building secure, useful things with code & AI.",
  subline:
    "First-year B.E. CSE (Cyber Security) student at Rathinam Technical Campus. I build Discord bots, admin dashboards, AI tools and full-stack apps.",
  status: "Available for internships & hackathons",
  /** Link to your résumé PDF. Leave empty to hide the Résumé button. */
  resumeUrl: "",
  tiles: [
    { label: "Shipped projects", value: "6 public repos on GitHub" },
    { label: "Currently", value: "B.E. CSE (Cyber Security), Year 1" },
    { label: "Based in Coimbatore, IN", value: "Open to internships & remote" },
  ],
  about:
    "I'm a first-year Cyber Security student in Coimbatore who likes turning ideas into shipped software — from Discord automation and admin dashboards to Android apps and AI tools. I'm interested in security, AI and building things people actually use.",
  education: [
    {
      title: "B.E. CSE (Cyber Security)",
      place: "Rathinam Technical Campus, Coimbatore",
      period: "2026 – present · Semester 1",
    },
    {
      title: "Class 12 — Computer Science group, Tamil Nadu State Board",
      place: "Srividyalayam Matric Hr. Sec. School, Madurai",
      period: "Completed 2026",
    },
  ],
  projects,
  skills: [
    { group: "Software development", items: ["Python", "TypeScript", "JavaScript", "Kotlin"] },
    { group: "Web", items: ["React", "Vite", "Tailwind", "FastAPI", "HTML/CSS"] },
    { group: "AI & automation", items: ["ml5.js", "Teachable Machine", "OCR", "Discord bots (discord.py)", "Google Sheets API"] },
    { group: "Data & cloud", items: ["PostgreSQL", "Firebase", "Supabase", "Docker", "Vercel", "Render", "Oracle"] },
    { group: "Creative tools", items: ["Blender", "After Effects", "Runway"] },
    { group: "Focus area", items: ["Cyber Security (student)"] },
  ],
  achievements: [
    { title: "Seva First Innovation Challenge (SFIC)", detail: "AgriGuard", status: "Submitted (2026)" },
    {
      title: "Vishwakarma Awards 2026–27",
      detail: "CurrentGuard AI · Sustainable Energy · Smart Grids",
      status: "Stage 2 (Design Development)",
    },
    { title: "IndiaSkills Competition 2026–27 (Tamil Nadu)", detail: "Team-skill entry", status: "Registered" },
  ],
  links: {
    github: "https://github.com/Amulpappu",
    linkedin: "https://www.linkedin.com/in/lohith-k-b1331a3a8",
    /** Your email. Leave empty to hide the email link. */
    email: "",
  },
};
