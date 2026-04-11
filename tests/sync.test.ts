import { mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { syncDocs } from "../src/sync.js";

describe("syncDocs", () => {
  let sourceDir: string;
  let targetDir: string;

  beforeEach(() => {
    const base = join(tmpdir(), `docs-theme-test-${Date.now()}`);
    sourceDir = join(base, "source");
    targetDir = join(base, "target");
    mkdirSync(sourceDir, { recursive: true });
  });

  afterEach(() => {
    const base = join(sourceDir, "..");
    rmSync(base, { recursive: true, force: true });
  });

  it("copies files from source to target", () => {
    writeFileSync(join(sourceDir, "guide.md"), "# Guide\n");

    const result = syncDocs({ sourceDir, targetDir });

    expect(result.fileCount).toBe(1);
    expect(result.files).toEqual(["guide.md"]);
    expect(readFileSync(join(targetDir, "guide.md"), "utf-8")).toBe("# Guide\n");
  });

  it("copies nested directories", () => {
    mkdirSync(join(sourceDir, "sub"), { recursive: true });
    writeFileSync(join(sourceDir, "sub/page.md"), "content");

    const result = syncDocs({ sourceDir, targetDir });

    expect(result.fileCount).toBe(1);
    expect(result.files).toEqual([join("sub", "page.md")]);
  });

  it("skips hidden files", () => {
    writeFileSync(join(sourceDir, ".hidden"), "secret");
    writeFileSync(join(sourceDir, "visible.md"), "ok");

    const result = syncDocs({ sourceDir, targetDir });

    expect(result.fileCount).toBe(1);
    expect(result.files).toEqual(["visible.md"]);
  });

  it("transforms Docusaurus frontmatter when enabled", () => {
    const docusaurusContent = [
      "---",
      "title: My Page",
      "sidebar_position: 3",
      "sidebar_label: My Label",
      "id: my-page",
      "slug: /custom-slug",
      "---",
      "",
      "Body content",
    ].join("\n");

    writeFileSync(join(sourceDir, "page.md"), docusaurusContent);

    syncDocs({ sourceDir, targetDir, transformFrontmatter: true });

    const output = readFileSync(join(targetDir, "page.md"), "utf-8");
    expect(output).toContain("title: My Page");
    expect(output).toContain("sidebar:");
    expect(output).toContain("  order: 3");
    expect(output).toContain("  label: My Label");
    expect(output).not.toContain("sidebar_position");
    expect(output).not.toContain("sidebar_label");
    expect(output).not.toContain("id:");
    expect(output).not.toContain("slug:");
    expect(output).toContain("Body content");
  });

  it("does not transform frontmatter by default", () => {
    const content = "---\nsidebar_position: 1\n---\nBody";
    writeFileSync(join(sourceDir, "page.md"), content);

    syncDocs({ sourceDir, targetDir });

    expect(readFileSync(join(targetDir, "page.md"), "utf-8")).toBe(content);
  });

  it("copies non-markdown files without transformation", () => {
    writeFileSync(join(sourceDir, "image.png"), "binary-data");

    syncDocs({ sourceDir, targetDir, transformFrontmatter: true });

    expect(readFileSync(join(targetDir, "image.png"), "utf-8")).toBe("binary-data");
  });
});
