"use client"

import { Select as Product } from "database/src/schema/products"

import { trpc } from "@/lib/trpc/client"

export function useCart() {
  const { data, isLoading, isError, error, refetch } =
    trpc.getCartProductsByUserId.useQuery()

  const { mutateAsync: tryAddToCart } = trpc.addProductToCart.useMutation()
  const { mutateAsync: tryRemoveFromCart } =
    trpc.removeProductFromCart.useMutation()

  const { getData, setData } = trpc.useUtils().getCartProductsByUserId

  async function addToCart(product: Product) {
    const initialProducts = getData() ?? []
    const updatedProducts = initialProducts.concat([
      { ...product, addedAt: new Date() },
    ])

    // Optimistic update
    setData(undefined, updatedProducts)

    // Actual update
    tryAddToCart(product.id, {
      onError(error) {
        alert("An error occurred adding product to cart")
        console.log(error)
        refetch()
      },
    })
  }

  async function removeFromCart(product: Product) {
    const initialProducts = getData() ?? []
    const updatedProducts = initialProducts.filter((p) => p.id !== product.id)

    // Optimistic update
    setData(undefined, updatedProducts)

    // Actual update
    tryRemoveFromCart(product.id, {
      onError(error) {
        alert("An error occurred removing product from cart")
        console.log(error)
        refetch()
      },
    })
  }

  return {
    products: data,
    isLoading,
    isError,
    error,
    addToCart,
    removeFromCart,
  }
}
