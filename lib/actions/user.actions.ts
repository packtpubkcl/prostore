'use server';

import { AuthError } from 'next-auth';
import { signIn, signOut } from '@/auth';
import { signInSchema } from '../validators';
import { z } from 'zod';
import { isRedirectError } from 'next/dist/client/components/redirect-error';

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
