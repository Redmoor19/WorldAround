"use client";

import { IUser } from "../models/User";
import { useRouter } from "next/navigation";

type UpdateProfileProps = {
  user: IUser;
  onClose?: () => void;
};

function UpdateProfile({ user, onClose }: UpdateProfileProps) {
  const router = useRouter();

  async function updateProfile() {
    const options = {
      method: "POST",
      body: JSON.stringify(user),
    };
    const res = await fetch("/api/profile", options);
    if (res.ok) {
      router.refresh();
      onClose!();
    }
  }
  return (
    <div onClick={updateProfile}>
      <button>Click me</button>
    </div>
  );
}

export default UpdateProfile;
