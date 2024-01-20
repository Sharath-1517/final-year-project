import { Button } from "@repo/ui/index";
import React from "react";

export default function Page(): React.ReactNode {
  return (
    <main>
      <h1 className="text-3xl"></h1>
      <Button variant={"destructive"}>Hello</Button>
    </main>
  );
}
