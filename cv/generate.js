// CV renderer: canonical data -> Awesome-CV LaTeX.
//
// A peer rendering of the SAME in-memory data as the website, imported directly
// (no JSON seam). It emits only the personal-info commands and section content;
// the design lives in cv/preamble.tex and the class in cv/vendor/awesome-cv.cls.
//
//   const { resume, site } = require("../data").forCv();   // siteOnly entries dropped
//   ... build body with Awesome-CV macros ...  ->  build/cv/resume.tex (+ the .cls)
//
// Compile with lualatex. Every text value flows through esc(); URLs are passed
// raw to \href (hyperref escapes them).

const fs = require("fs");
const path = require("path");
const { resume, site } = require("../data").forCv();
const { esc, raw, href, joinDot, cvitems } = require("./latex");

// hostname for a full URL's display text, mirroring the site's `hostname` filter.
function hostname(url) {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
}

// A social handle by label (e.g. "GitHub" -> "anishbadhri").
function handle(label) {
  const s = site.social.find((x) => x.label.toLowerCase() === label.toLowerCase());
  return s ? s.handle : null;
}

// Middot separators. CDOT is raw LaTeX for the raw-zone header/footer; DOT is a
// literal middle-dot for escaped-zone fields (e.g. the cventry org line) — it
// passes through esc() unchanged and renders natively under lualatex.
const CDOT = "{\\enskip\\textperiodcentered\\enskip}";
const DOT = "\u00B7";

const out = [];
const push = (s) => out.push(s);

// ---- Personal info (Awesome-CV preamble commands, before \begin{document}) --
push(`\\name{${esc(site.firstName || site.name)}}{${esc(site.lastName || "")}}`);
push(`\\position{${esc(site.role)}${CDOT}${esc(site.org)}}`);
push(`\\address{${esc(site.location)}}`);
push(`\\email{${esc(site.email)}}`);
push(`\\homepage{${esc(hostname(site.url))}}`);
const gh = handle("GitHub");
if (gh) push(`\\github{${esc(gh)}}`);
const li = handle("LinkedIn");
if (li) push(`\\linkedin{${esc(li)}}`);
if (site.quote) push(`\\quote{${esc(site.quote)}}`);

// ---- Document + header/footer ----------------------------------------------
push(`\\begin{document}`);
push(`\\makecvheader[C]`);
push(`\\makecvfooter{\\today}{${esc(site.name)}${CDOT}Résumé}{\\thepage}`);

// ---- Summary ---------------------------------------------------------------
push(`\\cvsection{Summary}`);
push(`\\begin{cvparagraph}\n${esc(resume.summary)}\n\\end{cvparagraph}`);

// ---- Experience (company grouping flattened into Awesome-CV entries) --------
push(`\\cvsection{Experience}`);
const expEntries = [];
for (const company of resume.experience) {
  for (const role of company.roles) {
    const items = [];
    // Company + sub-org + focus for the entry's organisation line. Uses a
    // literal middot, NOT joinDot(): this string is escaped by cventry, which
    // would otherwise print joinDot's \textperiodcentered macro verbatim.
    const companyTitle = [company.company, role.org, role.focus].filter(Boolean).join(` ${DOT} `);
    if (role.stack && role.stack.length) {
      items.push(`\\textbf{Tech Stack}: ${role.stack.map(esc).join(", ")}`);
    }
    for (const h of role.highlights) items.push(esc(h));
    expEntries.push(cventry(role.title, companyTitle, role.location, role.dateLabel, cvitems(items)));
  }
}
push(cventries(expEntries));

// ---- Projects --------------------------------------------------------------
if (resume.projects.length) {
  push(`\\cvsection{Projects}`);
  const projEntries = resume.projects.map((p) => {
    const u = p.url || {};
    // Links live in the cventry LOCATION slot (top-right). Each is raw LaTeX
    // (\href + an icon macro), so the joined result is wrapped in raw() to skip
    // cventry's esc(); inside each link, only the data (repo / id) is escaped.
    // \textnormal keeps the icon glyphs upright: the location slot is italic,
    // and the icon fonts have no slanted shape (that substitution is the
    // "Font shape ... undefined" warning otherwise).
    const links = joinDot([
      ...(u.github || []).map((r) => href(`https://github.com/${r}`, raw(`{\\faGithub}`))),
      ...(u.arxiv || []).map((id) => href(`https://arxiv.org/abs/${id}`, raw(`{\\aiarXiv}`))),
      ...(u.other || []).map((l) => href(l, hostname(l))),
    ]);
    // Plain text -> cventry escapes it once (don't pre-escape the tags here).
    const stack = p.tags && p.tags.length ? `Stack: ${p.tags.join(", ")}` : "";
    const nameAndLinks = joinDot([esc(p.name), links]);
    // CV shows the full bullet list; falls back to the compact desc if absent.
    const body = p.highlights && p.highlights.length ? cvitems(p.highlights.map(esc)) : esc(p.desc);
    return cventry(stack, raw(nameAndLinks), p.location || "", p.dateLabel || "", body);
  });
  push(cventries(projEntries));
}

// ---- Skills (focus areas first, then grouped skills) -----------------------
push(`\\cvsection{Skills}`);
const skillRows = [];
if (resume.focusAreas.length) {
  skillRows.push(cvskill("Focus", resume.focusAreas.map((f) => f.label)));
}
for (const g of resume.skills) skillRows.push(cvskill(g.group, g.items));
push(`\\begin{cvskills}\n\n${skillRows.join("\n\n")}\n\n\\end{cvskills}`);

// ---- Education -------------------------------------------------------------
const edu = resume.education;
push(`\\cvsection{Education}`);
const eduItems = [`\\textit{${esc(edu.affiliation)}}`, `GPA ${esc(edu.gpa)}`];
push(cventries([cventry(edu.degree, edu.school, edu.location, edu.dateLabel, cvitems(eduItems))]));

// ---- Certifications (name links out when a verification URL is present) -----
if (resume.certifications.length) {
  push(`\\cvsection{Certifications}`);
  push(
    cvhonors(
      resume.certifications.map((c) =>
        cvhonor(c.url ? raw(href(c.url, c.name)) : c.name, c.detail || "", c.issuer || "", c.year || ""),
      ),
    ),
  );
}

// ---- Achievements (grouped: one cvhonors block per group) ------------------
if (resume.achievements && resume.achievements.length) {
  push(`\\cvsection{Achievements}`);
  for (const grp of resume.achievements) {
    push(`\\cvsubsection{${esc(grp.group)}}`);
    push(cvhonors(grp.items.map((it) => cvhonor(it.title, it.detail || "", it.issuer || "", it.date || ""))));
  }
}

// ---- Organizations & Interests ---------------------------------------------
if (resume.organizations && resume.organizations.length) {
  push(`\\cvsection{Organizations \\& Interests}`);
  const rows = resume.organizations.map((o) => cvskill(o.name, [o.detail]));
  push(`\\begin{cvskills}\n\n${rows.join("\n\n")}\n\n\\end{cvskills}`);
}

// ---- Small Awesome-CV block builders ---------------------------------------
function cventries(entries) {
  return `\\begin{cventries}\n\n${entries.join("\n\n")}\n\n\\end{cventries}`;
}
function cventry(title, org, location, date, description) {
  return (
    `  \\cventry\n` +
    `    {${esc(title)}}\n` +
    `    {${esc(org)}}\n` +
    `    {${esc(location)}}\n` +
    `    {${esc(date)}}\n` +
    `    {\n${description}\n    }`
  );
}
function cvskill(type, list) {
  return `  \\cvskill\n    {${esc(type)}}\n    {${list.map(esc).join(", ")}}`;
}
function cvhonors(items) {
  return `\\begin{cvhonors}\n\n${items.join("\n\n")}\n\n\\end{cvhonors}`;
}
// \cvhonor{award}{event}{location}{date} — a compact right-aligned-date row.
function cvhonor(award, event, location, date) {
  return `  \\cvhonor\n    {${esc(award)}}\n    {${esc(event)}}\n    {${esc(location)}}\n    {${esc(date)}}`;
}
// A flat bullet list directly under a section title. cvitems opens with
// \vspace{-4mm} (tuned to hug a cventry title), so standalone it rides up into
// the section rule; prepend the class's standard content top-skip to clear it.
function sectionItems(rawItems) {
  return `\\vspace{\\acvSectionContentTopSkip}\n${cvitems(rawItems)}`;
}

// ---- Assemble --------------------------------------------------------------
const preamble = fs.readFileSync(path.join(__dirname, "preamble.tex"), "utf8");
const document = `${preamble}\n\n${out.join("\n\n")}\n\n\\end{document}\n`;

const outDir = path.join(__dirname, "..", "build", "cv");
fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(path.join(outDir, "resume.tex"), document, "utf8");
// Copy the vendored class next to the .tex so the compiler finds it with no
// TEXINPUTS fiddling, locally and in CI alike.
fs.copyFileSync(
  path.join(__dirname, "vendor", "awesome-cv.cls"),
  path.join(outDir, "awesome-cv.cls"),
);
console.log("Wrote build/cv/resume.tex (+ awesome-cv.cls)");
