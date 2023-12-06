"use client"

import Image from "next/image"
import Link from "next/link"
import { redirect } from "next/navigation"
import { useState } from "react"

import { Carousel, Slide } from "@like-it-wear-it/ui/src/components/carousel"
import { LoadingSpinner } from "@like-it-wear-it/ui/src/icons"
import { Button } from "@like-it-wear-it/ui/src/ui/button"
import { Separator } from "@like-it-wear-it/ui/src/ui/separator"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@like-it-wear-it/ui/src/ui/tabs"
import { Textarea } from "@like-it-wear-it/ui/src/ui/textarea"
import { useSession } from "next-auth/react"

import { useCart } from "@/lib/hooks/useCart"
import { trpc } from "@/lib/trpc/client"

export default function NewOrderPage() {
  const session = useSession()
  const [deliveryDetails, setDeliveryDetails] = useState("")
  const [isDelivering, setIsDelivering] = useState(true)
  const { products } = useCart()

  const { mutateAsync: createOrder, isPending } =
    trpc.createOrderByUserId.useMutation()

  if (!products || products.length === 0)
    return (
      <div className="flex flex-col items-center">
        <p>You have no products in your cart.</p>
        <Button asChild className="mt-3 w-fit">
          <Link href={"/"}>Back to Home</Link>
        </Button>
      </div>
    )

  const availableProducts = products.filter((p) => p.stock > 0)

  const price = availableProducts.reduce(
    (res, ent) => (res += ent.price / 100),
    0,
  )

  async function handleCreateOrder() {
    if (isDelivering && deliveryDetails === "") {
      alert("Please provide delivery details!")
      return
    }

    const res = await createOrder(
      {
        deliveryDetails: isDelivering
          ? {
              isDelivering: true,
              details: { address: deliveryDetails, instructions: "test" },
            }
          : { isDelivering: false },
        productIds: availableProducts!.map((p) => p.id),
      },
      {
        onSettled(data, error, variables, context) {
          if (error) alert(error.message)
        },
      },
    )
  }

  return (
    <main className="px-3">
      <h1 className="mb-3 text-center font-serif text-xl font-medium">
        Checkout
      </h1>

      <section>
        <h2 className="">Your Cart ({products.length})</h2>
        <p className="mb-1.5 text-xs text-gray-500">
          * Only products that are in stock are illegible for purchase. Make any
          changes via your cart in the top right.
        </p>
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
      </section>

      <Tabs
        defaultValue="delivery"
        className="flex w-full flex-col items-center"
        value={isDelivering ? "delivery" : "collection"}
        onValueChange={(option) => setIsDelivering(option === "delivery")}
      >
        <TabsList>
          <TabsTrigger value="delivery">Delivery</TabsTrigger>
          <TabsTrigger value="collection">Collection</TabsTrigger>
        </TabsList>

        <TabsContent value="delivery" className="w-full">
          <p className="text-sm">
            Delivery is available nation wide at a flat rate of R100. Enter your
            street address and delivery details below.
          </p>
          <p className="my-1.5 text-xs text-gray-500">
            * We may contact you if any issues arise with deliveries to this
            address.
          </p>
          <Textarea
            className="resize-y"
            onFocus={(e) => (e.target.value = deliveryDetails)}
            onBlur={(e) => setDeliveryDetails(e.target.value)}
          />
        </TabsContent>

        <TabsContent value="collection" className="w-full">
          Collection is available in{" "}
          <Link
            className="decoration-primary underline"
            target="_blank"
            href={
              "https://www.google.com/maps/place/West+Beach,+Cape+Town,+7449/@-33.8042515,18.4770499,15z/data=!3m1!4b1!4m6!3m5!1s0x1dcc5f7f30e669b9:0xf2fb6113e24edc88!8m2!3d-33.8066727!4d18.4736007!16s%2Fg%2F1td8n598?entry=ttu"
            }
          >
            West Beach, Cape Town
          </Link>{" "}
          during business hours. More information will be provided via email
          once your order has been placed.
        </TabsContent>
      </Tabs>

      <section className="mt-6 grid grid-cols-2 text-sm">
        <p className="col-span-1">Your Email:</p>

        {session.status === "loading" ? (
          <p className="col-span-1 text-right">Loading...</p>
        ) : (
          <p
            style={{ wordWrap: "break-word" }}
            className="col-span-1 text-right font-bold"
          >
            {session.data?.user.email || "Not signed in!"}
          </p>
        )}
        <Separator orientation="horizontal" className="col-span-2" />

        <p className="col-span-1">Subtotal:</p>
        <p className="col-span-1 break-all text-right">R{price.toFixed(2)}</p>

        <p className="col-span-1">
          {isDelivering ? "Delivery" : "Collection"}:
        </p>
        <p className="col-span-1 text-right font-bold">
          {isDelivering ? "R100.00" : "Free"}
        </p>

        <Separator orientation="horizontal" className="col-span-2" />

        <p className="col-span-1">Total:</p>
        <p className="col-span-1 text-right font-bold">
          R{isDelivering ? (price + 100).toFixed(2) : price.toFixed(2)}
        </p>
      </section>

      <Button onClick={handleCreateOrder} className="mt-3 w-full">
        {isPending ? (
          <>
            <LoadingSpinner className="mr-3" />
            Processing...
          </>
        ) : (
          "Make Payment"
        )}
      </Button>
    </main>
  )
}
