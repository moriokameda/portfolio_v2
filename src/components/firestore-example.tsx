'use client';

import { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';

// データの型定義
type ProjectData = {
  id?: string;
  title: string;
  description: string;
  technologies: string[];
  imagePath: string;
  github?: string;
  demo: string;
};

export function FirestoreExample() {
  const [projects, setProjects] = useState<ProjectData[]>([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<Omit<ProjectData, 'id'>>({
    title: '',
    description: '',
    technologies: [],
    imagePath: '',
    github: '',
    demo: '',
  });

  // プロジェクトデータの取得
  const fetchProjects = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/mcp?collection=projects');
      if (!response.ok) {
        throw new Error('Failed to fetch projects');
      }
      const data = await response.json();
      setProjects(data.data || []);
    } catch (error) {
      console.error('Error fetching projects:', error);
      toast.error('プロジェクトの取得に失敗しました');
    } finally {
      setLoading(false);
    }
  }, []);

  // 初回読み込み時にデータを取得
  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  // フォーム入力の処理
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (name === 'technologies') {
      // カンマ区切りの文字列を配列に変換
      setFormData({
        ...formData,
        technologies: value.split(',').map((tech) => tech.trim()),
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  // プロジェクト追加
  const handleAddProject = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/mcp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          collection: 'projects',
          data: formData,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to add project');
      }

      await response.json();
      toast.success('プロジェクトを追加しました');

      // フォームをリセット
      setFormData({
        title: '',
        description: '',
        technologies: [],
        imagePath: '',
        github: '',
        demo: '',
      });

      // 最新のデータを再取得
      fetchProjects();
    } catch (error) {
      console.error('Error adding project:', error);
      toast.error('プロジェクトの追加に失敗しました');
    } finally {
      setLoading(false);
    }
  };

  // プロジェクト削除
  const handleDeleteProject = async (id: string) => {
    if (!id) return;

    if (!window.confirm('このプロジェクトを削除してもよろしいですか？')) {
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`/api/mcp?collection=projects&id=${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete project');
      }

      toast.success('プロジェクトを削除しました');
      // 最新のデータを再取得
      fetchProjects();
    } catch (error) {
      console.error('Error deleting project:', error);
      toast.error('プロジェクトの削除に失敗しました');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>プロジェクト追加</CardTitle>
          <CardDescription>
            プロジェクト情報を入力して登録してください。技術スタックはカンマで区切ってください。
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleAddProject} className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="title">タイトル</Label>
              <Input
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="description">説明</Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="technologies">使用技術（カンマ区切り）</Label>
              <Input
                id="technologies"
                name="technologies"
                value={formData.technologies.join(', ')}
                onChange={handleInputChange}
                placeholder="React, TypeScript, Tailwind CSS"
                required
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="imagePath">画像パス</Label>
              <Input
                id="imagePath"
                name="imagePath"
                value={formData.imagePath}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="github">GitHub URL (オプション)</Label>
              <Input
                id="github"
                name="github"
                value={formData.github}
                onChange={handleInputChange}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="demo">デモURL</Label>
              <Input
                id="demo"
                name="demo"
                value={formData.demo}
                onChange={handleInputChange}
                required
              />
            </div>

            <Button type="submit" disabled={loading}>
              {loading ? '処理中...' : 'プロジェクトを追加'}
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>プロジェクト一覧</CardTitle>
          <CardDescription>登録されているプロジェクトの一覧です</CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <p>データを読み込み中...</p>
          ) : projects.length === 0 ? (
            <p>プロジェクトがありません</p>
          ) : (
            <div className="space-y-4">
              {projects.map((project) => (
                <Card key={project.id} className="p-4">
                  <div className="flex justify-between">
                    <div>
                      <h3 className="text-lg font-semibold">{project.title}</h3>
                      <p className="text-sm text-muted-foreground">{project.description}</p>
                      <div className="flex flex-wrap gap-1 mt-2">
                        {project.technologies.map((tech, i) => (
                          <span
                            key={`${project.id}-${tech}-${i}`}
                            className="px-2 py-1 bg-secondary text-secondary-foreground text-xs rounded-md"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => project.id && handleDeleteProject(project.id)}
                    >
                      削除
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          )}
          <Button className="mt-4" onClick={fetchProjects} disabled={loading}>
            データを更新
          </Button>
        </CardContent>
      </Card>
    </div>
  );
} 