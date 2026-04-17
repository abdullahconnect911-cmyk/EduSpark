import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, country, interested, level, message } = body;
    if (!name || !email || !phone) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Save to DB (when configured)
    try {
      const { db } = await import('@/db');
      const { leads } = await import('@/db/schema');
      await db.insert(leads).values({ name, email, phone, country, interestedIn: interested ? `${interested} - ${level}` : level, message, source: 'website', status: 'new' });
    } catch { /* DB not configured yet */ }

    // Send emails
    if (process.env.RESEND_API_KEY) {
      const resend = new Resend(process.env.RESEND_API_KEY);
      const from = process.env.RESEND_FROM_EMAIL || 'EduSpark <noreply@eduspark.com.bd>';
      await resend.emails.send({ from, to: 'info@eduspark.com.bd', subject: `New Lead: ${name}`, html: `<p><b>Name:</b> ${name}</p><p><b>Email:</b> ${email}</p><p><b>Phone:</b> ${phone}</p><p><b>Interested in:</b> ${interested}</p><p><b>Level:</b> ${level}</p><p><b>Message:</b> ${message}</p>` });
      await resend.emails.send({ from, to: email, subject: 'We received your message – EduSpark', html: `<h2>Hi ${name}! We received your inquiry and will contact you within 24 hours.</h2>` });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
