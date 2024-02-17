import "server-only";

import { db } from "@/lib/db";
import { getWeekDay, isOpenNow } from "@/utils/openingHours";

export async function getPlacesForCategories(categories) {
  const currentWeekDay = getWeekDay();
  const placesByCategory = [];

  for (const category of categories) {
    const places = await db.place.findMany({
      where: { categoryId: category.id },
      include: {
        reviews: true,
        openingHours: {
          where: {
            day: currentWeekDay,
          },
        },
      },
      take: 10,
    });

    // Przetworzenie każdego miejsca, aby dodać dodatkowe informacje
    const placesWithDetails = places.map((place) => {
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

    placesByCategory.push({
      category: category.name,
      places: placesWithDetails, // Używamy przetworzonej tablicy
    });
  }

  return placesByCategory;
}

// export async function getPlacesForCategories(categories) {
//   const placesByCategory = await Promise.all(
//     categories.map(async (category) => {
//       const places = await db.place.findMany({
//         where: {
//           categoryId: category.id,
//         },
//         take: 10,
//       });
//       return {
//         category: category.name,
//         places,
//       };
//     })
//   );

//   return placesByCategory;
// }
