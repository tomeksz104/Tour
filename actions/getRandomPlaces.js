import "server-only";

import { db } from "@/lib/db";
import { getWeekDay, isOpenNow } from "@/utils/openingHours";

export const getRandomPlaces = async (count) => {
  const currentWeekDay = getWeekDay();

  try {
    const numberOfPlaces = parseInt(count, 10);

    if (isNaN(numberOfPlaces)) {
      return {
        success: false,
        message: "Nieprawidłowy parametr `count`",
      };
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
      return {
        success: false,
        message: "Nie znaleziono miejsc do pobrania",
      };
    }

    return randomPlacesWithDetails;
  } catch (error) {
    return {
      success: false,
      message: "Wystąpił błąd podczas pobierania losowych miejsc",
    };
  }
};
