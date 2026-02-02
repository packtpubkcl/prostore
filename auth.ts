import NextAuth from 'next-auth';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { prisma } from '@/lib/db/prisma';
import CredentialsProvider from 'next-auth/providers/credentials';
import { compareSync } from 'bcrypt-ts-edge';
import { signInSchema } from '@/lib/validators';
import { config as authConfig } from './auth.config';

export const config = {
  ...authConfig,
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (credentials === null) return null;

        // Find user in database
        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email as string,
          },
        });

        // Check if user exists and password is correct
        if (user && user.password) {
          const isMatch = compareSync(credentials.password as string, user.password);

          // If password matches, return user
          if (isMatch) {
            return {
              id: user.id,
              name: user.name,
              email: user.email,
              role: user.role,
            };
          }
        }
        // If user does not exist or password does not match return null
        return null;
      },
    }),
  ],
  callbacks: {
    ...authConfig.callbacks,
    async jwt({ token, user, trigger, session }: any) {
      const res = await authConfig.callbacks.jwt({ token, user, trigger, session });

      if (user && user.name === 'NO_NAME') {
        // Update database to reflect the token name
        await prisma.user.update({
          where: { id: user.id },
          data: { name: res.name },
        });
      }

      return res;
    },
  },
};

export const { handlers, signIn, signOut, auth } = NextAuth(config);
