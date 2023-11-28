import { initTRPC, TRPCError } from "@trpc/server"
import superjson from "superjson"

import { getUserAuth } from "@/lib/auth"

const t = initTRPC.create({
  transformer: superjson,
})

const isAuth = t.middleware(async ({ next }) => {
  const session = await getUserAuth()

  if (!session || !session.user.id)
    throw new TRPCError({ code: "UNAUTHORIZED" })

  return next({
    ctx: {
      session: session,
    },
  })
})

export const router = t.router
export const publicProcedure = t.procedure
export const protectedProcedure = t.procedure.use(isAuth)
