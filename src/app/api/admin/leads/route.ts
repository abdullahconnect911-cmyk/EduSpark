import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/auth';

export async function GET() {
  const session = await auth();
  if (!session || session.user.role !== 'admin') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    if (!process.env.DATABASE_URL) {
      return NextResponse.json({ leads: [], message: 'Database not configured' });
    }

    const { db } = await import('@/db');
    const { leads } = await import('@/db/schema');

    const allLeads = await db.select().from(leads).orderBy(leads.createdAt);
    return NextResponse.json({ leads: allLeads });
  } catch (error) {
    console.error('Leads API error:', error);
    return NextResponse.json({ error: 'Failed to fetch leads' }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  const session = await auth();
  if (!session || session.user.role !== 'admin') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { leadId, status } = await req.json();
    if (!leadId) return NextResponse.json({ error: 'leadId required' }, { status: 400 });

    if (!process.env.DATABASE_URL) {
      return NextResponse.json({ success: true, message: 'Mock update (no DB)' });
    }

    const { db } = await import('@/db');
    const { leads } = await import('@/db/schema');
    const { eq } = await import('drizzle-orm');

    await db.update(leads).set({ status, updatedAt: new Date() }).where(eq(leads.id, leadId));
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Leads PATCH error:', error);
    return NextResponse.json({ error: 'Update failed' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session || session.user.role !== 'admin') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { name, email, phone, country, interestedIn, message } = body;
    if (!name || !email) return NextResponse.json({ error: 'name and email required' }, { status: 400 });

    if (!process.env.DATABASE_URL) {
      return NextResponse.json({ success: true, message: 'Mock create (no DB)' });
    }

    const { db } = await import('@/db');
    const { leads } = await import('@/db/schema');

    const [lead] = await db.insert(leads).values({
      name, email, phone, country, interestedIn, message, source: 'manual', status: 'new',
    }).returning({ id: leads.id });

    return NextResponse.json({ success: true, leadId: lead.id });
  } catch (error) {
    console.error('Leads POST error:', error);
    return NextResponse.json({ error: 'Failed to create lead' }, { status: 500 });
  }
}
