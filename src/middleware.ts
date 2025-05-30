import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// クライアントサイドの認証状態を使用するため、ミドルウェアでの認証チェックは不要
export function middleware(request: NextRequest) {
  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
