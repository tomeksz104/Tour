import React, { memo, useEffect, useState, cloneElement, useRef } from "react";
import ReactDOM from "react-dom";
import { renderToString } from "react-dom/server";
import { Marker, Popup, useMap } from "react-leaflet";

import { categories_list } from "../Categories/Categories";
import Link from "next/link";

import "leaflet-canvas-marker";
import L from "leaflet";

import { createRoot } from "react-dom/client"; // Importuj createRoot

export const getIcon = (category) => {
  const selectedCategory = categories_list.find(
    (item) => item.title === category
  );

  if (selectedCategory && selectedCategory.iconPath) {
    const iconPath = selectedCategory.iconPath;

    const icon = new L.icon({
      iconUrl: iconPath,
      iconSize: [30, 38],
      iconAnchor: [15, 18],
    });

    return icon;
  }
};

const getVisibleMarkers = (map, places) => {
  if (map) {
    const visiblePlaces = places.filter((place) =>
      map
        .getBounds()
        .contains(L.latLng(place.coordinates.lat, place.coordinates.lng))
    );
    return visiblePlaces;
  }

  return [];
};

const Places = memo((props) => {
  const [places, setPlaces] = useState([]);
  const [filteredPlaces, setFilteredPlaces] = useState([]);
  const map = useMap();

  const ciLayerRef = useRef(null);
  const markersRef = useRef([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/place", { method: "GET" });
        if (response.ok) {
          const data = await response.json();

          if (props?.markerToRemove) {
            const markerIdToRemove = data.findIndex(
              (element) => element._id === props.markerToRemove
            );
            if (markerIdToRemove !== -1) {
              data.splice(markerIdToRemove, 1);
            }
          }
          setPlaces(data);
          if (props.interactiveMap === true) {
            props.onChangeVisiblePlaces(data);
          }
        } else {
          console.error("Failed to fetch placess:", response.status);
        }
      } catch (error) {
        console.error("Failed to fetch places:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const handleMoveEnd = () => {
      const placesToRender =
        filteredPlaces.length > 0 ? filteredPlaces : places;
      const newVisiblePlaces = getVisibleMarkers(map, placesToRender);
      props.onChangeVisiblePlaces(newVisiblePlaces);
    };

    if (map && props.interactiveMap === true) {
      map.on("moveend", handleMoveEnd);
    }

    return () => {
      if (map && props.interactiveMap === true) {
        map.off("moveend", handleMoveEnd);
      }
    };
  }, [filteredPlaces, places, map]);

  useEffect(() => {
    if (props.selectedCategories) {
      const filteredPlaces = places.filter((place) =>
        props.selectedCategories.includes(place.category)
      );
      setFilteredPlaces(filteredPlaces);
      if (filteredPlaces.length > 0 && props.interactiveMap === true) {
        props.onChangeVisiblePlaces(filteredPlaces);
      } else if (props.interactiveMap === true) {
        props.onChangeVisiblePlaces(places);
      }
    }
  }, [props.selectedCategories]);

  const placesToRender = filteredPlaces.length > 0 ? filteredPlaces : places;

  useEffect(() => {
    if (!map || placesToRender.length <= 0) return;

    if (!ciLayerRef.current) {
      ciLayerRef.current = L.canvasIconLayer({}).addTo(map);
    } else {
      markersRef.current.forEach((marker) => {
        ciLayerRef.current.removeMarker(marker);
      });
      ciLayerRef.current.redraw();
    }

    const canvasLayer = document.querySelector(".leaflet-canvas-icon-layer");
    const parentElement = canvasLayer.parentNode; // Dostęp do rodzica

    //const ciLayer = L.canvasIconLayer({}).addTo(map);

    // ciLayer.addOnHoverListener(function (e, data) {
    //   console.log(data[0].data._leaflet_id);
    // });

    // Ukryj warstwę canvas podczas rozpoczęcia zoomu
    const hideCanvasOnZoomStart = () => {
      canvasLayer.classList.add("transition-[opacity]");
      canvasLayer.classList.add("ease-in-out");
      canvasLayer.classList.add("duration-500");

      canvasLayer.classList.remove("opacity-100");
      canvasLayer.classList.add("opacity-0");
      //canvasLayer.classList.add("blur-sm");
    };

    // Odkryj warstwę canvas po zakończonym zoomie
    const showCanvasOnZoomEnd = () => {
      //canvasLayer.classList.remove("blur-sm");
      canvasLayer.classList.remove("opacity-0");
      canvasLayer.classList.add("opacity-100");
    };

    map.on("zoomstart", hideCanvasOnZoomStart);
    map.on("zoomend", showCanvasOnZoomEnd);

    const markers = [];

    placesToRender.forEach((place) => {
      const popupContent = document.createElement("div");

      const popupRoot = createRoot(popupContent);
      popupRoot.render(<CustomPopupContent place={place} />);

      const marker = L.marker([place.coordinates.lat, place.coordinates.lng], {
        icon: getIcon(place.category),
      }).bindPopup(popupContent);

      if (props.interactiveMap === true) {
        marker.on("popupopen", () => {
          props.onOpenMarker(place);
        });
      }

      markers.push(marker);
    });

    markersRef.current = markers;
    ciLayerRef.current.addLayers(markers);
  }, [map, placesToRender, props.selectedCategories]);

  if (props.hoveredMarkerId) {
    const animatedCircleIcon = L.divIcon({
      html: `<div class="dot med">
      <span class="point">
        <span class="pulse"></span>
      </span>
    </div>`,
      iconSize: [15, 18],
    });

    return (
      <>
        <Marker
          position={[
            props.hoveredMarkerId.coordinates.lat,
            props.hoveredMarkerId.coordinates.lng,
          ]}
          icon={animatedCircleIcon}
          key={1}
        ></Marker>
        <Marker
          position={[
            props.hoveredMarkerId.coordinates.lat,
            props.hoveredMarkerId.coordinates.lng,
          ]}
          icon={getIcon(props.hoveredMarkerId.category)}
          key={2}
        >
          {/* <Popup closeButton={false} className="w-64">
            <div class="group rounded-3xl">
              <div class="relative overflow-hidden rounded-t-xl">
                <Link
                  href={`/place/update/${props.hoveredMarkerId._id}`}
                  className="absolute top-2 right-2 z-[1] bg-white rounded-full p-1 shadow-sm ransition duration-300 hover:scale-110"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-3 h-3 text-blue-500"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
                    />
                  </svg>
                </Link>
                <img
                  src={props.hoveredMarkerId.image}
                  alt={props.hoveredMarkerId.title}
                  loading="lazy"
                  width="1000"
                  height="667"
                  class="h-32 w-full object-cover object-top"
                />
              </div>
              <div class="py-2 px-3 relative">
                <h3 class="text-md font-semibold text-gray-800 dark:text-white">
                  {props.hoveredMarkerId.title}
                </h3>
                <p class="pt-1 text-gray-600 dark:text-gray-300 hidden md:block">
                  {props.hoveredMarkerId.description}
                </p>
              </div>
            </div>
          </Popup> */}
        </Marker>
      </>
    );
  } else {
    return null;
  }
});

export default Places;

const CustomPopupContent = ({ place }) => (
  <div class="group rounded-3xl">
    <div class="relative overflow-hidden rounded-t-xl">
      <Link
        href={`/place/update/${place._id}`}
        className="absolute top-2 right-2 z-[1] bg-white rounded-full p-1 shadow-sm ransition duration-300 hover:scale-110"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-3 h-3 text-blue-500"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
          />
        </svg>
      </Link>
      <img
        src={place.image}
        alt={place.title}
        loading="lazy"
        width="1000"
        height="667"
        class="h-32 w-full object-cover object-top"
      />
    </div>
    <div class="py-2 px-3 relative">
      <h3 class="text-md font-semibold text-gray-800 dark:text-white">
        {place.title}
      </h3>
      <p class="pt-1 text-gray-600 dark:text-gray-300 hidden md:block">
        {place.description}
      </p>
    </div>
  </div>
);
