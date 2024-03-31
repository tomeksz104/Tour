import {
  memo,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { PlacesContext } from "@/contexts/PlacesContext";

import { Source, Layer, Popup, useMap } from "react-map-gl";
import Image from "next/image";
import Link from "next/link";

import "./map.css";

const MapPopup = memo(() => {
  const { places } = useContext(PlacesContext);
  const { current: map } = useMap();
  const [popupInfo, setPopupInfo] = useState(null);
  const [selectedPlace, setSelectedPlace] = useState(null);

  useEffect(() => {
    // Event listener dla kliknięcia na warstwę
    if (map) {
      map.on("click", "places", (e) => {
        const clickedId = e.features[0].properties.id; // Pobranie ID klikniętego miejsca
        const placeData = places.find((place) => +place.id === +clickedId); // Znalezienie miejsca w kontekście PlacesContext

        if (placeData) {
          setSelectedPlace(placeData); // Ustawienie wybranego miejsca
          setPopupInfo({
            ...e.features[0].properties,
            coordinates: e.lngLat,
          });
        }
      });

      // Usuń event listener przy odmontowywaniu
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

      // Oczyść zdarzenia przy czyszczeniu komponentu
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
                href={`/place/${selectedPlace.id}`}
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
