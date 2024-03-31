import { Suspense, lazy, useState } from "react";
import { useSelector } from "react-redux";

import SidebarImageSkeleton from "@/components/Skeletons/SidebarImageSkeleton";
import Card from "./Card";
const Lightbox = lazy(() => import("@/components/FsLightbox/Lightbox"));

import createLightboxSources from "@/utils/createLightboxSources";
import Image from "next/image";

const placesPerPage = 10;

const PlacesList = ({ places }) => {
  const { isLoading } = useSelector((state) => state.map);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [lightboxSources, setLightboxSources] = useState([]);

  const handleOpenLightbox = (place) => {
    const sources = createLightboxSources(place.mainPhotoPath, place.photos);

    setLightboxSources(sources);

    if (sources.length > 0) setIsLightboxOpen((prevState) => !prevState);
  };

  if (isLoading) {
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
          onOpenLightbox={() => handleOpenLightbox(place)}
        />
      ))}
    </>
  );
};

export default PlacesList;
