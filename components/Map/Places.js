import { useEffect, useState, cloneElement } from "react";
import { renderToString } from "react-dom/server";
import { Marker, Popup, useMap } from "react-leaflet";

import { categories_list } from "../Categories/Categories";

const getIcon = (category) => {
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

// const getIcon = (category) => {
//   const svgIcon = L.divIcon({
//     html: CATEGORY_ICON_HERE,
//     className: "rounded-full",
//     iconSize: [32, 32],
//     iconAnchor: [16, 32],
//     //labelAnchor: [-6, 0],
//     //popupAnchor: [0, -15],
//   });

//   return svgIcon;
// };

const Places = () => {
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
      {/* Renderowanie miejsc */}
      {places.map((place, index) => (
        <Marker
          position={[place.coordinates.lat, place.coordinates.lng]}
          icon={getIcon(place.category)}
          key={index}
        >
          <Popup>
            <div class="group rounded-3xl">
              <div class="relative overflow-hidden rounded-t-xl">
                <img
                  src={place.image}
                  alt="art cover"
                  loading="lazy"
                  width="1000"
                  height="667"
                  class="h-32 w-full object-cover object-top transition duration-500 group-hover:scale-105"
                />
              </div>
              <div class="py-2 px-3 relative">
                <h3 class="text-md font-semibold text-gray-800 dark:text-white">
                  {place.title}
                </h3>
                <p class="pt-1 text-gray-600 dark:text-gray-300">
                  {place.shortDescription}
                </p>
              </div>
            </div>
          </Popup>
        </Marker>
      ))}
    </div>
  );
};

export default Places;
