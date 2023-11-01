"use client";

import "@uploadthing/react/styles.css";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";

import { IUser } from "../../../models/User";
import { UploadButton } from "../../../utils/uploadThings";
import Button from "../../UI/Button";

type UpdateProfileProps = {
  user: IUser;
  onClose?: () => void;
};

function UpdateProfile({ user, onClose }: UpdateProfileProps) {
  const router = useRouter();
  const { update } = useSession();
  const [form, setForm] = useState({
    name: "",
    country: "",
    city: "",
    avatarUrl: "",
  });

  function changeHandler(e: React.ChangeEvent<HTMLInputElement>) {
    setForm((form) => ({
      ...form,
      [e.target.name]: e.target.value.trim(),
    }));
  }

  async function handleUpdate() {
    const updatedUser = {
      id: user._id,
      name: form.name || user.name,
      country: form.country || user?.country || "",
      city: form.city || user?.city || "",
      avatarUrl: form.avatarUrl || user.avatarUrl || "",
    };
    const options = {
      method: "POST",
      body: JSON.stringify(updatedUser),
    };
    const res = await fetch("/api/profile", options);
    if (res.ok) {
      router.refresh();
      update({ name: updatedUser.name, image: updatedUser.avatarUrl });
      onClose!();
    }
  }
  return (
    <div className="grid grid-cols-2 items-center justify-start gap-y-7">
      <p>Upload avatar image: </p>
      <UploadButton
        endpoint="uploadAvatar"
        onClientUploadComplete={(res) => {
          toast.success("Avatar successfully uploaded!");
          setForm((prev) => ({
            ...prev,
            avatarUrl: res![0].url,
          }));
        }}
        onUploadError={(error: Error) => {
          toast.error("Image was not uploaded!");
        }}
      />
      <p>Upload profile background image: </p>
      <UploadButton
        endpoint="uploadProfileBg"
        onClientUploadComplete={(res) => {
          toast.success("Background successfully uploaded!");
        }}
        onUploadError={(error: Error) => {
          toast.error("Image was not uploaded!");
        }}
      />
      <label htmlFor="name">Username:</label>
      <input
        type="text"
        name="name"
        id="name"
        className="input"
        placeholder={user.name}
        onChange={changeHandler}
        value={form.name}
      />
      <label htmlFor="country">Country:</label>
      <input
        type="text"
        name="country"
        id="country"
        className="input"
        placeholder={user.country}
        onChange={changeHandler}
        value={form.country}
      />
      <label htmlFor="city">City:</label>
      <input
        type="text"
        name="city"
        id="city"
        className="input"
        placeholder={user.city}
        onChange={changeHandler}
        value={form.city}
      />
      <div className="col-start-2 flex gap-5 justify-self-end">
        <Button onClick={onClose} type="secondary">
          Cancel
        </Button>
        <Button onClick={handleUpdate} type="primary">
          Submit
        </Button>
      </div>
    </div>
  );
}

export default UpdateProfile;
