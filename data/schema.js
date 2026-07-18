// Validation schemas for the canonical data (resume + site).
//
// This is the single gate that protects BOTH renderers: the website (via the
// src/_data re-exports) and the LaTeX CV (via cv/generate.js) import `data/`,
// which validates on load. Malformed data therefore fails the site build and
// the CV generation identically and fast — never as a blank PDF cell or a
// broken card on the page.
//
// The schemas mirror the *current* shapes of data/resume.js and data/site.js.
// Objects are strict (unknown keys are rejected) so a typo like `hilights`
// fails loudly instead of silently vanishing from both outputs.
//
// `siteOnly` / `cvOnly` are the optional divergence flags (see data/index.js):
// an entry flagged `cvOnly` is dropped from the site; `siteOnly` is dropped
// from the CV. Unflagged entries appear in both. They are allowed on any
// object-shaped entry.

const { z } = require("zod");

// Optional per-entry divergence flags, spread into every object that can be
// selectively shown in one renderer but not the other.
const divergence = {
  siteOnly: z.boolean().optional(),
  cvOnly: z.boolean().optional(),
};

const focusAreaSchema = z.strictObject({
  label: z.string().min(1),
  featured: z.boolean().optional(),
  ...divergence,
});

// Machine-readable month (YYYY-MM); drives <time>, JSON Resume and JSON-LD.
const isoMonth = z.string().regex(/^\d{4}-\d{2}$/, "must be YYYY-MM");

const roleSchema = z.strictObject({
  title: z.string().min(1),
  org: z.string().min(1).optional(),
  location: z.string().min(1),
  focus: z.string().min(1).optional(),
  start: isoMonth, // required — dateLabel is derived from start/end (data/index.js)
  end: isoMonth.optional(), // omit while current
  current: z.boolean().optional(),
  highlights: z.array(z.string().min(1)).min(1),
  stack: z.array(z.string().min(1)),
  ...divergence,
});

const companySchema = z.strictObject({
  company: z.string().min(1),
  roles: z.array(roleSchema).min(1),
  ...divergence,
});

// Typed link arrays. Each key is optional so a project can drop a type it
// doesn't use (matches the "leave empty or drop the key" convention).
// `github`/`arxiv` entries are identifiers ("owner/repo", article id), not
// URLs; only `other` holds full URLs.
const projectUrlSchema = z.strictObject({
  github: z.array(z.string().min(1)).optional(),
  arxiv: z.array(z.string().min(1)).optional(),
  other: z.array(z.url()).optional(),
});

const projectSchema = z.strictObject({
  name: z.string().min(1),
  start: isoMonth, // required — dateLabel derived
  end: isoMonth.optional(),
  location: z.string().min(1).optional(),
  tags: z.array(z.string().min(1)),
  url: projectUrlSchema.optional(),
  desc: z.string().min(1), // compact one-liner for the site
  highlights: z.array(z.string().min(1)).optional(), // bullets for the CV
  ...divergence,
});

const skillGroupSchema = z.strictObject({
  group: z.string().min(1),
  items: z.array(z.string().min(1)).min(1),
  ...divergence,
});

const educationSchema = z.strictObject({
  school: z.string().min(1),
  affiliation: z.string().min(1),
  location: z.string().min(1),
  degree: z.string().min(1),
  area: z.string().min(1).optional(), // JSON Resume `area`
  studyType: z.string().min(1).optional(), // JSON Resume `studyType`
  start: isoMonth, // required — dateLabel derived
  end: isoMonth.optional(),
  gpa: z.string().min(1),
});

const certificationSchema = z.strictObject({
  name: z.string().min(1),
  detail: z.string().min(1).optional(), // grade / coursework blurb
  issuer: z.string().min(1).optional(),
  year: z.string().min(1).optional(),
  url: z.url().optional(),
  ...divergence,
});

// Grouped awards / recognition. The CV renders these grouped; the site's
// "Highlights" list is DERIVED from the ones flagged `featured` (see
// data/index.js). `featured` is a rank (1 = shown first); `short` overrides the
// site wording when it should read differently from the CV `title`/`detail`.
const featuredFields = {
  featured: z.number().int().positive().optional(),
  short: z.string().min(1).optional(),
};

const achievementItemSchema = z.strictObject({
  title: z.string().min(1),
  detail: z.string().min(1).optional(),
  issuer: z.string().min(1).optional(),
  date: z.string().min(1), // display string; may be a range like "2016 – 20"
  ...featuredFields,
  ...divergence,
});

const achievementGroupSchema = z.strictObject({
  group: z.string().min(1),
  items: z.array(achievementItemSchema).min(1),
  ...divergence,
});

const organizationSchema = z.strictObject({
  name: z.string().min(1),
  detail: z.string().min(1),
  ...featuredFields, // an organization can also surface in the site Highlights
  ...divergence,
});

const resumeSchema = z.strictObject({
  summary: z.string().min(1),
  focusAreas: z.array(focusAreaSchema).min(1),
  experience: z.array(companySchema).min(1),
  projects: z.array(projectSchema),
  skills: z.array(skillGroupSchema).min(1),
  education: educationSchema,
  certifications: z.array(certificationSchema),
  achievements: z.array(achievementGroupSchema),
  organizations: z.array(organizationSchema),
  // `highlights` is no longer stored — it is derived in data/index.js from the
  // `featured` achievements/organizations above.
  knowsAbout: z.array(z.string().min(1)),
});

const socialSchema = z.strictObject({
  label: z.string().min(1),
  handle: z.string().min(1),
  url: z.url(),
  ...divergence,
});

const siteSchema = z.strictObject({
  name: z.string().min(1),
  // Optional given/family split for the CV header; site falls back to `name`.
  firstName: z.string().min(1).optional(),
  lastName: z.string().min(1).optional(),
  role: z.string().min(1),
  org: z.string().min(1),
  location: z.string().min(1),
  url: z.url(),
  description: z.string().min(1),
  email: z.email(),
  quote: z.string().min(1).optional(), // CV-only epigraph
  social: z.array(socialSchema).min(1),
  // Paths (not full URLs) — templates prepend the origin where needed.
  resume: z.string().min(1),
  ogImage: z.string().min(1),
  photo: z.string().min(1),
  locale: z.string().min(1),
});

module.exports = { resumeSchema, siteSchema };
