"use client";

import Image from "next/image";
import { useSession, signOut } from "next-auth/react";
import { useState } from "react";
import Button from "../UI/Button";

function UserLogout() {
  const { data } = useSession();

  return (
    <div
      className={`absolute flex gap-3 left-5 bottom-7 bg-slate-600 py-3 px-5 items-center rounded-2xl z-30`}
    >
      <Image
        src={data?.user?.image ? data.user.image : "/default-avatar.jpg"}
        width={30}
        height={30}
        alt="User avatar"
        className="object-cover rounded-full max-w-[30px] max-h-[30px]"
      />
      <h3 className="text-slate-50">{data?.user?.name}</h3>
      <Button onClick={() => signOut()}>Sign Out</Button>
    </div>
  );
}

export default UserLogout;
