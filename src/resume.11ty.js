// Publishes the canonical data as a JSON Resume document at /resume.json, for
// crawlers, AI tools and the JSON Resume ecosystem to fetch and parse. It is a
// generated OUTPUT (like the CV PDF), not a source the renderers read back.
const toJsonResume = require("../data/jsonresume");

module.exports = class {
  data() {
    return { permalink: "/resume.json", eleventyExcludeFromCollections: true };
  }

  render() {
    return JSON.stringify(toJsonResume(), null, 2);
  }
};
