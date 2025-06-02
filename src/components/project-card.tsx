'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { getImageUrl } from '@/lib/firebaseUtils';
import type { Project } from '@/types/project';

type ProjectCardProps = {
  project: Project;
};

export function ProjectCard({ project }: ProjectCardProps) {
  const [imageUrl, setImageUrl] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadImage = async () => {
      setLoading(true);
      setError(null);

      try {
        const url = await getImageUrl(project.imageUrl);
        setImageUrl(url);
      } catch (error) {
        console.error(`プロジェクト${project.id}の画像取得エラー:`, error);
        setError('画像の読み込みに失敗しました');
      } finally {
        setLoading(false);
      }
    };

    loadImage();
  }, [project.id, project.imageUrl]);

  return (
    <Card className="hover:shadow-lg transition-shadow bg-background/80 backdrop-blur-sm border-background/20">
      <CardHeader>
        <div className="aspect-video bg-muted/50 rounded-md mb-4 relative overflow-hidden">
          {loading ? (
            <div className="w-full h-full flex items-center justify-center">
              <p>読み込み中...</p>
            </div>
          ) : imageUrl ? (
            <Image
              src={imageUrl}
              alt={project.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover"
              priority={false}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <p className="text-sm text-muted-foreground">
                {error || '画像を読み込めませんでした'}
              </p>
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
            {project.githubUrl && (
              <Button variant="outline" size="sm" className="flex-1" asChild>
                <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                  コードを見る
                </a>
              </Button>
            )}

            {project.liveUrl && (
              <Button size="sm" className="flex-1" asChild>
                <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                  サービスページを見る
                </a>
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
