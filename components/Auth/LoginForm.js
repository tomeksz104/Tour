import { useState, useRef } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

import AuthCard from "./AuthCard";
import Input from "@/components/Input";
import Button from "@/components/Button";
import Link from "next/link";

function LoginForm() {
  const router = useRouter();
  const [error, setError] = useState(false);
  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  async function submitHandler(event) {
    event.preventDefault();

    setError(false);

    if (!emailInputRef.current.value)
      return setError("The email address cannot be empty");
    if (!passwordInputRef.current.value)
      return setError("The password cannot be empty");

    const response = await signIn("credentials", {
      redirect: false,
      email: emailInputRef.current.value,
      password: passwordInputRef.current.value,
    });

    if (!response.ok) {
      const { error } = await response.json();

      setError(error);
    }

    if ("error" in response) {
      setError(response.error);
    }
  }

  return (
    <AuthCard>
      <h3 className="text-2xl font-semibold text-gray-700 dark:text-white">
        Welcome back
      </h3>
      {/* Google Provider */}
      <button className="w-full h-11 rounded-full border border-gray-300/75 bg-white px-6 mt-12 transition active:bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:hover:bg-gray-800 dark:hover:border-gray-700">
        <div className="w-full mx-auto flex items-center justify-center space-x-4">
          <img
            src="/assets/icons/google.svg"
            alt="Google logo"
            className="w-5"
          />
          <span className="block w-full text-sm font-semibold tracking-wide text-cyan-700 dark:text-white">
            With Google
          </span>
        </div>
      </button>

      <form onSubmit={submitHandler}>
        {/* Email Address */}
        <div className="mt-10">
          <Input
            id="email"
            type="email"
            className="block w-full"
            ref={emailInputRef}
            placeholder="E-mail"
          />
        </div>

        {/* Password */}
        <div className="mt-8">
          <Input
            id="password"
            type="password"
            className="block w-full"
            ref={passwordInputRef}
            placeholder="Password"
            autoComplete="current-password"
          />

          {error && <p className="text-sm text-red-600">{error}</p>}
        </div>

        {/* Remember Me & Forgot Password */}
        <div className="mt-8 flex justify-between gap-1 text-sm">
          <div className="flex items-center gap-2 font-medium">
            <input
              id="remember"
              className="rounded border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              type="checkbox"
              name="remember"
            />

            <label htmlFor="remember" className="text-gray-600">
              Stay logged in
            </label>
          </div>

          <a href="#" className="text-sm text-blue-500 hover:underline">
            Forgot your password?
          </a>
        </div>

        {/* Submit button */}

        <Button className="mt-8">Login</Button>

        <div className="pt-3">
          <span className="text-sm">Don't have an account? </span>
          <Link
            href="/signup"
            className="text-sm text-blue-500 hover:underline"
          >
            Create new account
          </Link>
        </div>
      </form>
    </AuthCard>
  );
}

export default LoginForm;
