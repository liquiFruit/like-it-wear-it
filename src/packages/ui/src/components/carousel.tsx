"use client"

import { useRef } from "react"

export function Carousel({ children }: { children: React.ReactNode[] }) {
  var slider = useRef<HTMLDivElement | null>(null)

  function scrollToNextSlide() {
    const width = slider.current!.scrollWidth
    const imgWidth = width / children.length

    var nextPos = slider.current!.scrollLeft + imgWidth / 2

    if (nextPos > width - imgWidth) nextPos = 0

    slider.current!.scrollTo({
      left: nextPos,
      behavior: "smooth",
    })
  }

  return (
    <div
      ref={slider}
      onClick={scrollToNextSlide}
      className="no-scrollbar snap-x snap-mandatory overflow-x-scroll"
    >
      <div className="flex w-fit flex-row gap-4 px-4" draggable={false}>
        {children}
      </div>
    </div>
  )
}
