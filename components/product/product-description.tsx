import { AddToCart } from 'components/cart/add-to-cart';
import Price from 'components/price';
import Prose from 'components/prose';
import { Product } from 'lib/shopify/types';
import { VariantSelector } from './variant-selector';

export function ProductDescription({ product }: { product: Product }) {
  const hasVariants = product.variants.length > 1;

  return (
    <>
      <div className="mb-6 flex flex-col">
        <h1 className="mb-2 text-xl font-medium">{product.title}</h1>
        <div className="text-sm">
          <Price
            amount={product.priceRange.maxVariantPrice.amount}
            currencyCode={product.priceRange.maxVariantPrice.currencyCode}
          />
        </div>
      </div>
      {hasVariants ? (
        <VariantSelector 
          product={product}
          options={product.options} 
          variants={product.variants} 
        />
      ) : (
        <AddToCart product={product} />
      )}
      {product.descriptionHtml ? (
        <Prose
          className="mb-6 text-sm leading-tight dark:text-white/[60%]"
          html={product.descriptionHtml}
        />
      ) : null}
    </>
  );
}