import { Fragment } from "react";

import PlaceForm from "@/components/PlaceManagement/PlaceForm";
import { db } from "@/lib/db";

// const MapWrapper = dynamic(() => import("@/components/Place/MapWrapper"), {
//   loading: () => <p>loading...</p>,
//   ssr: false,
// });

export default async function CreatePlace() {
  const categories = await db.category.findMany();
  const tags = await db.tag.findMany();
  const topics = await db.topic.findMany();
  const provinces = await db.province.findMany();
  const cities = await db.city.findMany();
  const childAmenites = await db.ChildFriendlyAmenity.findMany();

  return (
    <Fragment>
      {/* <MapWrapper /> */}

      <PlaceForm
        place={null}
        categories={categories}
        topics={topics}
        tags={tags}
        provinces={provinces}
        cities={cities}
        childAmenites={childAmenites}
      />
    </Fragment>
  );
}
