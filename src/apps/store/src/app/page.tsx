import { Hero } from "src/components/layout/hero"
import { ProductSection } from "src/components/sections/product-section"

export default async function Home() {
  return (
    <main>
      <Hero />
      <ProductSection />
    </main>
  )
}
