"use client";

import { Button } from "ui";
import { createUser } from "database";

export function CreateUserButton() {
  return (
    <Button onClick={() => createUser("testing@email", "testing name")}>
      Create user
    </Button>
  );
}
