import { cn } from '@/lib/utils';

const ProductPrice = ({ value, className }: { value: number; className?: string }) => {
  // Asegurar que el valor tenga dos decimales
  const stringValue = value.toFixed(2);
  // Dividir en parte entera y decimal
  const [intValue, floatValue] = stringValue.split('.');

  return (
    <p className={cn('text-2xl', className)}>
      <span className="align-super text-xs">$</span>
      {intValue}
      <span className="align-super text-xs">.{floatValue}</span>
    </p>
  );
};

export default ProductPrice;
