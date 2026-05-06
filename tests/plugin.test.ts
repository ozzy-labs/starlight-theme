import { describe, expect, it } from "vitest";
import { ozzylabsStarlightTheme } from "../src/plugin.js";

describe("ozzylabsStarlightTheme", () => {
  it("returns a plugin with correct name", () => {
    const plugin = ozzylabsStarlightTheme();
    expect(plugin.name).toBe("@ozzylabs/starlight-theme");
  });

  it("has a config:setup hook", () => {
    const plugin = ozzylabsStarlightTheme();
    expect(plugin.hooks["config:setup"]).toBeTypeOf("function");
  });

  it("injects default i18n via updateConfig", () => {
    const plugin = ozzylabsStarlightTheme();
    let updatedConfig: Record<string, unknown> = {};

    plugin.hooks["config:setup"]({
      config: { social: [], customCss: ["user.css"] },
      updateConfig: (partial: Record<string, unknown>) => {
        updatedConfig = partial;
      },
    } as never);

    expect(updatedConfig.defaultLocale).toBe("root");
    expect(updatedConfig.locales).toHaveProperty("root");
    expect(updatedConfig.locales).toHaveProperty("ja");
  });

  it("allows overriding locales and defaultLocale", () => {
    const plugin = ozzylabsStarlightTheme({
      locales: { en: { label: "English", lang: "en" } },
      defaultLocale: "en",
    });
    let updatedConfig: Record<string, unknown> = {};

    plugin.hooks["config:setup"]({
      config: { social: [], customCss: [] },
      updateConfig: (partial: Record<string, unknown>) => {
        updatedConfig = partial;
      },
    } as never);

    expect(updatedConfig.defaultLocale).toBe("en");
    expect(updatedConfig.locales).toEqual({ en: { label: "English", lang: "en" } });
  });

  it("preserves existing customCss and prepends theme css", () => {
    const plugin = ozzylabsStarlightTheme();
    let updatedConfig: Record<string, unknown> = {};

    plugin.hooks["config:setup"]({
      config: { social: [], customCss: ["existing.css"] },
      updateConfig: (partial: Record<string, unknown>) => {
        updatedConfig = partial;
      },
    } as never);

    const css = updatedConfig.customCss as string[];
    expect(css).toContain("@ozzylabs/starlight-theme/styles/theme.css");
    expect(css).toContain("existing.css");
    expect(css.indexOf("@ozzylabs/starlight-theme/styles/theme.css")).toBeLessThan(
      css.indexOf("existing.css"),
    );
  });

  it("does not add a GitHub social link when githubUrl is omitted", () => {
    const plugin = ozzylabsStarlightTheme();
    let updatedConfig: Record<string, unknown> = {};

    plugin.hooks["config:setup"]({
      config: { social: [], customCss: [] },
      updateConfig: (partial: Record<string, unknown>) => {
        updatedConfig = partial;
      },
    } as never);

    const social = updatedConfig.social as Array<{ icon: string }>;
    expect(social).toEqual([]);
  });

  it("adds a GitHub social link when githubUrl is provided", () => {
    const plugin = ozzylabsStarlightTheme({ githubUrl: "https://github.com/example/repo" });
    let updatedConfig: Record<string, unknown> = {};

    plugin.hooks["config:setup"]({
      config: { social: [], customCss: [] },
      updateConfig: (partial: Record<string, unknown>) => {
        updatedConfig = partial;
      },
    } as never);

    const social = updatedConfig.social as Array<{ icon: string; href: string }>;
    expect(social).toHaveLength(1);
    expect(social[0].icon).toBe("github");
    expect(social[0].href).toBe("https://github.com/example/repo");
  });

  it("preserves existing social links and appends GitHub when provided", () => {
    const plugin = ozzylabsStarlightTheme({ githubUrl: "https://github.com/example/repo" });
    let updatedConfig: Record<string, unknown> = {};

    const existingSocial = [{ icon: "twitter", label: "Twitter", href: "https://twitter.com" }];
    plugin.hooks["config:setup"]({
      config: { social: existingSocial, customCss: [] },
      updateConfig: (partial: Record<string, unknown>) => {
        updatedConfig = partial;
      },
    } as never);

    const social = updatedConfig.social as Array<{ icon: string }>;
    expect(social).toHaveLength(2);
    expect(social[0].icon).toBe("twitter");
    expect(social[1].icon).toBe("github");
  });

  it("injects only the Head component override (no Footer)", () => {
    const plugin = ozzylabsStarlightTheme();
    let updatedConfig: Record<string, unknown> = {};

    plugin.hooks["config:setup"]({
      config: { social: [], customCss: [] },
      updateConfig: (partial: Record<string, unknown>) => {
        updatedConfig = partial;
      },
    } as never);

    const components = updatedConfig.components as Record<string, string>;
    expect(components.Head).toBe("@ozzylabs/starlight-theme/components/Head.astro");
    expect(components.Footer).toBeUndefined();
  });

  it("preserves user component overrides over defaults", () => {
    const plugin = ozzylabsStarlightTheme();
    let updatedConfig: Record<string, unknown> = {};

    plugin.hooks["config:setup"]({
      config: {
        social: [],
        customCss: [],
        components: { Head: "./src/components/MyHead.astro" },
      },
      updateConfig: (partial: Record<string, unknown>) => {
        updatedConfig = partial;
      },
    } as never);

    const components = updatedConfig.components as Record<string, string>;
    expect(components.Head).toBe("./src/components/MyHead.astro");
  });
});
