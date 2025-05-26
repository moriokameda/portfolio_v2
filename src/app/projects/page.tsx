import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const projects = [
  {
    id: 1,
    title: 'ECサイトプラットフォーム',
    description: 'Next.js、TypeScript、Stripeを統合したフルスタックECソリューション。',
    technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Stripe', 'PostgreSQL'],
    image: '/api/placeholder/400/250',
    github: 'https://github.com',
    demo: 'https://demo.com',
  },
  {
    id: 2,
    title: 'タスク管理アプリ',
    description: 'リアルタイム更新とチーム機能を備えた協働タスク管理アプリケーション。',
    technologies: ['React', 'Node.js', 'Socket.io', 'MongoDB', 'Express'],
    image: '/api/placeholder/400/250',
    github: 'https://github.com',
    demo: 'https://demo.com',
  },
  {
    id: 3,
    title: '天気予報ダッシュボード',
    description:
      '位置情報ベースの予報とインタラクティブなチャートを備えたレスポンシブな天気ダッシュボード。',
    technologies: ['React', 'Chart.js', 'OpenWeather API', 'CSS3'],
    image: '/api/placeholder/400/250',
    github: 'https://github.com',
    demo: 'https://demo.com',
  },
  {
    id: 4,
    title: 'ブログプラットフォーム',
    description:
      'マークダウン対応、コメント機能、管理ダッシュボードを備えたモダンなブログプラットフォーム。',
    technologies: ['Next.js', 'MDX', 'Prisma', 'NextAuth.js'],
    image: '/api/placeholder/400/250',
    github: 'https://github.com',
    demo: 'https://demo.com',
  },
  {
    id: 5,
    title: 'ポートフォリオサイト',
    description: 'モダンなデザインで作品とスキルを紹介するレスポンシブなポートフォリオサイト。',
    technologies: ['Next.js', 'TypeScript', 'ShadCN UI', 'Tailwind CSS'],
    image: '/api/placeholder/400/250',
    github: 'https://github.com',
    demo: 'https://demo.com',
  },
  {
    id: 6,
    title: 'チャットアプリケーション',
    description:
      'ルーム機能、ファイル共有、絵文字対応を備えたリアルタイムチャットアプリケーション。',
    technologies: ['React', 'Socket.io', 'Node.js', 'Express', 'MongoDB'],
    image: '/api/placeholder/400/250',
    github: 'https://github.com',
    demo: 'https://demo.com',
  },
];

export default function ProjectsPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-background to-muted py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">プロジェクト一覧</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            これまでに手がけたプロジェクトをご紹介します。それぞれのプロジェクトは、
            私の開発者としての成長における独自の課題と学びを表しています。
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <Card key={project.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="aspect-video bg-muted rounded-md mb-4" />
                <CardTitle>{project.title}</CardTitle>
                <CardDescription>{project.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-semibold mb-2">使用技術：</h4>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-1 bg-secondary text-secondary-foreground text-xs rounded-md"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      コードを見る
                    </Button>
                    <Button size="sm" className="flex-1">
                      デモを見る
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </main>
  );
}
