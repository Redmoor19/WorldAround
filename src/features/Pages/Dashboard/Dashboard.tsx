import DnDProvider from "@/src/providers/DnDProvider";
import JourneyEditor from "./JourneyEditor";
import JourneyEditorList from "./JourneyEditorList";
import { IJourney } from "@/src/models/Journey";
import sanitize from "@/src/utils/sanitizer";

type DashboardType = {
  userJourneys: IJourney[];
  editableJourney: IJourney;
};

function Dashboard({ userJourneys, editableJourney }: DashboardType) {
  return (
    <section className="bg-slate-100 h-screen">
      <div className="grid grid-cols-[3fr_1fr] py-4 px-4 gap-x-3 h-full">
        <DnDProvider>
          <JourneyEditor editableJourney={sanitize(editableJourney)} />
        </DnDProvider>
        <JourneyEditorList userJourneys={sanitize(userJourneys)} />
      </div>
    </section>
  );
}

export default Dashboard;
