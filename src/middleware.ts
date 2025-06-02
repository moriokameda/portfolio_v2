import { NextResponse } from 'next/server';

// クライアントサイドの認証状態を使用するため、ミドルウェアでの認証チェックは不要
export function middleware() {
  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
