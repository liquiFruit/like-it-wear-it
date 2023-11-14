"use client";

import { Button } from "ui";
import { tryCreateUser } from "src/actions";
import { useRouter } from "next/navigation";

export function CreateUserButton() {
  const router = useRouter();

  return (
    <Button
      onClick={async () => {
        await tryCreateUser("testing@email", "testing name");
        router.refresh();
      }}
    >
      Create user
    </Button>
  );
}
