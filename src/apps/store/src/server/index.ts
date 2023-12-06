import {
  addProductToCart,
  removeProductFromCart,
} from "@like-it-wear-it/database/src/api/cart/mutations"
import { getCartProductsByUserId } from "@like-it-wear-it/database/src/api/cart/queries"
import {
  cleanUpExpiredOrders,
  tryCreateOrder,
} from "@like-it-wear-it/database/src/api/orders/mutations"
import {
  getAllProductsInStock,
  getProductById,
} from "@like-it-wear-it/database/src/api/products/queries"
import { deliveryDetailsSchema } from "@like-it-wear-it/database/src/schema/orders"
import { TRPCError } from "@trpc/server"
import { z } from "zod"

import { protectedProcedure, publicProcedure, router } from "@/server/trpc"

export const appRouter = router({
  getAllProductsInStock: publicProcedure.query(getAllProductsInStock),

  getProductById: publicProcedure
    .input(z.number())
    .query(async ({ input }) => await getProductById(input)),

  getCartProductsByUserId: protectedProcedure.query(async ({ ctx }) =>
    getCartProductsByUserId(ctx.session.user.id),
  ),

  addProductToCart: protectedProcedure
    .input(z.number())
    .mutation(async ({ ctx, input }) => {
      await addProductToCart(ctx.session.user.id, input)
    }),

  removeProductFromCart: protectedProcedure
    .input(z.number())
    .mutation(async ({ ctx, input }) => {
      await removeProductFromCart(ctx.session.user.id, input)
    }),

  createOrderByUserId: protectedProcedure
    .input(
      z.object({
        deliveryDetails: deliveryDetailsSchema,
        productIds: z.number().array().min(1),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const res = await tryCreateOrder(
        ctx.session.user.id,
        input.deliveryDetails,
        input.productIds,
      )

      if (res.success) return { order: res.order, paymentLink: res.paymentLink }

      // Otherwise, throw an error indicating something went wrong
      throw new TRPCError({
        message: "Failed to create order: " + res.error,
        code: "INTERNAL_SERVER_ERROR",
      })
    }),
})

export type AppRouter = typeof appRouter
