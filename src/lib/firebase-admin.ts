import { initializeApp, getApps, cert } from 'firebase-admin/app';

export const initAdmin = () => {
  // 必要な環境変数の存在チェック
  const projectId = process.env.NEXT_PUBLIC_FIREBASE_ADMIN_PROJECT_ID;
  const clientEmail = process.env.NEXT_PUBLIC_FIREBASE_ADMIN_CLIENT_EMAIL;
  const privateKey = process.env.NEXT_PUBLIC_FIREBASE_ADMIN_PRIVATE_KEY;

  if (!projectId || !clientEmail || !privateKey) {
    throw new Error(`Missing Firebase Admin SDK configuration. Please check your environment variables:
FIREBASE_ADMIN_PROJECT_ID: ${projectId ? '✓' : '✗'}
FIREBASE_ADMIN_CLIENT_EMAIL: ${clientEmail ? '✓' : '✗'}
FIREBASE_ADMIN_PRIVATE_KEY: ${privateKey ? '✓' : '✗'}`);
  }

  if (getApps().length === 0) {
    try {
      initializeApp({
        credential: cert({
          projectId,
          clientEmail,
          privateKey: privateKey.replace(/\\n/g, '\n'),
        }),
      });
    } catch (error) {
      console.error('Failed to initialize Firebase Admin:', error);
      throw error;
    }
  }
}; 