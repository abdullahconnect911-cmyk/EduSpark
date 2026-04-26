import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { z } from 'zod';

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsed = loginSchema.safeParse(credentials);
        if (!parsed.success) return null;
        const { email, password } = parsed.data;

        // ENV-based admin credentials (no DB needed)
        const adminEmail    = process.env.ADMIN_EMAIL    || 'admin@eduspark.com';
        const adminPassword = process.env.ADMIN_PASSWORD || 'admin123456';
        const adminName     = process.env.ADMIN_NAME     || 'Abdullah Al Mamun';
        if (email === adminEmail && password === adminPassword) {
          return { id: 'admin-1', name: adminName, email: adminEmail, role: 'admin' };
        }

        // Demo student credentials (no DB needed)
        const demoEmail    = process.env.DEMO_STUDENT_EMAIL    || 'student@eduspark.com';
        const demoPassword = process.env.DEMO_STUDENT_PASSWORD || 'student123456';
        if (email === demoEmail && password === demoPassword) {
          return { id: 'demo-1', name: 'Rahim Uddin (Demo)', email: demoEmail, role: 'student' };
        }

        // Real DB auth (when DATABASE_URL configured)
        if (!process.env.DATABASE_URL) return null;
        try {
          const { db }    = await import('@/db');
          const { users } = await import('@/db/schema');
          const { eq }    = await import('drizzle-orm');
          const bcrypt    = await import('bcryptjs');
          const [user] = await db.select().from(users).where(eq(users.email, email)).limit(1);
          if (!user || !user.password) return null;
          const ok = await bcrypt.compare(password, user.password);
          if (!ok || !user.isActive) return null;
          return { id: user.id, name: user.name, email: user.email, role: user.role, image: user.avatar };
        } catch { return null; }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) { token.id = user.id; token.role = (user as any).role; }
      return token;
    },
    async session({ session, token }) {
      if (token) { session.user.id = token.id as string; session.user.role = token.role as string; }
      return session;
    },
  },
  pages: { signIn: '/auth/login', error: '/auth/error' },
  session: { strategy: 'jwt' },
});
