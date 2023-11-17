import Image from "next/image"

import { Carousel, Slide } from "ui/src/components/carousel"

export default function ProductDetailPage({
  params: { id },
}: {
  params: { id: string }
}) {
  const images = Array(3).fill(0)

  return (
    <div>
      <Carousel>
        {images.map((_, idx) => (
          <Slide key={idx} className="mb-6 w-[80vw] border p-3 shadow-lg">
            <div className="relative aspect-square">
              <Image
                draggable={false}
                src="https://scontent-cpt1-1.cdninstagram.com/v/t39.30808-6/387744423_18072691153415502_637200600293141596_n.jpg?stp=dst-jpg_e35_p640x640_sh0.08&efg=eyJ2ZW5jb2RlX3RhZyI6ImltYWdlX3VybGdlbi4xNDQweDE3MTUuc2RyIn0&_nc_ht=scontent-cpt1-1.cdninstagram.com&_nc_cat=106&_nc_ohc=7HpEbDijVpkAX8SGlaL&edm=ACWDqb8AAAAA&ccb=7-5&ig_cache_key=MzIwOTIxNDExMjkyNzM4MTU2MQ%3D%3D.2-ccb7-5&oh=00_AfBn_Uultu1WkGqHMlxCJ79Nov3vqbzC_V0i89YyrLfXYQ&oe=655991A8&_nc_sid=ee9879"
                alt=""
                fill
                className="select-none object-cover"
              />
            </div>

            <div className="h-20" />
          </Slide>
        ))}
      </Carousel>
    </div>
  )
}
