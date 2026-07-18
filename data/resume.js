// Canonical résumé data — the single source of truth for BOTH the website and
// the LaTeX CV, and the origin of the published resume.json (JSON Resume) and
// the site's schema.org JSON-LD.
//
// It is a rich SUPERSET: it holds the full detail from the standalone CV plus
// the site's curated narrative. Each renderer selects what it needs:
//   - the site is lean: it shows the first 3 highlights per role, the compact
//     `desc` for projects, and the curated `highlights` recognition list;
//   - the CV is exhaustive: every highlight, per-role `stack`, project dates /
//     locations / bullets, grouped `achievements`, and `organizations`.
//
// Dates: each dated entry carries an ISO `start` (and `end`, omitted when
// current) for machines (<time>, JSON Resume, JSON-LD) AND a human `dateLabel`
// for display. Keep both in sync.

module.exports = {
  // Short intro shown under the hero and used as the CV summary.
  summary:
    "I'm a senior software engineer at Google Workspace, where I work on identity protocols, building on earlier work in large-scale data migration and synchronization for enterprise customers. Before Google I spent years on competitive programming and formal verification — compilers, model checkers and SAT solvers — and I still gravitate toward problems that need both.",

  // Curated accent tags for the hero; also seed the CV skills "Focus" row.
  focusAreas: [
    { label: "Identity Protocols", featured: true },
    { label: "Data Migration", featured: true },
    { label: "Distributed Systems" },
    { label: "Formal Verification" },
    { label: "Competitive Programming" },
  ],

  // Experience is grouped by company; each company holds one or more roles.
  // Per role: title, org (sub-org/team, optional), location, focus (optional
  // accent label), start/end (YYYY-MM; omit end when current), dateLabel,
  // current (optional), stack, highlights (rich — the site shows the first 3).
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
          current: true,
          stack: ["Java", "TypeScript", "Cloud Spanner", "LDAP", "SCIM", "SAML", "OIDC", "Bigtable"],
          highlights: [
            "Tech lead in the Identity Protocols team, owning the technical direction of multiple products including Autoprov, Directory Sync and GCDS.",
            "Architected secretless authentication for Inbound SCIM using Workload Identity Federation, enabling secure OIDC token exchange.",
            "Led the frontend architecture consolidation of multiple products from legacy UI systems to modern, component-based web frameworks.",
            "Developed scalable distributed data-processing pipelines for lifecycle management, expiration notification and cleanup of client certificates.",
          ],
        },
        {
          title: "Software Engineer III",
          org: "Google Workspace",
          location: "Bengaluru, India",
          focus: "Customer Onboarding (Data Migration)",
          start: "2020-08",
          end: "2025-11",
          stack: ["Java", "TypeScript", "Cloud Spanner", "Message Queues", "ETL Pipelines", "Data Migration"],
          highlights: [
            "Tech lead in the Customer Onboarding team, building multiple products to migrate data from third-party services to Google.",
            "Led the end-to-end design of full-stack data-migration and identity-synchronization services for enterprise customers.",
            "Onboarded over 100K users from sources including Microsoft, IMAP servers and Dropbox.",
            "Drove significant performance optimizations across migration services, enhancing scalability and cutting API latency by up to 67%.",
          ],
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
          end: "2020-01",
          stack: ["Snowflake", "Azure Blob Storage", "Node.js", "TypeScript"],
          highlights: [
            "Automated A/B testing on data returned by production code and a new implementation.",
            "Suggested improvements to the testing method based on the stable-marriage problem.",
            "Reduced the time to push code to production by 12 hours.",
          ],
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
          end: "2019-07",
          stack: ["Java", "Cloud Spanner", "Message Queues"],
          highlights: [
            "Built a bridge from index pagination to token pagination for the list-users API, making time per call independent of the number of users.",
            "Reduced the per-call upper bound to 3s, down from 12s.",
            "Worked with technologies such as Cloud Spanner and Protocol Buffers.",
          ],
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
          end: "2018-07",
          stack: ["Node.js", "SDK Development"],
          highlights: [
            "Integrated Freshdesk, the flagship product of Freshworks, with third-party applications using the Freshworks SDK on Node.js.",
            "Improved productivity by preventing tab-switches and keeping data synchronized across applications.",
          ],
        },
      ],
    },
  ],

  // Projects. `url` groups links by type: `github` entries are "owner/repo",
  // `arxiv` entries are article ids, `other` are full URLs. `desc` is the
  // compact one-liner the SITE shows; `highlights` are the CV's bullet points.
  projects: [
    {
      name: "Complyer",
      start: "2019-12",
      end: "2020-05",
      location: "Chennai, India",
      stack: ["C++", "CMake", "ANTLR", "Z3", "Model Checking"],
      url: { github: ["AnandSaminathan/complyer", "AnandSaminathan/verification-algorithms", "AnandSaminathan/formula-tree"], arxiv: [], other: [] },
      desc: "A compiler that verifies whether a model satisfies a given property — safety properties in propositional logic and temporal properties in LTL — using an SMT solver with k-induction, LTL bounded model checking and IC3.",
      highlights: [
        "Implemented a compiler to verify whether a model satisfies a given property.",
        "Verifies both safety properties (propositional logic) and temporal properties (linear temporal logic).",
        "Uses an SMT solver with k-induction, LTL bounded model checking and IC3.",
      ],
    },
    {
      name: "Complyer-SAT",
      start: "2020-07",
      location: "Chennai, India",
      stack: ["C++", "CMake", "Boolean SAT"],
      url: { github: ["anishbadhri/complyer-sat"], arxiv: [], other: [] },
      desc: "A Boolean-satisfiability solver that decides whether a formula has a satisfying assignment. Uses Tseytin transformation to CNF and the DPLL algorithm, optimized with 2-SAT and HORNSAT.",
      highlights: [
        "Devised an application to determine whether an assignment of variables satisfies a given Boolean formula.",
        "Implements the Tseytin transformation to convert the expression to CNF.",
        "Solves using the DPLL algorithm, optimized with 2-SAT and HORNSAT.",
      ],
    },
    {
      name: "Bounded Model Checking of MFOTL Properties",
      start: "2018-10",
      end: "2018-11",
      location: "Chennai, India",
      stack: ["Model Checking"],
      url: { github: ["anishbadhri/MFOTLProject"], arxiv: ["1812.00183"], other: [] },
      desc: "Specification and verification of infinite-state systems via Monadic First-Order sentences, whose returned bound restricts the state space and makes the verification problem decidable.",
      highlights: [
        "Specification and verification of infinite-state systems using a language of Monadic First-Order (MFO) sentences.",
        "MFO sentences return a bound that restricts the state space of the input system, making the verification problem decidable.",
      ],
    },
    {
      name: "Graph Database Modelling of College Data",
      start: "2020-07",
      location: "Chennai, India",
      stack: ["Node.js", "Neo4j", "GraphQL"],
      url: { github: [], arxiv: [], other: [] },
      desc: "A scalable graph-database schema and a back-end API server for storing and querying college data across a range of use cases.",
      highlights: [
        "Designed a scalable graph-database schema for easy storage and access of varied data across a range of use cases.",
        "Proposed a back-end API-server implementation to access data from the database.",
      ],
    },
    {
      name: "Graph Recommendation Tool",
      start: "2020-04",
      end: "2020-05",
      location: "Chennai, India",
      stack: ["Python"],
      url: { github: ["divyalakshmi054/chemical-graphs"], arxiv: [], other: [] },
      desc: "A command-line tool that normalizes an input graph to best fit a template graph, comparing slope — or slope and position — with a configurable error margin and learning rate.",
      highlights: [
        "Devised a command-line tool that accepts template and input graphs and normalizes the input graph to best fit the template.",
        "Normalisation compares either slope only, or slope and position, of each point.",
        "Allows an error margin and learning rate to be configured at runtime.",
      ],
    },
    {
      name: "Command-Line Tools for Codeforces",
      start: "2019-11",
      location: "Chennai, India",
      stack: ["Python", "BeautifulSoup"],
      url: { github: ["anishbadhri/Codeforces-MiniProjects"], arxiv: [], other: [] },
      desc: "CLI utilities for Codeforces: problem recommendations, sample-I/O downloads, unsolved virtual-contest listings and recently solved problems.",
      highlights: [
        "Built multiple command-line tools for the Codeforces online judge: problem recommendation, sample-I/O download, unsolved virtual-contest listing and recently-solved problem listing.",
      ],
    },
  ],

  // Technical skills, grouped.
  skills: [
    { group: "Programming", items: ["C++", "Java", "TypeScript", "Python", "SQL", "Shell", "NuSMV"] },
    { group: "Concepts", items: ["Data Structures", "Algorithms", "Boolean Satisfiability", "Model Checking", "Distributed Systems"] },
    { group: "Databases", items: ["Cloud Spanner", "Neo4j", "MySQL"] },
    { group: "Tools & Frameworks", items: ["Git", "Protocol Buffers", "Docker", "Node.js", "CMake", "REST", "ANTLR", "GraphQL"] },
  ],

  // Spoken languages — their own field (not a technical skill). The views render
  // them alongside skills; JSON Resume maps them to its `languages`.
  languages: ["English", "Tamil"],

  education: {
    school: "SSN College of Engineering",
    affiliation: "Anna University",
    location: "Chennai, India",
    degree: "B.E. in Computer Science and Engineering",
    area: "Computer Science and Engineering",
    studyType: "B.E.",
    start: "2016-07",
    end: "2020-06",
    gpa: "7.77 / 10.0",
  },

  // Certifications. `detail` carries the grade/coursework blurb; `url` (when
  // present) is a verification link. Site shows name + detail; CV adds year +
  // issuer.
  certifications: [
    { name: "Neo4j Certified Professional", detail: "Certified in Graph Databases", issuer: "Neo4j", year: "2020", url: "https://graphacademy.neo4j.com/c/9deb0487-ab11-4df1-8f2c-49a618d3531f/" },
    { name: "Data Structures & Algorithms", detail: "6 courses; 98.54% average grade", issuer: "Coursera", year: "2020", url: "https://www.coursera.org/account/accomplishments/specialization/ZW73SFC9HTHC" },
    { name: "Introduction to Discrete Mathematics for Computer Science", detail: "5 courses; 100% average grade", issuer: "Coursera", year: "2020", url: "https://www.coursera.org/account/accomplishments/specialization/P5NZHCRDFRR2" },
    { name: "Design and Analysis of Algorithms", detail: "Grade 81%; top 5% nationally", issuer: "NPTEL", year: "2017", url: "https://archive.nptel.ac.in/noc/Ecertificate/?q=NPTEL17CS27S1220806171019922" },
    { name: "Model Checking", detail: "Grade 84%", issuer: "NPTEL", year: "2017", url: "https://archive.nptel.ac.in/noc/Ecertificate/?q=NPTEL17CS38S1200020171011486" },
  ],

  // Awards / recognition, grouped for the CV. `date` is a display string (some
  // are ranges like "2016 – 20"). Items flagged `featured: <rank>` are surfaced
  // (in rank order, via `short`) in the site's lean "Highlights" section, which
  // is DERIVED in data/index.js — there is no separate stored highlights list.
  achievements: [
    {
      group: "Professional",
      items: [
        { title: "Leadership & peer bonuses", detail: "10+ leadership and 30+ peer bonuses for exemplary work and team support", issuer: "Google", date: "2020 –", featured: 1, short: "10+ leadership and 30+ peer bonuses at Google" },
      ],
    },
    {
      group: "ICPC & Provincials",
      items: [
        { title: "Amritapuri Doublesite Regionals", detail: "Ranked 61 of 324 teams (team IC3)", issuer: "ICPC", date: "2019", featured: 3, short: "ICPC 2019 Amritapuri Regionals — 61 / 324 teams (team IC3)" },
        { title: "Chennai Provincials", detail: "Ranked 3rd (team IC3)", issuer: "Provincials", date: "2019", featured: 2, short: "3rd place — ICPC 2019 Chennai Provincials (team IC3)" },
        { title: "Chennai Provincials", detail: "Ranked 4th (team Code_Overload)", issuer: "Provincials", date: "2017" },
      ],
    },
    {
      group: "Academic",
      items: [
        { title: "eXLog Math Quiz", detail: "1st of 200 teams in the inter-state math quiz", issuer: "SSN", date: "2018", featured: 4, short: "1st of 200 teams — eXLog inter-state math quiz" },
        { title: "Smart India Hackathon", detail: "Finalist (team Tandem Felix)", issuer: "SIH", date: "2018", featured: 5, short: "Smart India Hackathon 2018 — finalist" },
        { title: "Online programming contests", detail: "Advanced past the opening round of Facebook Hacker Cup (2018–19), Google Code Jam (2018) and CodeChef SnackDown (2017)", date: "2017 – 19" },
        { title: "Technical Symposiums", detail: "Won multiple technical events at inter-college symposiums", date: "2016 – 20" },
        { title: "Indian National Olympiad in Informatics", detail: "Qualified via the Zonal Informatics Olympiad", issuer: "IARCS", date: "2016", featured: 6, short: "Qualified for the Indian National Olympiad in Informatics" },
      ],
    },
  ],

  // Interests / involvement (CV "Organizations & Interests"). MAXFLOW is also
  // featured into the site's Highlights.
  organizations: [
    { name: "Competitive Programming", detail: "Active problem solving on Codeforces and CodeChef." },
    { name: "SSN Coding Community", detail: "Head of MAXFLOW, the SSN Coding Community.", featured: 7, short: "Head of MAXFLOW, the SSN Coding Community" },
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
