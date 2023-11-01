import sanitize from "@/src/utils/sanitizer";

import { IJourney } from "@/src/models/Journey";
import { ShowProvider } from "../../JourneyDisplay/JourneyShowcase";
import JourneyView from "../../JourneyDisplay/JourneyView";

type JourneysType = {
  userJourneys: IJourney[];
};

function Journeys({ userJourneys }: JourneysType) {
  return (
    <article>
      <ShowProvider>
        <ul className=" profile_container flex flex-col gap-3 py-3">
          {userJourneys.map((journey) => {
            return (
              <JourneyView key={journey._id} journey={sanitize(journey)} />
            );
          })}
        </ul>
      </ShowProvider>
    </article>
  );
}

export default Journeys;
