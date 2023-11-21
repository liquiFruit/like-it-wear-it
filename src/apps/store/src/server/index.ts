import { getCartProductsByUserId } from "database/src/api/cart/queries"
import {
  getAllProductsInStock,
  getProductById,
} from "database/src/api/products/queries"
import { z } from "zod"

import { publicProcedure, router } from "@/server/trpc"

export const appRouter = router({
  getAllProductsInStock: publicProcedure.query(getAllProductsInStock),
  getProductById: publicProcedure
    .input(z.number())
    .query(async ({ input }) => await getProductById(input)),
  getCartProductsByUserId: publicProcedure.query(async () =>
    getCartProductsByUserId("e3b2ce8c-fca9-40cb-b00e-e9150ce0bd9c"),
  ),
})

export type AppRouter = typeof appRouter
