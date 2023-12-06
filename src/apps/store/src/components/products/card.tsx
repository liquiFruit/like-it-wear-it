import Image from "next/image"

import { schema } from "@like-it-wear-it/database"

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

      <div className="font-hand text-center">
        <h3 className="truncate font-bold">{name}</h3>
        <p className="truncate text-xs">{description}</p>
        <span className="text-primary font-black">R{price / 100}</span>
      </div>
    </div>
  )
}
