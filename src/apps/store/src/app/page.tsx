import { Button } from "ui";
import { db } from "database";
import { users } from "database/src/schema";

export default async function Home() {
  console.log(await db.select().from(users));
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <Button>Click me</Button>
    </main>
  );
}
