"use client"

import { useRef } from "react"

import { cn } from "../utils"

export function Carousel({ children }: { children: React.ReactNode[] }) {
  const slider = useRef<HTMLDivElement | null>(null)

  function scrollToNextSlide() {
    const clientWidth = slider.current!.clientWidth
    const scrollWidth = slider.current!.scrollWidth
    const slideWidth = scrollWidth / children.length
    const currentScroll = slider.current!.scrollLeft

    var nextPos = currentScroll + slideWidth

    if (scrollWidth - currentScroll - clientWidth === 0) {
      nextPos = 0
    }

    slider.current!.scrollTo({
      left: nextPos,
      behavior: "smooth",
    })
  }

  return (
    <div
      ref={slider}
      onMouseDown={scrollToNextSlide}
      className="no-scrollbar snap-x snap-mandatory overflow-x-scroll"
    >
      <div className="flex w-fit flex-row gap-4 px-4" draggable={false}>
        {children}
      </div>
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
