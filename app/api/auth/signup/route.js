import { NextResponse } from "next/server";

import { db } from "@/lib/db";

import { hash } from "bcryptjs";

export const POST = async (request) => {
  const { email, password, confirmPassword } = await request.json();

  if (password !== confirmPassword) {
    return new NextResponse(
      JSON.stringify({
        error: { password: "Password and confirm password do not match" },
      }),
      {
        status: 400,
      }
    );
  }

  try {
    const existingUser = await db.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return new NextResponse(
        JSON.stringify({
          error: { email: "User with this email already exists" },
        }),
        {
          status: 409,
        }
      );
    }
    const hashed_password = await hash(password, 12);

    const newUser = await db.user.create({
      data: {
        email,
        password: hashed_password,
      },
    });

    return new Response(JSON.stringify(newUser), { status: 201 });
  } catch (error) {
    return new NextResponse(
      JSON.stringify({
        error: { global: "Failed to create a new account" },
      }),
      {
        status: 500,
      }
    );
  }
};
