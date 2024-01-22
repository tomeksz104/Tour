import PlaceForm from "@/components/PlaceManagement/PlaceForm";
import { db } from "@/lib/db";

export default async function CreatePlace() {
  const categories = await db.category.findMany();
  const tags = await db.tag.findMany();
  const topics = await db.topic.findMany();
  const provinces = await db.province.findMany();
  const cities = await db.city.findMany();
  const childAmenites = await db.ChildFriendlyAmenity.findMany();

  return (
    <PlaceForm
      place={null}
      categories={categories}
      topics={topics}
      tags={tags}
      provinces={provinces}
      cities={cities}
      childAmenites={childAmenites}
    />
  );
}
