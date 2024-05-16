"use client";

import { useState, useEffect, useRef } from "react";
import { Marker, useMap } from "react-leaflet";
import L, { Icon } from "leaflet";

import MapWrapper from "../MapWrapper/MapWrapper";
import { getDefaultIcon, getIconPathByCategoryId } from "@/utils/mapUtils";

const coordinatesOfPoland = [52.10650519075632, 19.281005859375004];

const ShowMarkers = ({
  onMarkerPositionMove,
  marker,
  category,
  categories,
}) => {
  const map = useMap();

  let icon = null;
  let moveTimeout = null;

  if (category !== null && category) {
    icon = getIconPathByCategoryId(+category, categories);
  } else {
    icon = getDefaultIcon();
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
    ></Marker>
  );
};

const MyMarkers = ({
  onMarkerPositionChange,
  coordinates,
  category,
  categories,
}) => {
  const map = useMap();
  const [marker, setMarker] = useState([]);
  const legendAddedRef = useRef(false);

  useEffect(() => {
    if (!map || legendAddedRef.current) return;

    const legend = L.control({ position: "bottomleft" });

    legend.onAdd = function () {
      const div = L.DomUtil.create(
        "div",
        "flex items-center bg-white rounded-md px-3 py-2 border border-green-500"
      );

      const svgHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4 mr-3">
          <path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
          <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
        </svg>
        Kliknij na mapę, przesuwaj znacznik
      `;

      div.innerHTML = svgHTML;

      return div;
    };

    legend.addTo(map);
    legendAddedRef.current = true;

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
      categories={categories}
    />
  ) : null;
};

const Map = ({
  onMarkerPositionChange,
  coordinates,
  category = null,
  placeId = null,
  categories,
}) => {
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
        categories={categories}
      />
      {/* <Places interactiveMap={false} markerToRemove={placeId} /> */}
    </MapWrapper>
  );
};

export default Map;
