import { MenuIcon } from "ui/src/icons"
import { Button } from "ui/src/ui/button"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "ui/src/ui/sheet"

import { AuthButton } from "./auth-button"
import { Logo } from "./logo"

export function Menu() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant={"link"}
          className="w-6 self-center text-black"
          size={"icon"}
        >
          <MenuIcon className="" />
        </Button>
      </SheetTrigger>

      <SheetContent side={"left"}>
        <SheetHeader>
          <Logo className="mx-auto mb-8" />
        </SheetHeader>
        <AuthButton className="w-full" />
      </SheetContent>
    </Sheet>
  )
}
