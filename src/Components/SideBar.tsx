import Image from "next/image";
import NavBar from "./NavBar";

function SideBar() {
  return (
    <aside className="bg-slate-300 border-r-2 border-slate-400 flex flex-col gap-14">
      <Image
        src="/Logo.png"
        width={140}
        height={100}
        alt="Logo"
        className="self-center"
      />
      <NavBar />
    </aside>
  );
}

export default SideBar;
