[English](README.md) | 日本語

# docs-theme

OzzyLabs プロダクトリポジトリ共通の Starlight ドキュメントテーマ。

## インストール

```bash
pnpm add @ozzy-labs/docs-theme
```

## 使い方

```js
// docs/astro.config.mjs
import { createDocsConfig } from "@ozzy-labs/docs-theme";

export default createDocsConfig({
  product: "ROAD",
  base: "/road/",
  sidebar: [
    { label: "Guide", autogenerate: { directory: "guide" } },
  ],
});
```

以下が自動で設定される:

- OzzyLabs ブランディング（ロゴ、カラー、ソーシャルリンク）
- i18n（英語をルートロケール、日本語）
- 共通ヘッダー/フッターによるサイト間ナビゲーション

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
