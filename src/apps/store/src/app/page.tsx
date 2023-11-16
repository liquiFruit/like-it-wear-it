import { Hero } from "@/components/sections/hero"
import { ProductSection } from "@/components/sections/product-section"

export default async function Home() {
  return (
    <main>
      <Hero />
      <ProductSection />
    </main>
  )
}
