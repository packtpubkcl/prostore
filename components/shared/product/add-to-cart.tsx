'use client';
import { CartItem } from '@/types';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { addItemToCart } from '@/lib/actions/cart.actions';

const AddToCart = ({ item }: { item: CartItem }) => {
  const router = useRouter();
  const handleAddToCart = async () => {
    const res = await addItemToCart(item);

    if (!res.success) {
      toast.error(res.message);
      return;
    }

    toast.success('Success!', {
      description: `${item.name} added to cart`,
      action: {
        label: 'Go To Cart',
        onClick: () => router.push('/cart'),
      },
      classNames: {
        actionButton: '!bg-green-600 hover:!bg-green-500 !text-white',
      },
    });
    return;
  };
  return (
    <Button className="w-full" type="button" onClick={handleAddToCart}>
      <Plus /> Add to Cart
    </Button>
  );
};

export default AddToCart;
