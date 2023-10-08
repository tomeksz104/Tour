import Place from "@/models/place";
import dbConnect from "@/libs/dbConnect";
import { NextResponse } from "next/server";

import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { isAdmin } from "@/libs/checkUser";

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
      images,
      category,
      title,
      description,
      googleMapUrl,
    } = requestBody;

    let updatedImages;
    const isAdminUser = await isAdmin(request);

    if (isAdminUser) {
      updatedImages = images.map((image) => ({
        ...image,
        accepted: true,
      }));
    }

    const newPlace = new Place({
      userId: session.user._id,
      category,
      coordinates,
      image,
      images: updatedImages ? updatedImages : images,
      title,
      description,
      googleMapUrl,
    });

    await newPlace.save();

    return new Response(JSON.stringify("Successfully created the place"), {
      status: 201,
    });
  } catch (error) {
    return new NextResponse(
      JSON.stringify({
        error: { global: "Error Creating Place" },
      }),
      {
        status: 500,
      }
    );
  }
};
