'use server';

import { cookies } from 'next/headers';
import { CartItem } from '@/types';
import { convertToPlainObject, formatErrors } from '../utils';
import { auth } from '@/auth';
import { prisma } from '@/lib/db/prisma';
import { cartItemSchema, insertCartSchema } from '../validators';
import { revalidatePath } from 'next/cache';

// Calculate cart prices
const calcPrice = (items: CartItem[]) => {
  const itemsPrice = items.reduce((acc, item) => acc + Number(item.price) * item.qty, 0),
    shippingPrice = itemsPrice > 100 ? 0 : 10,
    taxPrice = 0.15 * itemsPrice,
    totalPrice = itemsPrice + shippingPrice + taxPrice;

  return {
    itemsPrice: itemsPrice.toFixed(2),
    shippingPrice: shippingPrice.toFixed(2),
    taxPrice: taxPrice.toFixed(2),
    totalPrice: totalPrice.toFixed(2),
  };
};

export async function addItemToCart(data: CartItem) {
  try {
    // Check for session cart cookie
    const cookieStore = await cookies();
    let sessionCartId = cookieStore.get('sessionCartId')?.value;

    if (!sessionCartId) {
      sessionCartId = crypto.randomUUID();
      cookieStore.set('sessionCartId', sessionCartId);
    }

    // Get session and user ID
    const session = await auth();
    const userId = session?.user?.id ? (session.user.id as string) : undefined;

    // Get cart
    const cart = await getMyCart();

    // Parse and validate item
    const item = cartItemSchema.parse(data);

    // Find product in database
    const product = await prisma.product.findFirst({
      where: { id: item.productId },
    });
    if (!product) throw new Error('Product not found');

    if (!cart) {
      // Check stock
      if (product.stock < item.qty) throw new Error('Not enough stock');
      // Create new cart object
      const newCart = insertCartSchema.parse({
        items: [item],
        sessionCartId: sessionCartId,
        userId: userId,
        ...calcPrice([item]),
      });

      // Add to database
      await prisma.cart.create({
        data: newCart,
      });

      // Revalidate product page
      revalidatePath(`/product/${product.slug}`);

      return {
        success: true,
        message: 'Item added to cart',
      };
    } else {
      // Check if item is already in cart
      const existItem = (cart.items as CartItem[]).find(x => x.productId === item.productId);

      if (existItem) {
        // Check stock
        if (product.stock < existItem.qty + 1) {
          throw new Error('Not enough stock');
        }

        // Increase quantity
        (cart.items as CartItem[]).find(x => x.productId === item.productId)!.qty =
          existItem.qty + 1;
      } else {
        // Check stock
        if (product.stock < 1) throw new Error('Not enough stock');

        // Add item to cart.items
        cart.items.push(item);
      }

      // Save to database
      await prisma.cart.update({
        where: { id: cart.id },
        data: {
          items: cart.items as any,
          ...calcPrice(cart.items as CartItem[]),
        },
      });

      revalidatePath(`/product/${product.slug}`);

      return {
        success: true,
        message: `${product.name} ${existItem ? 'updated in' : 'added to'} cart`,
      };
    }
  } catch (error) {
    return {
      success: false,
      message: formatErrors(error),
    };
  }
}

export async function getMyCart() {
  // Check for session cart cookie
  const cookieStore = await cookies();
  const sessionCartId = cookieStore.get('sessionCartId')?.value;

  if (!sessionCartId) return undefined;

  // Get session and user ID
  const session = await auth();
  const userId = session?.user?.id ? (session.user.id as string) : undefined;

  // Get user cart from database
  const cart = await prisma.cart.findFirst({
    where: userId ? { userId: userId } : { sessionCartId: sessionCartId },
  });

  if (!cart) return undefined;

  // Convert decimals to strings
  return convertToPlainObject({
    ...cart,
    items: cart.items as CartItem[],
    itemsPrice: cart.itemsPrice.toString(),
    totalPrice: cart.totalPrice.toString(),
    shippingPrice: cart.shippingPrice.toString(),
    taxPrice: cart.taxPrice.toString(),
  });
}
