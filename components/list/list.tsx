import ListProduct from 'components/list/list-product'
import { getCollectionProducts } from 'lib/shopify'

export async function List() {
  const products = await getCollectionProducts({
    collection: 'hidden-homepage-featured-items'
  })

  if (!products?.length) return null

  return (
    <ul className="flex flex-col gap-16">
      {products.map((product) => (
        <li key={product.handle}>
          <ListProduct product={product} />
        </li>
      ))}
    </ul>
  )
}