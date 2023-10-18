import Place from "@/models/place";
import dbConnect from "@/libs/dbConnect";

import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { isAdmin } from "@/libs/checkUser";
import { NextResponse } from "next/server";

export const GET = async (request, { params }) => {
  try {
    await dbConnect();

    const place = await Place.findById(params.id);
    if (!place) return new Response("Place Not Found", { status: 404 });

    return new Response(JSON.stringify(place), { status: 200 });
  } catch (error) {
    return new Response("Internal Server Error", { status: 500 });
  }
};

export const PATCH = async (request, { params }) => {
  const { requestBody } = await request.json();

  const session = await getServerSession(authOptions);

  if (!session) {
    return new NextResponse(
      JSON.stringify({
        error: { global: "You are not logged in" },
      }),
      {
        status: 404,
      }
    );
  }

  try {
    await dbConnect();

    // Find the existing place by ID
    const existingPlace = await Place.findById(params.id);

    if (!existingPlace) {
      return new NextResponse(
        JSON.stringify({
          error: { global: "Place not found" },
        }),
        {
          status: 404,
        }
      );
    }

    // Check if the user is the author of the attraction or has an admin role
    const isAdminUser = await isAdmin(request);
    const userId = session.user._id;
    const authorId = existingPlace.userId.toString();

    if (!isAdminUser || userId !== authorId) {
      return new NextResponse(
        JSON.stringify({
          error: { global: "You do not have permission to edit this place" },
        }),
        {
          status: 401,
        }
      );
    }

    let updatedImages;

    if (isAdminUser) {
      updatedImages = requestBody.images.map((image) => ({
        ...image,
        accepted: true,
      }));
    }

    // Update the place with new data
    existingPlace.category = requestBody.category;
    existingPlace.coordinates = requestBody.coordinates;
    existingPlace.image = requestBody.image;
    existingPlace.images = updatedImages ? updatedImages : requestBody.images;
    existingPlace.title = requestBody.title;
    existingPlace.description = requestBody.description;
    existingPlace.googleMapUrl = requestBody.googleMapUrl;

    await existingPlace.save();

    return new Response(JSON.stringify("Successfully updated the place"), {
      status: 201,
    });
  } catch (error) {
    return new NextResponse(
      JSON.stringify({
        error: { global: "Error updating place" },
      }),
      {
        status: 500,
      }
    );
  }
};

export const DELETE = async (request, { params }) => {
  const session = await getServerSession(authOptions);

  if (!session) {
    return new NextResponse(
      JSON.stringify({
        error: { global: "You are not logged in" },
      }),
      {
        status: 404,
      }
    );
  }

  try {
    await dbConnect();

    // Find the place by ID and remove it
    await Place.findByIdAndRemove(params.id);

    return new Response(JSON.stringify("Place deleted successfully"), {
      status: 201,
    });
  } catch (error) {
    return new NextResponse(
      JSON.stringify({
        error: { global: "Error deleting place" },
      }),
      {
        status: 500,
      }
    );
  }
};
