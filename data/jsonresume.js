// Maps the canonical data (data/) to a JSON Resume document (jsonresume.org
// schema v1.0.0). This is an OUTPUT view, published at /resume.json for machine
// and AI consumption; the site and CV renderers do NOT read it back — they use
// the rich data directly. Standard JSON Resume fields only; the few rich extras
// that the schema can't hold (multiple repo links, grouped awards, per-role
// stack) are folded into the closest standard field or omitted from this view.

const { resume, site } = require("./index"); // validated on load

// JSON Resume dates are ISO; some award dates are display ranges ("2016 – 20").
// Fall back to the first 4-digit year so the emitted document stays valid.
function isoYear(display) {
  const m = String(display || "").match(/\d{4}/);
  return m ? m[0] : undefined;
}

// One representative URL for a project (JSON Resume projects.url is singular).
function primaryProjectUrl(p) {
  const u = p.url || {};
  if (u.github && u.github.length) return `https://github.com/${u.github[0]}`;
  if (u.arxiv && u.arxiv.length) return `https://arxiv.org/abs/${u.arxiv[0]}`;
  if (u.other && u.other.length) return u.other[0];
  return undefined;
}

function dropUndefined(obj) {
  return Object.fromEntries(Object.entries(obj).filter(([, v]) => v !== undefined && v !== ""));
}

function toJsonResume() {
  const [city, region] = site.location.split(",").map((s) => s.trim());

  return {
    $schema: "https://raw.githubusercontent.com/jsonresume/resume-schema/v1.0.0/schema.json",
    basics: dropUndefined({
      name: site.name,
      label: site.role,
      image: site.url + site.photo,
      email: site.email,
      url: site.url,
      summary: resume.summary,
      location: dropUndefined({ city, region, countryCode: "US" }),
      profiles: site.social.map((s) => ({ network: s.label, username: s.handle, url: s.url })),
    }),
    work: resume.experience.flatMap((c) =>
      c.roles.map((role) =>
        dropUndefined({
          name: c.company,
          position: role.title,
          location: role.location,
          startDate: role.start,
          endDate: role.end, // absent while current
          summary: role.focus, // closest standard home for the focus label
          highlights: role.highlights,
          keywords: role.stack, // extension: per-role tech
        }),
      ),
    ),
    education: [
      dropUndefined({
        institution: resume.education.school,
        area: resume.education.area,
        studyType: resume.education.studyType,
        startDate: resume.education.start,
        endDate: resume.education.end,
        score: resume.education.gpa,
      }),
    ],
    certificates: resume.certifications.map((c) =>
      dropUndefined({ name: c.name, date: isoYear(c.year), issuer: c.issuer, url: c.url }),
    ),
    awards: resume.achievements.flatMap((g) =>
      g.items.map((it) =>
        dropUndefined({ title: it.title, date: isoYear(it.date), awarder: it.issuer, summary: it.detail }),
      ),
    ),
    // arXiv projects surface as publications too (machine-friendly).
    publications: resume.projects
      .filter((p) => p.url && p.url.arxiv && p.url.arxiv.length)
      .flatMap((p) =>
        p.url.arxiv.map((id) =>
          dropUndefined({
            name: p.name,
            publisher: "arXiv",
            releaseDate: p.start,
            url: `https://arxiv.org/abs/${id}`,
            summary: p.desc,
          }),
        ),
      ),
    skills: resume.skills.map((g) => ({ name: g.group, keywords: g.items })),
    languages: resume.languages.map((l) => ({ language: l })),
    interests: resume.organizations.map((o) => ({ name: o.name, keywords: [o.detail] })),
    projects: resume.projects.map((p) =>
      dropUndefined({
        name: p.name,
        description: p.desc,
        highlights: p.highlights,
        keywords: p.stack,
        startDate: p.start,
        endDate: p.end,
        url: primaryProjectUrl(p),
      }),
    ),
    meta: {
      canonical: site.url + "/resume.json",
      version: "v1.0.0",
      focusAreas: resume.focusAreas.map((f) => f.label),
      knowsAbout: resume.knowsAbout,
    },
  };
}

module.exports = toJsonResume;
