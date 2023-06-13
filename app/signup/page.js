"use client";

import { useRouter } from "next/navigation";
import { getSession, useSession } from "next-auth/react";
import { useEffect, useState } from "react";

import RegisterForm from "@/components/Auth/RegisterForm";

function Register() {
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

  return <RegisterForm />;
}

export default Register;
