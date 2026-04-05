import type { StarlightPlugin } from "@astrojs/starlight/types";

/**
 * OzzyLabs shared Starlight plugin.
 * Injects common i18n, branding, and social links configuration.
 */
export function ozzylabsDocsTheme(): StarlightPlugin {
  return {
    name: "@ozzy-labs/docs-theme",
    hooks: {
      "config:setup"({ updateConfig }) {
        updateConfig({
          defaultLocale: "root",
          locales: {
            root: { label: "English", lang: "en" },
            ja: { label: "日本語", lang: "ja" },
          },
          social: [
            {
              icon: "github",
              label: "GitHub",
              href: "https://github.com/ozzy-labs",
            },
          ],
        });
      },
    },
  };
}
