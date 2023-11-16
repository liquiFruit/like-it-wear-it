import Link from "next/link"

import { ProductCard } from "@/components/products/card"

export function ProductGrid({
  products,
}: {
  products: { title: string; description: string; price: number }[]
}) {
  return (
    <div className="grid grid-cols-2 gap-3 px-3">
      {products.map((product, idx) => (
        <Link href={`/products/${idx}`} key={idx}>
          <ProductCard product={product} />
        </Link>
      ))}
    </div>
  )
}
