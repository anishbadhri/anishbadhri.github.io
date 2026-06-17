# anishbadhri.github.io

> Personal portfolio of **Anish Badri R S** — Senior Software Engineer, Google Workspace.
> A static site built with Eleventy and GitHub's Primer design tokens, shipped as plain HTML with **zero client-side JavaScript**.

<!-- Build & deployment health -->
<p align="center">
<a href="https://github.com/anishbadhri/anishbadhri.github.io/actions/workflows/deploy.yml"><img alt="Deploy workflow status" src="https://img.shields.io/github/actions/workflow/status/anishbadhri/anishbadhri.github.io/deploy.yml?branch=main&style=for-the-badge&logo=githubactions&logoColor=white&label=deploy"></a>
<a href="https://github.com/anishbadhri/anishbadhri.github.io/actions/workflows/pr-check.yml"><img alt="PR build check status" src="https://img.shields.io/github/actions/workflow/status/anishbadhri/anishbadhri.github.io/pr-check.yml?style=for-the-badge&logo=githubactions&logoColor=white&label=PR%20build"></a>
<a href="https://anishbadhri.github.io"><img alt="Live site status" src="https://img.shields.io/website?url=https%3A%2F%2Fanishbadhri.github.io&style=for-the-badge&label=site&up_message=live&up_color=2ea043&down_message=down"></a>
</p>

<!-- Project meta -->
<p align="center">
<img alt="License: MIT" src="https://img.shields.io/badge/License-MIT-2ea043?style=for-the-badge">
<img alt="Last commit" src="https://img.shields.io/github/last-commit/anishbadhri/anishbadhri.github.io?style=for-the-badge&logo=git&logoColor=white">
<img alt="Code size" src="https://img.shields.io/github/languages/code-size/anishbadhri/anishbadhri.github.io?style=for-the-badge">
<img alt="Dependabot enabled" src="https://img.shields.io/badge/Dependabot-enabled-025E8C?style=for-the-badge&logo=dependabot&logoColor=white">
</p>

<!-- Built with -->
<p align="center">
<img alt="Eleventy 3.1" src="https://img.shields.io/badge/Eleventy-3.1-0a0a0a?style=for-the-badge&logo=eleventy&logoColor=white">
<img alt="Nunjucks templates" src="https://img.shields.io/badge/Nunjucks-templates-1C4913?style=for-the-badge&logo=nunjucks&logoColor=white">
<img alt="Primer Primitives design tokens" src="https://img.shields.io/badge/Primer_Primitives-tokens-1b1f24?style=for-the-badge&logo=primer&logoColor=white">
<img alt="Node 24.11 or newer" src="https://img.shields.io/badge/Node-%E2%89%A524.11-5FA04E?style=for-the-badge&logo=nodedotjs&logoColor=white">
<img alt="Deployed on GitHub Pages" src="https://img.shields.io/badge/GitHub_Pages-deployed-222?style=for-the-badge&logo=githubpages&logoColor=white">
<img alt="Zero kilobytes of client JavaScript" src="https://img.shields.io/badge/client_JS-0_KB-2ea043?style=for-the-badge&logo=javascript&logoColor=white">
</p>

<p align="center"><strong><a href="https://anishbadhri.github.io">▶ View the live site</a></strong></p>

---

## About

This repository is the source for my personal portfolio. It's a small, deliberately
over-engineered static site: a single page assembled from data files, rendered to
plain HTML at build time, and served with no JavaScript and no web fonts. The goal
was a near-perfect Lighthouse profile and excellent accessibility while keeping the
authoring experience as simple as editing a couple of data files.

Priorities, in order: **SEO → performance → responsiveness → accessibility → UX.**

## Highlights

- **Zero client-side JavaScript.** Nothing to parse or execute; the page is just HTML and inlined CSS.
- **System-driven light/dark.** Theming resolves entirely through `prefers-color-scheme` using Primer's `auto` colour mode — no toggle, no flash, no script.
- **Critical CSS inlined, pruned, and minified.** Primer ships ~1,100 design tokens; the build keeps only the ~200 this page uses, then minifies and inlines the result into `<head>` (~10 KB of CSS; whole page ~8 KB gzipped).
- **No web fonts.** Uses Primer's system-font stacks — no downloads, no layout shift.
- **Intrinsically responsive.** Layout uses fluid grids and flexbox patterns with effectively no width-based media queries; it adapts by content, not breakpoints.
- **Accessible by construction.** Landmark elements, a skip link, a single `h1` with logical heading order, visible keyboard focus, `prefers-reduced-motion` support, and AA/AAA colour contrast throughout.
- **SEO + rich metadata.** Canonical URL, descriptive title/meta, Open Graph and Twitter cards, `sitemap.xml`, `robots.txt`, and `WebSite` / `ProfilePage` / `Person` JSON-LD.
- **Typed project links with real logos.** Each project can carry multiple GitHub, arXiv, or other links; the GitHub and arXiv marks are extracted from `simple-icons` **at build time** and inlined as SVG (no runtime cost, no icon font).
- **Generated share image.** A 1200×630 Open Graph image is produced from a Python/Pillow script, including a circular crop of the profile photo.
- **CI/CD + dependency hygiene.** GitHub Actions builds and deploys to Pages; a separate PR check builds every pull request before merge; Dependabot opens weekly update PRs.

## Tech stack

| Area | Choice |
| --- | --- |
| Site generator | [Eleventy](https://www.11ty.dev/) 3.x (Nunjucks templates) |
| Design tokens | [@primer/primitives](https://www.npmjs.com/package/@primer/primitives) (GitHub Primer) |
| CSS pipeline | PostCSS + `postcss-import` + a custom token pruner + Autoprefixer + cssnano |
| Icons | [simple-icons](https://simpleicons.org) (extracted at build time) |
| Share image | Python + [Pillow](https://python-pillow.org/) |
| Hosting | GitHub Pages (via GitHub Actions) |
| Runtime | Node ≥ 24.11 |

## How it works

**Content → data files.** Everything you'd edit lives in `src/_data/`. `site.js` holds
name, role, contact, social links and SEO defaults; `resume.js` holds experience,
projects, skills, education and highlights. `index.njk` is a thin template that loops
over that data — so updating the site is editing data, not markup. (This separation is
also what would make a future move to Astro cheap.)

**CSS → inlined at build.** `src/_data/css.js` runs during the build: it resolves
`@import`s (`postcss-import`), tree-shakes Primer's unused custom properties with a small
custom pruner, autoprefixes, and minifies with cssnano. The base template inlines the
result into `<head>`, so the page ships its critical CSS with no extra request.

**Icons → inlined at build.** `src/_data/icons.js` reads the GitHub and arXiv marks from
the `simple-icons` package, strips them down for inline use, and exposes them to the
templates. They render as SVG in the HTML — official artwork, zero runtime fetch.

**Share image → script.** `scripts/og-image.py` composes `src/assets/og-image.png` from
your name, title, and a circular crop of `src/assets/profile.jpg`.

## Project structure

```
src/
  _data/
    site.js        # name, role, contact, social, SEO defaults
    resume.js      # experience, projects (typed URLs), skills, education, highlights
    css.js         # compiles + prunes + minifies CSS at build time
    icons.js       # extracts GitHub/arXiv SVGs from simple-icons at build time
  _includes/
    base.njk       # HTML shell: meta, Open Graph, JSON-LD, inlined CSS
  styles/
    main.css       # imports Primer tokens (dependency) + local layers
    base.css       # reset, accent tokens, typography, a11y primitives
    layout.css     # header, container, section rhythm, footer
    components.css # hero, experience, projects, skills, contact …
  assets/          # favicon, og-image, résumé PDF, profile photo (copied as-is)
  index.njk        # the page, assembled from _data
  sitemap.njk · robots.njk · 404.njk
.github/
  workflows/deploy.yml     # build + deploy to GitHub Pages on push to main
  workflows/pr-check.yml   # build-only check on every pull request
  dependabot.yml           # weekly npm + github-actions update PRs
scripts/og-image.py        # regenerate the Open Graph image
.nvmrc                      # Node version (24) for local + CI
```

## Getting started

**Prerequisites:** Node ≥ 24.11 (an `.nvmrc` is provided; `nvm use` picks it up).

```bash
npm install      # install dependencies
npm run serve    # dev server with live reload → http://localhost:8080
npm run build    # production build → ./_site
npm run clean    # remove ./_site
```

## Editing content

- **Text & data:** `src/_data/resume.js` (work, projects, skills, education, highlights) and `src/_data/site.js` (name, role, contact, social, meta description). You shouldn't need to touch the templates.
- **Project links:** in `resume.js`, each project's `url` groups links by type — `github: ["owner/repo"]`, `arxiv: ["1812.00183"]`, `other: ["https://…"]` — and the template renders each with the right logo.
- **Résumé PDF:** the download button serves `src/assets/anish-badri-resume.pdf`; replace the file (same name) to update it.
- **Profile photo / share image:** drop a square-ish image at `src/assets/profile.jpg`, then regenerate the OG image with `pip install Pillow && python scripts/og-image.py` (tune `FACE_Y_FRAC` / `CROP_FRAC` if the crop sits off-centre).
- **Accent colour:** the single custom colour lives in `src/styles/base.css` (`--accent`: `#642ab3` light, `#b69eff` dark). Keep both modes above 4.5:1 contrast, and mirror the colour in `scripts/og-image.py` and `src/assets/favicon.svg`.

## Deployment

Deploys via **GitHub Actions**, not the classic "deploy from a branch" flow.

1. Push to a repo named **`anishbadhri.github.io`**.
2. In **Settings → Pages → Build and deployment → Source**, choose **GitHub Actions**.
3. On every push to `main`, `deploy.yml` builds the site and publishes `_site` to `https://anishbadhri.github.io/`. No secrets needed.

The CI setup runs on Node 24 (pinned by `.nvmrc`). A separate `pr-check.yml` builds
each pull request so a broken build can't reach `main`; pair it with a branch-protection
rule requiring the **Build** check to keep deploys green.

## Accessibility

Skip link, semantic landmarks, one `h1` with a correct heading outline, descriptive
link text, visible focus styles, reduced-motion support, and contrast checked to AA
everywhere / AAA where feasible (the accent values sit around 7.8–8.4:1 on Primer's
canvases).

## Performance

No JavaScript, no web fonts, a single inlined and pruned stylesheet, and a total page
weight in the low tens of kilobytes (~8 KB gzipped). The site targets ~100 Lighthouse
across Performance, Accessibility, Best Practices, and SEO.

## Roadmap

- **Blog** — add a `src/posts/` Markdown collection + `post.njk` layout and a `/blog/` index; the data-driven setup leaves room without restructuring.
- **Astro migration** — low effort by design: content is already in plain data files, so it's mostly translating Nunjucks to `.astro`; CSS and assets port unchanged.
- **Lighthouse CI** — optional PR quality gate via `@lhci/cli` against `./_site`.

## License

**MIT** — see `package.json`. Content (résumé text, project descriptions) © Anish Badri R S.

## Credits

[Eleventy](https://www.11ty.dev/) · [Primer Primitives](https://primer.style/) · [Simple Icons](https://simpleicons.org) · [Pillow](https://python-pillow.org/)