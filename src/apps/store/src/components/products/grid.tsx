import { ProductCard } from "@/components/products/card"

export function ProductGrid({
  products,
}: {
  products: { title: string; description: string; price: number }[]
}) {
  return (
    <div className="grid grid-cols-2 gap-3 px-3">
      {products.map((product, idx) => (
        <ProductCard key={idx} product={product} />
      ))}
    </div>
  )
}
