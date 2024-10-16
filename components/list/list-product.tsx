import { GridTileImage } from 'components/grid/tile'
import { ProductProvider } from 'components/product/product-context'
import { ProductDescription } from 'components/product/product-description'
import { Product } from 'lib/shopify/types'
import { Suspense } from 'react'

export default function ListProduct({ product }: { product: Product }) {
  return (
    <ProductProvider>
      <div className="flex flex-col gap-8 md:flex-row md:gap-12">
        <div className="w-full md:w-1/2">
          <div className="relative aspect-square">
            <GridTileImage
              src={product.featuredImage?.url}
              alt={product.title}
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
            />
          </div>
        </div>
        <div className="w-full md:w-1/2">
          <Suspense fallback={<div>Loading...</div>}>
            <ProductDescription product={product} />
          </Suspense>
        </div>
      </div>
    </ProductProvider>
  )
}