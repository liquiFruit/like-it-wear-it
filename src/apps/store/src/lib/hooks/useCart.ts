"use client"

import { useEffect } from "react"

import { Select as Product } from "database/src/schema/products"

import { trpc } from "@/lib/trpc/client"

export function useCart() {
  const { data, isLoading, isError, error, refetch } =
    trpc.getCartProductsByUserId.useQuery()

  const { getData, setData } = trpc.useUtils().getCartProductsByUserId

  useEffect(() => {
    if (!isError || error.data?.code !== "UNAUTHORIZED") return

    const localProducts = JSON.parse(
      localStorage.getItem("local_cart_products") ?? "[]",
    ) as Product[]

    setData(
      undefined,
      localProducts.map((p) => ({ ...p, createdAt: p.createdAt.toString() })),
    )

    console.log("setData")
  }, [isError, error, data])

  return { data, isLoading, isError, error }
}
