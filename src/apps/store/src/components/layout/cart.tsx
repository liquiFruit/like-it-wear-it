"use client"

import Image from "next/image"
import Link from "next/link"
import { useState } from "react"

import { Select as Product } from "database/src/schema/products"
import { LoadingSpinner, RemoveIcon, ShoppingBagIcon } from "ui/src/icons"
import { Button } from "ui/src/ui/button"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "ui/src/ui/sheet"
import { cn } from "ui/src/utils"

import { useCart } from "@/lib/hooks/useCart"

export function Cart() {
  const [isOpen, setIsOpen] = useState(false)
  const { products, isLoading, isError, error, removeFromCart } = useCart()

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant={"link"} className="relative p-0 text-black">
          <ShoppingBagIcon />

          {isLoading || isError || !products || products.length === 0 ? null : (
            <span className="text-background absolute right-0 top-0 translate-x-1 rounded-full bg-red-400 px-1 py-0.5 text-[0.5rem] leading-none">
              {products.length}
            </span>
          )}
        </Button>
      </SheetTrigger>

      <SheetContent side={"right"} className="flex flex-col">
        <SheetHeader className="mb-8">
          <SheetTitle>My Cart</SheetTitle>
        </SheetHeader>

        {isLoading ? (
          <LoadingSpinner className="mx-auto" />
        ) : isError || !products ? (
          <>
            <p className="text-center">
              An error occurred while loading your cart.
            </p>
            <p className="text-destructive mt-6 text-center">
              {error?.data?.code === "UNAUTHORIZED"
                ? "You need to login first"
                : error?.message}
            </p>
          </>
        ) : products.length === 0 ? (
          <p className="self-center text-center text-black/70">
            Your cart is empty.
          </p>
        ) : (
          <>
            <CartProducts
              closeSheet={() => setIsOpen(false)}
              products={products}
              removeFromCart={removeFromCart}
            />

            <CheckoutButton />
          </>
        )}
      </SheetContent>
    </Sheet>
  )
}

function CartProducts({
  products,
  closeSheet,
  removeFromCart,
}: {
  products: Product[]
  closeSheet: () => void
  removeFromCart: (product: Product) => Promise<void>
}) {
  return (
    // Height + shadow wrapper
    <div className="no-scrollbar relative flex-1 overflow-y-scroll">
      {/* Content */}
      <div className="flex flex-1 flex-col gap-6">
        {products.map((p) => (
          <div key={p.id} className="flex flex-row">
            <Link
              href={`/products/${p.id}`}
              className="flex w-full min-w-0 flex-row gap-1"
              onClick={closeSheet}
            >
              <div className="relative aspect-square w-16 flex-shrink-0 ">
                <Image
                  src={p.images[0]!}
                  alt={p.name}
                  fill
                  className={cn(
                    "rounded object-cover shadow",
                    p.stock === 0 && "opacity-50",
                  )}
                />
              </div>

              <div className="min-w-0">
                <p className="truncate font-medium leading-none">{p.name}</p>
                {p.stock === 0 ? (
                  <p className="text-destructive text-xs">Out of stock</p>
                ) : (
                  <p className="text-xs">R{(p.price / 100).toFixed(2)}</p>
                )}
              </div>
            </Link>

            <Button
              onClick={() => removeFromCart(p)}
              variant={"destructive"}
              size={"icon"}
              className="ml-3 h-fit w-fit self-center"
            >
              <RemoveIcon />
            </Button>
          </div>
        ))}
      </div>

      {/* Shadow overlay */}
      <div className="from-background sticky bottom-0 h-16 w-full bg-gradient-to-t to-transparent" />
    </div>
  )
}

function CheckoutButton() {
  return <Button>Checkout</Button>
}
