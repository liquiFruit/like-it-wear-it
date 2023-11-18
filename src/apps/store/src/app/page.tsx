import { db, schema } from "database"
import { Squiggle } from "ui/src/svgs"

import { Hero } from "@/components/layout/hero"
import { ProductGrid } from "@/components/products/grid"

export default async function Home() {
  const products = await db.select().from(schema.Products.products)

  return (
    <main>
      <Hero />

      <section>
        <h2 className="relative my-12 text-center font-serif text-xl font-black">
          Just In
          <Squiggle className="stroke-accent/70 absolute left-1/2 top-1/2 -z-10 h-20 w-40 -translate-x-1/2 -translate-y-1/2" />
        </h2>

        <ProductGrid products={products} />
      </section>
    </main>
  )
}
