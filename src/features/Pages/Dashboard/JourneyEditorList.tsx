"use client";

import { IJourney } from "@/src/models/Journey";
import journeyFormatter from "@/src/utils/journeyFormatter";
import FallingList from "../../UI/FallingList";
import JourneyEditorItem from "./JourneyEditorItem";

type JourneyEditorListType = {
  userJourneys: IJourney[];
};

function JourneyEditorList({ userJourneys }: JourneyEditorListType) {
  const formatedJourneys = journeyFormatter(userJourneys);
  return (
    <aside className="rounded-lg py-3 px-5 bg-slate-300 overflow-hidden">
      <ul className="flex flex-col gap-1 justify-start items-stretch ">
        {formatedJourneys.map((item: any) => (
          <FallingList
            key={item.year}
            classTitle="py-1 text-center font-bold text-slate-800 ring-1 ring-slate-400 rounded hover:scale-[102%]"
            data={item.months}
            title={item.year}
            render={(data) =>
              data.map((item) => (
                <FallingList
                  classTitle="py-1 text-center bg-slate-400 font-semibold rounded hover:scale-[102%]"
                  key={item.month}
                  data={item.journeys}
                  title={item.month}
                  render={(data) =>
                    data.map((item) => (
                      <JourneyEditorItem
                        key={item.id}
                        id={item.id}
                        countries={item.countries}
                      />
                    ))
                  }
                />
              ))
            }
          />
        ))}
      </ul>
    </aside>
  );
}

export default JourneyEditorList;
