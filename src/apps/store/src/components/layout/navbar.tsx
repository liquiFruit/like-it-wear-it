import { Cart } from "./cart"
import { Logo } from "./logo"
import { Menu } from "./menu"
import { Search } from "./search"

export function Navbar() {
  return (
    <nav className="bg-background/30 sticky top-0 z-10 grid grid-cols-3 p-3 backdrop-blur">
      <Menu />

      <Logo className="" />

      <div className="ml-auto flex w-fit flex-row items-center gap-1">
        <Search />
        <Cart />
      </div>
    </nav>
  )
}
