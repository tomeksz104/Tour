import React, { memo, useEffect, useState, cloneElement } from "react";
import { renderToString } from "react-dom/server";
import { Marker, Popup, useMap } from "react-leaflet";

import { categories_list } from "../Categories/Categories";
import Link from "next/link";

export const getIcon = (category) => {
  const selectedCategory = categories_list.find(
    (item) => item.title === category
  );

  if (selectedCategory && selectedCategory.icon) {
    const svgIcon = cloneElement(selectedCategory.icon, {
      className: "w-5 h-5 -rotate-45 text-white",
    });

    const icon = L.divIcon({
      html: `<div class="pin ${
        selectedCategory.colors
      } w-8 h-8 flex items-center justify-center w-full h-full">${renderToString(
        svgIcon
      )}</div>`,
      className: "rounded-full",
      iconSize: [32, 32],
      iconAnchor: [16, 32],
    });

    return icon;
  }
};

const Places = memo(() => {
  const [places, setPlaces] = useState([]);
  const [markerIcon, setMarkerIcon] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/place", { method: "GET" });
        if (response.ok) {
          const data = await response.json();
          setPlaces(data);
        } else {
          console.error("Failed to fetch placess:", response.status);
        }
      } catch (error) {
        console.error("Failed to fetch places:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {places.map((place, index) => (
        <Marker
          position={[place.coordinates.lat, place.coordinates.lng]}
          icon={getIcon(place.category)}
          key={index}
        >
          <Popup closeButton={false} className="w-64">
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
                  alt="art cover"
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
          </Popup>
        </Marker>
      ))}
    </div>
  );
});

export default Places;
