import { Button } from "ui";
import { db, schema } from "database";

export default async function Home() {
  const users = await db.select().from(schema.users);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div>{users.at(0)?.email}</div>
      <Button>Click me</Button>
    </main>
  );
}
