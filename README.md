# パワプロ2012決定版 投手経験点チェッカー

『実況パワフルプロ野球2012 決定版』の投手育成を想定し、  
**現在能力** と **目標能力** から、必要な経験点（筋力・敏捷・技術・精神）を算出する Web アプリです。

青系HUDテイストのUIで、スマホ/PCどちらでも入力しやすく、育成計画を素早く立てられることを目指しています。

---

## 主な機能

- 基礎能力（球速 / コントロール / スタミナ）の必要経験点計算
- 変化球（球種・レベル）の必要経験点計算
- センス◯の有無による最終経験点補正（10%減）
- 計算結果のカテゴリ別表示（筋力・敏捷・技術・精神）
- 入力状態・計算結果の `localStorage` 永続化
- サウンド演出付きの操作体験

---

## 対象能力値

### 基礎能力

- 球速
- コントロール
- スタミナ

### 変化球

- スライダー
- Hスライダー
- カットボール
- カーブ
- スローカーブ
- ドロップ
- Dカーブ
- スラーブ
- フォーク
- パーム
- SFF
- Vスライダー
- チェンジアップ
- シンカー
- Hシンカー
- サークルチェンジ
- シュート
- Hシュート
- ツーシーム
- 超スローボール
- ナックル
- ナックルカーブ
- オリジナル変化球

---

## 技術スタック

- React 18
- TypeScript
- Vite
- React Router v7
- Tailwind CSS v4
- Radix UI（UIプリミティブ）
- ESLint / Prettier
- Cloudflare Workers（デプロイ）

---

## セットアップ

### 1) 依存関係をインストール

```bash
npm install
```

### 2) 開発サーバーを起動

```bash
npm run dev
```

起動後、通常は `http://localhost:5173` で確認できます。

---

## 利用可能な npm スクリプト

- `npm run dev`  
  Vite 開発サーバーを起動します。

- `npm run build`  
  本番ビルドを生成します（出力先: `dist`）。

- `npm run build:cloudflare`  
  Cloudflare Pages 向けビルド（実体は `npm run build`）を実行します。

- `npm run dev:cloudflare`  
  Cloudflare Pages ランタイムで `dist` をローカルプレビューします。

- `npm run deploy:cloudflare`  
  `dist` を Cloudflare Pages にデプロイします。

- `npm run lint` / `npm run lint:fix`  
  ESLint の実行 / 自動修正を行います。

- `npm run format` / `npm run format:check`  
  Prettier の整形 / 整形チェックを行います。

---

## 使い方

1. 「現在の能力」に現在値を入力
2. 「目標の能力」に到達したい値を入力
3. 必要に応じて「センス◯」の状態を設定
4. 計算ボタンを押して不足経験点を確認

---

## 計算ロジック概要

- 基礎能力は、現在値から目標値まで 1 ずつ増加させて段階コストを加算
- コントロール / スタミナは内部ランク（G〜S）に応じたコストテーブルを参照
- 変化球は球種カテゴリごとの係数、総変化量、習得球種数に応じてコスト加算
- 初めて変化球を習得するタイミングで追加技術点を加算
- センス◯ありの場合、最終結果を各経験点 10% 減（小数点以下切り捨て）

---

## ディレクトリ構成（主要部分）

```text
src/
  app/
    App.tsx                       # 画面全体の状態管理と計算実行
    components/
      Header.tsx                  # ヘッダー
      StatsCard.tsx               # 能力入力カード
      CalculateButton.tsx         # 計算ボタン
      ResultsCard.tsx             # 計算結果表示
    data/
      pitchData.ts                # 能力・球種の定義
    utils/
      calculateRequiredPoints.ts  # 必要経験点の算出ロジック
```

---

## Cloudflare へのデプロイ

1. ビルド

```bash
npm run build:cloudflare
```

1. Cloudflare にログイン

```bash
npx wrangler login
```

1. デプロイ

```bash
npm run deploy:cloudflare
```

補足:

- 出力ディレクトリは `wrangler.toml` の `[assets] directory = "dist"` で設定しています。
- SPA ルーティングのフォールバックは `wrangler.toml` の `[assets] not_found_handling = "single-page-application"` で設定しています。
- 本番相当のローカル確認は `npm run dev:cloudflare` を利用します。

---

## データ永続化

- キー: `pawapuro2012k_checker_state`
- 保存内容: 現在能力、目標能力、計算結果
- 保存先: ブラウザの `localStorage`

---

## 注意事項

- 一部コストテーブルには暫定値（TODOコメント）を含みます。
- 本アプリの計算結果は育成計画の補助を目的とした参考値です。
- 実ゲーム内仕様との差異がある可能性があります。

---

## ライセンス

`LICENSE.md` を参照してください。
  