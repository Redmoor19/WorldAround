import { BsFillPersonFill } from "react-icons/bs";
import NavLink from "./NavLink";

function NavBar() {
  const navLinks = [
    {
      title: "Profile",
      src: "/profile",
      icon: <BsFillPersonFill />,
    },
    {
      title: "Profile",
      src: "/dds",
      icon: <BsFillPersonFill />,
    },
    {
      title: "Profile",
      src: "/sdf",
      icon: <BsFillPersonFill />,
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
