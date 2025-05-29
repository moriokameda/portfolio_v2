'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { getImageUrl } from '@/lib/firebaseUtils';

// プロジェクトデータの型
type Project = {
  id: number;
  title: string;
  description: string;
  technologies: string[];
  imagePath: string; // Firebase Storage内のパス
  github?: string;
  demo: string;
};

// FirebaseのError型
type FirebaseError = {
  code?: string;
  message?: string;
  [key: string]: unknown;
};

// プロジェクトデータ
const projects: Project[] = [
  {
    id: 1,
    title: 'スナックホームページ',
    description: 'HTML、JQuery、Bootstrapを使用したホームページの開発',
    technologies: ['HTML', 'javascript', 'Bootstrap', 'JQuery'],
    imagePath: 'snack-yu.png', // Firebase Storageのパス
    demo: 'https://www.yushima-snack-you.com/',
  },
  {
    id: 2,
    title: 'カスタマーサクセス支援Saas',
    description: 'カスタマーサクセスや営業のデジタルセールスルームシステムの開発',
    technologies: ['Vue.js', 'PHP', 'Laravel', 'MySQL', 'Docker', 'AWS'],
    imagePath: 'openpage.png', // Firebase Storageのパス
    demo: 'https://www.openpage.jp/',
  },
  {
    id: 3,
    title: 'マッスルフォトサービス',
    description:
      'パーソナルトレーニングの経過写真を使い、ユーザーのトレーニングをサポートするサービス',
    technologies: ['React', 'MUI', 'Laravel', 'Docker'],
    imagePath: 'mascle-photo.png', // Firebase Storageのパス
    github: 'https://github.com',
    demo: 'https://muscle-photo.com',
  },
];

export function ProjectsSection() {
  const [projectImages, setProjectImages] = useState<Record<number, string>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadImages = async () => {
      setLoading(true);
      setError(null);

      try {
        const imagePromises = projects.map(async (project) => {
          try {
            const url = await getImageUrl(project.imagePath);
            return { id: project.id, url };
          } catch (error: unknown) {
            // エラーメッセージを詳細に記録
            console.error(`プロジェクト${project.id}の画像取得エラー:`, error);

            // エラーをFirebaseError型にキャスト
            const fbError = error as FirebaseError;

            // Permission denied エラーを特定
            if (
              fbError.code === 'storage/unauthorized' ||
              fbError.message?.includes('Permission denied')
            ) {
              console.error(
                'Firebase Storage アクセス権限エラー: セキュリティルールを確認してください'
              );
            }

            return { id: project.id, url: '', error: fbError.message || 'Unknown error' };
          }
        });

        const results = await Promise.all(imagePromises);
        const imageUrls: Record<number, string> = {};
        let hasPermissionError = false;

        for (const result of results) {
          imageUrls[result.id] = result.url;
          if (result.error?.includes('Permission denied')) {
            hasPermissionError = true;
          }
        }

        setProjectImages(imageUrls);

        // 全体的なアクセス権限エラーがあれば表示
        if (hasPermissionError) {
          setError(
            'Firebase Storageへのアクセス権限がありません。Firebaseコンソールでセキュリティルールを確認してください。'
          );
        }
      } catch (error: unknown) {
        console.error('画像の読み込み中にエラーが発生しました:', error);
        const fbError = error as FirebaseError;
        setError(fbError.message || '画像の読み込みに失敗しました。');
      } finally {
        setLoading(false);
      }
    };

    loadImages();
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {error && (
        <div className="col-span-full p-4 mb-6 bg-red-50 border border-red-200 rounded-md">
          <p className="text-red-600 text-sm">{error}</p>
          <p className="text-red-600 text-sm mt-2">
            Firebaseコンソールで以下を確認してください：
            <br />- Storageが有効になっているか
            <br />- セキュリティルールで読み取りが許可されているか
            <br />- 環境変数が正しく設定されているか
          </p>
        </div>
      )}

      {projects.map((project) => (
        <Card
          key={project.id}
          className="hover:shadow-lg transition-shadow bg-background/80 backdrop-blur-sm border-background/20"
        >
          <CardHeader>
            <div className="aspect-video bg-muted/50 rounded-md mb-4 relative overflow-hidden">
              {loading ? (
                <div className="w-full h-full flex items-center justify-center">
                  <p>読み込み中...</p>
                </div>
              ) : projectImages[project.id] ? (
                <Image
                  src={projectImages[project.id]}
                  alt={project.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover"
                  priority={project.id <= 3} // 最初の3つは優先的に読み込む
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <p className="text-sm text-muted-foreground">画像を読み込めませんでした</p>
                </div>
              )}
            </div>
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
                {project.github && (
                  <Button variant="outline" size="sm" className="flex-1" asChild>
                    <a href={project.github} target="_blank" rel="noopener noreferrer">
                      コードを見る
                    </a>
                  </Button>
                )}

                <Button size="sm" className="flex-1" asChild>
                  <a href={project.demo} target="_blank" rel="noopener noreferrer">
                    サービスページを見る
                  </a>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
