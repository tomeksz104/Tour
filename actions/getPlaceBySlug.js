import "server-only";

import { db } from "@/lib/db";

export async function getPlaceBySlug(slug) {
  return await db.place.findUnique({
    where: { slug: slug },
    include: {
      tags: true,
      topics: true,
      openingHours: true,
      childFriendlyAmenities: true,
      photos: true,
      user: true,
      category: true,
      amenities: true,
    },
  });
}
