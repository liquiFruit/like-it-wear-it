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

import { useCart } from "@/lib/hooks/useCart"

export function Cart() {
  const [isOpen, setIsOpen] = useState(false)
  const { data: products, isLoading, isError, error } = useCart()

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

      <SheetContent side={"right"}>
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
          <CartProducts
            closeSheet={() => setIsOpen(false)}
            products={products}
          />
        )}
      </SheetContent>
    </Sheet>
  )
}

function CartProducts({
  products,
  closeSheet,
}: {
  products: Product[]
  closeSheet: () => void
}) {
  return (
    <section>
      <div className="flex flex-col gap-6">
        {products.map((p) => (
          <div key={p.id} className="flex flex-row">
            <Link
              href={`/products/${p.id}`}
              className="flex min-w-0 flex-row gap-1"
              onClick={closeSheet}
            >
              <div className="relative aspect-square w-16 flex-shrink-0 ">
                <Image
                  src={p.images[0]!}
                  alt={p.name}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="min-w-0">
                <p className="truncate font-medium leading-none">{p.name}</p>
                <p className="text-xs">R{(p.price / 100).toFixed(2)}</p>
              </div>
            </Link>

            <Button
              variant={"ghost"}
              size={"icon"}
              className="ml-3 h-fit w-fit self-center"
            >
              <RemoveIcon />
            </Button>
          </div>
        ))}
      </div>
    </section>
  )
}
