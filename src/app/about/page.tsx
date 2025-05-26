'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useEffect, useState } from 'react';

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
    <main className="min-h-screen py-20 relative">
      {/* 白色のオーバーレイ - スクロールに応じて不透明度が変わる */}
      <div className="absolute inset-0 bg-white z-0" style={{ opacity: scrollOpacity }} />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12 bg-background/60 p-6 rounded-lg backdrop-blur-sm">
            <h1 className="text-4xl font-bold mb-4">プロフィール</h1>
            <p className="text-xl text-muted-foreground">
              私の経歴、スキル、開発への情熱についてご紹介します。
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            <Card className="bg-background/60 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>自己紹介</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  初めまして。ウェブエンジニアをしている森生と申します。
                </p>
                <br />
                <p className="text-muted-foreground leading-relaxed">
                  新卒で自社パッケージソフトウェア会社に入社。フロントエンド開発を1年、
                  コンサルとしてパッケージ導入、運用保守を1.5年、同時期にインフラエンジニアとしてインフラ構築を1.5年しました。
                </p>
                <br />
                <p className="text-muted-foreground leading-relaxed">
                  その後web系の受託開発会社に転職し、2年半ほどバックエンドエンジニアとして、バックエンド周りのパッケージ開発やAPI開発をしました。
                </p>
                <br />
                <p className="text-muted-foreground leading-relaxed">
                  現在はフリーランスエンジニアとしてバックエンド周りからフロントエンド、AIエージェントの開発を行っています。
                </p>
              </CardContent>
            </Card>

            <Card className="bg-background/60 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>専門分野</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-muted-foreground">
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

          <Card className="bg-background/60 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>技術スキル</CardTitle>
              <CardDescription>日常的に使用している技術とツール</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <h3 className="font-semibold mb-3">フロントエンド</h3>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    <li>React / Next.js</li>
                    <li>TypeScript</li>
                    <li>Tailwind CSS</li>
                    <li>HTML5 / CSS3</li>
                    <li>React Hook Form</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold mb-3">バックエンド</h3>
                  <ul className="space-y-1 text-sm text-muted-foreground">
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
                  <ul className="space-y-1 text-sm text-muted-foreground">
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
