import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import AdminSidebar from '@/components/dashboard/AdminSidebar';

export default async function AdminDashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  if (!session) redirect('/auth/login');
  if (session.user.role !== 'admin') redirect('/dashboard/student');

  return (
    <div className="dashboard-wrap">
      <AdminSidebar user={session.user} />
      <main className="dashboard-main">{children}</main>
    </div>
  );
}
