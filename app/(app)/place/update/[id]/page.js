import { getPlaceById } from "@/actions/getPlaceById";
import PlaceForm from "@/components/PlaceManagement/PlaceForm";
import { db } from "@/lib/db";

export default async function UpdatePlace({ params }) {
  const place = await getPlaceById(params?.id);

  const categories = await db.category.findMany();
  const tags = await db.tag.findMany();
  const topics = await db.topic.findMany();
  const provinces = await db.province.findMany();
  const cities = await db.city.findMany();
  const childAmenites = await db.ChildFriendlyAmenity.findMany();
  const amenities = await db.amenity.findMany();

  return (
    <PlaceForm
      place={place}
      categories={categories}
      topics={topics}
      tags={tags}
      provinces={provinces}
      cities={cities}
      childAmenites={childAmenites}
      amenities={amenities}
    />
  );
}
