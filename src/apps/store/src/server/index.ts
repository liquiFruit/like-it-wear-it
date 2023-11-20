import { getAllProductsInStock } from "database/src/api/products/queries"

import { publicProcedure, router } from "@/server/trpc"

export const appRouter = router({
  test: publicProcedure.query(getAllProductsInStock),
})

export type AppRouter = typeof appRouter
