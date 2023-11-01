import calculateJourney from "@/src/utils/journeyCalculator";
import StatisticsCard from "./StatisticsCard";
import { IJourney } from "@/src/models/Journey";

type StatisticsType = {
  userJourneys: IJourney[];
};

function Statistics({ userJourneys }: StatisticsType) {
  const { topCities, topCountries, uniqueCities, uniqueCountries } =
    calculateJourney(userJourneys);
  const statistics = [
    { title: "Journeys", icon: "/journeys.png", amount: userJourneys.length },
    {
      title: "Countries",
      icon: "/countries.png",
      amount: uniqueCountries.length,
      additional: topCountries,
    },
    {
      title: "Cities",
      icon: "/cities.png",
      amount: uniqueCities.length,
      additional: topCities,
    },
  ];
  return (
    <article className="bg-slate-600 px-7 py-4 text-white">
      <div className="profile_container">
        <h2 className="text-center text-2xl">Travel statistics</h2>
        <ul className="flex justify-around mt-3">
          {statistics.map((item) => (
            <StatisticsCard key={item.title} {...item} />
          ))}
        </ul>
      </div>
    </article>
  );
}

export default Statistics;
