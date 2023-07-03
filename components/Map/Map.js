"use client";

import { ZoomControl } from "react-leaflet";

import MapWrapper from "../MapWrapper/MapWrapper";
import Places from "./Places";
import UserLocate from "./UserLocate";
import MobilePlacePopup from "./MobilePlacePopup";

import "leaflet/dist/leaflet.css";
import "leaflet-easybutton/src/easy-button.js";
import "leaflet-easybutton/src/easy-button.css";

const Map = () => {
  return (
    <div className="relative h-full">
      {/* <div className="absolute p-5 rounded overflow-hidden z-10 border border-green-500 bottom-0 left-0 top-auto md:hidden w-full bg-white">
        {infoText}
      </div> */}
      <div id="mobile-place-popup"></div>
      <MapWrapper
        center={[51.9713, 16.0]}
        zoom={7}
        scrollWheelZoom={true}
        zoomControl={false}
        className="h-full"
      >
        <ZoomControl position="topright" />
        <UserLocate />
        <Places />
      </MapWrapper>
      <MobilePlacePopup />
    </div>
  );
};

export default Map;
