import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getWeekDay, isOpenNow } from "@/utils/openingHours";

export const GET = async (request, { params }) => {
  const count = params.count;
  const currentWeekDay = getWeekDay();

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

    const randomPlaces = await db.place.findMany({
      take: numberOfPlaces,

      include: {
        photos: true,
        category: true,
        reviews: true,
        openingHours: {
          where: {
            day: currentWeekDay,
          },
        },
      },
    });

    const randomPlacesWithDetails = randomPlaces.map((place) => {
      const totalRatings = place.reviews.reduce(
        (acc, review) => acc + (review.rating || 0),
        0
      );
      const averageRating =
        place.reviews.length > 0 ? totalRatings / place.reviews.length : 0;
      const reviewsCount = place.reviews.length;

      const isOpen = isOpenNow(place.openingHours);

      return {
        ...place,
        averageRating,
        reviewsCount,
        isOpen,
      };
    });

    if (!randomPlacesWithDetails || randomPlacesWithDetails.length === 0) {
      return new NextResponse(
        JSON.stringify({
          error: { global: "No Places Found" },
        }),
        {
          status: 404,
        }
      );
    }

    return new Response(JSON.stringify(randomPlacesWithDetails), {
      status: 200,
    });
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
