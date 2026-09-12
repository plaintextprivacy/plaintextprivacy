# Plaintext Privacy

[plaintextprivacy.org](https://plaintextprivacy.org) is a platform focused on helping everyday people improve their digital privacy and security through easy to follow guides. The primary audience for this content is non-technical organizers, activists, lawyers, and anyone else who gives a shit about their data privacy.

Each guide is a checklist of individual settings that are rated by real-world impact (Critical / High / Medium / Low), so readers can prioritize changes that apply to their situation (and will hopefully not get overwhelmed in the process).

---

## What's in this repo

The site is a React + TypeScript app. All guide content lives as plain JSON.

```
scripts/             ← build-time scripts
src/
  components/        ← React components
  data/
    guides/          ← guide content
    index.json       ← the guide list shown on /guides
  pages/             ← top-level routes
  types/
    guide.ts         ← the schema every guide JSON file must follow
```

If you're here to fix a typo, correct an inaccurate setting path, add a source citation, or improve the wording of a guide, everything you need is under `src/data/guides/`

---

## Contributing

### 1. Fork and clone

```bash
git clone https://github.com/plaintextprivacy/plaintextprivacy.git
cd plaintextprivacy
```

### 2. Use the correct Node version

This project requires **Node 22+**. If you use `nvm`:

```bash
nvm install
nvm use
```

### 3. Install dependencies

```bash
npm install
```

### 4. Create a branch

Never work directly on `main` - see [Branch policy](#branch-policy-important) below.

```bash
git checkout -b fix/android-screen-lock-typo
```

Use a short, descriptive branch name.

### 5. Make your changes

If you're editing a guide, open the relevant file under `src/data/guides/`. Each guide follows the schema defined in `src/types/guide.ts`. a guide is a list of sections, each containing checklist items with a `name`, `path` (the settings menu path), `why` (why it matters), `steps` (how to do it), and an optional `sources` list for citations.

Keep these conventions when editing guide content:

- **Add citations**. If you're adding or changing a factual claim, include a `sources` entry with a working url
- **Settings paths should be verbatim**. `path` and `steps` (like `` `Settings` → `Privacy` ``) should match the menu wording on the device or app being described
- **Risk ratings are deliberate**. A `critical` rating should mean the setting has serious consequences if skipped, not just that you personally think it's important

### 6. Preview your changes locally

```bash
npm run dev
```

Opens the site at `http://localhost:5173`. Navigate to the guide you edited to confirm it renders and reads the way you intended.

### 7. Test before opening a PR

Run these before pushing your branch. The same checks run automatically in CI, so catching issues locally first saves a round trip:

```bash
npm run test
npm run typecheck
npm run format
```

`npm run test` is the one most likely to catch a mistake in a guide edit as it checks that every item has the required fields. If it fails, the error message *should* point you to the exact file and field.

You do **not** need to run `npm run generate-pdfs` or `npm run generate-guide-metadata` locally. Both are build-time scripts that run automatically in CI on every merge to `main`. They require either a headless browser (Playwright) or full git history to work correctly, and aren't necessary to preview or validate a normal content edit.

### 8. Open a pull request

Push your branch and open a PR against `main` on GitHub:

```bash
git push origin fix/android-screen-lock-typo
```

Describe what you changed and why. If your change corrects a factual claim, link a source in the PR description even if you've added one to the guide itself. This helps reviewers verify quickly.

---

## Branch policy

**Direct pushes to `main` are not permitted**. All changes must go through a pull request:

1. Create a branch
2. Open a PR against `main`
3. Wait for review and approval from an authorized maintainer (approval is required)
4. Once approved, the branch can be merged into `main`

`main` is protected at the repository level, so a direct push will be rejected. Every PR also runs automated checks (type checking, tests, and a production build) before it can be merged. Any CI failures will result in the PR being rejected until the errors are resolved.

---

## License

This repository uses two separate licenses:

- **Code** (everything except guide content) is licensed under [MIT](./LICENSE.txt). It's free to use, modify, and redistribute.
- **Guide content** (`src/data/guides/`, `src/data/index.json`, `src/data/resources.json`, and similar) is licensed under [CC BY-NC-SA 4.0](./CONTENT-LICENSE.md). It's free to share and adapt with attribution, **but not for commercial use without prior written permission**. See [CONTENT-LICENSE.md](./CONTENT-LICENSE.md) for the full terms and how to request commercial use.

If you're contributing a PR that edits guide content, you're contributing it under those same content-license terms.

---

## Reporting a security issue

Please don't open a public issue for a security vulnerability. See [SECURITY.md](./SECURITY.md) for how to responsibly report vulnerabilities.

---

## Questions

If something in this README is unclear, or you're not sure whether a change you're considering is in scope for this project, open an issue or start a discussion before writing a large PR.
