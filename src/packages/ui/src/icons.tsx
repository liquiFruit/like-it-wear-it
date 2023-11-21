import { Loader2Icon, LucideProps } from "lucide-react"

import { cn } from "./utils"

export {
  MenuIcon,
  SearchIcon,
  ShoppingBagIcon,
  XIcon as RemoveIcon,
} from "lucide-react"

export function LoadingSpinner({ className, ...props }: LucideProps) {
  return <Loader2Icon className={cn("animate-spin", className)} {...props} />
}
