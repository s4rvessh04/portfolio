export const githubUsername = "s4rvessh04";
export { CAREER_START_DATE as careerStartDate } from "./config";

export const dataCurrently = [
  { title: "Node.js Engineer" },
  { title: "Go Developer" },
  { title: "Backend Engineer" },
  { title: "Systems Builder" },
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
  { title: "Gmail", link: "mailto:sarveshrane2000.dev@gmail.com", icon: "gmail" },
];

export const projects = [
  {
    title: "RelayBox",
    github: `https://github.com/${githubUsername}/RelayBox`,
    description:
      "I wanted to really understand the Transactional Outbox pattern, so I built one from scratch in Go. It guarantees at-least-once Kafka delivery with idempotency baked in — handles 200 req/s with ~15μs processing latency and hasn't dropped an event yet.",
    image: "/projects/relaybox.svg",
    stack: ["Go", "Apache Kafka", "PostgreSQL", "Redis", "Docker", "Prometheus"],
  },
  {
    title: "Loadbalancer (L4)",
    github: `https://github.com/${githubUsername}/loadbalancer-l4`,
    description:
      "A Layer 4 load balancer written in pure Go — no external dependencies, just the standard library. I threw 1,000 concurrent connections at it for 10 minutes straight and it handled 1,185 RPS without a single error.",
    image: "/projects/loadbalancer.svg",
    stack: ["Go (Standard Library)", "TCP", "UDP"],
  },
  {
    title: "Vartalap",
    github: `https://github.com/${githubUsername}/vartalap-nextjs`,
    live: "https://vartalap-nextjs.vercel.app/",
    description:
      "Real-time chat app where messages hit everyone in the room in under 10ms. Uses Redis Pub/Sub instead of polling, so it actually feels instant. Built with Next.js and TypeScript.",
    image: "/projects/vartalap.svg",
    stack: ["Next.js", "Redis (Pub/Sub)", "TypeScript"],
  },
  {
    title: "Budgeter",
    github: `https://github.com/${githubUsername}/Budgeter_v2`,
    live: "https://budgeter-v2-1.onrender.com",
    description:
      "An expense tracker I built because I wanted something simple that actually shows where my money goes. Django API on the backend, React dashboard up front, one Docker command to run the whole thing.",
    image: "/projects/budgeter.svg",
    stack: ["React", "Django", "PostgreSQL", "Docker"],
  },
  {
    title: "Pastebin Lite",
    github: `https://github.com/${githubUsername}/pastebin-lite`,
    live: "https://pastebin-lite-six-virid.vercel.app",
    description:
      "A minimal pastebin that loads fast. Stores text in PostgreSQL, serves it through Vercel's edge network, and has syntax highlighting with configurable expiry. Nothing fancy, just works.",
    image: "/projects/pastebin-lite.svg",
    stack: ["Next.js", "PostgreSQL", "TypeScript"],
  },
  {
    title: "Bookmarks Lite",
    github: `https://github.com/${githubUsername}/bookmarks-lite`,
    live: "https://bookmarks-lite.vercel.app",
    description:
      "A bookmark manager where each user's data is completely isolated using Supabase Row Level Security and Google OAuth. Tabs sync in real-time across devices — no refresh needed.",
    image: "/projects/bookmarks-lite.svg",
    stack: ["Next.js", "PostgreSQL", "Google OAuth", "TypeScript"],
  },
];

export const experience = [
  {
    company: "Jio Platforms Ltd.",
    role: "Software Engineer I — Backend",
    period: "Dec 2023 — Present",
    location: "Navi Mumbai, Maharashtra · Full-time",
    highlights: [
      "Took an approval process that used to take 2 days over email and turned it into a 2-hour flow — built the whole service on Node.js, now used by 5,000+ people across India.",
      "Designed the RBAC/ABAC security model from scratch for regional hierarchies. Zero violations since launch, which I'm pretty proud of.",
      "Built a Redis-backed engine that processes 10,000+ transactions daily at sub-second latency. It just... doesn't go down.",
      "Led the backend for a facility assessment platform used by 10,000+ people across all Jio properties. Lots of fun data modeling challenges.",
      "Found and fixed slow database queries by adding targeted indexes — took some critical paths from seconds to milliseconds.",
      "Got the Star Performer award, which was a nice surprise.",
    ],
    stack: ["Node.js", "Express", "TypeScript", "PostgreSQL", "MySQL", "Redis", "Apache Kafka", "Docker", "Kubernetes", "Azure DevOps"],
  },
];

export const skills = [
  {
    title: "Core Stack",
    data: [
      { title: "Node.js (Express)" },
      { title: "JavaScript (ES6+)" },
      { title: "TypeScript" },
      { title: "PostgreSQL" },
      { title: "MySQL" },
      { title: "Redis" },
      { title: "MongoDB" },
    ],
  },
  {
    title: "Infrastructure",
    data: [
      { title: "Docker" },
      { title: "Kubernetes" },
      { title: "Azure DevOps" },
      { title: "Apache Kafka" },
      { title: "Nginx" },
      { title: "CI/CD" },
    ],
  },
  {
    title: "Observability & Security",
    data: [
      { title: "ELK Stack" },
      { title: "Grafana" },
      { title: "Prometheus" },
      { title: "OpenTelemetry" },
      { title: "JWT" },
      { title: "RBAC / ABAC" },
    ],
  },
  {
    title: "Other Languages",
    data: [
      { title: "Go" },
      { title: "Python" },
      { title: "SQL" },
    ],
  },
];

export const professionalSummary = `
I've spent the last 2+ years building the kind of backend systems that thousands of people rely on every day — approval workflows, security models, execution engines. The stuff that needs to work at 3 AM on a Saturday and can't afford to be flaky.

Outside of work, I write Go to scratch the systems itch. I've built a load balancer from scratch and a Kafka outbox service, mostly to understand how these things actually work under the hood. When I'm not at the terminal, I'm probably traveling somewhere or losing myself at an EDM festival.
`;
