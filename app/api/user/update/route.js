import User from "@/models/user";
import dbConnect from "@/utils/dbConnect";
import { NextResponse } from "next/server";

import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

const tabs = ["profile", "socialmedia", "password"];

export const PATCH = async (request, response) => {
  const { tab, requestBody } = await request.json();

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

    const existingUser = await User.findById(requestBody.userId);

    if (!existingUser) {
      return new Response("User not found", { status: 404 });
    }

    switch (tab) {
      case tabs[0]:
        existingUser.username = requestBody.username;
        break;
      case tabs[1]:
        existingUser.facebook = requestBody.facebook;
        existingUser.instagram = requestBody.instagram;
        existingUser.twitter = requestBody.twitter;
        existingUser.youtube = requestBody.youtube;
        break;
      case tabs[2]:
        const oldPassword = requestBody.oldPassword;
        const newPassword = requestBody.newPassword;
        const confirmNewPassword = requestBody.confirmNewPassword;

        const isPasswordCorrect = await existingUser.comparePassword(
          oldPassword
        );

        if (!isPasswordCorrect) {
          // return new Response("Incorrect old password", { status: 400 });
          return new NextResponse(
            JSON.stringify({
              error: "Incorrect old password",
            }),
            {
              status: 400,
            }
          );
        }

        if (newPassword !== confirmNewPassword) {
          return new Response("Password and confirm password do not match", {
            status: 400,
          });
        }

        existingUser.password = newPassword;
        break;
    }

    await existingUser.save();

    return new Response(JSON.stringify("Successfully updated the user"), {
      status: 201,
    });
    // return response
    //   .status(200)
    //   .json({ message: "Successfully updated the user" });
  } catch (error) {
    return new Response("Error Updating Prompt", { status: 500 });
  }
};

// import User from "@/models/user";
// import dbConnect from "@/utils/dbConnect";

// export default async (req, res) => {
//   const { userId, email, name } = req.body;

//   await dbConnect();

//   try {
//     const updatedUser = await User.findByIdAndUpdate(
//       { _id: userId },
//       { email, name, name },
//       { new: true }
//     );

//     if (!updatedUser) {
//       return res.status(404).json({
//         error: { global: "User not found" },
//       });
//     } else {
//       console.log("SIEMA");
//     }

//     return res.status(200).json(updatedUser);
//   } catch (error) {
//     return res.status(500).json({
//       error: { global: "Failed to update user" },
//     });
//   }
// };
