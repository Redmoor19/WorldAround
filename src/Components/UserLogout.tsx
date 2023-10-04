"use client";

import Image from "next/image";
import { signOut } from "next-auth/react";
import { CustomSession } from "../utils/getServerSession";

type UserLogoutProps = {
  session: CustomSession;
};

function UserLogout({ session }: UserLogoutProps) {
  const { user } = session;
  return (
    <div className="absolute flex gap-3 top-2 right-5 bg-slate-600 py-3 px-5 items-center rounded-2xl z-30">
      <Image
        src="/default-avatar.jpg"
        width={30}
        height={30}
        alt="User avatar"
        className="object-fill rounded-full"
      />
      <h3 className="text-slate-50">{user?.name}</h3>
      <button
        className="bg-blue-500 py-2 px-4 rounded-xl text-white"
        onClick={() => signOut()}
      >
        Logout
      </button>
    </div>
  );
}

export default UserLogout;
