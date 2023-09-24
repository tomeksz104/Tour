import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { isAdmin } from "@/libs/checkUser";
import { NextResponse } from "next/server";
import dbConnect from "@/libs/dbConnect";

import Comment from "@/models/comment";
import User from "@/models/user";

export const GET = async (request, { params }) => {
  let commentsWithUserData = [];

  try {
    await dbConnect();

    const comments = await Comment.find({ placeId: params.id });

    if (comments.length >= 1) {
      // Get user data for each comment
      commentsWithUserData = await Promise.all(
        comments.map(async (comment) => {
          const userData = await User.findById(comment.userId).select(
            "email role username avatar"
          );

          return {
            ...comment.toObject(),
            user: userData,
          };
        })
      );
    }

    return new Response(JSON.stringify(commentsWithUserData), { status: 200 });
  } catch (error) {
    return new Response("Internal Server Error", { status: 500 });
  }
};
