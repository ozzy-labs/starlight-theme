import { describe, expect, it } from "vitest";
import { ozzylabsDocsTheme } from "../src/plugin.js";

describe("ozzylabsDocsTheme", () => {
  it("returns a plugin with correct name", () => {
    const plugin = ozzylabsDocsTheme();
    expect(plugin.name).toBe("@ozzylabs/docs-theme");
  });

  it("has a config:setup hook", () => {
    const plugin = ozzylabsDocsTheme();
    expect(plugin.hooks["config:setup"]).toBeTypeOf("function");
  });

  it("injects i18n, social, and customCss via updateConfig", () => {
    const plugin = ozzylabsDocsTheme();
    let updatedConfig: Record<string, unknown> = {};

    const mockConfig = { social: [], customCss: ["user.css"] };
    plugin.hooks["config:setup"]({
      config: mockConfig,
      updateConfig: (partial: Record<string, unknown>) => {
        updatedConfig = partial;
      },
    } as never);

    expect(updatedConfig.defaultLocale).toBe("root");
    expect(updatedConfig.locales).toHaveProperty("root");
    expect(updatedConfig.locales).toHaveProperty("ja");
  });

  it("preserves existing customCss", () => {
    const plugin = ozzylabsDocsTheme();
    let updatedConfig: Record<string, unknown> = {};

    plugin.hooks["config:setup"]({
      config: { social: [], customCss: ["existing.css"] },
      updateConfig: (partial: Record<string, unknown>) => {
        updatedConfig = partial;
      },
    } as never);

    const css = updatedConfig.customCss as string[];
    expect(css).toContain("@ozzylabs/docs-theme/styles/theme.css");
    expect(css).toContain("existing.css");
    expect(css.indexOf("@ozzylabs/docs-theme/styles/theme.css")).toBeLessThan(
      css.indexOf("existing.css"),
    );
  });

  it("preserves existing social links", () => {
    const plugin = ozzylabsDocsTheme();
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

  it("injects default component overrides", () => {
    const plugin = ozzylabsDocsTheme();
    let updatedConfig: Record<string, unknown> = {};

    plugin.hooks["config:setup"]({
      config: { social: [], customCss: [] },
      updateConfig: (partial: Record<string, unknown>) => {
        updatedConfig = partial;
      },
    } as never);

    const components = updatedConfig.components as Record<string, string>;
    expect(components.Footer).toBe("@ozzylabs/docs-theme/components/Footer.astro");
    expect(components.Head).toBe("@ozzylabs/docs-theme/components/Head.astro");
  });

  it("preserves user component overrides over defaults", () => {
    const plugin = ozzylabsDocsTheme();
    let updatedConfig: Record<string, unknown> = {};

    plugin.hooks["config:setup"]({
      config: {
        social: [],
        customCss: [],
        components: { Footer: "./src/components/MyFooter.astro" },
      },
      updateConfig: (partial: Record<string, unknown>) => {
        updatedConfig = partial;
      },
    } as never);

    const components = updatedConfig.components as Record<string, string>;
    expect(components.Footer).toBe("./src/components/MyFooter.astro");
    expect(components.Head).toBe("@ozzylabs/docs-theme/components/Head.astro");
  });
});
