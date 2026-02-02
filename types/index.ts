import { z } from 'zod';
import {
  createProductSchema,
  signInSchema,
  insertCartSchema,
  cartItemSchema,
} from '@/lib/validators';

export type Product = z.infer<typeof createProductSchema> & {
  id: string;
  rating: string;
  createdAt: Date;
};

export type SignIn = z.infer<typeof signInSchema>;

export type Cart = z.infer<typeof insertCartSchema>;
export type CartItem = z.infer<typeof cartItemSchema>;
