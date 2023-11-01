"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

function Login() {
  const { replace } = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function submitHandler(e: React.FormEvent) {
    e.preventDefault();

    const options = {
      email,
      password,
      redirect: false,
    };
    const res = await signIn("credentials", options);
    if (res?.error) {
      alert("Something went wrong. Try again!");
      return;
    }

    replace("/profile");
  }

  return (
    <form className="auth_form" onSubmit={submitHandler}>
      <h2 className="text-center text-4xl">Sign In</h2>
      <label className="text-lg flex flex-col gap-1" htmlFor="email">
        Email
        <input
          id="email"
          type="text"
          name="email"
          className="auth_input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </label>
      <label className="text-lg flex flex-col gap-1" htmlFor="password">
        Password
        <input
          id="password"
          type="password"
          name="password"
          className="auth_input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>

      <Link
        href="/register"
        className="underline hover:text-blue-500 cursor-pointer mt-6"
      >
        Don't have an account yet?
      </Link>

      <button
        type="submit"
        className="bg-blue-800 px-5 py-3 rounded-lg text-white mt-1 text-xl font-semibold hover:outline hover:outline-4 hover:outline-blue-400 "
      >
        Login
      </button>
    </form>
  );
}

export default Login;
