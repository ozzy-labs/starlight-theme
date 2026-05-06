import type { StarlightPlugin, StarlightUserConfig } from "@astrojs/starlight/types";

type Components = NonNullable<StarlightUserConfig["components"]>;

const defaultComponents: Components = {
  Head: "@ozzylabs/starlight-theme/components/Head.astro",
};

const defaultLocales: StarlightUserConfig["locales"] = {
  root: { label: "English", lang: "en" },
  ja: { label: "日本語", lang: "ja" },
};

export interface StarlightThemeOptions {
  /** GitHub URL added as a social link (icon: github). Omit to skip. */
  githubUrl?: string;
  /** Locale configuration. Defaults to English (root) + Japanese. */
  locales?: StarlightUserConfig["locales"];
  /** Default locale key. Defaults to "root". */
  defaultLocale?: string;
}

/**
 * Shared Starlight plugin.
 * Injects i18n defaults, theme CSS, an optional GitHub social link, and component overrides.
 */
export function ozzylabsStarlightTheme(options: StarlightThemeOptions = {}): StarlightPlugin {
  const { githubUrl, locales, defaultLocale } = options;
  return {
    name: "@ozzylabs/starlight-theme",
    hooks: {
      "config:setup"({ config, updateConfig }) {
        const social = [...(config.social ?? [])];
        if (githubUrl) {
          social.push({ icon: "github", label: "GitHub", href: githubUrl });
        }
        updateConfig({
          defaultLocale: defaultLocale ?? "root",
          locales: locales ?? defaultLocales,
          social,
          customCss: ["@ozzylabs/starlight-theme/styles/theme.css", ...(config.customCss ?? [])],
          components: { ...defaultComponents, ...config.components },
        });
      },
    },
  };
}
