import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import StudentSidebar from '@/components/dashboard/StudentSidebar';

export default async function StudentDashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();

  if (!session) redirect('/auth/login');
  if (session.user.role === 'admin') redirect('/dashboard/admin');

  return (
    <div className="dashboard-wrap">
      <StudentSidebar user={session.user} notifCount={2} />
      <main className="dashboard-main">
        {children}
      </main>
    </div>
  );
}
