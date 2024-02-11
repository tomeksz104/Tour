import SidebarImageSkeleton from "@/components/Skeletons/SidebarImageSkeleton";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import Card from "./Card";

const placesPerPage = 10;

const PlacesList = ({ places, onMarkerHover, isLoading }) => {
  const searchParams = useSearchParams();
  const [hoverTimeout, setHoverTimeout] = useState(null);

  const isLoadingParams = searchParams.get("loading");

  const handleMouseEnter = (markerId) => {
    clearTimeout(hoverTimeout);

    const timeoutId = setTimeout(() => {
      onMarkerHover(markerId);
    }, 1000);

    setHoverTimeout(timeoutId);
  };

  const handleMouseLeave = () => {
    clearTimeout(hoverTimeout);
    onMarkerHover(null);
  };

  if (isLoadingParams || isLoading) {
    return <SidebarImageSkeleton count={placesPerPage} />;
  }

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
          onMouseLeave={handleMouseLeave}
          onMouseEnter={() => handleMouseEnter(place)}
        />
      ))}
    </>
  );
};

export default PlacesList;
