import Travelers from "@/src/features/Pages/Travelers/Travelers";
import { getAllUsers } from "@/src/services/userApi";
import sanitize from "@/src/utils/sanitizer";

export const metadata = {
  title: "Travelers",
};

async function TravelersPage() {
  const users = await getAllUsers();
  return <Travelers users={sanitize(users)} />;
}

export default TravelersPage;
