import type { StarlightPlugin } from "@astrojs/starlight/types";

/**
 * OzzyLabs shared Starlight plugin.
 * Injects common i18n, branding, social links, and theme CSS.
 */
export function ozzylabsDocsTheme(): StarlightPlugin {
  return {
    name: "@ozzy-labs/docs-theme",
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
          customCss: ["@ozzy-labs/docs-theme/styles/theme.css", ...(config.customCss ?? [])],
        });
      },
    },
  };
}
