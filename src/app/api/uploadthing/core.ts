import checkToken from "@/src/middleware/authToken";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { NextRequest } from "next/server";
import dbConnect from "@/src/lib/dbConnect";
import User from "@/src/models/User";

const f = createUploadthing();

const auth = (req: NextRequest) => checkToken(req);

export const ourFileRouter = {
  uploadAvatar: f({ image: { maxFileSize: "4MB" } })
    .middleware(async ({ req }) => {
      const user = await auth(req);
      console.log(user);

      if (!user) throw new Error("Unauthorized");

      return { userId: user.id };
    })
    .onUploadComplete(async ({ file, metadata }) => {}),
  uploadProfileBg: f({ image: { maxFileSize: "8MB" } })
    .middleware(async ({ req }) => {
      const user = await auth(req);

      if (!user) throw new Error("Unauthorized");

      return { userId: user.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      await dbConnect();
      await User.findOneAndUpdate(
        { _id: metadata.userId },
        { bgUrl: file.url }
      );
    }),
  uploadStopImages: f({ image: { maxFileSize: "8MB", maxFileCount: 6 } })
    .middleware(async ({ req }) => {
      const user = await auth(req);

      if (!user) throw new Error("Unauthorized");

      return { userId: user.id };
    })
    .onUploadComplete(async () => {}),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
