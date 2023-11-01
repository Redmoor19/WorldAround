import { BsFillPersonFill } from "react-icons/bs";
import NavLink from "./NavLink";
import { MdDashboard } from "react-icons/md";
import { PiUsersThreeFill } from "react-icons/pi";

function NavBar() {
  const navLinks = [
    {
      title: "Profile",
      src: "/profile",
      icon: <BsFillPersonFill />,
    },
    {
      title: "Dashboard",
      src: "/dashboard",
      icon: <MdDashboard />,
    },
    {
      title: "Travelers",
      src: "/travelers",
      icon: <PiUsersThreeFill />,
    },
  ];

  return (
    <nav className="pl-10 flex flex-col">
      {navLinks.map((link) => (
        <NavLink key={link.src} {...link} />
      ))}
    </nav>
  );
}

export default NavBar;
