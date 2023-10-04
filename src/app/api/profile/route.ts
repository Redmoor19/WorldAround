import dbConnect from "@/src/lib/dbConnect";
import checkToken from "@/src/middleware/authToken";
import User from "@/src/models/User";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const token = await checkToken(request);
  if (!token)
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  const body = await request.json();

  dbConnect();

  const updatedUser = await User.findOneAndUpdate(
    { _id: body._id },
    {
      name: "Inna",
    }
  );

  return NextResponse.json("It's you");
}
