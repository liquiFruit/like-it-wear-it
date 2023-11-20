import Image from "next/image"

import { getAllProductsInStock } from "database/src/api/products/queries"
import { Button } from "ui/src/ui/button"

export async function Hero() {
  const [product] = await getAllProductsInStock()

  return (
    <section className="border-foreground/10 bg-background m-1 border p-3 drop-shadow-xl">
      <div className="relative aspect-square">
        <Image src={product.images[0]} alt="" fill className="object-cover" />
      </div>

      <div className="my-3 flex flex-col items-center ">
        <p className="font-serif text-2xl font-bold">
          Pre-<span className="text-primary">loved</span> Clothes
        </p>

        <p className="font-serif text-2xl font-bold">
          at <span className="text-primary">lovable</span> Prices
        </p>

        <Button className="mt-4">Explore Collection</Button>
      </div>
    </section>
  )
}
