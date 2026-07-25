import starlight from "@astrojs/starlight";
import type { StarlightUserConfig } from "@astrojs/starlight/types";
import type { AstroUserConfig } from "astro";
import { defineConfig } from "astro/config";
import rehypeMermaid from "rehype-mermaid";
import { ozzylabsStarlightTheme } from "./plugin.js";

export interface DocsConfigOptions {
  /** Site title passed directly to Starlight (e.g., "MyProduct" or "MyProduct — MyOrg") */
  title: string;
  /** Base path for the site (e.g., "/myproduct/") */
  base: string;
  /** Site URL for canonical links and sitemaps (e.g., "https://docs.example.com") */
  siteUrl: string;
  /** Starlight sidebar configuration */
  sidebar: StarlightUserConfig["sidebar"];
  /** GitHub URL added as a social link (icon: github). Omit to skip. */
  githubUrl?: string;
  /** Locale configuration. Defaults to English (root) + Japanese. */
  locales?: StarlightUserConfig["locales"];
  /** Default locale key. Defaults to "root". */
  defaultLocale?: string;
  /** Enable Mermaid diagram rendering at build time (requires playwright) */
  mermaid?: boolean;
  /** Additional Starlight plugins */
  plugins?: StarlightUserConfig["plugins"];
  /** Starlight component overrides */
  components?: StarlightUserConfig["components"];
  /** Additional CSS files to load after the theme CSS */
  customCss?: string[];
}

/**
 * Creates a full Astro + Starlight configuration from minimal options.
 *
 * @example
 * ```js
 * import { createDocsConfig } from "@ozzylabs/starlight-theme";
 *
 * export default createDocsConfig({
 *   title: "MyProduct",
 *   base: "/myproduct/",
 *   siteUrl: "https://docs.example.com",
 *   mermaid: true,
 *   sidebar: [{ label: "Guide", items: [{ autogenerate: { directory: "guide" } }] }],
 * });
 * ```
 */
export function createDocsConfig(options: DocsConfigOptions): AstroUserConfig {
  const {
    title,
    base,
    siteUrl,
    sidebar,
    githubUrl,
    locales,
    defaultLocale,
    mermaid = false,
    plugins = [],
    components,
    customCss = [],
  } = options;

  // Built as a single object rather than a `mermaid ? {...} : {}` ternary: the
  // union of the two branches is not assignable to Astro's markdown config type.
  const markdown: NonNullable<AstroUserConfig["markdown"]> = {};
  if (mermaid) {
    markdown.rehypePlugins = [rehypeMermaid];
  }

  return defineConfig({
    site: siteUrl,
    base,
    markdown,
    integrations: [
      starlight({
        title,
        sidebar,
        components,
        customCss,
        plugins: [ozzylabsStarlightTheme({ githubUrl, locales, defaultLocale }), ...plugins],
      }),
    ],
  });
}
