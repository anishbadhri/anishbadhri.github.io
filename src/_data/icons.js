// Brand icons for project links, sourced from the `simple-icons` package
// (official monochrome marks, licensed CC0 — https://simpleicons.org).
//
// The SVGs are read from the dependency and cleaned for inline use HERE, at
// build time. Eleventy embeds the result directly into the generated HTML, so
// the package is a build/deploy-time cost only — nothing extra is fetched or
// executed when the page is served. `fill` is left unset so each icon inherits
// its link's CSS color.
const fs = require("node:fs");
const path = require("node:path");

// Resolve the package's bundled icons directory (its exports block resolving
// package.json directly, so locate it via the main entry instead).
const iconsDir = path.join(path.dirname(require.resolve("simple-icons")), "icons");

function load(slug) {
  let svg = fs.readFileSync(path.join(iconsDir, `${slug}.svg`), "utf8");
  svg = svg.replace(/<title>.*?<\/title>/, "");
  svg = svg.replace('<svg role="img" ', '<svg aria-hidden="true" focusable="false" ');
  return svg.trim();
}

module.exports = {
  github: load("github"),
  arxiv: load("arxiv"),
};
