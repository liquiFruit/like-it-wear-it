"use client"

import { trpc } from "@/lib/trpc/client"

export function useCart() {
  const { data, isLoading, isError, error, refetch } =
    trpc.getCartProductsByUserId.useQuery()

  return { data, isLoading, isError, error }
}
