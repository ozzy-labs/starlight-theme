import starlight from "@astrojs/starlight";
import type { StarlightUserConfig } from "@astrojs/starlight/types";
import type { AstroUserConfig } from "astro";
import { defineConfig } from "astro/config";
import { ozzylabsDocsTheme } from "./plugin.js";

export interface DocsConfigOptions {
  /** Product name displayed in the site title (e.g., "ROAD") */
  product: string;
  /** Base path for the site (e.g., "/road/") */
  base: string;
  /** Starlight sidebar configuration */
  sidebar: StarlightUserConfig["sidebar"];
  /** Additional Starlight plugins */
  plugins?: StarlightUserConfig["plugins"];
  /** Starlight component overrides */
  components?: StarlightUserConfig["components"];
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
 *   sidebar: [{ label: "Guide", autogenerate: { directory: "guide" } }],
 * });
 * ```
 */
export function createDocsConfig(options: DocsConfigOptions): AstroUserConfig {
  const { product, base, sidebar, plugins = [], components } = options;

  return defineConfig({
    site: "https://ozzylabs.com",
    base,
    integrations: [
      starlight({
        title: `${product} — OzzyLabs`,
        sidebar,
        components,
        plugins: [ozzylabsDocsTheme(), ...plugins],
      }),
    ],
  });
}
