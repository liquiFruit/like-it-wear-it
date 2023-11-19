"use client"

import { signIn, signOut, useSession } from "next-auth/react"
import { Button } from "ui/src/ui/button"
import { cn } from "ui/src/utils"

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
