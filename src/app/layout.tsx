import { getServerSession } from "next-auth";
import "../styles/globals.css";
import Provider from "../providers/SessionProvider";
import authOptions from "./api/auth/[...nextauth]/authOptions";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = getServerSession(authOptions);
  return (
    <html lang="en">
      <link rel="icon" href="/logo.png" />
      <body className="min-h-screen">
        <Provider session={session}>{children}</Provider>
      </body>
    </html>
  );
}
