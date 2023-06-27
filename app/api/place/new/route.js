import Place from "@/models/place";
import dbConnect from "@/utils/dbConnect";
import { NextResponse } from "next/server";

import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export const POST = async (request, response) => {
  const { requestBody } = await request.json();

  const session = await getServerSession(authOptions);

  if (!session) {
    return new NextResponse(
      JSON.stringify({
        error: "You are not logged in.",
      }),
      {
        status: 401,
      }
    );
  }

  try {
    await dbConnect();

    const {
      coordinates,
      image,
      category,
      title,
      shortDescription,
      description,
      googleMapUrl,
    } = requestBody;

    const newPlace = new Place({
      userId: session.user._id,
      category,
      coordinates,
      image,
      title,
      shortDescription,
      description,
      googleMapUrl,
    });

    await newPlace.save();

    return new Response(JSON.stringify("Successfully created the place"), {
      status: 201,
    });
  } catch (error) {
    return new Response("Error Creating Place", { status: 500 });
  }
};
