import { Suspense, useContext, useState } from "react";

import Card from "./Card";
import { PlacesContext } from "@/contexts/PlacesContext";

import createLightboxSources from "@/utils/createLightboxSources";
import Lightbox from "@/components/FsLightbox/Lightbox";

const Watchlist = ({ placesIds }) => {
  const placesCtx = useContext(PlacesContext);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [lightboxSources, setLightboxSources] = useState([]);

  const watchlistPlaces = placesCtx.places.filter((place) =>
    placesIds.includes(place.id)
  );

  const handleOpenLightbox = (place) => {
    const sources = createLightboxSources(place.mainPhotoPath, place.photos);

    setLightboxSources(sources);

    if (sources.length > 0) setIsLightboxOpen((prevState) => !prevState);
  };

  return (
    <>
      <Suspense>
        <Lightbox images={lightboxSources} isOpen={isLightboxOpen} />
      </Suspense>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <h2 className="text-center text-2xl font-bold text-gray-800 md:text-4xl">
          Ulubione miejsca
        </h2>

        {watchlistPlaces && watchlistPlaces.length === 0 && (
          <p>Brak dodanym miejsc do ulubionych.</p>
        )}

        <div className="grid grid-cols-3 gap-3 mt-10">
          {watchlistPlaces.map((place) => (
            <Card
              key={place.id}
              place={place}
              onOpenLightbox={() => handleOpenLightbox(place)}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default Watchlist;