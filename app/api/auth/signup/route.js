import { NextResponse } from "next/server";

import User from "@/models/user";
import dbConnect from "@/libs/dbConnect";

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
    await dbConnect();

    const existingUser = await User.findOne({ email });

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

    const newUser = await User.create({ email, password });

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
