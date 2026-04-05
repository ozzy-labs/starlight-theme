# 設計方針

## パッケージの責務

`@ozzy-labs/docs-theme` は、各プロダクトリポジトリのドキュメントサイトに**共通の見た目・設定・ナビゲーション**を提供する。

### 含むもの

- **Starlight プラグイン**: i18n（英語/日本語）、ブランディング（ロゴ、カラー、ソーシャルリンク）
- **設定ファクトリ**: `createDocsConfig()` — 最小オプションから完全な Astro config を生成
- **コンポーネントオーバーライド**: 共通ヘッダー/フッターによるサイト間ナビゲーション
- **ブランディング素材**: ロゴ、CSS カスタムプロパティ

### 含まないもの

- プロダクト固有のコンテンツ、サイドバー定義
- ozzylabs.com 親サイト固有の機能（ブログ、ランディングページ）
- CI/CD ワークフロー（`.github` リポジトリで管理）
- Cloudflare Worker ルーティング（インフラ層）

## 利用者のインターフェース

利用者（各プロダクトリポジトリ）が触るのは:

1. `createDocsConfig()` のオプション（product, base, sidebar）
2. `src/content/docs/` のコンテンツファイル

Starlight や Astro の設定詳細は `createDocsConfig()` が隠蔽する。

## 拡張ポイント

プロダクト固有のカスタマイズが必要な場合:

- **サイドバー**: `createDocsConfig()` の `sidebar` オプションで定義
- **追加の Starlight プラグイン**: `plugins` オプションで追加可能
- **コンポーネント**: `components` オプションでプロダクト固有のオーバーライドを追加可能

## アーキテクチャ

```text
@ozzy-labs/docs-theme
├── plugin        Starlight プラグイン（config:setup フック）
│   ├── i18n      英語（root）+ 日本語
│   ├── branding  ロゴ、カラー、ソーシャルリンク
│   └── components  共通ヘッダー/フッター
└── config        createDocsConfig() ファクトリ
    ├── Astro defineConfig をラップ
    ├── Starlight integration を自動設定
    └── プロダクト固有オプションをマージ
```

## 関連ドキュメント

- [ADR-0005: Product Docs Hosting](https://github.com/ozzy-labs/ozzylabs.com/blob/main/docs/adr/0005-product-docs-hosting.md) — Cloudflare Worker によるパスルーティング
- [ADR-0006: Shared Docs Theme](https://github.com/ozzy-labs/ozzylabs.com/blob/main/docs/adr/0006-shared-docs-theme.md) — 本パッケージの採用決定
