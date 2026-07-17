// LaTeX primitives for the CV generator (Awesome-CV / lualatex pipeline).
//
// Rule #1 of a data -> LaTeX pipeline: EVERY piece of text that enters the
// document goes through escapeLatex(). This module is the one place that
// escaping lives; cv/generate.js composes the document out of these helpers.
//
// URLs are the sole exception: they are handed to hyperref's \href, which does
// its own catcode handling for `_ # % & ~` in the URL argument, so a URL is
// passed RAW. The visible link *text* is ordinary LaTeX and is escaped.

// Private sentinels used to park backslash/tilde/caret during escaping.
const BACKSLASH = String.fromCharCode(1);
const TILDE = String.fromCharCode(2);
const CARET = String.fromCharCode(3);

// Escape the ten LaTeX special characters. Backslash, tilde and caret expand
// into commands containing `{}` and `\`, so they are parked on sentinels first
// and restored last (otherwise the middle pass escapes the new braces).
//
// Unlike the old pdflatex pipeline, en/em dashes are NOT rewritten to --/---:
// lualatex reads UTF-8 natively and Source Sans 3 has the glyphs, so the
// dashes in the data pass straight through.
// A marker for strings that are ALREADY LaTeX and must not be escaped again.
// esc() returns a raw() value untouched, so macros (\href, \faGithub, ...) can
// be dropped into an otherwise auto-escaped slot — e.g. a cventry field, which
// runs its arguments through esc(). Escape the *data* parts inside: raw(`\\faGithub~${esc(id)}`).
class RawLatex {
  constructor(value) {
    this.value = value;
  }
  // Safety net: if a raw() value is ever concatenated without going through
  // esc(), it still renders as its LaTeX rather than "[object Object]".
  toString() {
    return this.value;
  }
}
const raw = (value) => new RawLatex(value);

function escapeLatex(input) {
  if (input === undefined || input === null) return "";
  if (input instanceof RawLatex) return input.value; // already LaTeX — pass through
  return String(input)
    .replace(/\\/g, BACKSLASH)
    .replace(/~/g, TILDE)
    .replace(/\^/g, CARET)
    .replace(/([&%$#_{}])/g, "\\$1")
    .replace(new RegExp(BACKSLASH, "g"), "\\textbackslash{}")
    .replace(new RegExp(TILDE, "g"), "\\textasciitilde{}")
    .replace(new RegExp(CARET, "g"), "\\textasciicircum{}");
}

const esc = escapeLatex;

// A hyperref link: raw URL; display text is escaped unless wrapped in raw().
function href(url, text) {
  return `\\href{${url}}{${esc(text)}}`;
}

// Middle-dot separator (a macro, so it needs no font-specific glyph).
const SEP = " \\textperiodcentered{} ";

// Join already-built (raw LaTeX) fragments with the middot separator.
function joinDot(parts) {
  return parts.filter(Boolean).join(SEP);
}

// Awesome-CV bullet list. Takes fragments that are ALREADY LaTeX (the caller
// escapes plain text with esc() and builds links with href()), because items
// routinely mix escaped prose with raw \href links.
function cvitems(rawItems) {
  const rows = (rawItems || []).filter(Boolean).map((t) => `        \\item {${t}}`).join("\n");
  return `      \\begin{cvitems}\n${rows}\n      \\end{cvitems}`;
}

module.exports = { escapeLatex, esc, raw, href, joinDot, SEP, cvitems };
