"use client";

import {
  FullscreenControl,
  GeolocateControl,
  NavigationControl,
} from "react-map-gl";

const MapControls = () => {
  return (
    <>
      <NavigationControl position="top-right" />
      <GeolocateControl position="top-right" />
      <FullscreenControl position="top-right" />
    </>
  );
};

export default MapControls;
