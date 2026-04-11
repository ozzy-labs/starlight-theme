import { cpSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { basename, extname, join, relative } from "node:path";

export interface SyncDocsOptions {
  /** Source directory containing Markdown/MDX docs */
  sourceDir: string;
  /** Target Starlight content directory */
  targetDir: string;
  /** Transform Docusaurus frontmatter to Starlight format (default: false) */
  transformFrontmatter?: boolean;
}

export interface SyncDocsResult {
  /** Number of files copied */
  fileCount: number;
  /** List of copied file paths (relative to targetDir) */
  files: string[];
}

/**
 * Copies documentation files from a source directory to a Starlight content
 * directory, optionally transforming Docusaurus frontmatter to Starlight format.
 */
export function syncDocs(options: SyncDocsOptions): SyncDocsResult {
  const { sourceDir, targetDir, transformFrontmatter = false } = options;

  mkdirSync(targetDir, { recursive: true });

  const files = collectFiles(sourceDir);
  const copiedFiles: string[] = [];

  for (const filePath of files) {
    const relativePath = relative(sourceDir, filePath);
    const destPath = join(targetDir, relativePath);

    mkdirSync(join(destPath, ".."), { recursive: true });

    const ext = extname(filePath);
    if (transformFrontmatter && (ext === ".md" || ext === ".mdx")) {
      const content = readFileSync(filePath, "utf-8");
      const transformed = transformDocusaurusFrontmatter(content);
      writeFileSync(destPath, transformed, "utf-8");
    } else {
      cpSync(filePath, destPath);
    }

    copiedFiles.push(relativePath);
  }

  return { fileCount: copiedFiles.length, files: copiedFiles };
}

function collectFiles(dir: string): string[] {
  const results: string[] = [];
  const entries = readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = join(dir, entry.name);
    if (entry.isDirectory()) {
      results.push(...collectFiles(fullPath));
    } else if (entry.isFile() && !basename(entry.name).startsWith(".")) {
      results.push(fullPath);
    }
  }

  return results;
}

const FRONTMATTER_RE = /^---\n([\s\S]*?)\n---/;
const FIELD_RE = /^(\w[\w_-]*)\s*:\s*(.*)$/;

function transformDocusaurusFrontmatter(content: string): string {
  const match = content.match(FRONTMATTER_RE);
  if (!match) return content;

  const frontmatterBlock = match[1];
  const rest = content.slice(match[0].length);

  const lines = frontmatterBlock.split("\n");
  const outputLines: string[] = [];
  let sidebarOrder: string | undefined;
  let sidebarLabel: string | undefined;

  for (const line of lines) {
    const fieldMatch = line.match(FIELD_RE);
    if (!fieldMatch) {
      outputLines.push(line);
      continue;
    }

    const [, key, value] = fieldMatch;
    switch (key) {
      case "sidebar_position":
        sidebarOrder = value.trim();
        break;
      case "sidebar_label":
        sidebarLabel = value.trim();
        break;
      case "id":
      case "slug":
        // Docusaurus-specific fields — skip
        break;
      default:
        outputLines.push(line);
    }
  }

  if (sidebarOrder || sidebarLabel) {
    const sidebarProps: string[] = [];
    if (sidebarOrder) sidebarProps.push(`  order: ${sidebarOrder}`);
    if (sidebarLabel) sidebarProps.push(`  label: ${sidebarLabel}`);
    outputLines.push("sidebar:");
    outputLines.push(...sidebarProps);
  }

  return `---\n${outputLines.join("\n")}\n---${rest}`;
}
