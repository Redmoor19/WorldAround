import dbConnect from "@/src/lib/dbConnect";
import User from "@/src/models/User";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const data = await request.json();
  const { email, password } = data;

  try {
    await dbConnect();

    const isExisting = await User.findOne({ email });

    if (isExisting) {
      return NextResponse.json(
        {
          message: "User with such email already exists",
        },
        { status: 409 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = {
      ...data,
      password: hashedPassword,
    };

    await User.create(newUser);

    return NextResponse.json(
      { message: "Success" },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        message: "Unauthorized",
      },
      { status: 401 }
    );
  }
}
