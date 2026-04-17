import { auth } from '@/auth';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export default auth((req) => {
  const { nextUrl, auth: session } = req as any;
  const isLoggedIn = !!session;
  const role = session?.user?.role;
  const path = nextUrl.pathname;

  // Protect dashboard routes
  if (path.startsWith('/dashboard')) {
    if (!isLoggedIn) {
      return NextResponse.redirect(new URL(`/auth/login?callbackUrl=${encodeURIComponent(path)}`, nextUrl));
    }

    // Admin-only routes
    if (path.startsWith('/dashboard/admin') && role !== 'admin') {
      return NextResponse.redirect(new URL('/dashboard/student', nextUrl));
    }

    // Student-only routes
    if (path.startsWith('/dashboard/student') && role === 'admin') {
      return NextResponse.redirect(new URL('/dashboard/admin', nextUrl));
    }
  }

  // Redirect logged-in users away from auth pages
  if (isLoggedIn && (path.startsWith('/auth/login') || path.startsWith('/auth/register'))) {
    if (role === 'admin') return NextResponse.redirect(new URL('/dashboard/admin', nextUrl));
    return NextResponse.redirect(new URL('/dashboard/student', nextUrl));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ['/dashboard/:path*', '/auth/login', '/auth/register'],
};
