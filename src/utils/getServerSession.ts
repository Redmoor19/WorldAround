import { getServerSession } from "next-auth";
import authOptions from "../app/api/auth/[...nextauth]/authOptions";

export interface CustomSession {
  user?: {
    id?: string | null;
    name?: string | null;
    email?: string | null;
    image?: string | null;
  };
  expires: string;
}

export async function serverSession(): Promise<CustomSession | null> {
  const session = await getServerSession(authOptions);
  if (session) return session;
  return null;
}
