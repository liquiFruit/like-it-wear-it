import { MenuIcon, SearchIcon, ShoppingBagIcon } from "ui/src/icons"
import { cn } from "ui/src/utils"

export function Navbar() {
  return (
    <nav className="grid grid-cols-3 p-3">
      <MenuIcon className="self-center" />

      <Logo className="" />

      <div className="ml-auto flex w-fit flex-row items-center gap-1">
        <SearchIcon />
        <Cart />
      </div>
    </nav>
  )
}

function Logo({ className }: { className: string }) {
  return (
    <div
      className={cn(
        className,
        "flex flex-col items-center font-serif leading-none",
      )}
    >
      <span>Like It</span>
      <span>Wear It</span>
    </div>
  )
}

function Cart() {
  return (
    <div className="relative">
      <ShoppingBagIcon />

      <span className="text-background absolute right-0 top-0 -translate-y-1/3 translate-x-1/2 rounded-full bg-red-400 px-1 py-0.5 text-[0.5rem] leading-none">
        1
      </span>
    </div>
  )
}
