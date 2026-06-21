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
      "Transactional Outbox Pattern in Go — guaranteed at-least-once Kafka delivery with built-in idempotency. Benchmarked at 200 req/s relay and consumer throughput with 15μs average processing latency and zero failed events under continuous load.",
    image: "/projects/relaybox.svg",
    stack: ["Go", "Apache Kafka", "PostgreSQL", "Redis", "Docker", "Prometheus"],
  },
  {
    title: "Loadbalancer (L4)",
    github: `https://github.com/${githubUsername}/loadbalancer-l4`,
    description:
      "Zero-dependency Layer 4 TCP/UDP load balancer in pure Go stdlib. Benchmarked at 1,185 RPS under 1,000 concurrent connections over 10 minutes — 825,350 total requests with zero errors.",
    image: "/projects/loadbalancer.svg",
    stack: ["Go (Standard Library)", "TCP", "UDP"],
  },
  {
    title: "Vartalap",
    github: `https://github.com/${githubUsername}/vartalap-nextjs`,
    live: "https://vartalap-nextjs.vercel.app/",
    description:
      "Real-time chat with sub-10ms fan-out — Redis Pub/Sub broadcasts messages to all room members without polling, built on Next.js App Router with TypeScript throughout.",
    image: "/projects/vartalap.svg",
    stack: ["Next.js", "Redis (Pub/Sub)", "TypeScript"],
  },
  {
    title: "Budgeter",
    github: `https://github.com/${githubUsername}/Budgeter_v2`,
    live: "https://budgeter-v2-1.onrender.com",
    description:
      "Full-stack expense tracker — Django REST API with a PostgreSQL-backed accounting model, React dashboard with live P&L breakdowns, fully Dockerized for one-command deployment.",
    image: "/projects/budgeter.svg",
    stack: ["React", "Django", "PostgreSQL", "Docker"],
  },
  {
    title: "Pastebin Lite",
    github: `https://github.com/${githubUsername}/pastebin-lite`,
    live: "https://pastebin-lite-six-virid.vercel.app",
    description:
      "Serverless pastebin optimized for read latency — PostgreSQL-backed text storage served via Vercel Edge Network with syntax highlighting and configurable expiry.",
    image: "/projects/pastebin-lite.svg",
    stack: ["Next.js", "PostgreSQL", "TypeScript"],
  },
  {
    title: "Bookmarks Lite",
    github: `https://github.com/${githubUsername}/bookmarks-lite`,
    live: "https://bookmarks-lite.vercel.app",
    description:
      "Zero-trust bookmark manager — Supabase Row Level Security + Google OAuth enforce per-user data isolation, with real-time tab sync via Supabase Realtime.",
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
      "Cut approval turnaround from 2 days to 2 hours — architected a pan-India approvals service on Node.js / Sequelize, migrating 5,000+ MAU off manual email workflows.",
      "Enforced zero security violations in production — designed granular RBAC/ABAC policies across regional hierarchies, with zero violations recorded in rollout.",
      "Built a Redis-backed execution engine sustaining sub-second latency at 10,000+ daily transactions across services supporting 5,000+ users.",
      "Architected a pan-India facility assessment platform supporting 10,000+ MAU for structured property evaluations across all Jio properties.",
      "Reduced query latency from seconds to milliseconds via targeted indexes on high-traffic PostgreSQL and MySQL columns on critical data paths.",
      "Awarded Star Performer for outstanding contributions to enterprise application delivery.",
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
Backend Engineer with 2+ years of experience delivering high-throughput, zero-downtime enterprise systems at Jio Platforms. I specialize in Node.js microservices, distributed data stores, and complex RBAC/ABAC security models — with a proven track record of eliminating manual workflows, enforcing zero security violations in production, and building execution engines that sustain sub-second latency at 10,000+ daily transactions across services supporting 5,000+ users.

On the side, I build in Go to sharpen my systems instincts: a zero-dependency L4 load balancer benchmarked at 1,185 RPS, and RelayBox — a Kafka Transactional Outbox implementation sustaining 200 req/s with 15μs average processing latency. When I'm away from the terminal, you'll likely find me traveling or at an EDM festival.
`;
