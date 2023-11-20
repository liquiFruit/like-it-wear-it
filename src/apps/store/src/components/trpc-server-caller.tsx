import { serverClient } from "@/lib/trpc/server-client"

export async function TRPCServerCaller() {
  const data = await serverClient.test()

  return <>{JSON.stringify(data)}</>
}
