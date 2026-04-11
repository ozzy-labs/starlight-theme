import starlight from "@astrojs/starlight";
import type { StarlightUserConfig } from "@astrojs/starlight/types";
import type { AstroUserConfig } from "astro";
import { defineConfig } from "astro/config";
import rehypeMermaid from "rehype-mermaid";
import { ozzylabsDocsTheme } from "./plugin.js";

export interface DocsConfigOptions {
  /** Product name displayed in the site title (e.g., "ROAD") */
  product: string;
  /** Base path for the site (e.g., "/road/") */
  base: string;
  /** Site URL for canonical links and sitemaps (default: "https://ozzylabs.com") */
  siteUrl?: string;
  /** Starlight sidebar configuration */
  sidebar: StarlightUserConfig["sidebar"];
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
 * import { createDocsConfig } from "@ozzy-labs/docs-theme";
 *
 * export default createDocsConfig({
 *   product: "ROAD",
 *   base: "/road/",
 *   siteUrl: "https://road.ozzylabs.com",
 *   mermaid: true,
 *   sidebar: [{ label: "Guide", autogenerate: { directory: "guide" } }],
 * });
 * ```
 */
export function createDocsConfig(options: DocsConfigOptions): AstroUserConfig {
  const {
    product,
    base,
    siteUrl = "https://ozzylabs.com",
    sidebar,
    mermaid = false,
    plugins = [],
    components,
    customCss = [],
  } = options;

  return defineConfig({
    site: siteUrl,
    base,
    markdown: mermaid ? { rehypePlugins: [rehypeMermaid] } : {},
    integrations: [
      starlight({
        title: `${product} — OzzyLabs`,
        sidebar,
        components,
        customCss,
        plugins: [ozzylabsDocsTheme(), ...plugins],
      }),
    ],
  });
}
