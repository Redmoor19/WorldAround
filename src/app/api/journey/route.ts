import dbConnect from "@/src/lib/dbConnect";
import checkToken from "@/src/middleware/authToken";
import Journey, { StopType } from "@/src/models/Journey";
import { NextRequest, NextResponse } from "next/server";

function createJourneyObject(stops: []): {
  stops: [];
  cities: string[];
  countries: string[];
  createdBy?: string;
} {
  const cities: string[] = [],
    countries: string[] = [];

  stops.forEach((item: StopType) => {
    const cityIndex = cities.indexOf(item.city);
    if (cityIndex == -1) cities.push(item.city);
    const countryIndex = countries.indexOf(item.country);
    if (countryIndex == -1) countries.push(item.country);
  });

  return {
    stops: stops,
    cities,
    countries,
  };
}

export async function POST(request: NextRequest) {
  const token = await checkToken(request);
  if (!token)
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  const body = await request.json();

  if (!body) return NextResponse.json({ message: "No data provided" });

  const newJourney = createJourneyObject(body);
  newJourney.createdBy = token.sub!;

  await dbConnect();
  const res = await Journey.create(newJourney);
  if (!res)
    return NextResponse.json(
      { message: "Faild to load data to database" },
      { status: 503 }
    );
  return NextResponse.json({ data: res }, { status: 200 });
}

export async function PATCH(request: NextRequest) {
  const token = await checkToken(request);
  if (!token)
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  const body = await request.json();

  if (!body) return NextResponse.json({ message: "No data provided" });

  const newJourney = createJourneyObject(body.stops);

  await dbConnect();
  const res = await Journey.updateOne({ _id: body.id }, { ...newJourney });

  if (!res)
    return NextResponse.json(
      { message: "Faild to load data to database" },
      { status: 503 }
    );
  return NextResponse.json({ data: res }, { status: 200 });
}

export async function DELETE(request: NextRequest) {
  const token = await checkToken(request);
  if (!token)
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  const body = await request.json();

  if (!body) return NextResponse.json({ message: "No data provided" });

  const _id = body;

  await dbConnect();
  const res = await Journey.findOneAndRemove({ _id });

  if (!res)
    return NextResponse.json(
      { message: "Faild to delete item" },
      { status: 503 }
    );
  return NextResponse.json({ data: res }, { status: 200 });
}
