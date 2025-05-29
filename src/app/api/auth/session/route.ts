import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { auth as adminAuth } from 'firebase-admin';
import { cookies } from 'next/headers';
import { initAdmin } from '@/lib/firebase-admin';

// Firebase Adminの初期化
initAdmin();

export async function POST(request: NextRequest) {
  try {
    const { token } = await request.json();

    // トークンを検証
    await adminAuth().verifyIdToken(token);

    // セッションCookieを作成（有効期限は5日）
    const expiresIn = 60 * 60 * 24 * 5 * 1000; // 5日
    const sessionCookie = await adminAuth().createSessionCookie(token, { expiresIn });

    // Cookieを設定
    const cookieStore = cookies();
    await cookieStore.set('session', sessionCookie, {
      maxAge: expiresIn,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
    });

    return NextResponse.json({ status: 'success' });
  } catch (error) {
    console.error('Session creation error:', error);
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
}

export async function DELETE() {
  try {
    // セッションCookieを削除
    const cookieStore = cookies();
    await cookieStore.delete('session');
    return NextResponse.json({ status: 'success' });
  } catch (error) {
    console.error('Session deletion error:', error);
    return NextResponse.json({ error: 'Failed to delete session' }, { status: 500 });
  }
} 