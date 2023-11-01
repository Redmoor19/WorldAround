import Journey from "@/src/models/Journey";
import { serverSession } from "../utils/getServerSession";

export async function getLoggedUserJourneys() {
  const session = await serverSession();
  const userJourneys = await Journey.find({
    createdBy: session?.user?.id,
  });

  return userJourneys;
}

export async function getUserJourneys(id: string) {
  const session = await serverSession();
  if (!session) return;
  const userJourneys = await Journey.find({
    createdBy: id,
  });

  return userJourneys;
}
