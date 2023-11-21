import { getCartProductsByUserId } from "database/src/api/cart/queries"
import {
  getAllProductsInStock,
  getProductById,
} from "database/src/api/products/queries"
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
})

export type AppRouter = typeof appRouter
