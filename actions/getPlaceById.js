import "server-only";

import { db } from "@/lib/db";

export async function getPlaceById(id) {
  return await db.place.findUnique({
    where: { id: parseInt(id) },
    include: {
      tags: true,
      topics: true,
      openingHours: true,
      childFriendlyAmenities: true,
      photos: true,
      user: true,
    },
  });
}
