import { serverSession } from "@/src/utils/getServerSession";
import dbConnect from "@/src/lib/dbConnect";
import User, { IUser } from "@/src/models/User";

export async function getLoggedUser() {
  const session = await serverSession();
  if (!session) return;
  await dbConnect();
  const user = await User.findOne({ _id: session?.user?.id });
  return user;
}

export async function getAllUsers() {
  const session = await serverSession();
  if (!session) return;
  await dbConnect();

  const users: IUser[] = await User.find();
  return users;
}

export async function getUser(id: string) {
  const session = await serverSession();
  if (!session) return;
  await dbConnect();

  const user = await User.findOne({ _id: id });
  return user;
}
