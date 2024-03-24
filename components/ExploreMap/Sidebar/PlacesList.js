import { Suspense, lazy, useState } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";

import Card from "./Card";
import { Button } from "@/components/ui/button";
const Lightbox = lazy(() => import("@/components/FsLightbox/Lightbox"));
import SidebarImageSkeleton from "@/components/Skeletons/SidebarImageSkeleton";

import createLightboxSources from "@/utils/createLightboxSources";
import Link from "next/link";

const placesPerPage = 10;

const PlacesList = ({ places, onMarkerHover, isLoading }) => {
  const searchParams = useSearchParams();
  const [hoverTimeout, setHoverTimeout] = useState(null);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [lightboxSources, setLightboxSources] = useState([]);

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

  const handleOpenLightbox = (place) => {
    const sources = createLightboxSources(place.mainPhotoPath, place.photos);

    setLightboxSources(sources);

    if (sources.length > 0) setIsLightboxOpen((prevState) => !prevState);
  };

  if (isLoadingParams || isLoading) {
    return <SidebarImageSkeleton count={placesPerPage} />;
  }

  if (!isLoading && places.length === 0) {
    return (
      <div className="relative flex flex-col mx-auto w-full">
        <Image
          src={"/images/no-results.png"}
          width="0"
          height="0"
          sizes="100vw"
          alt="Brak wyników"
          className="mx-auto w-32 rounded-t-md object-cover"
        />

        <h3 className="mt-10 text-center text-lg font-semibold text-gray-900">
          Nie znaleziono miejsc
        </h3>
        <p className="text-center text-gray-600 mt-3">
          Nie znaleziono wyników pasujących do wybranych kryteriów.
          <br /> Spróbuj{" "}
          <a
            href={"/map"}
            className="hover:underline text-green-600"
            alt="Wyzeruj filtry"
          >
            zresetować filtry
          </a>
          , aby zobaczyć więcej miejsc.
        </p>
      </div>
    );
  }

  return (
    <>
      <Suspense>
        <Lightbox images={lightboxSources} isOpen={isLightboxOpen} />
      </Suspense>
      {places.map((place, index) => (
        <Card
          key={index}
          place={place}
          onMouseLeave={handleMouseLeave}
          onMouseEnter={() => handleMouseEnter(place)}
          onOpenLightbox={() => handleOpenLightbox(place)}
        />
      ))}
    </>
  );
};

export default PlacesList;
