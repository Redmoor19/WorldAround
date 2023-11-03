"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Button from "../../UI/Button";

function Navigation() {
  const { status } = useSession();
  const { push } = useRouter();

  return (
    <div className="flex items-center gap-3">
      <Button
        onClick={() => {
          status === "authenticated" ? push("/profile") : push("/login");
        }}
        type="primary"
      >
        Login
      </Button>
      <Button onClick={() => push("/register")} type="secondary">
        Register
      </Button>
    </div>
  );
}

export default Navigation;
