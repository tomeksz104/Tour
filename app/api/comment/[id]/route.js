import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { isAdmin } from "@/libs/checkUser";
import { NextResponse } from "next/server";

import Comment from "@/models/comment";
import dbConnect from "@/libs/dbConnect";

export const GET = async (request, { params }) => {
  try {
    await dbConnect();

    const comment = await Comment.findById(params.id);
    if (!comment) return new Response("Comment Not Found", { status: 404 });

    return new Response(JSON.stringify(comment), { status: 200 });
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
        error: "You are not logged in.",
      }),
      {
        status: 401,
      }
    );
  }

  try {
    await dbConnect();

    // Find the existing comment by ID
    const comment = await Comment.findById(params.id);

    if (!comment) {
      return new NextResponse(
        JSON.stringify({
          error: "Comment not found",
        }),
        {
          status: 404,
        }
      );
    }

    // Check if the user is the author of the comment or has an admin role
    const isAdminUser = await isAdmin(request);
    const userId = session.user._id;
    const authorId = comment.userId.toString();

    if (!isAdminUser || userId !== authorId) {
      return new NextResponse(
        JSON.stringify({
          error: "You do not have permission to edit this comment",
        }),
        {
          status: 401,
        }
      );
    }

    // Update the comment with new data
    comment.content = requestBody.content;

    await comment.save();

    return new Response(JSON.stringify("Successfully updated the comment"), {
      status: 201,
    });
  } catch (error) {
    return new NextResponse(
      JSON.stringify({
        error: "Error updating comment",
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
        error: "You are not logged in",
      }),
      {
        status: 404,
      }
    );
  }

  try {
    await dbConnect();

    // Find the comment by ID and remove it
    await Comment.findByIdAndRemove(params.id);

    return new Response(JSON.stringify("Comment deleted successfully"), {
      status: 201,
    });
  } catch (error) {
    return new NextResponse(
      JSON.stringify({
        error: "Error when deleting a comment",
      }),
      {
        status: 500,
      }
    );
  }
};
