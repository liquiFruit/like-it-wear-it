import Image from "next/image"

import { Heart } from "ui/src/svgs"

export function ProductCard({
  product: { title, description, price },
}: {
  product: {
    title: string
    description: string
    price: number
  }
}) {
  return (
    <div className="flex flex-col gap-3 p-3 shadow">
      <div className="relative aspect-square">
        <Image
          src="https://scontent-cpt1-1.cdninstagram.com/v/t39.30808-6/387744423_18072691153415502_637200600293141596_n.jpg?stp=dst-jpg_e35_p640x640_sh0.08&efg=eyJ2ZW5jb2RlX3RhZyI6ImltYWdlX3VybGdlbi4xNDQweDE3MTUuc2RyIn0&_nc_ht=scontent-cpt1-1.cdninstagram.com&_nc_cat=106&_nc_ohc=7HpEbDijVpkAX8SGlaL&edm=ACWDqb8AAAAA&ccb=7-5&ig_cache_key=MzIwOTIxNDExMjkyNzM4MTU2MQ%3D%3D.2-ccb7-5&oh=00_AfBn_Uultu1WkGqHMlxCJ79Nov3vqbzC_V0i89YyrLfXYQ&oe=655991A8&_nc_sid=ee9879"
          alt=""
          fill
          className="object-cover"
        />
      </div>

      <div className="font-hand relative text-center">
        <h3 className="font-bold">{title}</h3>
        <p className="truncate text-xs">{description}</p>
        <span className="text-primary font-black">R{price / 100}</span>

        <Heart className="absolute bottom-0 right-0 translate-x-1 translate-y-1 rotate-12" />
      </div>
    </div>
  )
}
