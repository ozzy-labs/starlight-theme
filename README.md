English | [日本語](README.ja.md)

# docs-theme

Shared Starlight docs theme for OzzyLabs product repositories.

## Installation

```bash
pnpm add @ozzy-labs/docs-theme
```

## Usage

```js
// docs/astro.config.mjs
import { createDocsConfig } from "@ozzy-labs/docs-theme";

export default createDocsConfig({
  product: "ROAD",
  base: "/road/",
  sidebar: [
    { label: "Guide", autogenerate: { directory: "guide" } },
  ],
});
```

This generates a full Astro + Starlight configuration with:

- OzzyLabs branding (logo, colors, social links)
- i18n (English as root locale, Japanese)
- Shared header/footer for cross-site navigation

## Per-product repo footprint

```text
docs/
├── astro.config.mjs      # ~6 lines (imports createDocsConfig)
├── package.json
└── src/content/docs/      # Content only
```

## Language

- Default: Japanese
- Public files (e.g., README): English with Japanese version
- Commit messages: English
- PR title: English
- PR description: Japanese

## Commit

[Conventional Commits](https://www.conventionalcommits.org/): `<type>[optional scope]: <description>`

Types: feat, fix, docs, style, refactor, perf, test, build, ci, chore

## Branch

[GitHub Flow](https://docs.github.com/en/get-started/using-github/github-flow): `main` + feature branches (no direct push)

Naming: `<type>/<short-description>`

## Pull Request (PR)

Title: Conventional Commits format

Merge: squash merge only, delete branch after merge
