# Portfolio v2

個人ポートフォリオサイトのソースコードです。Next.js App Routerを使用したモダンなウェブアプリケーションです。

## 技術スタック

### フロントエンド
- **Next.js 15.3.2**: App Routerを採用したReactフレームワーク
- **React 19.0.0**: UIコンポーネントライブラリ
- **TypeScript**: 型安全な開発環境
- **TailwindCSS 4**: ユーティリティファーストのCSSフレームワーク
- **Radix UI**: アクセシブルなUIコンポーネント
- **React Hook Form**: フォーム管理ライブラリ
- **Zod**: スキーマ検証ライブラリ

### バックエンド
- **Firebase**:
  - Firestore: NoSQLデータベース
  - Realtime Database: リアルタイムデータ通信
  - Firebase Admin SDK: サーバーサイド処理

### ビルド・開発ツール
- **Biome**: リンターとフォーマッター
- **ESLint**: コード品質チェック
- **Turbopack**: 高速な開発サーバー

## プロジェクト構成

```
portfolio_v2/
├── public/             # 静的ファイル
├── src/
│   ├── app/            # Next.js App Router
│   │   ├── page.tsx    # ホームページ
│   │   ├── layout.tsx  # レイアウト
│   │   ├── about/      # 自己紹介ページ
│   │   ├── projects/   # プロジェクト紹介ページ
│   │   ├── contact/    # 問い合わせページ
│   │   └── globals.css # グローバルスタイル
│   ├── components/     # 再利用可能なコンポーネント
│   │   ├── ui/         # UIコンポーネント
│   │   ├── navigation.tsx # ナビゲーション
│   │   └── background-video.tsx # 背景動画
│   └── lib/            # ユーティリティ
│       ├── firebase.ts      # Firebase設定
│       ├── firebaseUtils.ts # Firebase関連ユーティリティ
│       └── utils.ts         # 共通ユーティリティ
├── next.config.ts      # Next.js設定
├── tailwind.config.js  # TailwindCSS設定
└── package.json        # 依存関係
```

## インフラ構成

- **ホスティング**: Vercel Platform
- **データベース**: Firebase Firestore / Realtime Database
- **CI/CD**: Vercel GitHubとの連携による自動デプロイ
- **環境変数**: Vercelの環境変数機能を利用

## 開発方法

開発サーバーを起動:

```bash
npm run dev
# または
yarn dev
```

ビルド:

```bash
npm run build
# または
yarn build
```

リンターとフォーマッターの実行:

```bash
# フォーマット
npm run format

# リント
npm run lint
npm run lint:biome

# チェック（問題の自動修正）
npm run check
```

## デプロイ

このプロジェクトはVercelにデプロイすることを前提としています。GitHubリポジトリと連携することで、mainブランチへのプッシュ時に自動デプロイが行われます。

[Vercelデプロイドキュメント](https://nextjs.org/docs/app/building-your-application/deploying)
