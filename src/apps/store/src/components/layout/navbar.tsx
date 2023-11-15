import { cn } from "ui/src/utils"
import { MenuIcon, SearchIcon, ShoppingBagIcon } from "ui/src/icons"

export function Navbar() {
  return (
    <nav className="p-3 grid grid-cols-3">
      <MenuIcon className="" />

      <Logo className="" />

      <div className="ml-auto w-fit flex flex-row items-center gap-1">
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
        "flex flex-col items-center font-['Playfair_Display'] leading-none",
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

      <span className="absolute top-0 right-0 -translate-y-1/3 translate-x-1/2 leading-none text-background bg-red-400 px-1 py-0.5 rounded-full text-[0.5rem]">
        1
      </span>
    </div>
  )
}
