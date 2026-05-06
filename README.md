English | [日本語](README.ja.md)

# starlight-theme

Shared Starlight docs theme.

## Installation

```bash
pnpm add @ozzylabs/starlight-theme
```

`@astrojs/starlight` and `astro` are peer dependencies. If not already installed in your docs project:

```bash
pnpm add @astrojs/starlight astro
```

## Usage

```js
// docs/astro.config.mjs
import { createDocsConfig } from "@ozzylabs/starlight-theme";

export default createDocsConfig({
  title: "MyProduct",
  base: "/myproduct/",
  siteUrl: "https://docs.example.com",
  githubUrl: "https://github.com/example/myproduct",
  mermaid: true,
  customCss: ["./src/styles/custom.css"],
  sidebar: [
    { label: "Guide", autogenerate: { directory: "guide" } },
  ],
});
```

This generates a full Astro + Starlight configuration with:

- Shared CSS theme (accent colors, fonts, dark mode)
- i18n defaults (English as root locale, Japanese) — overridable via `locales`
- Optional GitHub social link (when `githubUrl` is provided)
- Mermaid diagram rendering at build time (opt-in, requires `playwright`)

### Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `title` | `string` | (required) | Site title passed to Starlight |
| `base` | `string` | (required) | Base path (e.g., `/myproduct/`) |
| `siteUrl` | `string` | (required) | Canonical site URL |
| `sidebar` | `SidebarConfig` | (required) | Starlight sidebar configuration |
| `githubUrl` | `string` | — | If set, adds a GitHub social link |
| `locales` | `LocalesConfig` | English (root) + Japanese | Locale configuration |
| `defaultLocale` | `string` | `"root"` | Default locale key |
| `mermaid` | `boolean` | `false` | Enable build-time Mermaid SVG rendering |
| `plugins` | `StarlightPlugin[]` | `[]` | Additional Starlight plugins |
| `components` | `object` | — | Starlight component overrides |
| `customCss` | `string[]` | `[]` | Additional CSS files (loaded after theme CSS) |

### syncDocs

Utility to copy docs from a source repository and optionally transform Docusaurus frontmatter to Starlight format:

```js
import { syncDocs } from "@ozzylabs/starlight-theme";

const result = syncDocs({
  sourceDir: "../source-repo/docs",
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
