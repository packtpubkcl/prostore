import React from 'react';
import sampleData from '@/db/sample-data';
import ProductList from '@/components/shared/product/product-list';
const Homepage = () => {
  return (
    <div className="p-1">
      <ProductList data={sampleData.products} title="Latest Products" limite={4} />
    </div>
  );
};

export default Homepage;
