"use client";

import { Suspense, lazy, useCallback, useState } from "react";
import { ZoomControl } from "react-leaflet";

import Sidebar from "../Sidebar/Sidebar";
import MapWrapper from "../../MapWrapper/MapWrapper";
// import Places from "./Places";
import UserLocate from "./UserLocate";

const Places = lazy(() => import("./Places"));
const MobilePlacePopup = lazy(() => import("./MobilePlacePopup"));

const Map = () => {
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [visiblePlaces, setVisiblePlaces] = useState([]);
  const [hoveredPlace, setHoveredPlace] = useState(null);
  const [isShowWatchlist, setIsShowWatchlist] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const handleOpenMobileMarker = (place) => {
    setSelectedPlace(place);
  };

  const handleChangeVisiblePlaces = useCallback((places) => {
    setVisiblePlaces(places);
    setIsLoading(false);
  }, []);

  const handleMarkerHover = useCallback((place) => {
    setHoveredPlace(place);
  }, []);

  const handleToggleWatchlist = useCallback(() => {
    setIsShowWatchlist((current) => !current);
  }, []);

  return (
    <>
      <Sidebar
        places={visiblePlaces}
        onMarkerHover={handleMarkerHover}
        isShowWatchlist={isShowWatchlist}
        onToggleWatchlist={handleToggleWatchlist}
        isLoading={isLoading}
      />
      <MapWrapper
        center={[51.9713, 16.0]}
        zoom={7}
        scrollWheelZoom={true}
        zoomControl={false}
        className="absolute top-0 right-0 left-auto h-full "
      >
        <ZoomControl position="topright" />
        <UserLocate />

        <Suspense>
          <Places
            hoveredPlace={hoveredPlace}
            onOpenMarker={handleOpenMobileMarker}
            onChangeVisiblePlaces={handleChangeVisiblePlaces}
            interactiveMap={true}
            isShowWatchlist={isShowWatchlist}
          />
        </Suspense>
      </MapWrapper>

      <div id="mobile-place-popup"></div>
      {selectedPlace && (
        <Suspense>
          <MobilePlacePopup place={selectedPlace} />
        </Suspense>
      )}
    </>
  );
};

export default Map;
