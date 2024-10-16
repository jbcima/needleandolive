import { ProductImage } from 'components/image/product-image'
import { ProductProvider } from 'components/product/product-context'
import { ProductDescription } from 'components/product/product-description'
import { Product } from 'lib/shopify/types'
import { Suspense } from 'react'

export default function ListProduct({ product }: { product: Product }) {
  return (
    <ProductProvider>
      <div className="flex flex-col gap-4 w-full max-w-2xl mx-auto">
        <div className="w-full aspect-square relative">
          <ProductImage
            src={product.featuredImage?.url}
            alt={product.title}
            fill
            sizes="(min-width: 1024px) 66vw, 100vw"
          />
        </div>
        <div className="w-full">
          <Suspense fallback={<div>Loading...</div>}>
            <ProductDescription product={product} />
          </Suspense>
        </div>
      </div>
    </ProductProvider>
  )
}