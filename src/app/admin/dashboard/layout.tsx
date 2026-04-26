import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import AdminSidebar from '@/components/dashboard/AdminSidebar';
export default async function AdminDashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  if (!session) redirect('/admin/login');
  if (session.user.role !== 'admin') redirect('/admin/login');
  return (
    <div className="dashboard-wrap">
      <AdminSidebar user={session.user} basePath="/admin/dashboard" />
      <main className="dashboard-main">{children}</main>
    </div>
  );
}
