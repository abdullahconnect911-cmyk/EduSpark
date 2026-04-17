import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(8),
  phone: z.string().min(5),
  nationality: z.string().optional(),
  dateOfBirth: z.string().optional(),
  country: z.string().optional(),
  highestEducation: z.string().optional(),
  gpa: z.string().optional(),
  englishProficiency: z.string().optional(),
  preferredCountry: z.string().optional(),
  preferredCourse: z.string().optional(),
  budget: z.string().optional(),
  intake: z.string().optional(),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = schema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: 'Invalid data provided.' }, { status: 400 });
    }

    const data = parsed.data;

    if (!process.env.DATABASE_URL) {
      return NextResponse.json({ error: 'Database not configured. Please set DATABASE_URL.' }, { status: 503 });
    }

    const { db } = await import('@/db');
    const { users, studentProfiles } = await import('@/db/schema');
    const { eq } = await import('drizzle-orm');
    const bcrypt = await import('bcryptjs');

    // Check if email already exists
    const [existing] = await db.select({ id: users.id }).from(users).where(eq(users.email, data.email)).limit(1);
    if (existing) {
      return NextResponse.json({ error: 'An account with this email already exists.' }, { status: 409 });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(data.password, 12);

    // Create user
    const [user] = await db.insert(users).values({
      name: data.name,
      email: data.email,
      password: hashedPassword,
      phone: data.phone,
      country: data.country,
      role: 'student',
      isActive: true,
      onboardingComplete: false,
    }).returning({ id: users.id });

    // Create student profile
    await db.insert(studentProfiles).values({
      userId: user.id,
      nationality: data.nationality,
      dateOfBirth: data.dateOfBirth,
      highestEducation: data.highestEducation,
      gpa: data.gpa,
      englishProficiency: data.englishProficiency,
      preferredCountry: data.preferredCountry,
      preferredCourse: data.preferredCourse,
      budget: data.budget,
      intake: data.intake,
    });

    // Send welcome email
    if (process.env.RESEND_API_KEY) {
      try {
        const { Resend } = await import('resend');
        const resend = new Resend(process.env.RESEND_API_KEY);
        const from = process.env.RESEND_FROM_EMAIL || 'EduSpark <noreply@eduspark.com.bd>';
        const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

        await resend.emails.send({
          from,
          to: data.email,
          subject: `Welcome to EduSpark, ${data.name.split(' ')[0]}! 🎓`,
          html: `
            <div style="font-family:Poppins,sans-serif;max-width:560px;margin:0 auto">
              <div style="background:linear-gradient(135deg,#0b3d91,#1a52b3);padding:40px 32px;border-radius:16px 16px 0 0;text-align:center">
                <div style="width:60px;height:60px;background:linear-gradient(135deg,#0b3d91,#ff7a00);border-radius:14px;display:inline-flex;align-items:center;justify-content:center;font-size:1.6rem;font-weight:900;color:#fff;margin-bottom:16px">E</div>
                <h1 style="color:#fff;font-size:1.5rem;margin:0">Welcome to EduSpark!</h1>
                <p style="color:rgba(255,255,255,0.7);margin:8px 0 0;font-size:0.9rem">International Study</p>
              </div>
              <div style="background:#fff;padding:36px 32px;border:1px solid #dde5f5;border-top:none">
                <h2 style="color:#0b3d91;margin-bottom:12px;font-size:1.3rem">Hi ${data.name.split(' ')[0]}! 👋</h2>
                <p style="color:#6b7a99;line-height:1.75;margin-bottom:20px">Your EduSpark account has been successfully created. You're one step closer to your global education dream!</p>
                <div style="background:#f5f8fe;border-radius:12px;padding:20px;margin:20px 0;border-left:4px solid #ff7a00">
                  <p style="color:#1a2644;font-weight:700;margin:0 0 12px;font-size:0.9rem">🎯 Your Profile Summary</p>
                  ${data.preferredCountry ? `<p style="color:#6b7a99;margin:0 0 6px;font-size:0.87rem">Interested in: <strong style="color:#0b3d91">${data.preferredCountry}</strong></p>` : ''}
                  ${data.preferredCourse ? `<p style="color:#6b7a99;margin:0 0 6px;font-size:0.87rem">Course: <strong style="color:#0b3d91">${data.preferredCourse}</strong></p>` : ''}
                  ${data.intake ? `<p style="color:#6b7a99;margin:0;font-size:0.87rem">Target Intake: <strong style="color:#0b3d91">${data.intake}</strong></p>` : ''}
                </div>
                <p style="color:#6b7a99;line-height:1.75;margin-bottom:24px">Our expert counselor will reach out to you within <strong style="color:#0b3d91">24 hours</strong> to discuss your personalized study plan.</p>
                <div style="text-align:center">
                  <a href="${appUrl}/dashboard/student" style="background:#ff7a00;color:#fff;padding:14px 32px;border-radius:12px;text-decoration:none;font-weight:700;font-size:0.95rem;display:inline-block">
                    Go to My Dashboard →
                  </a>
                </div>
              </div>
              <div style="background:#f5f8fe;padding:20px 32px;text-align:center;border-radius:0 0 16px 16px;font-size:0.78rem;color:#6b7a99">
                Need help? <a href="${appUrl}/contact" style="color:#0b3d91">Contact us</a> or WhatsApp us anytime.<br/>
                © ${new Date().getFullYear()} EduSpark International Study
              </div>
            </div>
          `,
        });

        // Notify admin
        await resend.emails.send({
          from,
          to: 'info@eduspark.com.bd',
          subject: `🆕 New Student Registration: ${data.name}`,
          html: `<h2>New student registered</h2><p><b>Name:</b> ${data.name}</p><p><b>Email:</b> ${data.email}</p><p><b>Phone:</b> ${data.phone}</p><p><b>Country:</b> ${data.preferredCountry || 'Not specified'}</p><p><b>Course:</b> ${data.preferredCourse || 'Not specified'}</p><p><b>Intake:</b> ${data.intake || 'Not specified'}</p>`,
        });
      } catch (emailErr) {
        console.error('Email send error:', emailErr);
        // Don't fail registration if email fails
      }
    }

    return NextResponse.json({ success: true, userId: user.id });
  } catch (error: any) {
    console.error('Registration error:', error);
    return NextResponse.json({ error: 'Registration failed. Please try again.' }, { status: 500 });
  }
}
