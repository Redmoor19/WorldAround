"use client";

import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";

export default function Home() {
  const session = useSession();
  console.log(session);

  return (
    <main>
      Home
      <button onClick={() => signOut()}>Logout</button>
    </main>
  );
}
