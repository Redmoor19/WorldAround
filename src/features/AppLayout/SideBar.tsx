import Image from "next/image";
import NavBar from "./NavBar";
import HomeLink from "./HomeLink";

function SideBar() {
  return (
    <aside className="bg-slate-300 border-r-2 border-slate-400 flex flex-col gap-14">
      <HomeLink />
      <NavBar />
    </aside>
  );
}

export default SideBar;
