import CredentialsProvider from "next-auth/providers/credentials";
import User from "@/src/models/User";
import dbConnect from "@/src/lib/dbConnect";
import bcrypt from "bcrypt";
import { AuthOptions } from "next-auth";
import { encode, decode } from "next-auth/jwt";

const authOptions: AuthOptions = {
  session: {
    strategy: "jwt",
  },
  jwt: { encode, decode },
  providers: [
    CredentialsProvider({
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        try {
          dbConnect();

          const foundUser = await User.findOne({
            email: credentials?.email,
          });

          if (!foundUser) {
            throw new Error("User not found");
          }

          const comparePass = await bcrypt.compare(
            credentials?.password!,
            foundUser.password
          );

          if (!comparePass) {
            throw new Error("Password missmatch");
          }

          const user = foundUser._doc;

          return {
            ...user,
            id: user._id,
            image: user.avatarUrl,
          };
        } catch (error) {
          if (typeof error === "string") throw new Error(error);
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, trigger, session, user }) {
      if (trigger === "update") {
        token.name = session.name;
        token.picture = session.image;
      }

      if (user) {
        return {
          ...token,
          id: user.id,
          name: user.name,
          picture: user.image,
        };
      }
      return token;
    },
    async session({ session, token }) {
      return {
        ...session,
        user: {
          id: token.id,
          email: token.email,
          name: token.name,
          image: token.picture,
        },
      };
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export default authOptions;
