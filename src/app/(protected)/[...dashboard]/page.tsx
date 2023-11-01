import Dashboard from "@/src/features/Pages/Dashboard/Dashboard";
import { getLoggedUserJourneys } from "@/src/services/journeyApi";

export const metadata = {
  title: "Dashboard",
};

type DashboardPageType = {
  params: {
    dashboard: string[];
  };
};

export default async function DashboardPage({ params }: DashboardPageType) {
  const journeyId = params.dashboard[1] ?? null;
  const userJourneys = await getLoggedUserJourneys();

  const editableJourney =
    journeyId === null
      ? null
      : userJourneys.find((item) => item._id.toString() === journeyId);

  return (
    <Dashboard editableJourney={editableJourney} userJourneys={userJourneys} />
  );
}
