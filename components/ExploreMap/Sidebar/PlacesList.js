import SidebarImageSkeleton from "@/components/Skeletons/SidebarImageSkeleton";
import { useSearchParams } from "next/navigation";

const { default: Card } = require("./Card");

const placesPerPage = 10;

const PlacesList = ({ places, onMouseEnter, onMouseLeave, isLoading }) => {
  const searchParams = useSearchParams();

  const isLoadingParams = searchParams.get("loading");

  if (isLoadingParams || isLoading) {
    return <SidebarImageSkeleton count={placesPerPage} />;
  }

  console.log(places.length);
  if (!isLoading && places.length === 0) {
    return (
      <h3 className="flex h-full w-full items-center justify-center py-10 font-semibold text-gray-400">
        No places found
      </h3>
    );
  }

  return (
    <>
      {places.map((place, index) => (
        <Card
          key={index}
          place={place}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
        />
      ))}
    </>
  );
};

export default PlacesList;
