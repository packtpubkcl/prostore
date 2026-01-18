import React from 'react';
import ProductList from '@/components/shared/product/product-list';
import { getLatestProducts } from '@/lib/actions/product.actions';

const Homepage = async () => {
  const latestProducts = await getLatestProducts();
  return (
    <div className="p-1">
      <ProductList data={latestProducts} title="Latest Products" />
    </div>
  );
};

export default Homepage;
