"use client";

import { useRouter } from "next/navigation";
import { getSession, useSession } from "next-auth/react";
import { useEffect, useState } from "react";

import RegisterForm from "@/components/Auth/RegisterForm";

function Register() {
  const router = useRouter();

  useEffect(() => {
    getSession().then((session) => {
      if (session?.user?.email) {
        router.push("/");
      }
    });
  }, [router]);

  return <RegisterForm />;
}

export default Register;
