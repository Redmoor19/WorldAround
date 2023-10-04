"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

function Register() {
  const { push } = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //form validation

  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});

  const isRequided = (value: string) => (value ? "" : "This field is required");
  const isEmail = (value: string) =>
    /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)
      ? ""
      : "Email address must be valid";
  const isPassword = (value: string) =>
    value.length > 7 ? "" : "Password must be at list 8 characters long";

  const validationRules: { [key: string]: any[] } = {
    name: [isRequided],
    email: [isRequided, isEmail],
    password: [isRequided, isPassword],
  };

  function validateField(fieldName: string, value: string) {
    const fieldValidators = validationRules[fieldName];
    if (!fieldValidators) return;

    const fieldErrors = fieldValidators.map((validator) => validator(value));
    const error = fieldErrors.find((error) => error !== "");

    if (!fieldErrors) return;

    setFormErrors((errors) => ({ ...errors, [fieldName]: error }));
  }

  //form submit

  async function submitHandler(e: React.FormEvent) {
    e.preventDefault();
    if (formErrors.email || formErrors.name || formErrors.password) return;
    const credentials = { email, password, name };
    const res = await fetch("/api/register", {
      method: "POST",
      body: JSON.stringify(credentials),
    });
    if (!res.ok) {
      const { message } = await res.json();
      alert(message);
      return;
    }
    await signIn("credentials", { email, password, redirect: false });
    push("/profile");
  }

  return (
    <form className="auth_form" onSubmit={submitHandler}>
      <h2 className="text-center text-4xl">Sign Up</h2>
      <label className="text-lg flex flex-col gap-1" htmlFor="name">
        Name
        <input
          id="name"
          type="text"
          name="name"
          className="auth_input"
          value={name}
          onChange={(e) => {
            setName(e.target.value), setFormErrors({});
          }}
          onBlur={(e) => validateField(e.target.name, e.target.value)}
        />
        <p className="text-center text-red-500">{formErrors?.name}</p>
      </label>
      <label className="text-lg flex flex-col gap-1" htmlFor="email">
        Email
        <input
          id="email"
          type="text"
          name="email"
          className="auth_input"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value), setFormErrors({});
          }}
          onBlur={(e) => validateField(e.target.name, e.target.value)}
        />
        <p className="text-center text-red-500">{formErrors?.email}</p>
      </label>
      <label className="text-lg flex flex-col gap-1" htmlFor="password">
        Password
        <input
          id="password"
          type="password"
          name="password"
          className="auth_input"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value), setFormErrors({});
          }}
          onBlur={(e) => validateField(e.target.name, e.target.value)}
        />
        <p className="text-center text-red-500">{formErrors?.password}</p>
      </label>
      <button
        type="submit"
        className="bg-blue-800 px-5 py-3 rounded-lg text-white mt-6 text-xl font-semibold hover:outline hover:outline-4 hover:outline-blue-400 "
      >
        Register
      </button>
    </form>
  );
}

export default Register;
