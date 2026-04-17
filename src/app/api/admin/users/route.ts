import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/auth';

export async function GET(req: NextRequest) {
  const session = await auth();
  if (!session || session.user.role !== 'admin') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    if (!process.env.DATABASE_URL) {
      return NextResponse.json({ users: [], message: 'Database not configured' });
    }

    const { db } = await import('@/db');
    const { users, studentProfiles } = await import('@/db/schema');
    const { eq } = await import('drizzle-orm');

    const allUsers = await db
      .select({
        id: users.id,
        name: users.name,
        email: users.email,
        phone: users.phone,
        role: users.role,
        country: users.country,
        isActive: users.isActive,
        createdAt: users.createdAt,
        preferredCountry: studentProfiles.preferredCountry,
        preferredCourse: studentProfiles.preferredCourse,
      })
      .from(users)
      .leftJoin(studentProfiles, eq(users.id, studentProfiles.userId))
      .where(eq(users.role, 'student'));

    return NextResponse.json({ users: allUsers });
  } catch (error) {
    console.error('Users API error:', error);
    return NextResponse.json({ error: 'Failed to fetch users' }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  const session = await auth();
  if (!session || session.user.role !== 'admin') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { userId, isActive } = await req.json();
    if (!userId) return NextResponse.json({ error: 'userId required' }, { status: 400 });

    if (!process.env.DATABASE_URL) {
      return NextResponse.json({ success: true, message: 'Mock update (no DB)' });
    }

    const { db } = await import('@/db');
    const { users } = await import('@/db/schema');
    const { eq } = await import('drizzle-orm');

    await db.update(users).set({ isActive, updatedAt: new Date() }).where(eq(users.id, userId));
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Users PATCH error:', error);
    return NextResponse.json({ error: 'Update failed' }, { status: 500 });
  }
}
