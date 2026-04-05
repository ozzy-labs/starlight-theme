# CLAUDE.md

## 編集ルール

- このパッケージは**全プロダクトリポジトリで共通利用**される。特定プロダクト固有のコードを含めない
- Starlight プラグイン API を使い、設定の注入とコンポーネントオーバーライドで拡張する
- `createDocsConfig()` は最小限のオプションで完全な Astro config を生成する設計。利用者に Starlight の内部知識を要求しない

## 主要コマンド

```bash
pnpm install          # 依存関係インストール
pnpm run build        # TypeScript ビルド（tsup）
pnpm run typecheck    # 型チェック
```

## 検証（必須）

コード変更後、報告前に以下を通すこと:

1. `pnpm run build` — ビルド成功
2. `pnpm run typecheck` — 型チェック通過

## 規約

言語・コミット・ブランチ・PR のルールは README.md を参照すること。
