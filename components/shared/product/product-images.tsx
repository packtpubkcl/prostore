'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

const ProductImages = (props: { images: string[] }) => {
  const { images } = props;
  const [currentImage, setCurrentImage] = useState(0);
  return (
    <div className="space-y-4">
      <Image
        src={images[currentImage]}
        alt="product image"
        width={1000}
        height={1000}
        className="min-h-[300px] object-cover object-center"
        sizes="100vw"
        style={{
          width: '100%',
          height: 'auto',
        }}
      />
      <div className="flex">
        {images.map((image, index) => (
          <Image
            key={index}
            src={image}
            alt="product image"
            width={100}
            height={100}
            onClick={() => setCurrentImage(index)}
            className={cn('mr-2 cursor-pointer border hover:border-blue-300', {
              'border-2 border-blue-500': currentImage === index,
            })}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductImages;
