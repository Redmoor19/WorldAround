"use client";

import Image from "next/image";
import { IJourney } from "../../models/Journey";
import { dateToString } from "../../utils/dateToString";
import { useShowContex } from "./JourneyShowcase";
import FullJourneyView from "./FullJourneyView";

type JourneyViewProps = {
  journey: IJourney;
};

function JourneyView({ journey }: JourneyViewProps) {
  const { stops, countries, cities, _id } = journey;
  const { opened, openJourney, closeJourney } = useShowContex();

  const isOpened = opened === _id;

  const firstDate = dateToString(new Date(stops[0].date));

  function joinArrows(arr: string[]) {
    const slicedArr = arr.slice(0, 3);

    return (
      <div className="flex gap-2">
        {slicedArr.slice(0, 5).map((item, index) => (
          <p key={index} className="flex items-center gap-2">
            {item}
            {index !== arr.length - 1 && (
              <Image
                src="/arrow-point-to-right.png"
                width={10}
                height={10}
                alt="arrow"
              />
            )}
          </p>
        ))}
        {arr.length > slicedArr.length && "..."}
      </div>
    );
  }

  return (
    <li className="rounded-xl ring-2 ring-slate-600 bg-slate-200">
      {!isOpened ? (
        <div
          onClick={() => openJourney(_id)}
          className="grid grid-cols-[1fr_3fr_3fr_0.5fr] cursor-pointer px-5 py-3"
        >
          <p>{firstDate}</p>
          {joinArrows(countries)}
          {joinArrows(cities)}
        </div>
      ) : (
        <FullJourneyView {...journey} closeJourney={closeJourney} />
      )}
    </li>
  );
}

export default JourneyView;
