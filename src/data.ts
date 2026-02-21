export const githubUsername = "s4rvessh04";
export { CAREER_START_DATE as careerStartDate } from "./config";

export const dataCurrently = [
  { title: "Software Engineer" },
  { title: "Backend Developer" },
  { title: "DevOps Enthusiast" },
];

export const socialLinks = [
  { title: "GitHub", link: `https://github.com/${githubUsername}` },
  {
    title: "LinkedIn",
    link: "https://linkedin.com/in/sarvesh-rane-80452522a",
  },
  { title: "Instagram", link: "https://www.instagram.com/sarve.ssh_/" },
  { title: "Twitter/X", link: "https://twitter.com/sarvessh_/" },
  { title: "Gmail", link: "mailto:sarveshrane2000.portfolio-site@gmail.com" },
];

export const projects = [
  {
    title: "Budgeter",
    github: `https://github.com/${githubUsername}/Budgeter_v2`,
    live: "https://budgeter-v2-1.onrender.com",
    description:
      "A simple, personal, financial wellness utility based on React and Django",
    image: "/projects/budgeter.svg",
    stack: ["React", "Django", "PostgreSQL", "Docker"],
  },
  {
    title: "Loadbalancer (L4)",
    github: `https://github.com/${githubUsername}/loadbalancer-l4`,
    description: "A Layer 4 loadbalancer built using Go standard library",
    image: "/projects/loadbalancer.svg",
    stack: ["Go (Standard Library)", "TCP", "UDP"],
  },
  {
    title: "Vartalap",
    github: `https://github.com/${githubUsername}/vartalap-nextjs`,
    live: "https://vartalap.sarveshrane.pages.dev",
    description: "A realtime chat-app built using NextJS",
    image: "/projects/vartalap.svg",
    stack: ["Next.js", "Redis (Pub/Sub)", "TypeScript"],
  },
  {
    title: "Bookmarks Lite",
    github: `https://github.com/${githubUsername}/bookmarks-lite`,
    live: "https://bookmarks-lite.vercel.app",
    description: "A simple, personal, bookmark manager built using NextJS",
    image: "/projects/bookmarks-lite.svg",
    stack: ["Next.js", "PostgreSQL", "Google OAuth", "TypeScript"],
  },
  {
    title: "Pastebin Lite",
    github: `https://github.com/${githubUsername}/pastebin-lite`,
    live: "https://pastebin-lite-six-virid.vercel.app",
    description: "A lightweight, serverless-optimized pastebin clone built with Next.js",
    image: "/projects/pastebin-lite.svg",
    stack: ["Next.js", "PostgreSQL", "TypeScript"],
  },
  {
    title: "Blog Site",
    github: `https://github.com/${githubUsername}/astro-blog-site`,
    live: "https://blog-sarvessh.vercel.app/",
    description: "Personal blogging website built with Astro",
    image: "/projects/blog.svg",
    stack: ["Astro", "Markdown", "Tailwind CSS"],
  },
];

export const skills = [
  {
    title: "Programming Languages",
    data: [
      { title: "JavaScript", level: "Advanced" },
      { title: "Python", level: "Advanced" },
      { title: "Go", level: "Medium" },
      { title: "Java", level: "Medium" },
    ],
  },
  {
    title: "Frameworks",
    data: [
      { title: "ExpressJS", level: "Advanced" },
      { title: "HonoJS", level: "Advanced" },
      { title: "React", level: "Advanced" },
      { title: "Django", level: "Advanced" },
      { title: "FastAPI", level: "Intermediate" },
      { title: "NextJS", level: "Beginner" },
    ],
  },
  {
    title: "Databases",
    data: [
      { title: "MySQL", level: "Intermediate" },
      { title: "Postgresql", level: "Intermediate" },
      { title: "SQLite", level: "Intermediate" },
      { title: "MongoDB", level: "Beginner" },
    ],
  },
  {
    title: "Technologies",
    data: [
      { title: "Git", level: "Intermediate" },
      { title: "Docker", level: "Advanced" },
      { title: "ELK stack", level: "Advanced" },
      { title: "K8s", level: "Advanced" },
      { title: "Redis", level: "Advanced" },
      { title: "Apache Kafka", level: "Beginner" },
      { title: "Linux", level: "Intermediate" },
    ],
  },
];

export const professionalSummary = `
I am a performance-driven Software Engineer focused on building robust backend systems that power enterprise products. Over the last two years, I've specialized in managing microservices and scaling infrastructure—consistently delivering measurable improvements in system efficiency and code reliability.
I am a strong advocate for Generative AI in software engineering, utilizing it to ship faster and elevate code quality. I thrive on "leveling up" technical stacks and pushing the boundaries of what a system can handle. When I'm not at my desk, I'm usually traveling or finding fresh inspiration at EDM events, bringing that same high energy back to the codebase.
`
