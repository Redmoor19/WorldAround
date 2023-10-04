function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="w-screen h-screen bg-center bg-no-repeat bg-cover grid grid-cols-[40rem] justify-center content-center"
      style={{ backgroundImage: `url("/auth-background.jpg")` }}
    >
      {children}
    </div>
  );
}

export default AuthLayout;
