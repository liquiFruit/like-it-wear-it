"use client"

import { Select as Product } from "@like-it-wear-it/database/src/schema/products"
import { Button } from "@like-it-wear-it/ui/src/ui/button"

import { useCart } from "@/lib/hooks/useCart"

export function ToggleProductInCart({ product }: { product: Product }) {
  const { addToCart, removeFromCart, products } = useCart()

  return products?.find((p) => p.id === product.id) ? (
    <Button
      onClick={() => removeFromCart(product)}
      size={"sm"}
      className="w-full"
      variant={"outline"}
    >
      Remove from Cart
    </Button>
  ) : (
    <Button onClick={() => addToCart(product)} size={"sm"} className="w-full">
      Add to Cart
    </Button>
  )
}
