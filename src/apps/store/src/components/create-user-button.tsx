"use client"

import { useRouter } from "next/navigation"

import { Button } from "ui/src/ui/button"

import { tryCreateUser } from "@/actions"

export function CreateUserButton() {
  const router = useRouter()

  return (
    <Button
      onClick={async () => {
        await tryCreateUser("testing@email", "testing name")
        router.refresh()
      }}
    >
      Create user
    </Button>
  )
}
