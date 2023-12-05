import { NextResponse } from "next/server"

import { cleanUpExpiredOrders } from "database/src/api/orders/mutations"

export async function GET(req: Request) {
  const r = await cleanUpExpiredOrders()
  console.log("Expire orders:")
  console.table(r)

  if (r.success) return NextResponse.json({ ok: true })

  return new Response(null, { status: 500 })
}
