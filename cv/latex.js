// LaTeX primitives for the CV generator.
//
// Rule #1 of a data -> LaTeX pipeline: EVERY piece of text that enters the
// document goes through escapeLatex(). This module is the one place that
// escaping lives; cv/generate.js composes the document out of these helpers and
// never hand-writes an escaped string.
//
// URLs are the sole exception: they are handed to hyperref's \href/\url, which
// do their own catcode handling for `_ # % & ~` in the URL argument, so a URL
// must be passed RAW (escaping it would double-escape and break the link). The
// visible link *text*, by contrast, is ordinary LaTeX and is escaped like
// everything else.

// Private sentinels (unprintable control chars that never occur in résumé
// text) used to park backslash/tilde/caret during escaping — see below.
const BACKSLASH = String.fromCharCode(1);
const TILDE = String.fromCharCode(2);
const CARET = String.fromCharCode(3);

// Escape the ten LaTeX special characters. Backslash, tilde and caret expand
// into commands that themselves contain `{}` and `\`, so they are parked on the
// sentinels first and restored last — otherwise the middle pass would escape
// the braces we just introduced.
function escapeLatex(input) {
  if (input === undefined || input === null) return "";
  return String(input)
    .replace(/\\/g, BACKSLASH)
    .replace(/~/g, TILDE)
    .replace(/\^/g, CARET)
    .replace(/([&%$#_{}])/g, "\\$1")
    .replace(new RegExp(BACKSLASH, "g"), "\\textbackslash{}")
    .replace(new RegExp(TILDE, "g"), "\\textasciitilde{}")
    .replace(new RegExp(CARET, "g"), "\\textasciicircum{}")
    // Emit the Unicode en/em dashes in the data (the only non-ASCII characters
    // it contains) as portable LaTeX ligatures, so the output renders the same
    // whether CI compiles with pdflatex or a Unicode engine (xetex/lualatex),
    // instead of depending on inputenc's codepoint mapping.
    .replace(/—/g, "---")
    .replace(/–/g, "--");
}

const esc = escapeLatex;

// A hyperref link: raw URL, escaped display text.
function href(url, text) {
  return `\\href{${url}}{${esc(text)}}`;
}

// Middle-dot separator (a macro, so it needs no inputenc support).
const SEP = " \\textperiodcentered{} ";

// Join already-built (raw LaTeX) fragments with the middot separator.
function joinDot(parts) {
  return parts.filter(Boolean).join(SEP);
}

// A tight bullet list from raw strings (each item is escaped).
function bulletList(items) {
  const rows = (items || []).map((t) => `  \\item ${esc(t)}`).join("\n");
  return `\\begin{itemize}\n${rows}\n\\end{itemize}`;
}

// Comma-separated escaped tags, rendered by the \cvtags macro (monospace).
function tags(items) {
  if (!items || items.length === 0) return "";
  return `\\cvtags{${items.map(esc).join(", ")}}`;
}

module.exports = { escapeLatex, esc, href, bulletList, tags, joinDot, SEP };
