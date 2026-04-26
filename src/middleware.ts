import { auth } from '@/auth';
import { NextResponse } from 'next/server';

export default auth((req) => {
  const { nextUrl, auth: session } = req as any;
  const isLoggedIn = !!session;
  const role = session?.user?.role;
  const path = nextUrl.pathname;

  // /admin/dashboard/* — admin only
  if (path.startsWith('/admin/dashboard')) {
    if (!isLoggedIn) return NextResponse.redirect(new URL(`/admin/login?callbackUrl=${encodeURIComponent(path)}`, nextUrl));
    if (role !== 'admin') return NextResponse.redirect(new URL('/admin/login', nextUrl));
  }

  // /admin/login — redirect away if already logged in as admin
  if (path === '/admin/login' && isLoggedIn && role === 'admin') {
    return NextResponse.redirect(new URL('/admin/dashboard', nextUrl));
  }

  // /dashboard/student/* — student only
  if (path.startsWith('/dashboard/student')) {
    if (!isLoggedIn) return NextResponse.redirect(new URL(`/auth/login?callbackUrl=${encodeURIComponent(path)}`, nextUrl));
    if (role === 'admin') return NextResponse.redirect(new URL('/admin/dashboard', nextUrl));
  }

  // /dashboard/admin/* — legacy: redirect to /admin/dashboard
  if (path.startsWith('/dashboard/admin')) {
    if (!isLoggedIn) return NextResponse.redirect(new URL('/admin/login', nextUrl));
    if (role === 'admin') return NextResponse.redirect(new URL(path.replace('/dashboard/admin', '/admin/dashboard'), nextUrl));
  }

  // Student auth pages — redirect if already logged in
  if (isLoggedIn && (path === '/auth/login' || path === '/auth/register')) {
    if (role === 'admin') return NextResponse.redirect(new URL('/admin/dashboard', nextUrl));
    return NextResponse.redirect(new URL('/dashboard/student', nextUrl));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ['/admin/:path*', '/dashboard/:path*', '/auth/login', '/auth/register'],
};
