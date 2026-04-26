import { auth } from '@/auth';
import { redirect } from 'next/navigation';
export default async function AdminRootPage() {
  const session = await auth();
  if (session?.user?.role === 'admin') redirect('/admin/dashboard');
  redirect('/admin/login');
}
