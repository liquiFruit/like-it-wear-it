"use client"

import { cn } from "../utils"

export function Carousel({ children }: { children: React.ReactNode[] }) {
  function scrollToNextSlide(slider: HTMLElement, mouseX: number) {
    const clientWidth = slider.clientWidth
    const scrollWidth = slider.scrollWidth
    const slideWidth = scrollWidth / children.length
    const currentScroll = slider.scrollLeft

    const dir = mouseX > clientWidth / 2 ? "next" : "prev"

    var nextPos = currentScroll + slideWidth * (dir === "prev" ? -1 : 1)

    if (dir === "next" && scrollWidth - currentScroll - clientWidth === 0) {
      nextPos = 0
    } else if (dir === "prev" && currentScroll === 0) {
      nextPos = scrollWidth
    }

    slider.scrollTo({
      left: nextPos,
      behavior: "smooth",
    })
  }

  return (
    <div
      onMouseDown={(e) => scrollToNextSlide(e.currentTarget, e.clientX)}
      className="no-scrollbar snap-x snap-mandatory overflow-x-scroll"
    >
      <div className="flex w-fit flex-row gap-4 px-4">{children}</div>
    </div>
  )
}

export function Slide({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return <div className={cn("snap-center", className)}>{children}</div>
}
