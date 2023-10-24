import { useState, useRef } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

import AuthCard from "./AuthCard";
import Input from "@/components/Input";
import Button from "@/components/Button";
import InputError from "../InputError";
import Link from "next/link";
import { useToast } from "@/hooks/useToast";

function RegisterForm() {
  const router = useRouter();
  const toast = useToast();
  const [error, setError] = useState(false);
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const confirmPasswordInputRef = useRef();

  async function submitHandler(event) {
    event.preventDefault();

    setError(false);

    const email = emailInputRef.current.value;
    const password = passwordInputRef.current.value;
    const confirmPassword = confirmPasswordInputRef.current.value;

    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        body: JSON.stringify({ email, password, confirmPassword }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      router.replace("/");
      toast.success("Register successful");
      if (!response.ok) {
        const { error } = await response.json();

        setError(error);
      }
    } catch (error) {
      setError({ global: "Failed to create a new account" });
    }
  }

  return (
    <AuthCard>
      <h3 className="text-2xl font-semibold text-gray-700 dark:text-white">
        Create new account
      </h3>
      {/* Google Provider */}
      {/* <button className="w-full h-11 rounded-full border border-gray-300/75 bg-white px-6 mt-12 transition active:bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:hover:bg-gray-800 dark:hover:border-gray-700">
        <div className="w-full mx-auto flex items-center justify-center space-x-4">
          <img src="/google.svg" alt="Google logo" className="w-5" />
          <span className="block w-full text-sm font-semibold tracking-wide text-cyan-700 dark:text-white">
            With Google
          </span>
        </div>
      </button> */}

      <form onSubmit={submitHandler}>
        {/* Email Address */}
        <div className="mt-10">
          <Input
            id="email"
            type="email"
            className="block w-full"
            ref={emailInputRef}
            placeholder="E-mail"
            isInvalid={error?.email ? true : false}
          />

          <InputError messages={[error?.email]} className="mt-2" />
        </div>

        {/* Password */}
        <div className="mt-8">
          <Input
            id="password"
            type="password"
            className="block w-full"
            ref={passwordInputRef}
            placeholder="Password"
            isInvalid={error?.password ? true : false}
          />
        </div>

        <div className="mt-8">
          <Input
            id="confirmPassword"
            type="password"
            className="block w-full"
            ref={confirmPasswordInputRef}
            placeholder="Confirm password"
            isInvalid={error?.password ? true : false}
          />

          <InputError
            messages={[error?.global, error?.password]}
            className="mt-2"
          />
        </div>

        {/* Submit button */}
        <Button className="w-full mt-8">Sign up</Button>

        <div className="pt-3">
          <span className="text-sm">Already have an account? </span>
          <Link
            href="/signin"
            className="text-sm text-blue-500 hover:underline"
          >
            Sign in
          </Link>
        </div>
      </form>
    </AuthCard>
  );
}

export default RegisterForm;
