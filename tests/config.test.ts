import { describe, expect, it, vi } from "vitest";

vi.mock("rehype-mermaid", () => ({ default: () => {} }));

import { createDocsConfig } from "../src/config.js";

const minimalOptions = {
  title: "MyProduct",
  base: "/myproduct/",
  siteUrl: "https://docs.example.com",
  sidebar: [{ label: "Guide", autogenerate: { directory: "guide" } }],
} as const;

describe("createDocsConfig", () => {
  it("uses the supplied siteUrl", () => {
    const config = createDocsConfig(minimalOptions);
    expect(config.site).toBe("https://docs.example.com");
  });

  it("sets base path", () => {
    const config = createDocsConfig(minimalOptions);
    expect(config.base).toBe("/myproduct/");
  });

  it("does not add rehype plugins when mermaid is disabled", () => {
    const config = createDocsConfig(minimalOptions);
    expect(config.markdown?.rehypePlugins).toBeUndefined();
  });

  it("adds rehype-mermaid plugin when mermaid is enabled", () => {
    const config = createDocsConfig({ ...minimalOptions, mermaid: true });
    expect(config.markdown?.rehypePlugins).toHaveLength(1);
  });

  it("includes starlight integration", () => {
    const config = createDocsConfig(minimalOptions);
    expect(config.integrations).toBeDefined();
    expect(Array.isArray(config.integrations)).toBe(true);
    expect((config.integrations as unknown[]).length).toBeGreaterThan(0);
  });
});
