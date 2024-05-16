import "server-only";

import { db } from "@/lib/db";

export async function getPlacesByUserId(userId) {
  return await db.place.findMany({
    where: { userId: parseInt(userId) },
    include: {
      tags: true,
      topics: true,
      openingHours: true,
      childFriendlyAmenities: true,
      photos: true,
      user: true,
      category: true,
    },
  });
}
