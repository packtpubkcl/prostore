import { z } from 'zod';
import { createProductSchema } from '@/lib/validators';

export type Product = z.infer<typeof createProductSchema> & {
  id: string;
  rating: string;
  createdAt: Date;
};
