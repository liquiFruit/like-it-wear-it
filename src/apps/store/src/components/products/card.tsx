import Image from "next/image"

import { schema } from "database"
import { Heart } from "ui/src/svgs"

export function ProductCard({
  product: { name, description, price, images },
}: {
  product: schema.Products.Select
}) {
  return (
    <div className="flex flex-col gap-3 p-3 shadow">
      <div className="relative aspect-square">
        <Image src={images[0]} alt="" fill className="object-cover" />
      </div>

      <div className="font-hand relative text-center">
        <h3 className="font-bold">{name}</h3>
        <p className="truncate text-xs">{description}</p>
        <span className="text-primary font-black">R{price / 100}</span>

        <Heart className="absolute bottom-0 right-0 translate-x-1 translate-y-1 rotate-12" />
      </div>
    </div>
  )
}
