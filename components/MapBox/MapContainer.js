"use client";

import { useCallback, useEffect, useState } from "react";
import dynamic from "next/dynamic";

import { useDispatch } from "react-redux";

import { fetchPlaces } from "@/redux/slices/mapSlice";

import "mapbox-gl/dist/mapbox-gl.css";

// bundle splitting
const Sidebar = dynamic(() => import("@/components/MapBox/Sidebar/Sidebar"));
const Layers = dynamic(() => import("./Layers/Layers"));
const MapControls = dynamic(() => import("./MapControls"));
const MapPopup = dynamic(() => import("./MapPopup"));
// const MapTrailPopup = dynamic(() => import("./MapTrailPopup"));

const Map = dynamic(() => import("react-map-gl").then((mod) => mod.Map), {
  ssr: false, // Disable server-side rendering for this component
});

const MapContainer = ({ categories }) => {
  const dispatch = useDispatch();
  const [isShowWatchlist, setIsShowWatchlist] = useState(false);

  const handleToggleWatchlist = useCallback(() => {
    setIsShowWatchlist((current) => !current);
  }, []);

  useEffect(() => {
    dispatch(fetchPlaces());
  }, [dispatch]);

  return (
    <>
      <Sidebar
        isShowWatchlist={isShowWatchlist}
        onToggleWatchlist={handleToggleWatchlist}
      />

      <Map
        mapboxAccessToken="pk.eyJ1IjoidG9tZWtzejEwNCIsImEiOiJjbHR2NWdlYnQxbjAxMm9vYXcwa2RmeDRtIn0.PWIPIEDj06tzxHRRPqBJMw"
        initialViewState={{
          longitude: 16.0,
          latitude: 51.9713,
          zoom: 6,
        }}
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          left: "auto",
          height: " calc(100vh - 62px)",
        }}
        mapStyle="https://api.maptiler.com/maps/streets/style.json?key=S5C6vNCfw7EkBYlmw0xf"
        dragRotate={false}
      >
        <MapControls />
        <MapPopup />
        {/* <MapTrailPopup /> */}

        <Layers isShowWatchlist={isShowWatchlist} categories={categories} />
      </Map>
    </>
  );
};

export default MapContainer;
