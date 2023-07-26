"use client";

import { useState } from "react";
import { ZoomControl } from "react-leaflet";

import Sidebar from "./Sidebar";
import MapWrapper from "../MapWrapper/MapWrapper";
import Places from "./Places";
import UserLocate from "./UserLocate";
import MobilePlacePopup from "./MobilePlacePopup";

import "leaflet/dist/leaflet.css";
import "leaflet-easybutton/src/easy-button.js";
import "leaflet-easybutton/src/easy-button.css";

const Map = () => {
  const [selectedPlace, setSelectedPlace] = useState(null);

  const handleOpenMobileMarker = (place) => {
    setSelectedPlace(place);
  };

  return (
    <div className="relative flex flex-1 h-full overflow-hidden">
      {/* <div className="h-full"> */}
      {/* <div className="absolute p-5 rounded overflow-hidden z-10 border border-green-500 bottom-0 left-0 top-auto md:hidden w-full bg-white">
        {infoText}
      </div> */}
      <Sidebar />
      <MapWrapper
        center={[51.9713, 16.0]}
        zoom={7}
        scrollWheelZoom={true}
        zoomControl={false}
        className="absolute top-0 right-0 left-auto h-full "
      >
        <ZoomControl position="topright" />
        <UserLocate />
        <Places onOpenMobileMarker={handleOpenMobileMarker} />
      </MapWrapper>
      <div id="mobile-place-popup"></div>
      {selectedPlace && <MobilePlacePopup place={selectedPlace} />}
    </div>
  );
};

export default Map;
