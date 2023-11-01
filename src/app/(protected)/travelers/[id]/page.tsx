import Profile from "@/src/features/Pages/Profile/Profile";
import { getUserJourneys } from "@/src/services/journeyApi";
import { getUser } from "@/src/services/userApi";

export async function generateMetadata({ params }: { params: { id: string } }) {
  const user = await getUser(params.id);

  return {
    title: user.name,
  };
}

async function page({ params }: { params: { id: string } }) {
  const user = await getUser(params.id);
  const journeys = await getUserJourneys(params.id);

  return <Profile isUser={false} user={user} userJourneys={journeys!} />;
}

export default page;
