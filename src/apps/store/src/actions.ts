"use server"

import { createUser } from "database"

export async function tryCreateUser(email: string, name: string) {
  return createUser(email, name)
}
