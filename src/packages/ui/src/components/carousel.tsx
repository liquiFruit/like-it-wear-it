"use client"

import { cn } from "../utils"

export function Carousel({
  children,
  className,
}: {
  children: React.ReactNode[]
  className: string
}) {
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
      className="no-scrollbar max-w-100% mx-auto  snap-x snap-mandatory overflow-x-scroll"
    >
      <div className={cn("flex w-fit flex-row", className)}>{children}</div>
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
