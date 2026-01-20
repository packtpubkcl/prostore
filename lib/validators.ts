import { z } from 'zod';
import { formatNumberWithDecimal } from '@/lib/utils';

const currency = z
  .string()
  .refine(price => /^\d+(\.\d{2})?$/.test(formatNumberWithDecimal(Number(price))), {
    message: 'Price must be a valid number with 2 decimals',
  });

//Schema for inserting products
export const createProductSchema = z.object({
  name: z.string().min(3, { message: 'Name must be at least 3 characters' }),
  slug: z.string().min(3, { message: 'Slug must be at least 3 characters' }),
  category: z.string().min(3, { message: 'Category must be at least 3 characters' }),
  brand: z.string().min(3, { message: 'Brand must be at least 3 characters' }),
  description: z.string().min(3, { message: 'Description must be at least 3 characters' }),
  stock: z.coerce.number().min(0),
  images: z.array(z.string()).min(1, { message: 'You must provide at least one image' }),
  isFeatured: z.boolean(),
  banner: z.string().nullable(),
  price: currency,
});

//Schema for user sign-in
export const signInSchema = z.object({
  email: z.email({ message: 'Invalid email address' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
});
