// Compiles the stylesheet once per build and exposes the minified result as
// global data ({{ css.inline }}) so it can be inlined into <head>. Inlining the
// critical CSS removes the render-blocking stylesheet request entirely — the
// single biggest lever for the performance score on a page this small.
//
// We import the FULL Primer token set (so the design system stays a real
// dependency, not a copy) and then tree-shake it: Primer declares ~1,100 CSS
// custom properties, of which this page references ~200. The pruner below keeps
// only the variables that are actually used, transitively, then cssnano
// minifies. Net effect: the inlined CSS drops by roughly 90%.
const fs = require("node:fs");
const path = require("node:path");
const postcss = require("postcss");
const postcssImport = require("postcss-import");
const autoprefixer = require("autoprefixer");
const cssnano = require("cssnano");

const VAR_REF = /var\(\s*(--[A-Za-z0-9-]+)/g;

// PostCSS plugin: remove custom-property declarations that nothing references.
const pruneUnusedVars = () => ({
  postcssPlugin: "prune-unused-vars",
  OnceExit(root) {
    const edges = new Map(); // --custom-prop -> Set(--vars it references)
    const roots = new Set(); // vars referenced by *real* CSS properties

    root.walkDecls((decl) => {
      const refs = [...decl.value.matchAll(VAR_REF)].map((m) => m[1]);
      if (decl.prop.startsWith("--")) {
        if (!edges.has(decl.prop)) edges.set(decl.prop, new Set());
        refs.forEach((r) => edges.get(decl.prop).add(r));
      } else {
        refs.forEach((r) => roots.add(r)); // used by a normal property -> keep
      }
    });

    // Transitive closure: a kept var pulls in the vars its value references.
    const keep = new Set();
    const stack = [...roots];
    while (stack.length) {
      const v = stack.pop();
      if (keep.has(v)) continue;
      keep.add(v);
      const deps = edges.get(v);
      if (deps) deps.forEach((d) => stack.push(d));
    }

    // Drop declarations of custom properties nobody keeps, then empty rules.
    root.walkDecls((decl) => {
      if (decl.prop.startsWith("--") && !keep.has(decl.prop)) decl.remove();
    });
    root.walkRules((rule) => {
      if (rule.nodes.length === 0) rule.remove();
    });
    root.walkAtRules((at) => {
      if ((at.name === "media" || at.name === "supports") && at.nodes.length === 0) at.remove();
    });
  },
});
pruneUnusedVars.postcss = true;

module.exports = async function () {
  const entry = path.join(__dirname, "..", "styles", "main.css");
  const raw = fs.readFileSync(entry, "utf8");

  const result = await postcss([
    // Resolves @import for both local partials and the @primer/primitives
    // package, so the design system ships as a real dependency, not a copy.
    postcssImport(),
    pruneUnusedVars(),
    autoprefixer(),
    cssnano({ preset: ["default", { discardComments: { removeAll: true } }] }),
  ]).process(raw, { from: entry });

  return { inline: result.css };
};
