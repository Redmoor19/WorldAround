import { redirect } from "next/navigation";
import { serverSession } from "@/src/utils/getServerSession";
import SideBar from "@/src/features/AppLayout/SideBar";
import UserLogout from "@/src/features/AppLayout/UserLogout";

async function layout({ children }: { children: React.ReactNode }) {
  const session = await serverSession();

  if (!session) redirect("/login");
  if (!session) return null;

  return (
    <main className="h-full grid grid-cols-[20rem_auto] relative">
      <SideBar />
      <main>
        <UserLogout />
        {children}
      </main>
    </main>
  );
}

export default layout;
