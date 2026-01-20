import { z } from 'zod';
import { createProductSchema, signInSchema } from '@/lib/validators';

export type Product = z.infer<typeof createProductSchema> & {
  id: string;
  rating: string;
  createdAt: Date;
};

export type SignIn = z.infer<typeof signInSchema>;
