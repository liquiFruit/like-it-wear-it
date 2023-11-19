import { ShoppingBagIcon } from "ui/src/icons"

export function Cart({ items }: { items: number }) {
  return (
    <div className="relative">
      <ShoppingBagIcon />

      {items > 0 ? (
        <span className="text-background absolute right-0 top-0 -translate-y-1 translate-x-1 rounded-full bg-red-400 px-1 py-0.5 text-[0.5rem] leading-none">
          {items}
        </span>
      ) : null}
    </div>
  )
}
