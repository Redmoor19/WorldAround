import { IJourney } from "../models/Journey";

const monthNames = [
  "January",
  "February",
  "March",
  "Aprip",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export default function journeyFormatter(arr: IJourney[]) {
  const mappedArr = arr.map((journey) => {
    const allYears = journey.stops.map((stop) =>
      new Date(stop.date).getFullYear()
    );
    const journeyYear = Array.from(new Set(allYears))[0];

    const allMonth = journey.stops.map((stop) =>
      new Date(stop.date).getMonth()
    );
    const journeyMonth = Array.from(new Set(allMonth))[0];

    return {
      id: journey._id,
      year: journeyYear,
      month: monthNames[journeyMonth],
      countries: journey.countries,
    };
  });

  function sortingByKey(arr: any[], key: any, newField: string) {
    const sortObj: any = {};

    arr.forEach((item) => {
      const newObj = { ...item };
      delete newObj[key];

      if (!sortObj[item[key]]) {
        sortObj[item[key]] = [{ ...newObj }];
      } else {
        sortObj[item[key]] = [...sortObj[item[key]], { ...newObj }];
      }
    });

    const sortArr: any = Object.keys(sortObj).map((item) => ({
      [key]: item,
      [newField]: sortObj[item],
    }));
    return sortArr;
  }

  const sortedByYear = sortingByKey(mappedArr, "year", "jourenys").sort(
    (a: any, b: any) => b.year - a.year
  );
  const sortedByYearAndMonth = sortedByYear.map((item: any) => ({
    year: item.year,
    months: sortingByKey(item.jourenys, "month", "journeys").sort(
      (a: any, b: any) => {
        const customOrder = [
          "December",
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
          "August",
          "September",
          "October",
          "November",
        ];

        return customOrder.indexOf(b.month) - customOrder.indexOf(a.month);
      }
    ),
  }));

  return sortedByYearAndMonth;
}
