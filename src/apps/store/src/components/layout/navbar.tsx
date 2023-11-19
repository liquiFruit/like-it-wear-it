import Link from "next/link"

import { MenuIcon, SearchIcon } from "ui/src/icons"
import { Button } from "ui/src/ui/button"

import { getUserAuth } from "@/lib/auth"

import { Cart } from "./cart"
import { Logo } from "./logo"
import { Menu } from "./menu"

export async function Navbar() {
  const session = await getUserAuth()

  return (
    <nav className="bg-background/30 sticky top-0 z-10 grid grid-cols-3 p-3 backdrop-blur">
      <Menu />

      <Logo className="" />

      <div className="ml-auto flex w-fit flex-row items-center gap-1">
        <SearchIcon />
        <Cart items={session?.user ? 1 : 0} />
      </div>
    </nav>
  )
}
