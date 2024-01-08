import { NextResponse } from "next/server";

import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

import { db } from "@/lib/db";

import { hash, compare } from "bcryptjs";

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
    switch (tab) {
      case tabs[0]:
        await db.user.update({
          where: { id: session.user.id },
          data: {
            username: requestBody.username,
            firstName: requestBody.firstName,
            lastName: requestBody.lastName,
            aboutme: requestBody.aboutme,
          },
        });

        break;
      case tabs[1]:
        const socialMediaLinks = requestBody.socialMediaLinks;

        for (const platformId in socialMediaLinks) {
          const link = socialMediaLinks[platformId];
          const platformIdNumber = parseInt(platformId);

          if (link) {
            await db.userSocialMedia.upsert({
              where: {
                userId_platformId: {
                  userId: session.user.id,
                  platformId: platformIdNumber,
                },
              },
              update: {
                link: link,
              },
              create: {
                userId: session.user.id,
                platformId: platformIdNumber,
                link: link,
              },
            });
          } else {
            await db.userSocialMedia
              .delete({
                where: {
                  userId_platformId: {
                    userId: session.user.id,
                    platformId: platformIdNumber,
                  },
                },
              })
              .catch((error) => {
                console.error(error);
              });
          }
        }

        break;
      case tabs[2]:
        const { oldPassword, newPassword, confirmNewPassword } = requestBody;

        if (newPassword !== confirmNewPassword) {
          return new NextResponse(
            JSON.stringify({
              error: "Password and confirm password do not match",
            }),
            { status: 400 }
          );
        }

        const user = await db.user.findUnique({
          where: { id: session.user.id },
        });

        if (!user) {
          console.log("user not found");
          return new NextResponse(
            JSON.stringify({
              error: "User not found",
            }),
            { status: 404 }
          );
        }

        const isPasswordCorrect = await compare(oldPassword, user.password);
        if (!isPasswordCorrect) {
          return new NextResponse(
            JSON.stringify({
              error: "Incorrect old password",
            }),
            { status: 400 }
          );
        }

        const hashedPassword = await hash(newPassword, 12);

        await db.user.update({
          where: { id: session.user.id },
          data: { password: hashedPassword },
        });

        break;
    }

    return new Response(JSON.stringify("Successfully updated the user"), {
      status: 201,
    });
  } catch (error) {
    console.log(error);
    return new Response("Error Updating User", { status: 500 });
  }
};
