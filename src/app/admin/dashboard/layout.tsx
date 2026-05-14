import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import AdminSidebar from '@/components/dashboard/AdminSidebar';
export default async function AdminDashboardLayout({ children }: { children: React.ReactNode }) {
  try {
    const session = await auth();
    if (!session) redirect('/admin/login');
    if (session.user.role !== 'admin') redirect('/admin/login');
    return (
      <div style={{ display: 'flex', minHeight: '100vh', background: '#0d1117', fontFamily: 'var(--font-body)' }}>
        <AdminSidebar user={session.user} basePath="/admin/dashboard" />
        <main style={{ flex: 1, padding: '32px', overflow: 'auto', background: '#0d1117' }}>{children}</main>
      </div>
    );
  } catch {
    redirect('/admin/login');
  }
}
