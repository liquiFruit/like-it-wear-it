import Image from "next/image"

import { Carousel, Slide } from "ui/src/components/carousel"
import { Heart } from "ui/src/svgs"
import { Button } from "ui/src/ui/button"

import { serverClient } from "@/lib/trpc/server-client"

export default async function ProductDetailPage({
  params: { id },
}: {
  params: { id: number }
}) {
  const product = await serverClient.getProductById(+id)

  if (!product) return <p className="text-center">Product not found!</p>

  return (
    <div>
      {product.images.length !== 1 ? (
        <Carousel className="gap-3 px-3">
          {product.images.map((img) => (
            <Slide key={img} className="mb-6 w-[80vw] border p-3 shadow-lg">
              <div className="relative aspect-square">
                <Image
                  draggable={false}
                  src={img}
                  alt=""
                  fill
                  className="select-none object-cover"
                />
              </div>

              <div className="h-20" />
            </Slide>
          ))}
        </Carousel>
      ) : (
        <div className="mx-auto mb-6 w-[80vw] border p-3 shadow-lg">
          <div className="relative aspect-square">
            <Image
              draggable={false}
              src={product.images[0]}
              alt=""
              fill
              className="select-none object-cover"
            />
          </div>

          <div className="h-20" />
        </div>
      )}

      <div className="px-3">
        <div className="flex flex-row items-center justify-between">
          <h1 className="font-serif text-2xl font-semibold">{product.name}</h1>
          <Heart />
        </div>

        <p className="my-2 text-xs font-light">{product.description}</p>

        <Button size={"sm"} className="w-full">
          Add to Cart
        </Button>
      </div>
    </div>
  )
}
