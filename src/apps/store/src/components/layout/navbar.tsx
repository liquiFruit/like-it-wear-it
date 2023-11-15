import { cn } from "@ui/utils"
import { MenuIcon } from "ui/src/icons"

export function Navbar() {
  return (
    <nav className="p-3 grid grid-cols-3">
      <MenuIcon className="" />
      <Logo className="" />
      <MenuIcon className="ml-auto bg-red-500" />
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
      <span>Likt It</span>
      <span>Wear It</span>
    </div>
  )
}
