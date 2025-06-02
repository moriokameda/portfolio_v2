import { useState, useEffect } from 'react';
import type { User } from 'firebase/auth';
import {
  signInWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  browserLocalPersistence,
  setPersistence,
} from 'firebase/auth';
import { FirebaseError } from 'firebase/app';
import { auth } from '@/lib/firebase';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const login = async (email: string, password: string) => {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    // セッションクッキーを設定
    const idToken = await userCredential.user.getIdToken();
    // セッションクッキーを設定するAPIエンドポイントを呼び出す
    await fetch('/api/auth/session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token: idToken }),
    });
    router.push('/admin');
  };

  const loginWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      // 日本語でログインUIを表示
      auth.languageCode = 'ja';

      // ログインの永続性を設定
      await setPersistence(auth, browserLocalPersistence);

      const result = await signInWithPopup(auth, provider);

      if (result.user) {
        toast.success('ログインしました');
        router.push('/admin');
      }
    } catch (error: unknown) {
      console.error('Google login error:', error);

      // エラーメッセージをユーザーフレンドリーに表示
      if (error instanceof FirebaseError) {
        if (error.code === 'auth/popup-closed-by-user') {
          toast.error('ログインがキャンセルされました');
        } else if (error.code === 'auth/cancelled-popup-request') {
          toast.error('ログインウィンドウが閉じられました');
        } else {
          toast.error('ログインに失敗しました。もう一度お試しください');
        }
      } else {
        toast.error('ログインに失敗しました。もう一度お試しください');
      }

      throw error;
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      // セッションCookieを削除
      await fetch('/api/auth/session', {
        method: 'DELETE',
      });
      toast.success('ログアウトしました');
      router.push('/');
    } catch (error) {
      console.error('Logout error:', error);
      toast.error('ログアウトに失敗しました');
      throw error;
    }
  };

  return {
    user,
    loading,
    login,
    loginWithGoogle,
    logout,
  };
};
