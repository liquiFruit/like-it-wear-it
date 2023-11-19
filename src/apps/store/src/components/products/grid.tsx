import Link from "next/link"

import { schema } from "database"

import { ProductCard } from "@/components/products/card"

export function ProductGrid({
  products,
}: {
  products: schema.Products.Select[]
}) {
  return (
    <div className="grid grid-cols-2 gap-3 px-3">
      {products.map((product) => (
        <Link href={`/products/${product.id}`} key={product.id}>
          <ProductCard product={product} />
        </Link>
      ))}
    </div>
  )
}
