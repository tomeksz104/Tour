import { NextResponse } from "next/server";

import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/authOptions";

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

  const userId = session.user.id;

  try {
    if (
      requestBody.username ||
      requestBody.firstName ||
      requestBody.lastName ||
      requestBody.aboutme
    ) {
      await db.user.update({
        where: { id: session.user.id },
        data: {
          username: requestBody.username,
          firstName: requestBody.firstName,
          lastName: requestBody.lastName,
          aboutme: requestBody.aboutme,
        },
      });
    }

    const socialMediaLinks = requestBody.socialMediaLinks;
    if (socialMediaLinks) {
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
    }

    if (
      requestBody.oldPassword &&
      requestBody.newPassword &&
      requestBody.confirmNewPassword
    ) {
      if (requestBody.newPassword !== requestBody.confirmNewPassword) {
        return new NextResponse(
          JSON.stringify({
            error: "Nowe hasła nie są takie same",
          }),
          { status: 400 }
        );
      }

      const user = await db.user.findUnique({
        where: { id: userId },
      });

      const isPasswordCorrect = await compare(
        requestBody.oldPassword,
        user.password
      );
      if (!isPasswordCorrect) {
        return new NextResponse(
          JSON.stringify({
            error: "Niepoprawne stare hasło",
          }),
          { status: 400 }
        );
      }

      const hashedPassword = await hash(requestBody.newPassword, 12);
      await db.user.update({
        where: { id: userId },
        data: { password: hashedPassword },
      });
    }

    return new Response(JSON.stringify("Konto zostało zaaktualizowane"), {
      status: 201,
    });
  } catch (error) {
    return new Response("Błąd podczas aktualizacji użytkownika", {
      status: 500,
    });
  }
};
