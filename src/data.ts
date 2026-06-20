export const githubUsername = "s4rvessh04";
export { CAREER_START_DATE as careerStartDate } from "./config";

export const dataCurrently = [
  { title: "Backend Engineer" },
  { title: "Systems Engineer" },
  { title: "Infrastructure" },
];

export const socialLinks = [
  { title: "GitHub", link: `https://github.com/${githubUsername}`, icon: "github" },
  {
    title: "LinkedIn",
    link: "https://linkedin.com/in/sarvesh-rane-80452522a",
    icon: "linkedin",
  },
  { title: "Instagram", link: "https://www.instagram.com/sarve.ssh_/", icon: "instagram" },
  { title: "Twitter/X", link: "https://twitter.com/sarvessh_/", icon: "x" },
  { title: "Gmail", link: "mailto:sarveshrane2000.portfolio-site@gmail.com", icon: "gmail" },
];

export const projects = [
  {
    title: "Budgeter",
    github: `https://github.com/${githubUsername}/Budgeter_v2`,
    live: "https://budgeter-v2-1.onrender.com",
    description:
      "A financial tracking API and dashboard powered by React and Django.",
    image: "/projects/budgeter.svg",
    stack: ["React", "Django", "PostgreSQL", "Docker"],
  },
  {
    title: "Loadbalancer (L4)",
    github: `https://github.com/${githubUsername}/loadbalancer-l4`,
    description: "A high-performance Layer 4 load balancer built from scratch with the Go standard library.",
    image: "/projects/loadbalancer.svg",
    stack: ["Go (Standard Library)", "TCP", "UDP"],
  },
  {
    title: "Vartalap",
    github: `https://github.com/${githubUsername}/vartalap-nextjs`,
    live: "https://vartalap-nextjs.vercel.app/",
    description: "A low-latency real-time chat application backed by Redis Pub/Sub.",
    image: "/projects/vartalap.svg",
    stack: ["Next.js", "Redis (Pub/Sub)", "TypeScript"],
  },
  {
    title: "Bookmarks Lite",
    github: `https://github.com/${githubUsername}/bookmarks-lite`,
    live: "https://bookmarks-lite.vercel.app",
    description: "A serverless bookmark management system backed by PostgreSQL and Google OAuth.",
    image: "/projects/bookmarks-lite.svg",
    stack: ["Next.js", "PostgreSQL", "Google OAuth", "TypeScript"],
  },
  {
    title: "Pastebin Lite",
    github: `https://github.com/${githubUsername}/pastebin-lite`,
    live: "https://pastebin-lite-six-virid.vercel.app",
    description: "A fast, serverless pastebin clone optimized for low-latency text retrieval.",
    image: "/projects/pastebin-lite.svg",
    stack: ["Next.js", "PostgreSQL", "TypeScript"],
  },
  {
    title: "Blog Site",
    github: `https://github.com/${githubUsername}/astro-blog-site`,
    live: "https://blog-sarvessh.vercel.app/",
    description: "A highly-optimized, statically-generated technical blog.",
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
      { title: "PostgreSQL", level: "Intermediate" },
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
I am a systems-focused software engineer who builds robust backend services and scalable infrastructure. With over two years of experience, my focus has been on distributed systems, microservice architectures, and performance optimization,consistently delivering measurable gains in system throughput and reliability.

I write pragmatic, production-ready code and leverage modern tooling to ship faster without compromising on quality. I thrive when tackling complex architectural bottlenecks and scaling systems to meet demand. When I'm away from the terminal, you'll likely find me traveling or at an EDM festival.
`
