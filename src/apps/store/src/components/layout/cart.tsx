import { ShoppingBagIcon } from "ui/src/icons"
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

export function Cart({ items }: { items: number }) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant={"link"} className="relative p-0 text-black">
          <ShoppingBagIcon />

          {items > 0 ? (
            <span className="text-background absolute right-0 top-0 translate-x-1 rounded-full bg-red-400 px-1 py-0.5 text-[0.5rem] leading-none">
              {items}
            </span>
          ) : null}
        </Button>
      </SheetTrigger>

      <SheetContent side={"right"}>
        <SheetHeader className="mb-8">
          <SheetTitle>My Cart</SheetTitle>
        </SheetHeader>

        <p className="self-center text-center text-black/70">
          Your cart is empty.
        </p>
      </SheetContent>
    </Sheet>
  )
}
