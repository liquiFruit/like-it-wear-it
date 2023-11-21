import Link from "next/link"

import { cn } from "ui/src/utils"

export function Logo({ className }: { className: string }) {
  return (
    <Link
      href={"/"}
      className={cn(
        "flex h-fit w-fit flex-col items-center font-serif leading-none",
        className,
      )}
    >
      <span>Like It</span>
      <span>Wear It</span>
    </Link>
  )
}
