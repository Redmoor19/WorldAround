"use client";

import Link from "next/link";
import { ReactElement } from "react";
import { IconType } from "react-icons";
import { usePathname } from "next/navigation";

type LinkProps = {
  title: string;
  src: string;
  icon: ReactElement<IconType>;
};

function NavLink({ title, src, icon }: LinkProps) {
  const pathname = usePathname();
  const isActive = pathname === src;

  return (
    <Link
      href={src}
      className={`flex items-center text-xl gap-3 py-2 hover:scale-110 transition-all duration-100 ${
        isActive ? "text-slate-800" : "text-slate-500"
      }`}
    >
      {icon}
      {title}
    </Link>
  );
}

export default NavLink;
