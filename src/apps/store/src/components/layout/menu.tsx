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

export function Menu() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant={"link"} className="text-black" size={"icon"}>
          <MenuIcon className="self-center" />
        </Button>
      </SheetTrigger>

      <SheetContent side={"left"}></SheetContent>
    </Sheet>
  )
}
