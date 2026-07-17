// CV renderer: canonical data -> LaTeX.
//
// This is the CV's equivalent of the site's Nunjucks templates — a peer
// rendering of the SAME in-memory data, imported directly (no JSON seam). It
// emits only the document *content*; the design lives in cv/preamble.tex.
//
//   const { resume, site } = require("../data").forCv();   // siteOnly entries dropped
//   ... build body ...  ->  build/cv/resume.tex
//
// Every text value flows through esc()/the cv/latex.js helpers. URLs are passed
// raw to \href (hyperref escapes them); their visible text is escaped.

const fs = require("fs");
const path = require("path");
const { resume, site } = require("../data").forCv();
const { esc, href, bulletList, tags, joinDot } = require("./latex");

// hostname for a full URL's display text, mirroring the site's `hostname` filter.
function hostname(url) {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
}

const out = [];
const push = (s) => out.push(s);

// ---- Header ----------------------------------------------------------------
const tagline = joinDot([
  `${esc(site.role)} at ${esc(site.org)}`,
  esc(site.location),
]);
const contact = joinDot([
  href(`mailto:${site.email}`, site.email),
  href(site.url, hostname(site.url)),
  ...site.social.map((s) => href(s.url, s.label)),
]);
push(`\\cvheader{${esc(site.name)}}{${tagline}}{${contact}}`);

push(`\\cvlead{${esc(resume.summary)}}`);
push(`\\cvfocusareas{${resume.focusAreas.map((f) => esc(f.label)).join(", ")}}`);

// ---- Experience ------------------------------------------------------------
push(`\\section*{Experience}`);
for (const company of resume.experience) {
  push(`\\cvcompany{${esc(company.company)}}`);
  for (const role of company.roles) {
    const date = role.current ? `${esc(role.dateLabel)} (current)` : esc(role.dateLabel);
    push(`\\cvrole{${esc(role.title)}}{${date}}`);
    const sub = joinDot([role.org && esc(role.org), esc(role.location)]);
    push(`\\cvrolesub{${sub}}`);
    if (role.focus) push(`\\cvfocus{${esc(role.focus)}}`);
    push(bulletList(role.highlights));
    if (role.stack && role.stack.length) push(tags(role.stack));
  }
}

// ---- Projects --------------------------------------------------------------
if (resume.projects.length) {
  push(`\\section*{Projects}`);
  for (const p of resume.projects) {
    push(`\\cventry{${esc(p.name)}}{}`);
    push(`${esc(p.desc)}\\par`);
    const u = p.url || {};
    const links = [
      ...(u.github || []).map((repo) => href(`https://github.com/${repo}`, repo)),
      ...(u.arxiv || []).map((id) => href(`https://arxiv.org/abs/${id}`, `arXiv:${id}`)),
      ...(u.other || []).map((link) => href(link, hostname(link))),
    ];
    if (links.length) push(`{\\small ${joinDot(links)}}\\par`);
    if (p.tags && p.tags.length) push(tags(p.tags));
  }
}

// ---- Skills ----------------------------------------------------------------
if (resume.skills.length) {
  push(`\\section*{Skills}`);
  for (const g of resume.skills) {
    push(`\\cvskill{${esc(g.group)}}{${g.items.map(esc).join(", ")}}`);
  }
}

// ---- Education -------------------------------------------------------------
const edu = resume.education;
push(`\\section*{Education}`);
push(`\\cventry{${esc(edu.degree)}}{${esc(edu.dateLabel)}}`);
push(`\\cvrolesub{${joinDot([esc(edu.school), esc(edu.affiliation), esc(edu.location)])}}`);
push(`{\\small GPA ${esc(edu.gpa)}}\\par`);

// ---- Certifications --------------------------------------------------------
if (resume.certifications.length) {
  push(`\\section*{Certifications}`);
  const items = resume.certifications.map((c) =>
    c.url ? `  \\item ${href(c.url, c.name)}` : `  \\item ${esc(c.name)}`,
  );
  push(`\\begin{itemize}\n${items.join("\n")}\n\\end{itemize}`);
}

// ---- Highlights ------------------------------------------------------------
if (resume.highlights.length) {
  push(`\\section*{Highlights}`);
  push(bulletList(resume.highlights));
}

// ---- Assemble --------------------------------------------------------------
const preamble = fs.readFileSync(path.join(__dirname, "preamble.tex"), "utf8");
const document = `${preamble}\n${out.join("\n\n")}\n\n\\end{document}\n`;

const outDir = path.join(__dirname, "..", "build", "cv");
fs.mkdirSync(outDir, { recursive: true });
const outFile = path.join(outDir, "resume.tex");
fs.writeFileSync(outFile, document, "utf8");
console.log(`Wrote ${path.relative(path.join(__dirname, ".."), outFile)} (${document.length} bytes)`);
