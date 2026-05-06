[English](README.md) | 日本語

# starlight-theme

共有 Starlight ドキュメントテーマ。

## インストール

```bash
pnpm add @ozzylabs/starlight-theme
```

`@astrojs/starlight` と `astro` は peerDependencies です。docs プロジェクトに未インストールの場合:

```bash
pnpm add @astrojs/starlight astro
```

## 使い方

```js
// docs/astro.config.mjs
import { createDocsConfig } from "@ozzylabs/starlight-theme";

export default createDocsConfig({
  title: "MyProduct",
  base: "/myproduct/",
  siteUrl: "https://docs.example.com",
  githubUrl: "https://github.com/example/myproduct",
  mermaid: true,
  customCss: ["./src/styles/custom.css"],
  sidebar: [
    { label: "Guide", autogenerate: { directory: "guide" } },
  ],
});
```

以下が自動で設定される:

- 共通 CSS テーマ（アクセントカラー、フォント、ダークモード）
- i18n デフォルト（英語をルートロケール、日本語）— `locales` で上書き可
- GitHub ソーシャルリンク（`githubUrl` 指定時のみ）
- Mermaid ダイアグラムのビルド時 SVG 変換（オプトイン、`playwright` が必要）

### オプション

| オプション | 型 | デフォルト | 説明 |
|-----------|------|---------|------|
| `title` | `string` | （必須） | Starlight に渡すサイトタイトル |
| `base` | `string` | （必須） | ベースパス（例: `/myproduct/`） |
| `siteUrl` | `string` | （必須） | 正規サイト URL |
| `sidebar` | `SidebarConfig` | （必須） | Starlight サイドバー設定 |
| `githubUrl` | `string` | — | 指定時に GitHub ソーシャルリンクを追加 |
| `locales` | `LocalesConfig` | 英語（root）＋ 日本語 | ロケール設定 |
| `defaultLocale` | `string` | `"root"` | デフォルトロケールのキー |
| `mermaid` | `boolean` | `false` | ビルド時 Mermaid SVG レンダリングを有効化 |
| `plugins` | `StarlightPlugin[]` | `[]` | 追加の Starlight プラグイン |
| `components` | `object` | — | Starlight コンポーネントオーバーライド |
| `customCss` | `string[]` | `[]` | 追加 CSS ファイル（テーマ CSS の後に読み込み） |

### syncDocs

ソースリポジトリからドキュメントをコピーし、Docusaurus フロントマターを Starlight 形式に変換するユーティリティ:

```js
import { syncDocs } from "@ozzylabs/starlight-theme";

const result = syncDocs({
  sourceDir: "../source-repo/docs",
  targetDir: "./src/content/docs",
  transformFrontmatter: true,
});

console.log(`Synced ${result.fileCount} files`);
```

## プロダクトリポジトリ側の構成

```text
docs/
├── astro.config.mjs      # 約 6 行（createDocsConfig をインポート）
├── package.json
└── src/content/docs/      # コンテンツのみ
```

## 言語

- デフォルト: 日本語
- 公開ファイル（README など）: 英語版と日本語版を用意
- コミットメッセージ: 英語
- PR タイトル: 英語
- PR 説明: 日本語

## コミット

[Conventional Commits](https://www.conventionalcommits.org/): `<type>[optional scope]: <description>`

Types: feat, fix, docs, style, refactor, perf, test, build, ci, chore

## ブランチ

[GitHub Flow](https://docs.github.com/en/get-started/using-github/github-flow): `main` + feature branches（直接 push 不可）

命名: `<type>/<short-description>`

## Pull Request (PR)

タイトル: Conventional Commits 形式

マージ: squash merge のみ、マージ後にブランチを削除
