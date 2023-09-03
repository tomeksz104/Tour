import React, { memo, useEffect, useState, cloneElement, useRef } from "react";
import ReactDOM from "react-dom";
import { renderToString } from "react-dom/server";
import { Marker, Popup, useMap } from "react-leaflet";

import { categories_list } from "../Categories/Categories";
import Link from "next/link";

import "leaflet-canvas-marker";
import L from "leaflet";

const getVisibleMarkers = (map, places) => {
  if (map) {
    const visibleMarkers = [];
    const visiblePlaces = [];

    map.eachLayer((layer) => {
      if (
        layer instanceof L.Marker &&
        map.getBounds().contains(layer.getLatLng())
      ) {
        visibleMarkers.push(layer);

        const place = places.find(
          (place) =>
            place.coordinates.lat === layer.getLatLng().lat &&
            place.coordinates.lng === layer.getLatLng().lng
        );
        if (place) {
          visiblePlaces.push(place);
        }
      }
    });
    return visiblePlaces;
  }

  return [];
};

const Places = memo((props) => {
  const [places, setPlaces] = useState([]);
  const [filteredPlaces, setFilteredPlaces] = useState([]);
  const map = useMap();
  const markersRef = useRef([]); // Referencja do tablicy markerów

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/place", { method: "GET" });
        if (response.ok) {
          const data = await response.json();
          setPlaces(data);
          // props.onChangeVisiblePlaces(data);
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
    if (props.selectedCategories) {
      const filteredPlaces = places.filter((place) =>
        props.selectedCategories.includes(place.category)
      );
      setFilteredPlaces(filteredPlaces);
      // if (filteredPlaces.length > 0) {
      //   props.onChangeVisiblePlaces(filteredPlaces);
      // } else {
      //   props.onChangeVisiblePlaces(places);
      // }
    }
  }, [props.selectedCategories]);

  const placesToRender = filteredPlaces.length > 0 ? filteredPlaces : places;

  useEffect(() => {
    if (!map || placesToRender.length <= 0) return;

    // Usuń poprzednie warstwy przed dodaniem nowych
    markersRef.current.forEach((marker) => {
      marker.removeFrom(map);
    });
    markersRef.current = [];

    const ciLayer = L.canvasIconLayer({}).addTo(map);

    ciLayer.addOnClickListener(function (e, data) {
      console.log(data);
    });
    ciLayer.addOnHoverListener(function (e, data) {
      console.log(data[0].data._leaflet_id);
    });

    const markers = [];

    placesToRender.forEach((place) => {
      const icon = L.icon({
        iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
        iconSize: [25, 41],
        iconAnchor: [0.5, 1],
      });

      const popupContent = document.createElement("div");
      ReactDOM.render(<CustomPopupContent place={place} />, popupContent);

      const marker = L.marker([place.coordinates.lat, place.coordinates.lng], {
        icon: icon,
      })
        .bindPopup(popupContent)
        .addTo(map);
      // markers.push(marker);
      markersRef.current.push(marker);
    });
  }, [map, placesToRender, props.selectedCategories]);

  return null;
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
