import type { Metadata } from "next"

import { Navbar } from "@/components/layout/navbar"

import "./globals.css"

export const metadata: Metadata = {
  title: "Like It, Wear It",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  )
}
