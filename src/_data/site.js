// Re-export of the canonical site data (see data/). This file exists only so
// Eleventy picks the data up as the `site` global; the truth lives in data/,
// which validates on load and is shared verbatim with the LaTeX CV generator.
// `forSite()` yields the site's view (any `cvOnly` entries removed).
module.exports = require("../../data").forSite().site;
