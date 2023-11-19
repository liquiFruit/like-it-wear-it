import type { Metadata } from "next"

import { Navbar } from "@/components/layout/navbar"

import "./globals.css"

import Providers from "./providers"

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
        <Providers>
          <Navbar />
          {children}
        </Providers>
      </body>
    </html>
  )
}
