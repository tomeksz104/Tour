"use client";

import { useRouter } from "next/navigation";
import { getSession, useSession } from "next-auth/react";
import { useEffect, useState } from "react";

import LoginForm from "@/components/Auth/LoginForm";

function Login() {
  const { data: session } = useSession();
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    getSession().then((session) => {
      if (session?.user?.email) {
        router.push("/");
      } else {
        setIsLoading(false);
      }
    });
  }, [router]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return <LoginForm />;
}

export default Login;
