import "server-only";

import { db } from "@/lib/db";
import { getWeekDay, isOpenNow } from "@/utils/openingHours";

export async function getPlacesForCategories(categories) {
  const currentWeekDay = getWeekDay();

  const placesByCategory = await categories.reduce(
    async (accPromise, category) => {
      const acc = await accPromise; // Make sure to await the accumulator promise

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

      // Processing each place to add additional information
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

      // Using the category ID as a key for the object
      acc[category.id] = {
        category: category.name,
        places: placesWithDetails,
      };

      return acc;
    },
    Promise.resolve({})
  ); // Start with a resolved promise containing an empty object

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
