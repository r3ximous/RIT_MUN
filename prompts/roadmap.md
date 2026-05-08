# 🗺️ RIT MUN Website Rebuild Roadmap

This document outlines the strategic, execution-ready plan for migrating the official RIT MUN website ([https://ritmun.ritdubai.ae/],[https://github.com/ritdubaisg/ritmun]) from a legacy Angular 12 Single Page Application (SPA) to a modern, lightweight, and highly performant static site using **Astro**.

It is designed to work within the constraint that the only guaranteed deployment target is the university FTP-served Apache static host.

---

## 🎯 Project Goals & Acceptance Criteria
1. **Eliminate Technical Debt:** Remove dependency on outdated Angular versions, OpenSSL legacy flags, and forced `npm` resolutions.
2. **Improve Performance:** Serve zero-javascript static HTML by default. **Metric:** 90+ Lighthouse Performance on key pages. 
3. **Automate Deployments:** Replace manual FTP drag-and-drop with an automated GitHub Actions CI/CD pipeline (one-click merge-to-deploy).
4. **Brand Alignment:** Implement a modern UI utilizing the official RIT brand palette, predominantly `#F76902` (RIT Orange).
5. **Future-Proof Content Management:** Move all conference data into easy-to-edit Markdown/Content Collections.
6. **Web Quality:** 
   - **Accessibility:** No critical WCAG violations from automated scanning; keyboard nav functionality.
   - **SEO:** Proper page titles, meta descriptions, canonical URLs, and sitemap.

---

## 📝 Phase 0: Discovery & Constraints (Prerequisites)
- [ ] **Content Inventory:** Map current site pages, PDFs, routes, and content owners ("Old URL → New URL").
- [ ] **Hosting Realities Check:** Confirm Apache capabilities, `.htaccess` support in the docroot, and whether the university host applies TLS/HTTPS redirects upstream.
- [ ] **Establish URL/Redirect Strategy:** Since URLs will change from the SPA routing, keep redirects only for high-traffic/externally linked pages; otherwise, rely on a helpful custom 404 navigation page.

---

## 🏗️ Phase 1: Repo, Tooling & Guardrails
**Objective:** Initialize the project and block future technical debt.

- [ ] **Initialize Astro:** Run `npm create astro@latest` targeting static HTML output.
- [ ] **Lock Package Manager:** Pin Node version (e.g., Node 22) and keep standard package management (`npm` is fine).
- [ ] **Add CI Verification Check:** Configure linting, formatting, and a lightweight link checker to avoid broken internal links/assets in production.
- [ ] **Install Styling Engine:** Install Tailwind CSS.

---

## 🎨 Phase 2: Design System & Content Primitives
**Objective:** Establish RIT branding and consistent UI rules across standard components.

- [ ] **Define Brand Tokens:** Set up `tailwind.config.mjs` for the official palette.
  ```javascript
  export default {
    theme: {
      extend: {
        colors: {
          brand: {
            orange: '#F76902', // Official RIT Primary Orange
            dark: '#1E1E1E',
            light: '#F4F4F4',
          }
        }
      }
    }
  }
  ```
- [ ] **Accessibility Defaults:** Add strict focus states, a skip-to-content link, semantic landmarks, and verify color contrast on the orange elements.
- [ ] **Reusable Primitives:** Build global buttons, section headers, links, and cards for uniform content styling.

---

## 📂 Phase 3: Content Model & Migration Workflow ("CMS Layer")
**Objective:** Separate content from code using Astro Content Collections.

- [ ] **Define Content Schemas:**
  - **Committees:** Name, description, topics, chairs, difficulty, resources.
  - **Schedule:** Day, start/end, location, label, type.
  - **FAQs:** Question, answer, category, order.
- [ ] **Editor Workflow:** Establish markdown frontmatter conventions and PR rules (spelling, asset placement) for non-technical organizers.
- [ ] **Migrate Legacy Data:** Move text to Markdown files and PDF handbooks to `/public`.

---

## 💻 Phase 4: Page Builds & Routing
**Objective:** Build actual pages prioritized by necessity.

- [ ] **Global Layout (`Layout.astro`):** Build Nav (with `#F76902` hover), Footer, main `<body>`, and meta/SEO defaults.
- [ ] **Build Priority Pages:**
  1. `/` (Homepage): Hero CTA, key dates, value prop.
  2. `/committees`: Index and individual committee detail pages.
  3. `/schedule`: Auto-generated, responsive timeline view.
  4. `/registration`: Outbound link or purely static embed (no active server routes).
  5. `/contact`.
- [ ] **JavaScript Island Policy:**
  - Prefer complete static delivery whenever possible.
  - *Exception:* If a countdown timer is mission-critical, implement it as the *only* JS island on the homepage (e.g., via Preact/Svelte) without blocking rendering. Ask: "Can this just say 'Conference starts MM/DD' instead?"

---

## 🚀 Phase 5: SEO, Analytics & Web-Quality Hardening
**Objective:** Don't skip the last 10% of polished web deliverables.

- [ ] **SEO Basics:** Unique titles, meta descriptions, OpenGraph/Twitter cards, and generated `sitemap.xml`.
- [ ] **Assets:** Compress existing banner images; ensure consistent sizing/responsive tags.
- [ ] **Error Handling:** Build a custom `404.astro` page to gracefully capture outdated Angular `/route` deep links.
- [ ] **`.htaccess` Configuration:** Add a simplified `.htaccess` (if allowed by host) for browser caching and forcing HTTPS.

---

## ⚙️ Phase 6: FTP Automation & CI/CD
**Objective:** Safe, debuggable, hand-off deployments. No manual FTP syncing!

- [ ] **Store Secrets:** Add `FTP_SERVER`, `FTP_USERNAME`, and `FTP_PASSWORD` to GitHub Repo Secrets.
- [ ] **Configure Action (`deploy.yml`):** Create continuous deployment utilizing the `SamKirkland/FTP-Deploy-Action`. 
- [ ] **Rollback Strategy:** GitHub Actions keeps the compiled `dist/` result as an artifact to download/verify or easily roll back via a revert commit.

**Example GitHub Action (`.github/workflows/deploy.yml`):**
```yaml
name: Build & Deploy to RIT FTP
on:
  push:
    branches:
      - main

jobs:
  web-deploy:
    runs-on: ubuntu-latest
    steps:
    - name: Checkout Code
      uses: actions/checkout@v4

    - name: Setup Node.js
      uses: actions/setup-node@v4
      with:
        node-version: '22'

    - name: Install Dependencies
      run: npm ci

    - name: Build Astro Project
      run: npm run build

    - name: Upload Artifact (Backup & Rollback)
      uses: actions/upload-artifact@v4
      with:
        name: astro-build
        path: dist/
        retention-days: 14

    - name: Sync files via FTP
      uses: SamKirkland/FTP-Deploy-Action@v4.3.4
      with:
        server: ${{ secrets.FTP_SERVER }}
        username: ${{ secrets.FTP_USERNAME }}
        password: ${{ secrets.FTP_PASSWORD }}
        local-dir: ./dist/
        # Exclude server configs if needed, e.g., exclude: | **/.htaccess
```

---

## 🤝 Phase 7: Ops Hygiene & Handoff
**Objective:** Ensure the next team manages the site with zero friction.

- [ ] **Rewrite `README.md`:** Erase angular boilerplate; document local Astro dev setup and the CI/CD pipeline workflow.
- [ ] **Create "How to Update" Guide:** Outline a checklist for future organizers to edit Markdown right via the GitHub UI + PR process.
- [ ] **Annual Maintenance Checklist:** Steps to roll over dates, registrations, and archiving old PDFs each year.