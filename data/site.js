module.exports = {
  name: "Anish Badri R S",
  // Name split into given/family parts. Used by the CV header (Awesome-CV's
  // \name{first}{last} styles them differently); the site uses `name` as-is.
  firstName: "Anish Badri",
  lastName: "R S",
  // Headline role, used in the hero, <title> and structured data.
  role: "Senior Software Engineer",
  org: "Google Workspace",
  location: "Sunnyvale, CA",

  // Canonical origin. No trailing slash here; templates add paths.
  url: "https://anishbadhri.github.io",

  // Keyword-led meta description / OG / Twitter. Keep ≤ 160 chars so it isn't
  // truncated in search results.
  description:
    "Anish Badri R S — Senior Software Engineer at Google Workspace. Identity protocols, large-scale data migration, distributed systems and formal verification.",

  // Public contact + profiles (phone intentionally omitted — not stored at all).
  email: "anishbadhri@gmail.com",

  // Optional epigraph printed under the name on the CV header only.
  quote: "Do or not do, there is no TODO.",
  social: [
    { label: "GitHub", handle: "anishbadhri", url: "https://github.com/anishbadhri" },
    { label: "LinkedIn", handle: "anishbadri", url: "https://linkedin.com/in/anishbadri" },
  ],

  // Downloadable résumé (lives in src/assets/).
  resume: "/assets/anish-badri-resume.pdf",

  // Profile photo used ONLY for the OG image + Person schema (not on the page).
  // Replace this file later; see README → "Updating the profile photo".
  ogImage: "/assets/og-image.png",
  photo: "/assets/profile.jpg",

  locale: "en_US",
};
