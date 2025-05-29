import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const session = request.cookies.get('session');

  // /admin で始まるパスの場合のみチェック
  if (request.nextUrl.pathname.startsWith('/admin')) {
    if (!session) {
      // セッションがない場合はログインページにリダイレクト
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
}; 