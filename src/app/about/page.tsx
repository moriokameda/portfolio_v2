import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-background to-muted py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">プロフィール</h1>
            <p className="text-xl text-muted-foreground">
              私の経歴、スキル、開発への情熱についてご紹介します。
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            <Card>
              <CardHeader>
                <CardTitle>自己紹介</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  美しく、機能的で、ユーザーフレンドリーなアプリケーションの開発に情熱を注ぐフルスタック開発者です。
                  プログラミングの世界に足を踏み入れてから数年、常に学び続け、進化し続けています。
                </p>
                <br />
                <p className="text-muted-foreground leading-relaxed">
                  クリーンで保守性の高いコードを書くことを心がけ、業界の最新技術とベストプラクティスを常に追求しています。
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>専門分野</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-muted-foreground">
                  <li>• React、Next.js、TypeScriptを使用したフロントエンド開発</li>
                  <li>• Node.jsとPythonを使用したバックエンド開発</li>
                  <li>• データベース設計と管理</li>
                  <li>• UI/UXデザインと実装</li>
                  <li>• クラウドデプロイメントとDevOps</li>
                  <li>• モバイルアプリ開発</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <Card>
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
                    <li>TypeScript / JavaScript</li>
                    <li>Tailwind CSS</li>
                    <li>HTML5 / CSS3</li>
                    <li>React Hook Form</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold mb-3">バックエンド</h3>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    <li>Node.js / Express</li>
                    <li>Python / Django</li>
                    <li>PostgreSQL / MongoDB</li>
                    <li>REST APIs / GraphQL</li>
                    <li>認証とセキュリティ</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold mb-3">開発ツール</h3>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    <li>Git / GitHub</li>
                    <li>Vercel / Netlify</li>
                    <li>AWS / Google Cloud</li>
                    <li>Docker</li>
                    <li>VS Code</li>
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
