// Alex Reich Consulting — site content
// "repo" flag marks capabilities surfaced by analyzing the actual codebases.
window.SITE = {
  brand: "Alex Reich Consulting",
  brandShort: "AR",
  location: "Lake Elsinore, CA",
  phone: "(310) 291-8969",
  email: "alex@alexreich.com",
  github: "github.com/alexreich",

  hero: {
    kicker: "Independent .NET engineering consultancy",
    title: "Senior engineering, shipped end-to-end.",
    sub: "Hands-on .NET engineering leader with nearly three decades building secure, scalable systems across banking, fintech, media, and SaaS. I design the schema, build the API, ship the UI, wire the CI/CD, and stay on for production — as a player/coach, not a slide deck.",
    cta1: "Book a call",
    cta2: "See the work",
  },

  stats: [
    { value: 1.2, prefix: "$", suffix: "B", label: "in PPP loans processed on a platform I led" },
    { value: 29, suffix: "", label: "years shipping production software — since 1997" },
    { value: 8, suffix: "", label: "engineers led as VP / player-coach" },
    { value: 50, suffix: " mi", label: "Avalon ultramarathon finisher" },
  ],

  services: [
    {
      n: "01",
      title: "Full-stack product delivery",
      body: "Schema design through production support. React / TypeScript / Tailwind on the front, .NET and Node (Express, NestJS) on the back, Postgres and SQL Server underneath — typed, tested, and documented end-to-end.",
      tags: ["React", ".NET 8", "Node", "PostgreSQL", "OpenAPI"],
    },
    {
      n: "02",
      title: "Fintech & security systems",
      body: "Banking-grade platforms where correctness and security are non-negotiable. Loan origination, levy & deposit systems, SQL-injection remediation, secrets management, and audit-ready delivery.",
      tags: ["Banking", "Key Vault", "JWT / OAuth", "Audit"],
    },
    {
      n: "03",
      title: "Cloud & DevOps architecture",
      body: "Containerized services, multi-environment CI/CD, and the observability to sleep at night. Azure and AWS, Docker, GitHub Actions, k6 load testing, and Grafana dashboards.",
      tags: ["Azure", "AWS", "Docker", "CI/CD", "k6", "Grafana"],
    },
    {
      n: "04",
      title: "AI-assisted engineering",
      body: "Real production AI, not demos — local LLM inference with Ollama, hosted models via Microsoft.Extensions.AI, and a daily Claude / Codex / Copilot workflow that measurably raises team velocity.",
      tags: ["Ollama", "Microsoft.Extensions.AI", "Claude", "Copilot"],
    },
    {
      n: "05",
      title: "Fractional engineering leadership",
      body: "Player/coach leadership: tiered team structure, mentoring, and requirements gathering as a business liaison / BSA — translating stakeholder needs into shipped software.",
      tags: ["Mentoring", "Team structure", "BSA", "Agile / SAFe"],
    },
    {
      n: "06",
      title: "Rules engines & architecture",
      body: "Author of RulesEngineEditor and a contributor to Microsoft RulesEngine. Micro-frontend strategy, resilient service design with Polly, and production patterns teams can reuse immediately.",
      tags: ["RulesEngine", "Micro-frontends", "Polly", "Patterns"],
    },
    {
      n: "07",
      title: "Hands-on hardware, networking & security",
      body: "Beyond software, the whole machine is on offer. New box builds, hardware diagnosis on PC and Apple, and OS-level troubleshooting across macOS, Linux, and Windows — plus network setup and security hardening at the router and firewall.",
      tags: ["Build & repair", "macOS · Linux · Windows", "Networking", "Router / firewall", "Security"],
      wide: true,
    },
  ],

  // Capability matrix. repo:true = surfaced from analyzing the codebases.
  capabilities: [
    {
      group: "Frontend",
      items: [
        { t: "React", repo: true }, { t: "TypeScript", repo: true }, { t: "React Router", repo: true },
        { t: "Tailwind CSS", repo: true }, { t: "Blazor" }, { t: "Angular" }, { t: "MVC" },
        { t: "Three.js / R3F", repo: true }, { t: "Framer Motion", repo: true }, { t: "Vite", repo: true }, { t: "Recharts", repo: true },
      ],
    },
    {
      group: "Backend",
      items: [
        { t: "C#", repo: true }, { t: "ASP.NET Core (.NET 8)", repo: true }, { t: "Node.js — Express / NestJS", repo: true },
        { t: "Microservices", repo: true }, { t: "Worker services", repo: true }, { t: "SignalR (realtime)", repo: true },
        { t: "REST + OpenAPI / Swagger", repo: true }, { t: "Polly (resilience)", repo: true }, { t: "EF Core", repo: true }, { t: "MiniProfiler", repo: true },
      ],
    },
    {
      group: "Data",
      items: [
        { t: "PostgreSQL", repo: true }, { t: "MSSQL / T-SQL", repo: true }, { t: "Redis", repo: true },
        { t: "EF 2nd-level cache", repo: true }, { t: "Supabase", repo: true }, { t: "MongoDB" }, { t: "Cosmos DB" }, { t: "MySQL" },
      ],
    },
    {
      group: "Cloud & Infra",
      items: [
        { t: "Azure (Web App, APIM, Key Vault, SQL)", repo: false }, { t: "Azure Container Apps" },
        { t: "AWS S3 / FluentStorage", repo: true }, { t: "Linode", repo: true }, { t: "Netlify", repo: true },
        { t: "Caddy reverse proxy", repo: true }, { t: "Docker / Buildx", repo: true }, { t: "GHCR", repo: true },
      ],
    },
    {
      group: "DevOps & Quality",
      items: [
        { t: "GitHub Actions — multi-env CI/CD", repo: true }, { t: "Azure DevOps pipelines" },
        { t: "k6 load / spike / stress", repo: true }, { t: "Grafana", repo: true }, { t: "Playwright E2E", repo: true },
        { t: "Vitest", repo: true }, { t: "Jest + React Testing Library", repo: true }, { t: "ESLint / type checks", repo: true },
      ],
    },
    {
      group: "AI Engineering",
      items: [
        { t: "Ollama — local LLM", repo: true }, { t: "Microsoft.Extensions.AI", repo: true }, { t: "OllamaSharp", repo: true },
        { t: "Speech-to-text / voice intents", repo: true }, { t: "Claude", repo: true }, { t: "Codex" }, { t: "GitHub Copilot", repo: true },
      ],
    },
    {
      group: "Mobile & Native",
      items: [
        { t: "Flutter / Dart (Riverpod, Dio)", repo: true }, { t: "Swift / SwiftUI", repo: true },
        { t: "watchOS — Apple Watch", repo: true }, { t: "Xamarin / .NET MAUI" }, { t: "iOS (Obj-C, Swift)" },
      ],
    },
    {
      group: "Practice",
      items: [
        { t: "Agile / SAFe" }, { t: "Fractional leadership" }, { t: "BSA / requirements" },
        { t: "Mentoring" }, { t: "MCSE · MCSD · MCT" }, { t: "Scrum Product Owner" },
      ],
    },
  ],

  // Featured case studies (expandable)
  work: [
    {
      id: "ppp",
      client: "Mechanics Bank",
      role: "VP, Software Development",
      year: "2020",
      title: "An emergency PPP platform that moved $1.2B",
      summary: "When the SBA Paycheck Protection Program launched overnight, I led the team that stood up a public-facing loan system in days.",
      metric: "$1.2B+",
      metricLabel: "loans processed",
      detail: [
        "Spearheaded a COVID-19 emergency build to fund the SBA PPP program for the bank's small-business customers.",
        "Custom .NET Core and Node (Express / NestJS) Web APIs integrated legacy banking systems with OpenAPI/Swagger docs, validation, and end-to-end error handling.",
        "The public-facing platform processed over $1.2 billion in loans under intense time and correctness pressure.",
      ],
      stack: ["C#", ".NET Core", "Node.js", "SQL Server", "Azure"],
    },
    {
      id: "prosearch",
      client: "ProSearch",
      role: "Senior Developer",
      year: "2015 – 2016",
      title: "A Chain-of-Custody power tool for e-discovery",
      summary: "Architected a successful Chain-of-Custody tool for the e-discovery space and mentored the team building it.",
      metric: "Meteor",
      metricLabel: "Node · Mongo · React",
      detail: [
        "Architected a Chain-of-Custody power tool on a reactive Meteor / Node.js / MongoDB / React stack.",
        "Designed a forward port to Angular 2.0 and led internal training and mentoring for junior developers.",
      ],
      stack: ["Meteor", "Node.js", "MongoDB", "React", "Angular"],
    },
    {
      id: "lexus",
      client: "Toyota / Lexus — via Hitachi",
      role: "Xamarin Architect",
      year: "2017",
      title: "\u201CLexus Driver\u201D mobile app under deadline",
      summary: "Co-developed the cross-platform Lexus Driver app, architecting login and a browsing experience for prospects and owners.",
      metric: "iOS",
      metricLabel: "Xamarin, continuous review",
      detail: [
        "Co-developed the Xamarin-based \u201CLexus Driver\u201D application using Visual Studio for Mac.",
        "Architected the login process plus differentiated access for prospective buyers and existing owners — delivered under a tight deadline with continuous code review.",
      ],
      stack: ["C#", "Xamarin", "iOS"],
    },
    {
      id: "foxtales",
      client: "Foxtales",
      role: "CTO",
      year: "2018 – 2019",
      title: "Interactive photo kiosks for the NFL & Adidas",
      summary: "Led .NET Core integration with physical kiosks — cameras, Arduino lighting, and Matrix-style bullet-time rigs.",
      metric: "NFL · Adidas",
      metricLabel: "marquee activations",
      detail: [
        "Led the team on .NET Core (C#) integration with interactive kiosks: Canon cameras, Arduino-driven Adafruit lighting, and multi-camera bullet-time video.",
        "Built a custom Python \u201CWord Face\u201D integration with Pillow; hired and directed consultants.",
        "Clients included the NFL, Adidas, RISE, and Jimmy Iovine.",
      ],
      stack: ["C#", ".NET Core", "Python", "Hardware"],
    },
  ],

  ventures: [
    {
      name: "Acorn Jr",
      role: "Co-founder / CTO",
      status: "In production",
      url: "https://acornjr.com/friends",
      urlLabel: "acornjr.com/friends",
      blurb: "A real-time SaaS platform built from scratch: realtime workflows, local + hosted AI, containerized services, and a fully automated multi-environment delivery pipeline. Flutter mobile and an Apple Watch companion round it out.",
      stack: ["Docker", "C#", "Supabase", "React", "OpenAI Codex", "Claude Code", "GitHub Copilot"],
      featured: true,
    },
    {
      name: "Synchrium",
      role: "Sole creator",
      status: "In development",
      url: "https://synchrium.com/",
      urlLabel: "synchrium.com",
      blurb: "A real-time collaboration product built around WebRTC.",
      stack: ["WebRTC", "C#", "React", "Docker", "PostgreSQL"],
    },
    {
      name: "SeeBoop",
      role: "Sole creator",
      status: "In development",
      url: "https://seeboop.com/",
      urlLabel: "seeboop.com",
      blurb: "A live, presence-driven web app on the same modern real-time stack.",
      stack: ["WebRTC", "C#", "React", "Docker", "PostgreSQL"],
    },
    {
      name: "FastingBuddy",
      role: "Sole creator",
      status: "In development",
      url: "https://fastingbuddy.com/",
      urlLabel: "fastingbuddy.com",
      blurb: "A fasting companion app pairing real-time tracking with a containerized .NET + React stack.",
      stack: ["C#", "React", "Docker", "PostgreSQL"],
    },
  ],

  // Full chronological career — the longevity, since 1997
  career: [
    { years: "2022 – 2026", co: "Mechanics Bank", role: "Principal Software Developer" },
    { years: "2019 – 2022", co: "Mechanics Bank", role: "Vice President, Software Development" },
    { years: "2019", co: "CloudVirga", role: "Senior Application Developer, Consultant" },
    { years: "2019", co: "Foxtales", role: "Chief Technology Officer" },
    { years: "2017 – 2018", co: "Jobfilez", role: "Chief Technology Officer" },
    { years: "2017 – 2018", co: "Western Growers", role: ".NET Architect, Consultant" },
    { years: "2017", co: "Hitachi Consulting", role: "Xamarin Architect, Consultant" },
    { years: "2016 – 2017", co: "SJC Startup", role: "Senior Full-Stack Engineer" },
    { years: "2015 – 2016", co: "ProSearch", role: "Senior Developer" },
    { years: "2015 – 2016", co: "VectorUSA", role: "Independent Microsoft .NET Consultant" },
    { years: "2014 – 2016", co: "B Media", role: "Node.js & Meteor Consultant" },
    { years: "2011 – 2015", co: "FOX", role: "Independent Microsoft .NET Consultant" },
    { years: "2010 – 2015", co: "Yummy Foods, Inc.", role: "Lead Developer" },
    { years: "2007 – 2010", co: "Self-Employed", role: "Independent Consultant" },
    { years: "2006 – 2007", co: "Panda Restaurant Group", role: "Independent Consultant" },
    { years: "2005", co: "Creative Artists Agency (CAA)", role: "Independent Consultant" },
    { years: "2005", co: "Disney", role: "Independent Consultant" },
    { years: "2004", co: "Experian", role: "Independent Consultant" },
    { years: "2003 – 2004", co: "H&S Ventures", role: "Independent Consultant" },
    { years: "2002 – 2003", co: "Avanade", role: "Enterprise Architect" },
    { years: "2001 – 2002", co: "loudENERGY", role: "Chief Technology Officer" },
    { years: "2000 – 2001", co: "AccessPoint", role: "Manager, Internet Services & Operations" },
    { years: "1999 – 2001", co: "Prosoft", role: "Manager of Emerging Technologies" },
    { years: "1998", co: "Tricon (Taco Bell, KFC, Pizza Hut)", role: "Independent Consultant" },
    { years: "1997 – 1999", co: "Inetcom", role: "Co-Founder / Co-Owner" },
    { years: "1997 – 1998", co: "Unisolve", role: "Programmer" },
  ],

  openSource: [
    { name: "RulesEngineEditor", role: "Author", note: "A Blazor-based visual editor for Microsoft RulesEngine.", tag: "Blazor" },
    { name: "Blazor QueryBuilder", role: "Author", note: "NuGet component wrapping jQuery QueryBuilder with native, strongly-typed Blazor integration.", tag: "NuGet" },
    { name: "Microsoft RulesEngine", role: "Contributor", note: "Contributor to Microsoft's open-source rules engine.", tag: "Microsoft" },
    { name: "Xamarin / .NET MAUI Essentials", role: "Contributor", note: "Geolocation foreground listener — Pull Request #1579.", tag: "MAUI" },
  ],

  clients: [
    "Disney", "FOX", "Toyota / Lexus", "Panda Express", "Yum! Brands (Taco Bell, KFC, Pizza Hut, Habit Burger & Grill)", "CAA", "Experian",
    "NFL", "Adidas", "Mechanics Bank", "Televisa", "Microsoft", "Trader Joe's",
    "Hitachi", "Marathon Oil", "Cooper Tires", "Broadcom", "The Capital Group", "FileNET",
  ],

  about: {
    lead: "I've been the engineer in the room and the leader at the whiteboard — usually on the same day.",
    body: "I've been writing code since I was 12 and shipping it professionally since 1997. Across banking, media, e-commerce, and SaaS I've designed schemas, shipped APIs, mentored teams, and owned production. I co-author patterns from hard-earned production lessons, speak at developer groups, and contribute to open source. The through-line is ownership: I take a problem end-to-end and leave the team faster than I found it.",
    speaking: [
      "Microsoft DevDays speaker (III–V); MSDN Webcast on ASP.NET security (2004), rated 7.9 — above average.",
      "Two-term President, Orange County VB Users Group; founder of TRINUG & FANUG; spoke at OCSQLUG, LA Django, IBM OCEAN.",
      "Co-author — VB 5.0 Unleashed, Vols. 1 & 2 (Sams Publishing).",
    ],
    beyond: "Outside of tech I teach meditation in Murrieta, CA, and run long: 12 marathons in 12 months, three 50K ultras, and the Avalon 50-Mile (2019).",
  },
};
