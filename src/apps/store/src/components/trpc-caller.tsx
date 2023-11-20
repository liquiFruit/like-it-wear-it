"use client"

import { trpc } from "@/lib/trpc/client"

export function TRPCCaller() {
  const { data, isLoading, isError, error } = trpc.test.useQuery()

  return (
    <>
      <p>{JSON.stringify({ isLoading, isError, error })}</p>
      <p>{JSON.stringify(data)}</p>
    </>
  )
}
