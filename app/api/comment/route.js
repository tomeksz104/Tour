import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { NextResponse } from "next/server";
import dbConnect from "@/libs/dbConnect";

import Comment from "@/models/comment";

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

    const { content, placeId } = requestBody;

    const comment = new Comment({
      userId: session.user._id,
      content,
      placeId,
    });

    await comment.save();

    return new Response(JSON.stringify("Successfully added comment"), {
      status: 201,
    });
  } catch (error) {
    return new NextResponse(
      JSON.stringify({
        error: { global: "Error when adding a comment" },
      }),
      {
        status: 500,
      }
    );
  }
};
