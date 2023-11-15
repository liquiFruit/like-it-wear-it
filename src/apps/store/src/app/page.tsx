import { getUsers } from "database"
import { CreateUserButton } from "src/components/create-user-button"

export default async function Home() {
  const users = await getUsers()

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div>{JSON.stringify(users)}</div>
      <CreateUserButton />
    </main>
  )
}
