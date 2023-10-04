import { getToken } from "next-auth/jwt";
import { NextRequest } from "next/server";

const secret = process.env.NEXTAUTH_SECRET;

export default async function checkToken(req: NextRequest) {
  const token = await getToken({ req, secret });
  if (!token) return null;
  return token;
}
