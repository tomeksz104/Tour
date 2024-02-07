import { db } from "@/lib/db";

export const GET = async (request, { params }) => {
  try {
    const categories = await db.category.findMany();
    const tags = await db.tag.findMany();
    const topics = await db.topic.findMany();
    const provinces = await db.province.findMany();
    const cities = await db.city.findMany();
    const childAmenities = await db.childFriendlyAmenity.findMany();

    const responseData = {
      categories,
      tags,
      topics,
      provinces,
      cities,
      childAmenities,
    };

    return new Response(JSON.stringify(responseData), { status: 200 });
  } catch (error) {
    return new Response("Internal Server Error", { status: 500 });
  }
};
