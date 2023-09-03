"use client";

import { useRef, useState } from "react";
import { ZoomControl } from "react-leaflet";

import Sidebar from "./Sidebar";
import MapWrapper from "../MapWrapper/MapWrapper";
import Places from "./Places";
import UserLocate from "./UserLocate";
import MobilePlacePopup from "./MobilePlacePopup";
import ScrollableTabsSlider from "./ScrollableTabsSlider";

import "leaflet/dist/leaflet.css";
import "leaflet-easybutton/src/easy-button.js";
import "leaflet-easybutton/src/easy-button.css";
import Places_org from "./Places_org";

const Map = () => {
  const [selectedCategories, setSelectedCategories] = useState(null);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [visiblePlaces, setVisiblePlaces] = useState([]);
  const [hoveredMarkerId, setHoveredMarkerId] = useState(null);

  const handleOpenMobileMarker = (place) => {
    setSelectedPlace(place);
  };

  const handleChangeVisiblePlaces = (places) => {
    setVisiblePlaces(places);
  };

  const handleChangeCategory = (category) => {
    setSelectedCategories(category);
  };

  const handleMarkerHover = (markerId) => {
    setHoveredMarkerId(markerId);
  };

  return (
    <>
      <ScrollableTabsSlider onChangeCategory={handleChangeCategory} />
      <div className="relative flex flex-1 h-full overflow-hidden">
        <Sidebar places={visiblePlaces} onMarkerHover={handleMarkerHover} />
        <MapWrapper
          center={[51.9713, 16.0]}
          zoom={7} // 7
          scrollWheelZoom={true}
          zoomControl={false}
          className="absolute top-0 right-0 left-auto h-full "
        >
          <ZoomControl position="topright" />
          <UserLocate />
          {/* <Places_org
            hoveredMarkerId={hoveredMarkerId}
            selectedCategories={selectedCategories}
            onOpenMarker={handleOpenMobileMarker}
            onChangeVisiblePlaces={handleChangeVisiblePlaces}
          /> */}
          <Places
            hoveredMarkerId={hoveredMarkerId}
            selectedCategories={selectedCategories}
            onOpenMarker={handleOpenMobileMarker}
            onChangeVisiblePlaces={handleChangeVisiblePlaces}
            interactiveMap={true}
          />
          {/* <Places_org
            hoveredMarkerId={hoveredMarkerId}
            selectedCategories={selectedCategories}
            onOpenMarker={handleOpenMobileMarker}
            onChangeVisiblePlaces={handleChangeVisiblePlaces}
          /> */}
          {/* <Places selectedCategories={selectedCategories} /> */}
        </MapWrapper>
        <div id="mobile-place-popup"></div>
        {selectedPlace && <MobilePlacePopup place={selectedPlace} />}
      </div>
    </>
  );
};

export default Map;
