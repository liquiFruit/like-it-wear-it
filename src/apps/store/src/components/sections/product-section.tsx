import { Squiggle } from "ui/src/svgs"
import { cn } from "ui/src/utils"

export function ProductSection() {
  return (
    <section>
      <h2 className={cn("relative my-12 text-center font-serif text-xl")}>
        Just In
        <Squiggle className="absolute left-1/2 top-1/2 -z-10 -translate-x-1/2 -translate-y-1/2" />
      </h2>
    </section>
  )
}
