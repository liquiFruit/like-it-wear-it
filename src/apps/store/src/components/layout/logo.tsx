import Link from "next/link"

import { cn } from "ui/src/utils"

export function Logo({ className }: { className: string }) {
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
