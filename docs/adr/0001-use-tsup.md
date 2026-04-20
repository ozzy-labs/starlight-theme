# ADR-0001: Use tsup for Building

## Status

Accepted (2026-04-04)

## Context

`@ozzylabs/starlight-theme` は TypeScript で記述された npm パッケージであり、ESM 形式で配布する必要がある。ビルドツールの選択が必要。

選択肢:

1. **tsup** — esbuild ベースのバンドラー。設定が少なく、npm パッケージ向け
2. **rollup** — 柔軟だが設定が多い。大規模ライブラリ向け
3. **tsc のみ** — ビルドツール不要だが、パス解決やバンドルなし
4. **unbuild** — unjs エコシステム。自動設定が多いが、カスタマイズが限られる

## Decision

tsup を使用する。

## Consequences

### Easier

- 設定ファイルが最小限（`tsup.config.ts` 数行）
- esbuild ベースで高速ビルド
- ESM / CJS 両対応が容易（必要な場合）
- `.d.ts` 生成が組み込み

### Harder

- esbuild の制約（一部 TypeScript 機能が未サポート）
- Astro コンポーネント（`.astro` ファイル）はバンドル対象外（そのまま配布）
