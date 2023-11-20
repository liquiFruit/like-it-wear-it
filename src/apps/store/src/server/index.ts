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
})

export type AppRouter = typeof appRouter
