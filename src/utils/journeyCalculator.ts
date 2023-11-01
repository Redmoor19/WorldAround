import { IJourney } from "../models/Journey";

export default function calculateJourney(journeyArr: IJourney[]) {
  const allCountries = journeyArr.reduce(
    (sum: string[], curr) => [...sum, ...curr.countries],
    []
  );
  const allCities = journeyArr.reduce(
    (sum: string[], curr) => [...sum, ...curr.cities],
    []
  );

  function countTop(arr: string[]) {
    const counts: { [key: string]: number } = {};

    arr.forEach((item) => {
      counts[item] = (counts[item] || 0) + 1;
    });

    const countsArray = Object.keys(counts).map((item) => ({
      item: item,
      amount: counts[item],
    }));

    const sortedArr = countsArray.sort((a, b) => b.amount - a.amount);
    const top3 = sortedArr.slice(0, 3);

    return top3;
  }

  const uniqueCountries = Array.from(new Set(allCountries));
  const uniqueCities = Array.from(new Set(allCities));
  const topCountries = countTop(allCountries);
  const topCities = countTop(allCities);

  return {
    uniqueCities,
    uniqueCountries,
    topCities,
    topCountries,
  };
}
