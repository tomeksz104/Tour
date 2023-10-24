"use client";

import { useRouter } from "next/navigation";
import { getSession, useSession } from "next-auth/react";
import { useEffect, useState } from "react";

import LoginForm from "@/components/Auth/LoginForm";

function Login() {
  const router = useRouter();

  useEffect(() => {
    getSession().then((session) => {
      if (session?.user?.email) {
        router.push("/");
      }
    });
  }, [router]);

  return <LoginForm />;
}

export default Login;
