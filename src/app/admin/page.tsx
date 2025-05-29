'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { FirestoreExample } from '@/components/firestore-example';
import { Button } from '@/components/ui/button';

export default function AdminPage() {
  const { user, loading, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [loading, user, router]);

  if (loading) {
    return (
      <main className="min-h-screen py-20">
        <div className="container mx-auto px-4">
          <p>読み込み中...</p>
        </div>
      </main>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <main className="min-h-screen py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <div className="text-center bg-background/80 p-6 rounded-lg backdrop-blur-sm">
              <h1 className="text-4xl font-bold mb-4">管理画面</h1>
              <p className="text-xl text-foreground">
                Cloud Firestoreにデータを追加・取得する管理機能です
              </p>
            </div>
            <Button variant="outline" onClick={logout}>
              ログアウト
            </Button>
          </div>

          <FirestoreExample />
        </div>
      </div>
    </main>
  );
} 