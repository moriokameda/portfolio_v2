'use client';

import { useState, useRef, useEffect, useCallback, useLayoutEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  addDocument,
  getDocuments,
  deleteDocument,
  createQueryConstraints,
} from '@/lib/firebaseUtils';
import { toast } from 'sonner';
import { Textarea } from './ui/textarea';

// メッセージの型定義
type Message = {
  role: 'user' | 'assistant' | 'system';
  content: string;
};

// APIレスポンスの型定義
type ApiResponse = {
  type: 'message' | 'data' | 'showProjects';
  message?: string;
  data?: ProjectData;
};

// プロジェクトデータの型定義
type ProjectData = {
  id?: string;
  title: string;
  description: string;
  technologies: string[];
  imagePath: string;
  github?: string;
  demo: string;
};

export function ProjectChat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'system',
      content: 'プロジェクトの登録をお手伝いします。プロジェクトの情報を教えてください。',
    },
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [projects, setProjects] = useState<ProjectData[]>([]);
  const [showProjectList, setShowProjectList] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // プロジェクト一覧を取得
  const fetchProjects = useCallback(async () => {
    try {
      // プロジェクトを作成日時の降順で取得
      const constraints = createQueryConstraints({
        orderByField: 'createdAt',
        orderDirection: 'desc',
      });
      const data = await getDocuments<ProjectData>('projects', constraints);
      setProjects(data || []);
    } catch (error) {
      console.error('Error fetching projects:', error);
      toast.error('プロジェクトの取得に失敗しました');
    }
  }, []);

  // 初回読み込み時にプロジェクト一覧を取得
  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  // メッセージが追加されたら自動スクロール
  useLayoutEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // プロジェクトを登録
  const registerProject = async (projectData: ProjectData) => {
    try {
      // タイムスタンプを追加
      const dataWithTimestamp = {
        ...projectData,
        createdAt: new Date().toISOString(),
      };

      // Firestoreに登録
      const docId = await addDocument('projects', dataWithTimestamp);
      console.log('Document written with ID: ', docId);
      
      await fetchProjects();
      toast.success('プロジェクトを登録しました');
      
      // 確認メッセージを追加
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: 'プロジェクトを登録しました。他のプロジェクトも登録しますか？',
        },
      ]);
    } catch (error) {
      console.error('Error registering project:', error);
      
      // エラーメッセージをより詳細に
      let errorMessage = 'プロジェクトの登録に失敗しました';
      if (error instanceof Error) {
        if (error.message.includes('permission-denied')) {
          errorMessage = 'アクセス権限がありません。ログインしているか確認してください。';
        } else if (error.message.includes('not-found')) {
          errorMessage = 'プロジェクトコレクションが見つかりません。';
        }
      }
      
      toast.error(errorMessage);
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: `${errorMessage} もう一度お試しください。`,
        },
      ]);
    }
  };

  // メッセージを送信
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim() || isLoading) return;

    const userMessage = inputMessage.trim();
    setInputMessage('');
    setIsLoading(true);

    // ユーザーメッセージを追加
    setMessages((prev) => [...prev, { role: 'user', content: userMessage }]);

    try {
      // OpenAI APIを呼び出し
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [...messages, { role: 'user', content: userMessage }],
        }),
      });

      if (!response.ok) {
        throw new Error('API request failed');
      }

      const result: ApiResponse = await response.json();

      // アシスタントのメッセージを追加
      if (result.message) {
        setMessages((prev) => [
          ...prev,
          { role: 'assistant', content: result.message || 'エラーが発生しました' },
        ]);
      }

      // プロジェクト一覧の表示/非表示を切り替え
      if (result.type === 'showProjects') {
        setShowProjectList(true);
      } else {
        setShowProjectList(false);
      }

      // プロジェクトデータが含まれている場合は登録
      if (result.type === 'data' && result.data) {
        await registerProject(result.data);
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('エラーが発生しました');
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: 'エラーが発生しました。もう一度お試しください。',
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  // プロジェクトを削除
  const handleDeleteProject = async (id: string) => {
    if (!id || !window.confirm('このプロジェクトを削除してもよろしいですか？')) return;

    try {
      await deleteDocument('projects', id);
      toast.success('プロジェクトを削除しました');
      await fetchProjects();
    } catch (error) {
      console.error('Error deleting project:', error);
      toast.error('プロジェクトの削除に失敗しました');
    }
  };

  return (
    <div className="space-y-8">
      {/* チャットインターフェース */}
      <Card>
        <CardHeader>
          <CardTitle>プロジェクト登録アシスタント</CardTitle>
          <CardDescription>プロジェクトの情報を会話形式で入力できます。</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* メッセージ表示エリア */}
            <div className="h-[400px] overflow-y-auto space-y-4 p-4 border rounded-lg">
              {messages.map((message, i) => (
                <div
                  key={`${message.role}-${i}-${message.content.substring(0, 10)}`}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-lg ${
                      message.role === 'user'
                        ? 'bg-primary text-primary-foreground'
                        : message.role === 'assistant'
                        ? 'bg-muted'
                        : 'bg-secondary text-secondary-foreground text-sm'
                    }`}
                  >
                    <p className="whitespace-pre-wrap">{message.content}</p>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* 入力フォーム */}
            <form onSubmit={handleSubmit} className="flex gap-2">
              <Textarea
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="プロジェクトについて教えてください..."
                className="flex-1"
                rows={2}
              />
              <Button type="submit" disabled={isLoading}>
                {isLoading ? '送信中...' : '送信'}
              </Button>
            </form>
          </div>
        </CardContent>
      </Card>

      {/* プロジェクト一覧 */}
      {showProjectList && (
        <Card>
          <CardHeader>
            <CardTitle>登録済みプロジェクト</CardTitle>
            <CardDescription>現在登録されているプロジェクトの一覧です</CardDescription>
          </CardHeader>
          <CardContent>
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
          </CardContent>
        </Card>
      )}
    </div>
  );
}
