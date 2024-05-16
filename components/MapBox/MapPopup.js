import { memo, useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { Popup, useMap } from "react-map-gl";
import Image from "next/image";
import Link from "next/link";

import { getPlaceUrl } from "@/utils/apiPaths";

import "./map.css";

const MapPopup = memo(() => {
  const { places } = useSelector((state) => state.map);
  const { current: map } = useMap();
  const [popupInfo, setPopupInfo] = useState(null);
  const [selectedPlace, setSelectedPlace] = useState(null);

  useEffect(() => {
    // Event listener for clicking on a layer
    if (map) {
      map.on("click", "places", (e) => {
        const clickedId = e.features[0].properties.id; // Retrieving the ID of the clicked location
        const placeData = places.find((place) => +place.id === +clickedId); // Finding a place in the "places"

        if (placeData) {
          setSelectedPlace(placeData);
          setPopupInfo({
            ...e.features[0].properties,
            coordinates: e.lngLat,
          });
        }
      });

      //  Remove event listener when unmounting
      return () => {
        if (map) {
          map.off("click", "places");
        }
      };
    }
  }, [map, places]);

  useEffect(() => {
    if (map) {
      const setPointerCursor = () => (map.getCanvas().style.cursor = "pointer");
      const setDefaultCursor = () => (map.getCanvas().style.cursor = "");

      map.on("mouseenter", "places", setPointerCursor);
      map.on("mouseleave", "places", setDefaultCursor);

      // Clear events when cleaning a component
      return () => {
        map.off("mouseenter", "places", setPointerCursor);
        map.off("mouseleave", "places", setDefaultCursor);
      };
    }
  }, [map]);

  return (
    <>
      {popupInfo && selectedPlace && (
        <Popup
          key={popupInfo.id}
          longitude={popupInfo.lng}
          latitude={popupInfo.lat}
          closeButton={false}
          onClose={() => setPopupInfo(null)}
          anchor="bottom"
          className="pasd"
        >
          <div className="w-64 group rounded-3xl">
            <div className="relative overflow-hidden rounded-t-xl">
              <Image
                src={
                  selectedPlace.mainPhotoPath
                    ? selectedPlace.mainPhotoPath
                    : "/images/noImage.jpg"
                }
                alt={selectedPlace.title}
                width={16}
                height={9}
                sizes="100vw"
                className="h-32 w-full"
                style={{
                  objectFit: "cover",
                }}
              />
            </div>
            <div className="py-2 px-3 relative">
              <Link
                href={getPlaceUrl(selectedPlace.slug)}
                className="text-md font-semibold hover:underline"
                style={{ color: "#000000" }}
              >
                {selectedPlace.title}
              </Link>
            </div>
          </div>
        </Popup>
      )}
    </>
  );
});

export default MapPopup;
