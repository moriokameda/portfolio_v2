import { useState, useEffect } from 'react';
import { User, signInWithEmailAndPassword, signOut, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { useRouter } from 'next/navigation';

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
    try {
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
    } catch (error) {
      throw error;
    }
  };

  const loginWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      // 日本語でログインUIを表示
      auth.languageCode = 'ja';
      // 特定のドメインのみを許可（オプション）
      provider.setCustomParameters({
        hd: 'your-domain.com' // 許可するドメインを指定
      });
      const result = await signInWithPopup(auth, provider);
      // セッションクッキーを設定
      const idToken = await result.user.getIdToken();
      // セッションクッキーを設定するAPIエンドポイントを呼び出す
      await fetch('/api/auth/session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token: idToken }),
      });
      router.push('/admin');
    } catch (error) {
      console.error('Google login error:', error);
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
      router.push('/');
    } catch (error) {
      console.error('Logout error:', error);
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