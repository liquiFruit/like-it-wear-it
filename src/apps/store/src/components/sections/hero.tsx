import Image from "next/image"

import { Button } from "ui/src/ui/button"

export function Hero() {
  return (
    <section className="border-foreground/10 bg-background m-1 border p-3 drop-shadow-xl">
      <div className="relative aspect-square">
        <Image
          src="https://scontent-cpt1-1.cdninstagram.com/v/t39.30808-6/387744423_18072691153415502_637200600293141596_n.jpg?stp=dst-jpg_e35_p640x640_sh0.08&efg=eyJ2ZW5jb2RlX3RhZyI6ImltYWdlX3VybGdlbi4xNDQweDE3MTUuc2RyIn0&_nc_ht=scontent-cpt1-1.cdninstagram.com&_nc_cat=106&_nc_ohc=7HpEbDijVpkAX8SGlaL&edm=ACWDqb8AAAAA&ccb=7-5&ig_cache_key=MzIwOTIxNDExMjkyNzM4MTU2MQ%3D%3D.2-ccb7-5&oh=00_AfBn_Uultu1WkGqHMlxCJ79Nov3vqbzC_V0i89YyrLfXYQ&oe=655991A8&_nc_sid=ee9879"
          alt=""
          fill
          className="object-cover"
        />
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
