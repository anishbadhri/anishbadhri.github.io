module.exports = {
  // Short intro shown under the hero.
  summary:
    "I'm a senior software engineer at Google Workspace, where I work on identity protocols, building on earlier work in large-scale data migration and synchronization for enterprise customers. Before Google I spent years on competitive programming and formal verification — compilers, model checkers and SAT solvers — and I still gravitate toward problems that need both.",

  focusAreas: [
    { label: "Identity Protocols", featured: true },
    { label: "Data Migration", featured: true },
    { label: "Distributed Systems" },
    { label: "Formal Verification" },
    { label: "Competitive Programming" },
  ],

  // Experience is grouped by company; each company holds one or more roles
  // (focuses). A single-role job is just a company with one role, so the same
  // shape covers internships and multi-focus positions alike — add future
  // entries the same way. Per role: title, org (sub-org/team, optional),
  // location, focus (optional accent label), start (YYYY-MM, for <time>),
  // dateLabel, current (optional), highlights, stack.
  experience: [
    {
      company: "Google",
      roles: [
        {
          title: "Senior Software Engineer",
          org: "Google Workspace",
          location: "Sunnyvale, CA",
          focus: "Identity Protocols (LDAP, SCIM)",
          start: "2025-12",
          dateLabel: "Dec 2025 – Present",
          current: true,
          highlights: [
            "Tech lead across identity-protocol projects spanning Secure LDAP and SCIM.",
          ],
          stack: ["Java", "TypeScript", "Cloud Spanner", "LDAP", "SCIM", "Bigtable"],
        },
        {
          title: "Software Engineer III",
          org: "Google Workspace",
          location: "Bengaluru, India",
          focus: "Customer Onboarding (Data Migration)",
          start: "2020-08",
          dateLabel: "Aug 2020 – Nov 2025",
          highlights: [
            "Led the end-to-end design of full-stack data-migration and identity-synchronization services for enterprise customers.",
            "Onboarded over 100K users from sources including Microsoft, IMAP servers and Dropbox.",
            "Drove performance optimizations across migration services, improving scalability and cutting API latency by up to 67%.",
          ],
          stack: ["Java", "TypeScript", "Cloud Spanner", "Message Queues", "ETL Pipelines"],
        },
      ],
    },
    {
      company: "Motorq",
      roles: [
        {
          title: "Software Engineering Intern",
          location: "Chennai, India",
          start: "2019-12",
          dateLabel: "Dec 2019 – Jan 2020",
          highlights: [
            "Automated A/B testing comparing data returned by production code and a new implementation.",
            "Proposed testing improvements modelled on the stable-marriage problem.",
            "Cut the time to push code to production by 12 hours.",
          ],
          stack: ["Snowflake", "Azure Blob Storage", "Node.js", "TypeScript"],
        },
      ],
    },
    {
      company: "Google",
      roles: [
        {
          title: "Software Engineering Intern",
          location: "Bengaluru, India",
          start: "2019-05",
          dateLabel: "May 2019 – Jul 2019",
          highlights: [
            "Built a bridge from index pagination to token pagination for the list-users API, making time per call independent of the number of users.",
            "Reduced the per-call upper bound from 12s to 3s.",
          ],
          stack: ["Java", "Cloud Spanner", "Message Queues"],
        },
      ],
    },
    {
      company: "Freshworks",
      roles: [
        {
          title: "Software Development Intern",
          location: "Chennai, India",
          start: "2018-05",
          dateLabel: "May 2018 – Jul 2018",
          highlights: [
            "Integrated Freshdesk with third-party applications using the Freshworks SDK on Node.js.",
            "Removed tab-switching and kept data synchronized across applications.",
          ],
          stack: ["Node.js", "SDK Development"],
        },
      ],
    },
  ],

  // Each project's `url` groups links by type, so a project can hold several of
  // each: `github` entries are "owner/repo" (→ github.com/owner/repo), `arxiv`
  // entries are article identifiers (→ arxiv.org/abs/<id>), and `other` entries
  // are full URLs. Leave an array empty (or drop the key) when a type is unused.
  projects: [
    {
      name: "Complyer",
      tags: ["C++", "ANTLR", "Z3", "Model Checking"],
      url: { github: ["AnandSaminathan/complyer", "AnandSaminathan/verification-algorithms", "AnandSaminathan/formula-tree"], arxiv: [], other: [] },
      desc: "A compiler that verifies whether a model satisfies a given property — safety properties in propositional logic and temporal properties in LTL — using an SMT solver with k-induction, LTL bounded model checking and IC3.",
    },
    {
      name: "Complyer-SAT",
      tags: ["C++", "CMake", "Boolean SAT"],
      url: { github: ["anishbadhri/complyer-sat"], arxiv: [], other: [] },
      desc: "A Boolean-satisfiability solver that decides whether a formula has a satisfying assignment. Uses Tseytin transformation to CNF and the DPLL algorithm, optimized with 2-SAT and HORNSAT.",
    },
    {
      name: "Bounded Model Checking of MFOTL Properties",
      tags: ["Model Checking"],
      url: { github: ["anishbadhri/MFOTLProject"], arxiv: ["1812.00183"], other: [] },
      desc: "Specification and verification of infinite-state systems via Monadic First-Order sentences, whose returned bound restricts the state space and makes the verification problem decidable.",
    },
    {
      name: "Graph Database Modelling of College Data",
      tags: ["Node.js", "Neo4j", "GraphQL"],
      url: { github: [], arxiv: [], other: [] },
      desc: "A scalable graph-database schema and a back-end API server for storing and querying college data across a range of use cases.",
    },
    {
      name: "Graph Recommendation Tool",
      tags: ["Python"],
      url: { github: ["divyalakshmi054/chemical-graphs"], arxiv: [], other: [] },
      desc: "A command-line tool that normalizes an input graph to best fit a template graph, comparing slope — or slope and position — with a configurable error margin and learning rate.",
    },
    {
      name: "Command-Line Tools for Codeforces",
      tags: ["Python", "BeautifulSoup"],
      url: { github: ["anishbadhri/Codeforces-MiniProjects"], arxiv: [], other: [] },
      desc: "CLI utilities for Codeforces: problem recommendations, sample-I/O downloads, unsolved virtual-contest listings and recently solved problems.",
    },
  ],

  skills: [
    { group: "Languages", items: ["C++", "Java", "TypeScript", "Python", "SQL", "Shell", "NuSMV"] },
    { group: "Concepts", items: ["Data Structures", "Algorithms", "Boolean Satisfiability", "Model Checking", "Distributed Systems"] },
    { group: "Databases", items: ["Cloud Spanner", "Neo4j", "MySQL"] },
    { group: "Tools & Frameworks", items: ["Git", "Protocol Buffers", "Docker", "Node.js", "CMake", "REST", "ANTLR", "GraphQL"] },
  ],

  education: {
    school: "SSN College of Engineering",
    affiliation: "Anna University",
    location: "Chennai, India",
    degree: "B.E. in Computer Science and Engineering",
    dateLabel: "2016 – 2020",
    gpa: "7.77 / 10.0",
  },

  // Each certification is an object so it can carry a verification link.
  // `url` is optional — omit it and the entry renders as plain text.
  certifications: [
    { name: "Neo4j Certified Professional — Graph Databases", url: "https://graphacademy.neo4j.com/c/9deb0487-ab11-4df1-8f2c-49a618d3531f/" },
    { name: "Data Structures & Algorithms (Coursera) — 98.54% average across 6 courses", url: "https://www.coursera.org/account/accomplishments/specialization/ZW73SFC9HTHC" },
    { name: "Discrete Mathematics for Computer Science (Coursera) — 100% across 5 courses", url: "https://www.coursera.org/account/accomplishments/specialization/P5NZHCRDFRR2" },
    { name: "Design & Analysis of Algorithms (NPTEL) — top 5% nationally", url: "https://archive.nptel.ac.in/noc/Ecertificate/?q=NPTEL17CS27S1220806171019922" },
    { name: "Model Checking (NPTEL)", url: "https://archive.nptel.ac.in/noc/Ecertificate/?q=NPTEL17CS38S1200020171011486" },
  ],

  highlights: [
    "10+ leadership bonuses and 30+ peer bonuses at Google",
    "ICPC 2019 Amritapuri Regionals — 61 / 324 teams (team IC3)",
    "ICPC 2019 Gwalior–Pune Regionals — 64 / 113 teams (team IC3)",
    "3rd place — ICPC 2019 Chennai Provincials (team IC3)",
    "1st of 200 teams — eXLog inter-state math quiz",
    "Smart India Hackathon 2018 — finalist",
    "Qualified for the Indian National Olympiad in Informatics",
    "Head of MAXFLOW, the SSN Coding Community",
  ],

  // knowsAbout terms for the Person schema (helps topical SEO).
  knowsAbout: [
    "Identity Protocols",
    "LDAP",
    "SCIM",
    "Directory Services",
    "Distributed Systems",
    "Data Migration",
    "Model Checking",
    "Boolean Satisfiability",
    "Competitive Programming",
    "Java",
    "TypeScript",
    "C++",
  ],
};