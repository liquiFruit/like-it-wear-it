import { sql } from "drizzle-orm"

import { db, eq } from "../.."
import { CartProduct, carts } from "../../schema/carts"
import { products } from "../../schema/products"

const cartProductsByUserId = db
  .select({
    id: products.id,
    createdAt: products.createdAt,
    name: products.name,
    description: products.description,
    price: products.price,
    stock: products.stock,
    images: products.images,

    addedAt: carts.addedAt,
  })
  .from(products)
  .innerJoin(carts, eq(products.id, carts.productId))
  .where(eq(carts.userId, sql.placeholder("userId")))
  .prepare()

export async function getCartProductsByUserId(
  userId: string,
): Promise<CartProduct[]> {
  return cartProductsByUserId.execute({ userId })
}
