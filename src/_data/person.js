// The schema.org Person node for the page's JSON-LD, built from the canonical
// data. Kept in JS (not inline Nunjucks) so it can map the rich data into
// credentials, occupation, awards and résumé links — the structured-data
// signals that make the profile legible to search engines and AI crawlers.
// base.njk embeds this as the `person` node of its @graph.
const { resume, site, featuredHighlights } = require("../../data");

const abs = (p) => site.url + p;

module.exports = () => {
  const current = resume.experience[0].roles[0]; // most recent role

  return {
    "@type": "Person",
    "@id": site.url + "/#person",
    name: site.name,
    givenName: site.firstName,
    familyName: site.lastName,
    url: site.url + "/",
    image: abs(site.photo),
    jobTitle: site.role,
    description: site.description,
    email: "mailto:" + site.email,
    worksFor: { "@type": "Organization", name: "Google", department: { "@type": "Organization", name: site.org } },
    homeLocation: {
      "@type": "Place",
      address: { "@type": "PostalAddress", addressLocality: "Sunnyvale", addressRegion: "CA", addressCountry: "US" },
    },
    // Current occupation, with the tech it involves.
    hasOccupation: {
      "@type": "Occupation",
      name: current.title,
      skills: current.stack.join(", "),
    },
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: resume.education.school,
      department: { "@type": "Organization", name: resume.education.affiliation },
    },
    knowsAbout: resume.knowsAbout,
    // Recognition and verifiable credentials.
    award: featuredHighlights(),
    hasCredential: resume.certifications.map((c) => ({
      "@type": "EducationalOccupationalCredential",
      name: c.name,
      credentialCategory: "certificate",
      ...(c.issuer ? { recognizedBy: { "@type": "Organization", name: c.issuer } } : {}),
      ...(c.url ? { url: c.url } : {}),
    })),
    sameAs: site.social.map((s) => s.url),
    // Point machines at the downloadable résumé and the JSON Resume.
    subjectOf: [
      { "@type": "CreativeWork", name: "Résumé (JSON Resume)", url: site.url + "/resume.json", encodingFormat: "application/json" },
      { "@type": "CreativeWork", name: "Résumé (PDF)", url: abs(site.resume), encodingFormat: "application/pdf" },
    ],
  };
};
