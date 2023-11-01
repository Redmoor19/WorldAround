import Profile from "@/src/features/Pages/Profile/Profile";
import { getLoggedUserJourneys } from "@/src/services/journeyApi";
import { getLoggedUser } from "@/src/services/userApi";
import { serverSession } from "@/src/utils/getServerSession";

export async function generateMetadata() {
  const session = await serverSession();

  return {
    title: session?.user?.name,
  };
}

export default async function ProfilePage() {
  const user = await getLoggedUser();
  const userJourneys = await getLoggedUserJourneys();
  return <Profile isUser={true} user={user} userJourneys={userJourneys} />;
}
