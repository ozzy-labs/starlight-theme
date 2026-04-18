import type { StarlightPlugin, StarlightUserConfig } from "@astrojs/starlight/types";

type Components = NonNullable<StarlightUserConfig["components"]>;

const defaultComponents: Components = {
  Footer: "@ozzylabs/docs-theme/components/Footer.astro",
  Head: "@ozzylabs/docs-theme/components/Head.astro",
};

/**
 * OzzyLabs shared Starlight plugin.
 * Injects common i18n, branding, social links, theme CSS, and component overrides.
 */
export function ozzylabsDocsTheme(): StarlightPlugin {
  return {
    name: "@ozzylabs/docs-theme",
    hooks: {
      "config:setup"({ config, updateConfig }) {
        updateConfig({
          defaultLocale: "root",
          locales: {
            root: { label: "English", lang: "en" },
            ja: { label: "日本語", lang: "ja" },
          },
          social: [
            ...(config.social ?? []),
            {
              icon: "github",
              label: "GitHub",
              href: "https://github.com/ozzy-labs",
            },
          ],
          customCss: ["@ozzylabs/docs-theme/styles/theme.css", ...(config.customCss ?? [])],
          components: { ...defaultComponents, ...config.components },
        });
      },
    },
  };
}
