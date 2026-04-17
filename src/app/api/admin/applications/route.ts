import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/auth';

export async function GET() {
  const session = await auth();
  if (!session || session.user.role !== 'admin') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    if (!process.env.DATABASE_URL) {
      return NextResponse.json({ applications: [], message: 'Database not configured' });
    }

    const { db } = await import('@/db');
    const { applications, users } = await import('@/db/schema');
    const { eq } = await import('drizzle-orm');

    const allApps = await db
      .select({
        id: applications.id,
        universityName: applications.universityName,
        universityCountry: applications.universityCountry,
        courseName: applications.courseName,
        level: applications.level,
        intake: applications.intake,
        status: applications.status,
        notes: applications.notes,
        adminNotes: applications.adminNotes,
        createdAt: applications.createdAt,
        updatedAt: applications.updatedAt,
        studentName: users.name,
        studentEmail: users.email,
      })
      .from(applications)
      .leftJoin(users, eq(applications.userId, users.id))
      .orderBy(applications.updatedAt);

    return NextResponse.json({ applications: allApps });
  } catch (error) {
    console.error('Applications API error:', error);
    return NextResponse.json({ error: 'Failed to fetch applications' }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  const session = await auth();
  if (!session || session.user.role !== 'admin') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { applicationId, status, adminNotes } = await req.json();
    if (!applicationId) return NextResponse.json({ error: 'applicationId required' }, { status: 400 });

    if (!process.env.DATABASE_URL) {
      return NextResponse.json({ success: true, message: 'Mock update (no DB)' });
    }

    const { db } = await import('@/db');
    const { applications } = await import('@/db/schema');
    const { eq } = await import('drizzle-orm');

    const updates: any = { updatedAt: new Date() };
    if (status) updates.status = status;
    if (adminNotes !== undefined) updates.adminNotes = adminNotes;

    await db.update(applications).set(updates).where(eq(applications.id, applicationId));
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Applications PATCH error:', error);
    return NextResponse.json({ error: 'Update failed' }, { status: 500 });
  }
}
