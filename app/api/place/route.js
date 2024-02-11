import Place from "@/models/place";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

import { isOpenNow } from "@/utils/openingHours";

const getWeekDay = () => {
  const currentDay = new Date().getDay();
  const days = [
    "SUNDAY",
    "MONDAY",
    "TUESDAY",
    "WEDNESDAY",
    "THURSDAY",
    "FRIDAY",
    "SATURDAY",
  ];
  return days[currentDay];
};

export const GET = async (request) => {
  try {
    const currentWeekDay = getWeekDay();
    const places = await db.place.findMany({
      include: {
        category: true,
        reviews: true,
        openingHours: {
          where: {
            day: currentWeekDay,
          },
        },
        tags: {
          select: {
            id: true,
          },
        },
        topics: {
          select: {
            id: true,
          },
        },
        childFriendlyAmenities: {
          select: {
            id: true,
          },
        },
      },
    });

    const placesWithDetails = places.map((place) => {
      // Oblicz średnią ocen i liczbę recenzji
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
    return new Response(JSON.stringify(placesWithDetails), {
      status: 200,
    });
  } catch (error) {
    console.error("Failed to fetch places with details", error);
    return new Response("Failed to fetch all places", { status: 500 });
  }
};
