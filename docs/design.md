# 設計方針

## パッケージの責務

`@ozzylabs/starlight-theme` は、ドキュメントサイトに**共通の見た目・設定**を提供する Starlight 用ライブラリ。利用者はオプション少数で完全な Astro 設定を生成できる。

### 含むもの

- **Starlight プラグイン**: i18n デフォルト（英語/日本語、`locales` で上書き可）、共通 CSS テーマの自動注入、オプションの GitHub ソーシャルリンク
- **設定ファクトリ**: `createDocsConfig()` — 最小オプションから完全な Astro config を生成
- **共通 CSS テーマ**: アクセントカラー、フォント、ダークモード設定（CSS カスタムプロパティ）
- **Mermaid サポート**: `rehype-mermaid` によるビルド時 SVG 変換（オプトイン）
- **docs 同期ユーティリティ**: `syncDocs()` — ソースリポジトリからのドキュメントコピーとフロントマター変換

### 含まないもの

- プロダクト固有のコンテンツ、サイドバー定義
- CI/CD ワークフロー
- インフラ層（ホスティング設定、ルーティングなど）

## 利用者のインターフェース

利用者が触るのは:

1. `createDocsConfig()` のオプション（title, base, siteUrl, sidebar, githubUrl, locales, mermaid, customCss など）
2. `syncDocs()` によるドキュメント同期（Docusaurus 移行時）
3. `src/content/docs/` のコンテンツファイル

Starlight や Astro の設定詳細は `createDocsConfig()` が隠蔽する。

## 拡張ポイント

プロダクト固有のカスタマイズが必要な場合:

- **タイトル**: `title` オプションでサイトタイトルを直接指定（組織名サフィックス等は利用者が組み立てる）
- **サイドバー**: `sidebar` オプションで定義
- **サイト URL**: `siteUrl` オプションで正規 URL を指定
- **GitHub リンク**: `githubUrl` を渡すとフッタ等にソーシャルリンクが追加される
- **多言語**: `locales` / `defaultLocale` で上書き可
- **Mermaid**: `mermaid: true` でビルド時 SVG レンダリングを有効化
- **カスタム CSS**: `customCss` オプションでテーマ CSS の後にプロダクト固有のスタイルを追加
- **追加の Starlight プラグイン**: `plugins` オプションで追加可能
- **コンポーネント**: `components` オプションで Starlight コンポーネントをオーバーライド可能

## アーキテクチャ

```text
@ozzylabs/starlight-theme
├── plugin        Starlight プラグイン（config:setup フック）
│   ├── i18n      デフォルト英語（root）+ 日本語、上書き可
│   ├── social    GitHub ソーシャルリンク（githubUrl 指定時のみ）
│   └── theme     共通 CSS テーマの自動注入
├── config        createDocsConfig() ファクトリ
│   ├── Astro defineConfig をラップ
│   ├── Starlight integration を自動設定
│   ├── rehype-mermaid の条件付き有効化
│   └── 利用者オプションをマージ
└── sync          syncDocs() ユーティリティ
    ├── ソースディレクトリからのファイルコピー
    └── Docusaurus → Starlight フロントマター変換
```
