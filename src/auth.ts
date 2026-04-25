import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { z } from 'zod';

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export const { handlers, auth, signIn, signOut } = NextAuth({
  // NextAuth v5 uses AUTH_SECRET; fallback to NEXTAUTH_SECRET for compatibility
  secret: process.env.AUTH_SECRET ?? process.env.NEXTAUTH_SECRET,
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsed = loginSchema.safeParse(credentials);
        if (!parsed.success) return null;

        const { email, password } = parsed.data;

        // Lazy-import DB to avoid build-time errors when DATABASE_URL is not set
        if (!process.env.DATABASE_URL) return null;

        try {
          const { db } = await import('@/db');
          const { users } = await import('@/db/schema');
          const { eq } = await import('drizzle-orm');
          const bcrypt = await import('bcryptjs');

          const [user] = await db.select().from(users).where(eq(users.email, email)).limit(1);
          if (!user || !user.password) return null;

          const passwordMatch = await bcrypt.compare(password, user.password);
          if (!passwordMatch || !user.isActive) return null;

          return { id: user.id, name: user.name, email: user.email, role: user.role, image: user.avatar };
        } catch {
          return null;
        }
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
