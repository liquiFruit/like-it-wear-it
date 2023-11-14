"use server";

import { createUser } from "database";

export async function tryCreateUser(email: string, name: string) {
  console.log("Hit");
  return createUser(email, name);
}
