import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export const GET = async (request, { params }) => {
  const count = params.count;

  try {
    const numberOfPlaces = parseInt(count, 10);

    if (isNaN(numberOfPlaces)) {
      return new NextResponse(
        JSON.stringify({
          error: { global: "Invalid count parameter" },
        }),
        {
          status: 404,
        }
      );
    }

    const randomPlaces =
      await db.$queryRaw`SELECT * FROM Place ORDER BY RAND() LIMIT ${count}`;

    if (!randomPlaces || randomPlaces.length === 0) {
      return new NextResponse(
        JSON.stringify({
          error: { global: "No Places Found" },
        }),
        {
          status: 404,
        }
      );
    }

    return new Response(JSON.stringify(randomPlaces), { status: 200 });
  } catch (error) {
    return new NextResponse(
      JSON.stringify({
        error: { global: "Error fetching random places" },
      }),
      {
        status: 500,
      }
    );
  }
};
