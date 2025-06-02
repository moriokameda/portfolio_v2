'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useEffect, useState } from 'react';

// 経歴データの型定義
type History = {
  period: string;
  role: string;
  company: string;
  description: string[];
};

// 経歴データ
const histories: History[] = [
  {
    period: '2023年11月 - 現在',
    role: 'バックエンドエンジニア',
    company: 'Saasメガベンチャー企業（フリーランス）',
    description: [
      '会計システムのバックエンド開発を担当',
      'マイクロサービスアーキテクチャの設計と実装',
      'TypeScript、Kotlin、Spring Boot、GraphQLを使用',
    ],
  },
  {
    period: '2022年5月 - 2023年10月',
    role: 'フルスタックエンジニア',
    company: 'Saas企業（フリーランス）',
    description: [
      'APIやバッチ開発、フロントエンド開発を担当',
      'インフラ周りの設計と実装',
      'Laravel、Next.js、AWS、MCPサーバーを使用',
    ],
  },
  {
    period: '2020年2月 - 2022年4月',
    role: 'バックエンドエンジニア',
    company: '受託系開発会社',
    description: [
      'スクレイピングツールやデータ移行ツールの開発',
      'API開発、バッチ開発、ホームページ開発',
      'PHP、Laravel、MySQL、AWS、Vue.jsを使用',
    ],
  },
  {
    period: '2019年10月 - 2020年1月',
    role: 'コンサル兼開発エンジニア',
    company: 'VRプラットフォームスタートアップ',
    description: [
      'VRプラットフォームの機能改善',
      '10名規模のスタートアップでの開発業務',
      'Unity、C#を使用',
    ],
  },
  {
    period: '2017年11月 - 2019年9月',
    role: 'コンサル/インフラエンジニア',
    company: 'HR系パッケージ開発会社',
    description: [
      'PM業務とインフラエンジニアを兼任',
      'Windowsサーバー、Tomcat、Oracleの構築と運用',
      'システム導入支援とカスタマイズ開発',
    ],
  },
  {
    period: '2017年4月 - 2017年10月',
    role: 'フロントエンドエンジニア',
    company: 'HR系パッケージ開発会社',
    description: [
      'フロントエンド開発の基礎技術を習得',
      'HTML、CSS、JavaScript、jQueryを使用',
      'パッケージソフトウェアのUI開発',
    ],
  },
];

export default function AboutPage() {
  const [scrollOpacity, setScrollOpacity] = useState(0.3);

  // スクロールイベントのリスナーを追加
  useEffect(() => {
    const handleScroll = () => {
      // ページの高さを取得
      const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
      // 現在のスクロール位置
      const scrollTop = window.scrollY;
      // スクロール位置に基づいて不透明度を計算（0.3〜0.7の範囲）
      const newOpacity = 0.3 + (scrollTop / documentHeight) * 0.4;
      setScrollOpacity(newOpacity);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <main className="min-h-screen pt-24 pb-20 relative">
      {/* 白色のオーバーレイ - スクロールに応じて不透明度が変わる */}
      <div className="absolute inset-0 bg-white z-0" style={{ opacity: scrollOpacity }} />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12 bg-background/80 p-6 rounded-lg backdrop-blur-sm">
            <h1 className="text-4xl font-bold mb-4">プロフィール</h1>
            <p className="text-xl text-foreground">
              私の経歴、スキル、開発への情熱についてご紹介します。
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            <Card className="bg-background/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>自己紹介</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-foreground leading-relaxed">
                  初めまして。ウェブエンジニアをしている森生と申します。
                </p>
                <br />
                <p className="text-foreground leading-relaxed">
                  新卒で自社パッケージソフトウェア会社に入社。フロントエンド開発を1年、
                  コンサルとしてパッケージ導入、運用保守を1.5年、同時期にインフラエンジニアとしてインフラ構築を1.5年しました。
                </p>
                <br />
                <p className="text-foreground leading-relaxed">
                  その後web系の受託開発会社に転職し、2年半ほどバックエンドエンジニアとして、バックエンド周りのパッケージ開発やAPI開発をしました。
                </p>
                <br />
                <p className="text-foreground leading-relaxed">
                  現在はフリーランスエンジニアとしてバックエンド周りからフロントエンド、AIエージェントの開発を行っています。
                </p>
              </CardContent>
            </Card>

            <Card className="bg-background/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>専門分野</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-foreground">
                  <li>• React、Next.js、TypeScriptを使用したフロントエンド開発</li>
                  <li>• Node.jsとPythonを使用したバックエンド開発</li>
                  <li>• データベース設計と管理</li>
                  <li>• AIエージェント、MCPサーバー開発</li>
                  <li>• ドメイン駆動設計の導入</li>
                  <li>• 業務理解した上でのシステム設計</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* 経歴セクション */}
          <Card className="bg-background/80 backdrop-blur-sm mb-12">
            <CardHeader>
              <CardTitle>経歴</CardTitle>
              <CardDescription>これまでのキャリア</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                {histories.map((history) => (
                  <div
                    key={`${history.period}-${history.role}`}
                    className="relative pl-4 border-l-2 border-primary/30"
                  >
                    <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-primary/80" />
                    <div className="mb-2">
                      <div className="text-sm text-muted-foreground">{history.period}</div>
                      <div className="font-semibold">{history.role}</div>
                    </div>
                    <ul className="list-disc list-inside space-y-1 text-foreground">
                      {history.description.map((desc) => (
                        <li key={desc}>{desc}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-background/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>技術スキル</CardTitle>
              <CardDescription>日常的に使用している技術とツール</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <h3 className="font-semibold mb-3">フロントエンド</h3>
                  <ul className="space-y-1 text-sm text-foreground">
                    <li>React / Next.js</li>
                    <li>TypeScript</li>
                    <li>Tailwind CSS</li>
                    <li>HTML5 / CSS3</li>
                    <li>React Hook Form</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold mb-3">バックエンド</h3>
                  <ul className="space-y-1 text-sm text-foreground">
                    <li>Node.js / Express</li>
                    <li>Kotlin / Spring Boot</li>
                    <li>PHP</li>
                    <li>MySQL / PostgreSQL</li>
                    <li>REST APIs / GraphQL</li>
                    <li>認証とセキュリティ</li>
                    <li>MCPサーバー</li>
                    <li>AIエージェント</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold mb-3">開発ツール</h3>
                  <ul className="space-y-1 text-sm text-foreground">
                    <li>Git / GitHub</li>
                    <li>Vercel / Netlify</li>
                    <li>AWS / Google Cloud</li>
                    <li>Firebase</li>
                    <li>Docker</li>
                    <li>Cursor</li>
                    <li>JetBrains IDE</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}
