import { redirect } from "next/navigation";
import { serverSession } from "@/src/utils/getServerSession";

import UserLogout from "@/src/Components/UserLogout";
import SideBar from "@/src/Components/SideBar";

export async function generateMetadata() {
  const session = await serverSession();

  return {
    title: session?.user?.name,
  };
}

async function layout({ children }: { children: React.ReactNode }) {
  const session = await serverSession();

  if (!session) redirect("/login");
  if (!session) return null;

  return (
    <main className="h-full grid grid-cols-[20rem_auto] relative">
      <SideBar />
      <main>
        <UserLogout session={session} />
        {children}
      </main>
    </main>
  );
}

export default layout;
