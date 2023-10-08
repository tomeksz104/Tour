"use client";

import { useState, useEffect } from "react";
import { renderToString } from "react-dom/server";
import { Marker, useMap } from "react-leaflet";
import L, { Icon } from "leaflet";

import MapWrapper from "../MapWrapper/MapWrapper";
import Places from "../ExploreMap/Map/Places";
import { getIcon } from "@/utils/mapUtils";

const coordinatesOfPoland = [52.10650519075632, 19.281005859375004];

const defaultIcon = new Icon.Default();

const ShowMarkers = ({ onMarkerPositionMove, marker, category }) => {
  const map = useMap();

  let icon = null;
  let moveTimeout = null;

  if (category !== null && category) {
    icon = getIcon(category);
  } else {
    icon = defaultIcon;
  }

  // useEffect(() => {
  //   if (marker) {
  //     map.flyToBounds([marker]);
  //   }
  // }, [map, marker]);

  const handleMoveEnd = (e) => {
    if (moveTimeout) {
      clearTimeout(moveTimeout);
    }

    moveTimeout = setTimeout(() => {
      const { lat, lng } = e.target.getLatLng();
      onMarkerPositionMove(lat, lng);
    }, 300);
  };

  return (
    <Marker
      key={1}
      uniceid={1}
      position={marker}
      icon={icon}
      draggable={true}
      eventHandlers={{
        moveend: handleMoveEnd,
      }}
    >
      {/* <Popup>MyMarker</Popup> */}
    </Marker>
  );
};

const MyMarkers = ({ onMarkerPositionChange, coordinates, category }) => {
  const map = useMap();
  const [marker, setMarker] = useState([]);
  const [legend, setLegend] = useState();

  useEffect(() => {
    if (!map) return;

    const legend = L.control({ position: "bottomleft" });

    legend.onAdd = () => {
      const info = L.DomUtil.create(
        "div",
        "flex items-center bg-white rounded-md px-3 py-2 border border-green-500"
      );

      const jsxString = renderToString(
        <>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-4 h-4 mr-3"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
            />
          </svg>
          Click on the map, move the marker
        </>
      );
      info.innerHTML = jsxString;
      return info;
    };

    legend.addTo(map);

    map.on("click", (e) => {
      const { lat, lng } = e.latlng;
      setMarker([lat, lng]);

      if (onMarkerPositionChange) {
        onMarkerPositionChange(lat, lng);
      }
    });
  }, [map]);

  useEffect(() => {
    if (!map) return;
    if (
      coordinates?.lat &&
      !isNaN(+coordinates?.lat) &&
      !isNaN(+coordinates?.lng)
    ) {
      setMarker([+coordinates.lat, +coordinates.lng]);
    }
  }, [coordinates]);

  return marker.length > 0 ? (
    <ShowMarkers
      marker={marker}
      key={marker}
      onMarkerPositionMove={onMarkerPositionChange}
      category={category}
    />
  ) : null;
};

const Map = ({ onMarkerPositionChange, coordinates, category, placeId }) => {
  const zoom = placeId ? 18 : 6;

  const mapPosition = coordinates?.lat ? coordinates : coordinatesOfPoland;

  return (
    <MapWrapper
      className="mt-12 h-96 rounded-md"
      center={mapPosition}
      zoom={zoom}
      scrollWheelZoom={true}
    >
      <MyMarkers
        onMarkerPositionChange={onMarkerPositionChange}
        coordinates={coordinates}
        category={category}
      />
      {/* <Places interactiveMap={false} markerToRemove={placeId} /> */}
    </MapWrapper>
  );
};

export default Map;
