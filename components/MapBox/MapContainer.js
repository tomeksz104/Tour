"use client";

import { Suspense, lazy, useCallback, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Map from "react-map-gl";
import { useDispatch } from "react-redux";

import { fetchPlaces } from "@/redux/slices/mapSlice";

import Sidebar from "@/components/MapBox/Sidebar/Sidebar";

import "mapbox-gl/dist/mapbox-gl.css";

// bundle splitting
const Layers = lazy(() => import("./Layers/Layers"));
const MapControls = dynamic(() => import("./MapControls"));
const MapPopup = dynamic(() => import("./MapPopup"));

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
        <Suspense>
          <Layers isShowWatchlist={isShowWatchlist} categories={categories} />
        </Suspense>
      </Map>
    </>
  );
};

export default MapContainer;
