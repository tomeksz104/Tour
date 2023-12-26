"use client";

import { Suspense, lazy, useCallback, useState } from "react";
import { ZoomControl } from "react-leaflet";

import Sidebar from "../Sidebar/Sidebar";
import MapWrapper from "../../MapWrapper/MapWrapper";
import Places from "./Places";
import UserLocate from "./UserLocate";
import ScrollableTabsSlider from "../ScrollableTabsSlider";

const MobilePlacePopup = lazy(() => import("./MobilePlacePopup"));

const Map = () => {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [visiblePlaces, setVisiblePlaces] = useState([]);
  const [hoveredMarkerId, setHoveredMarkerId] = useState(null);
  const [isShowWatchlist, setIsShowWatchlist] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const handleOpenMobileMarker = (place) => {
    setSelectedPlace(place);
  };

  const handleChangeVisiblePlaces = useCallback((places) => {
    setVisiblePlaces(places);
  }, []);

  const handleChangeCategory = useCallback((category) => {
    setSelectedCategories(category);
  }, []);

  const handleMarkerHover = useCallback((markerId) => {
    setHoveredMarkerId(markerId);
  }, []);

  const handleToggleWatchlist = useCallback(() => {
    setIsShowWatchlist((current) => !current);
  }, []);

  const handleChangeIsLoading = useCallback((state) => {
    setIsLoading(state);
  }, []);

  return (
    <>
      <ScrollableTabsSlider onChangeCategory={handleChangeCategory} />
      <div className="relative flex flex-1 h-full overflow-hidden">
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
          <Places
            hoveredMarkerId={hoveredMarkerId}
            selectedCategories={selectedCategories}
            onOpenMarker={handleOpenMobileMarker}
            onChangeVisiblePlaces={handleChangeVisiblePlaces}
            interactiveMap={true}
            isShowWatchlist={isShowWatchlist}
            isLoading={handleChangeIsLoading}
          />
        </MapWrapper>
        <div id="mobile-place-popup"></div>
        {selectedPlace && (
          <Suspense>
            <MobilePlacePopup place={selectedPlace} />
          </Suspense>
        )}
      </div>
    </>
  );
};

export default Map;
