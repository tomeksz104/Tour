import { getPlaceById } from "@/actions/getPlaceById";
import PlaceForm from "@/components/PlaceManagement/PlaceForm";

export default async function CreatePlace({ params }) {
  const place = await getPlaceById(params?.id);

  return (
    <>
      <PlaceForm place={place} />
    </>
  );
}
