import "../styles/globals.css";
import Provider from "../providers/SessionProvider";
import ToastProvider from "../providers/ToastProvider";
import { serverSession } from "../utils/getServerSession";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await serverSession();
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/logo.png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Playpen+Sans:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen">
        <Provider session={session}>
          <ToastProvider>{children}</ToastProvider>
        </Provider>
      </body>
    </html>
  );
}
