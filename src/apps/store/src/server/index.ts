import { publicProcedure, router } from "@/server/trpc"

export const appRouter = router({
  test: publicProcedure.query(async () => "greetings"),
})

export type AppRouter = typeof appRouter
