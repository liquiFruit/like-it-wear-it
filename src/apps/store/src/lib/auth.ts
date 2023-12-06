import { AdapterUser } from "@auth/core/adapters"
import { DrizzleAdapter } from "@auth/drizzle-adapter"
import { and, db, eq } from "@like-it-wear-it/database"
import { accounts, users } from "@like-it-wear-it/database/src/schema/auth"
import { GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET } from "@like-it-wear-it/env"
import {
  DefaultSession,
  DefaultUser,
  getServerSession,
  Session,
  User,
} from "next-auth"
import GithubProvider from "next-auth/providers/github"

declare module "next-auth" {
  interface Session {
    user: DefaultSession["user"] & {
      id: string
    }
  }
}

export const authOptions = {
  adapter: {
    ...DrizzleAdapter(db),

    async getUserByAccount(
      account: Pick<
        typeof accounts.$inferSelect,
        "provider" | "providerAccountId"
      >,
    ): Promise<AdapterUser | null> {
      const [result] = await db
        .select()
        .from(accounts)
        .leftJoin(users, eq(users.id, accounts.userId))
        .where(
          and(
            eq(accounts.provider, account.provider),
            eq(accounts.providerAccountId, account.providerAccountId),
          ),
        )
        .limit(1)

      if (!result || !result.user) return null

      return result.user
    },
  },
  callbacks: {
    session: ({ session, user }: { session: Session; user: User }) => {
      session.user.id = user.id
      return session
    },
  },
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
