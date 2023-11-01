import dbConnect from "@/src/lib/dbConnect";
import checkToken from "@/src/middleware/authToken";
import User from "@/src/models/User";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const token = await checkToken(request);
  if (!token)
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  const body = await request.json();
  if (token.id !== body.id)
    return NextResponse.json({ message: "Unpermited action" }, { status: 401 });

  try {
    dbConnect();
    delete body._id;

    await User.findOneAndUpdate(
      { _id: body.id },
      {
        ...body,
      }
    );

    return NextResponse.json("It's you");
  } catch (e) {
    return NextResponse.json(e);
  }
}
