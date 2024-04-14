import { db } from "@/lib/db";

import { isOpenNow } from "@/utils/openingHours";

import { PlaceStatus } from "@prisma/client";

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
      where: {
        status: PlaceStatus.PUBLISHED,
      },
      select: {
        id: true,
        title: true,
        slug: true,
        slogan: true,
        mainPhotoPath: true,
        address: true,
        phone: true,
        categoryId: true,
        cityId: true,
        provinceId: true,
        latitude: true,
        longitude: true,
        createdAt: true,

        category: {
          select: {
            iconPath: true,
            name: true,
          },
        },
        reviews: {
          select: {
            rating: true,
          },
        },
        photos: {
          select: {
            id: true,
            url: true,
          },
        },
        openingHours: {
          where: {
            day: currentWeekDay,
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
