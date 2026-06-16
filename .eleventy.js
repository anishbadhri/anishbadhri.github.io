module.exports = function (eleventyConfig) {
  // Copy static assets (favicon, OG image, résumé PDF) straight through.
  eleventyConfig.addPassthroughCopy({ "src/assets": "assets" });

  // Re-run the build when styles change (CSS is compiled in src/_data/css.js).
  eleventyConfig.addWatchTarget("./src/styles/");

  // Small helpers used by templates.
  eleventyConfig.addFilter("year", () => new Date().getFullYear());
  eleventyConfig.addFilter("isoDate", () => new Date().toISOString().slice(0, 10));
  eleventyConfig.addFilter("hostname", (url) => {
    try {
      return new URL(url).hostname.replace(/^www\./, "");
    } catch {
      return url;
    }
  });

  return {
    dir: {
      input: "src",
      includes: "_includes",
      data: "_data",
      output: "_site",
    },
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk",
    templateFormats: ["njk", "md", "html"],
  };
};
