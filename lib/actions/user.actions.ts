'use server';

import { AuthError } from 'next-auth';
import { signIn, signOut } from '@/auth';
import { signInSchema, signUpSchema } from '../validators';
import { isRedirectError } from 'next/dist/client/components/redirect-error';
import { prisma } from '@/lib/db/prisma';
import { hashSync } from 'bcrypt-ts-edge';

// Sign in user with credentials
export async function signInWithCredentials(prevState: unknown, formData: FormData) {
  try {
    const data = signInSchema.parse(Object.fromEntries(formData));
    await signIn('credentials', data);

    return {
      success: true,
      message: 'Signed in successfully',
    };
  } catch (error) {
    if (isRedirectError(error)) {
      throw error;
    }
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return {
            success: false,
            message: 'Invalid email or password',
          };
        default:
          return {
            success: false,
            message: 'Something went wrong',
          };
      }
    }
    throw error;
  }
}

// Sign out user
export async function signOutUser() {
  await signOut();
}

export async function signUp(prevState: unknown, formData: FormData) {
  try {
    const user = signUpSchema.parse(Object.fromEntries(formData));
    user.password = hashSync(user.password, 10);
    await prisma.user.create({
      data: {
        name: user.name,
        email: user.email,
        password: user.password,
      },
    });
    await signIn('credentials', { email: user.email, password: user.confirmPassword });
    return {
      success: true,
      message: 'User created successfully',
    };
  } catch (e) {
    if (isRedirectError(e)) throw e;
    return {
      success: false,
      message: 'Failed to sign up',
    };
  }
}
