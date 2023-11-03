"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

function HomeLink() {
  const { push } = useRouter();
  return (
    <Image
      onClick={() => push("/")}
      src="/Logo.png"
      width={140}
      height={100}
      alt="Logo"
      className="self-center cursor-pointer"
    />
  );
}

export default HomeLink;
