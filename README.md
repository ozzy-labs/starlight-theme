English | [日本語](README.ja.md)

# starlight-theme

Shared Starlight docs theme for OzzyLabs product repositories.

## Installation

```bash
pnpm add @ozzylabs/starlight-theme
```

## Usage

```js
// docs/astro.config.mjs
import { createDocsConfig } from "@ozzylabs/starlight-theme";

export default createDocsConfig({
  product: "ROAD",
  base: "/road/",
  siteUrl: "https://road.ozzylabs.com",
  mermaid: true,
  customCss: ["./src/styles/custom.css"],
  sidebar: [
    { label: "Guide", autogenerate: { directory: "guide" } },
  ],
});
```

This generates a full Astro + Starlight configuration with:

- OzzyLabs shared CSS theme (accent colors, fonts, dark mode)
- i18n (English as root locale, Japanese)
- GitHub social link
- Mermaid diagram rendering at build time (opt-in, requires `playwright`)

### Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `product` | `string` | (required) | Product name in the site title |
| `base` | `string` | (required) | Base path (e.g., `/road/`) |
| `siteUrl` | `string` | `"https://ozzylabs.com"` | Canonical site URL |
| `sidebar` | `SidebarConfig` | (required) | Starlight sidebar configuration |
| `mermaid` | `boolean` | `false` | Enable build-time Mermaid SVG rendering |
| `plugins` | `StarlightPlugin[]` | `[]` | Additional Starlight plugins |
| `components` | `object` | — | Starlight component overrides |
| `customCss` | `string[]` | `[]` | Additional CSS files (loaded after theme CSS) |

### syncDocs

Utility to copy docs from a source repository and optionally transform Docusaurus frontmatter to Starlight format:

```js
import { syncDocs } from "@ozzylabs/starlight-theme";

const result = syncDocs({
  sourceDir: "../road/docs",
  targetDir: "./src/content/docs",
  transformFrontmatter: true,
});

console.log(`Synced ${result.fileCount} files`);
```

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
