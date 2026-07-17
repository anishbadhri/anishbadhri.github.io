// Canonical single source of truth.
//
// The website and the LaTeX CV are two equal renderings of the data below.
// Neither owns it; neither copies from the other; there is no serialized
// intermediate (no JSON) between the data and its renderers — both `require`
// this module directly and get the same in-memory objects.
//
//   src/_data/resume.js, src/_data/site.js  ->  forSite()  ->  Eleventy -> _site/
//   cv/generate.js                          ->  forCv()    ->  .tex -> PDF
//
// Validation runs once, here, on load. Because both renderers import this
// module, a malformed edit fails the site build and the CV generation
// identically and fast, with a message that names the offending field.

const rawResume = require("./resume");
const rawSite = require("./site");
const { resumeSchema, siteSchema } = require("./schema");

// Validate a document, or throw an Error that names every offending field.
function validate(schema, data, label) {
  const result = schema.safeParse(data);
  if (result.success) return result.data;

  const lines = result.error.issues.map((issue) => {
    const path = issue.path.length ? issue.path.join(".") : "(root)";
    return `  - ${label}.${path}: ${issue.message}`;
  });
  throw new Error(
    `Invalid ${label} data — build aborted.\n${lines.join("\n")}\n` +
      `Fix data/${label}.js so it satisfies data/schema.js.`,
  );
}

const resume = validate(resumeSchema, rawResume, "resume");
const site = validate(siteSchema, rawSite, "site");

// Recursively drop entries carrying the excluded divergence flag, returning a
// deep copy so the two renderers never share (or mutate) each other's view.
// The flag keys themselves are stripped so neither renderer sees them. With no
// flags present this is a pure deep copy — the site output is unchanged.
function pruneFlagged(value, excludeFlag) {
  if (Array.isArray(value)) {
    return value
      .filter((item) => !(item && typeof item === "object" && item[excludeFlag] === true))
      .map((item) => pruneFlagged(item, excludeFlag));
  }
  if (value && typeof value === "object") {
    const out = {};
    for (const [key, val] of Object.entries(value)) {
      if (key === "siteOnly" || key === "cvOnly") continue;
      out[key] = pruneFlagged(val, excludeFlag);
    }
    return out;
  }
  return value;
}

// The site ignores `cvOnly` entries; the CV ignores `siteOnly` entries.
function forSite() {
  return {
    resume: pruneFlagged(resume, "cvOnly"),
    site: pruneFlagged(site, "cvOnly"),
  };
}

function forCv() {
  return {
    resume: pruneFlagged(resume, "siteOnly"),
    site: pruneFlagged(site, "siteOnly"),
  };
}

module.exports = { resume, site, forSite, forCv, resumeSchema, siteSchema };
