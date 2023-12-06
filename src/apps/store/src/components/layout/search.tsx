import { SearchIcon } from "@like-it-wear-it/ui/src/icons"
import { Button } from "@like-it-wear-it/ui/src/ui/button"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@like-it-wear-it/ui/src/ui/sheet"

export function Search() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant={"link"} className="relative p-0 text-black">
          <SearchIcon />
        </Button>
      </SheetTrigger>

      <SheetContent side={"bottom"} className="top-20">
        <SheetHeader className="mb-8">
          <SheetTitle>Search</SheetTitle>
        </SheetHeader>

        <p className="self-center text-center text-black/70">
          There are no results.
        </p>
      </SheetContent>
    </Sheet>
  )
}
