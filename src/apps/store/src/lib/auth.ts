import { getServerSession } from "next-auth"
import GithubProvider from "next-auth/providers/github"

import { GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET } from "@/env"

export const authOptions = {
  providers: [
    GithubProvider({
      clientId: GITHUB_CLIENT_ID,
      clientSecret: GITHUB_CLIENT_SECRET,
    }),
  ],
}

export async function getUserAuth() {
  return getServerSession(authOptions)
}
