"use client"

import { Button } from "@like-it-wear-it/ui/src/ui/button"
import { cn } from "@like-it-wear-it/ui/src/utils"
import { signIn, signOut, useSession } from "next-auth/react"

export function AuthButton({ className }: { className?: string }) {
  const session = useSession()

  switch (session.status) {
    case "loading":
      return <p>loading...</p>

    case "authenticated":
      return (
        <Button
          variant={"outline"}
          className={cn(className)}
          onClick={async () => await signOut()}
        >
          Sign out
        </Button>
      )

    case "unauthenticated":
      return (
        <Button className={cn(className)} onClick={async () => await signIn()}>
          Sign in
        </Button>
      )
  }
}
