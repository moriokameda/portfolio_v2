'use client';

import { useState, useRef, useLayoutEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import { Textarea } from './ui/textarea';
import type { Project } from '@/types/project';

// メッセージの型定義
type Message = {
  role: 'user' | 'assistant' | 'system';
  content: string;
};

// APIレスポンスの型定義
type ApiResponse = {
  type: 'message' | 'data' | 'showProjects';
  message?: string;
  data?: Project;
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
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // メッセージが追加されたら自動スクロール
  useLayoutEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }); // 依存配列を空にして、レイアウトの更新時に常に実行されるようにする

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

  return (
    <div className="space-y-8">
      {/* チャットインターフェース */}
      <Card className="bg-background/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle>プロジェクト登録アシスタント</CardTitle>
          <CardDescription>プロジェクトの情報を会話形式で入力できます。</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* メッセージ表示エリア */}
            <div className="h-[400px] overflow-y-auto space-y-4 p-4 border rounded-lg bg-background/50">
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
    </div>
  );
}
