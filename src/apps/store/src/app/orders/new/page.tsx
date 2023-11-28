"use client"

import Image from "next/image"
import Link from "next/link"

import { Carousel, Slide } from "ui/src/components/carousel"
import { Button } from "ui/src/ui/button"

import { useCart } from "@/lib/hooks/useCart"

export default function NewOrderPage() {
  const { products } = useCart()

  if (!products || products.length === 0)
    return (
      <div className="flex flex-col items-center">
        <p>You have no products in your cart.</p>
        <Button asChild className="mt-3 w-fit">
          <Link href={"/"}>Back to Home</Link>
        </Button>
      </div>
    )

  return (
    <main className="px-3">
      <h1 className="mb-3 text-center font-serif text-xl font-medium">
        Checkout
      </h1>

      <h2 className="mb-1.5">Your Products</h2>
      <Carousel className="gap-3">
        {products.map((p) => (
          <Slide key={p.id} className="mb-6 w-[26vw] border p-1 shadow-lg">
            <div className="relative aspect-square">
              <Image
                draggable={false}
                src={p.images[0]}
                alt=""
                fill
                className="select-none object-cover"
              />
            </div>
          </Slide>
        ))}
      </Carousel>
    </main>
  )
}
