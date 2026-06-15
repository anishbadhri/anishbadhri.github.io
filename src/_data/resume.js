module.exports = {
  // Short intro shown under the hero.
  summary:
    "I build identity and data-migration systems at Google Workspace, currently as a tech lead working across identity protocols such as LDAP and SCIM. Before that I spent years on competitive programming and formal verification — compilers, model checkers and SAT solvers — and I still like problems that need both.",

  experience: [
    {
      role: "Senior Software Engineer",
      org: "Google",
      team: "Google Workspace · Sunnyvale, CA",
      focus: "Identity Protocols (LDAP, SCIM)",
      start: "2020-08",
      dateLabel: "Aug 2020 – Present",
      current: true,
      highlights: [
        "Tech lead across multiple identity-protocol projects in Google Workspace, spanning LDAP and SCIM.",
        "Led the end-to-end design of full-stack data-migration and identity-synchronization services for enterprise customers.",
        "Onboarded over 100K users from sources including Microsoft, IMAP servers and Dropbox.",
        "Drove performance optimizations across migration services, improving scalability and cutting API latency by up to 67%.",
      ],
      stack: ["Java", "TypeScript", "Cloud Spanner", "Message Queues", "ETL Pipelines"],
      note: "Earlier work at Google was in the Customer Onboarding team (Bengaluru).",
    },
    {
      role: "Software Engineering Intern",
      org: "Motorq",
      team: "Chennai, India",
      dateLabel: "Dec 2019 – Jan 2020",
      highlights: [
        "Automated A/B testing comparing data returned by production code and a new implementation.",
        "Proposed testing improvements modelled on the stable-marriage problem.",
        "Cut the time to push code to production by 12 hours.",
      ],
      stack: ["Snowflake", "Azure Blob Storage", "Node.js", "TypeScript"],
    },
    {
      role: "Software Engineering Intern",
      org: "Google",
      team: "Bengaluru, India",
      dateLabel: "May 2019 – Jul 2019",
      highlights: [
        "Built a bridge from index pagination to token pagination for the list-users API, making time per call independent of the number of users.",
        "Reduced the per-call upper bound from 12s to 3s.",
      ],
      stack: ["Java", "Cloud Spanner", "Message Queues"],
    },
    {
      role: "Software Development Intern",
      org: "Freshworks",
      team: "Chennai, India",
      dateLabel: "May 2018 – Jul 2018",
      highlights: [
        "Integrated Freshdesk with third-party applications using the Freshworks SDK on Node.js.",
        "Removed tab-switching and kept data synchronized across applications.",
      ],
      stack: ["Node.js", "SDK Development"],
    },
  ],

  projects: [
    {
      name: "Complyer",
      tags: ["C++", "ANTLR", "Z3", "Model Checking"],
      url: "https://github.com/AnandSaminathan/complyer",
      desc: "A compiler that verifies whether a model satisfies a given property — safety properties in propositional logic and temporal properties in LTL — using an SMT solver with k-induction, LTL bounded model checking and IC3.",
    },
    {
      name: "Complyer-SAT",
      tags: ["C++", "CMake", "Boolean SAT"],
      url: "https://github.com/anishbadhri/complyer-sat",
      desc: "A Boolean-satisfiability solver that decides whether a formula has a satisfying assignment. Uses Tseytin transformation to CNF and the DPLL algorithm, optimized with 2-SAT and HORNSAT.",
    },
    {
      name: "Bounded Model Checking of MFOTL Properties",
      tags: ["Model Checking"],
      url: null,
      desc: "Specification and verification of infinite-state systems via Monadic First-Order sentences, whose returned bound restricts the state space and makes the verification problem decidable.",
    },
    {
      name: "Graph Database Modelling of College Data",
      tags: ["Node.js", "Neo4j", "GraphQL"],
      url: null,
      desc: "A scalable graph-database schema and a back-end API server for storing and querying college data across a range of use cases.",
    },
    {
      name: "Graph Recommendation Tool",
      tags: ["Python"],
      url: null,
      desc: "A command-line tool that normalizes an input graph to best fit a template graph, comparing slope — or slope and position — with a configurable error margin and learning rate.",
    },
    {
      name: "Command-Line Tools for Codeforces",
      tags: ["Python", "BeautifulSoup"],
      url: null,
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

  certifications: [
    "Neo4j Certified Professional — Graph Databases",
    "Data Structures & Algorithms (Coursera) — 98.54% average across 6 courses",
    "Discrete Mathematics for Computer Science (Coursera) — 100% across 5 courses",
    "Design & Analysis of Algorithms (NPTEL) — top 5% nationally",
    "Model Checking (NPTEL)",
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
