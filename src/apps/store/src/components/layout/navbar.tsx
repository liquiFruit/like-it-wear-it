import Link from "next/link"

import { MenuIcon, SearchIcon, ShoppingBagIcon } from "ui/src/icons"
import { cn } from "ui/src/utils"

export function Navbar() {
  return (
    <nav className="bg-background/30 sticky top-0 z-10 grid grid-cols-3 p-3 backdrop-blur">
      <MenuIcon className="self-center" />

      <Logo className="" />

      <div className="ml-auto flex w-fit flex-row items-center gap-1">
        <SearchIcon />
        <Cart items={1} />
      </div>
    </nav>
  )
}

function Logo({ className }: { className: string }) {
  return (
    <Link
      href={"/"}
      className={cn(
        className,
        "flex flex-col items-center font-serif leading-none",
      )}
    >
      <span>Like It</span>
      <span>Wear It</span>
    </Link>
  )
}

function Cart({ items }: { items: number }) {
  return (
    <div className="relative">
      <ShoppingBagIcon />

      {items > 0 ? (
        <span className="text-background absolute right-0 top-0 -translate-y-1 translate-x-1 rounded-full bg-red-400 px-1 py-0.5 text-[0.5rem] leading-none">
          {items}
        </span>
      ) : null}
    </div>
  )
}
