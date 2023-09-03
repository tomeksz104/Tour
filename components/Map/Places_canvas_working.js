import React, { memo, useEffect, useState, cloneElement, useRef } from "react";
import { renderToString } from "react-dom/server";
import { Marker, Popup, useMap } from "react-leaflet";

import { categories_list } from "../Categories/Categories";
import Link from "next/link";

//import MarkerClusterGroup from "@changey/react-leaflet-markercluster";

import L from "leaflet"; // Dodaj import obiektu L
import * as PIXI from "pixi.js";
import "leaflet-pixi-overlay";

//import PixiOverlay from "react-leaflet-pixi-overlay"; // Import biblioteki
import "leaflet/dist/leaflet.css"; // Import styli Leaflet

export const getIcon = (category, id, hoveredMarker) => {
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
      className: `rounded-full ${
        hoveredMarker === id ? "pulsating-marker" : ""
      }`,
      style: { zIndex: 499 },
      iconSize: [32, 32],
      iconAnchor: [16, 32],
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/place", { method: "GET" });
        if (response.ok) {
          const data = await response.json();
          setPlaces(data);
          props.onChangeVisiblePlaces(data);
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
      const newVisiblePlaces = getVisibleMarkers(map, places);
      props.onChangeVisiblePlaces(newVisiblePlaces);
    };

    if (map) {
      map.on("moveend", handleMoveEnd);
    }

    return () => {
      if (map) {
        map.off("moveend", handleMoveEnd);
      }
    };
  }, [places, map]);

  useEffect(() => {
    if (props.selectedCategories) {
      const filteredPlaces = places.filter((place) =>
        props.selectedCategories.includes(place.category)
      );
      setFilteredPlaces(filteredPlaces);
      if (filteredPlaces.length > 0) {
        props.onChangeVisiblePlaces(filteredPlaces);
      } else {
        props.onChangeVisiblePlaces(places);
      }
    }
  }, [props.selectedCategories]);

  const placesToRender = filteredPlaces.length > 0 ? filteredPlaces : places;

  return (
    <>
      <PixiOverlay places={placesToRender} />
    </>
  );
});

export default Places;

const customMarker = new L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.5.1/dist/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [10, 41],
  popupAnchor: [2, -40],
});

const pixiContainer = new PIXI.Container();

const PixiOverlay = ({ places }) => {
  const map = useMap();

  const [firstDraw, setFirstDraw] = useState(true);
  const [prevZoom, setPrevZoom] = useState(null);
  const markerPopupOpen = useRef(false);

  const [dataLoaded, setDataLoaded] = useState(false);
  const [effectExecuted, setEffectExecuted] = useState(false);

  console.log(map);

  useEffect(() => {
    if (places.length > 0) {
      setDataLoaded(true);
    }
  }, [places]);

  useEffect(() => {
    if (places.length === 0 && !dataLoaded && !pixiContainer) return;
    const markers = [];

    places.forEach((place) => {
      const markerLatLng = [+place.coordinates.lat, +place.coordinates.lng];
      const markerTexture = PIXI.Texture.from(
        "https://unpkg.com/leaflet@1.5.1/dist/images/marker-icon.png"
      );
      const marker = new PIXI.Sprite(markerTexture);
      marker.anchor.set(0.5, 1);
      const popup = L.popup({ className: "pixi-popup" })
        .setLatLng(markerLatLng)
        .setContent("<b>Hello world!</b><br>I am a popup.");

      const openPopup = () => {
        if (!markerPopupOpen.current) {
          markerPopupOpen.current = true;
          setTimeout(() => {
            popup.openOn(map);
          }, 0);
          popup.on("remove", () => {
            markerPopupOpen.current = false;
          });
        } else {
          setTimeout(() => {
            popup.openOn(map);
          }, 0);
        }
      };

      marker.interactive = true;
      marker.cursor = "pointer";
      marker.on("click", openPopup);

      markers.push({ marker, latLng: markerLatLng });
    });
    markers.forEach((markerInfo) => {
      pixiContainer.addChild(markerInfo.marker);
    });

    const pixiOverlay = L.pixiOverlay(
      (utils) => {
        const zoom = utils.getMap().getZoom();
        const container = utils.getContainer();
        const renderer = utils.getRenderer();
        const project = utils.latLngToLayerPoint;
        const scale = utils.getScale();

        if (firstDraw) {
          places.forEach((place) => {
            const placeLatLng = [
              +place.coordinates.lat,
              +place.coordinates.lng,
            ];
            const markerCoords = project(placeLatLng);
            const markerInfo = markers.find(
              (markerInfo) =>
                markerInfo.latLng[0] === placeLatLng[0] &&
                markerInfo.latLng[1] === placeLatLng[1]
            );
            if (markerInfo) {
              const marker = markerInfo.marker;
              marker.x = markerCoords.x;
              marker.y = markerCoords.y;
              marker.anchor.set(0.5, 1);
            }
          });
        }
        if (effectExecuted || prevZoom !== zoom) {
          pixiContainer.children.forEach((child) => child.scale.set(1 / scale));
        }
        if (!dataLoaded) {
          setEffectExecuted(true);
        }

        setPrevZoom(zoom);

        renderer.render(container);
      },
      pixiContainer,
      {
        destroyInteractionManager: true,
      }
    );

    pixiOverlay.addTo(map);

    return () => {
      // markerTexture.baseTexture.destroy();

      // Usuń markery z kontenera i z pamięci WebGL przed demontażem komponentu
      markers.forEach((markerInfo) => {
        markerInfo.marker.texture.destroy(); // Zwolnienie zasobów tekstury markera z pamięci WebGL
        markerInfo.marker.destroy(); // Usunięcie tekstury markera z pamięci WebGL
        pixiContainer.removeChild(markerInfo.marker); // Usunięcie markera z kontenera
      });

      // Czyszczenie lub usuwanie overlaya przy demontowaniu komponentu
      map.removeLayer(pixiOverlay);
    };
  }, [places, dataLoaded, pixiContainer]);

  return null;
};

// useEffect(() => {
//   if (places.length === 0 || !map) return;

//   const markers = [];

//   places.forEach((place) => {
//     const markerLatLng = [+place.coordinates.lat, +place.coordinates.lng];
//     const markerTexture = PIXI.Texture.from(
//       "https://unpkg.com/leaflet@1.5.1/dist/images/marker-icon.png"
//     );

//     const marker = new PIXI.Sprite(markerTexture);
//     marker.anchor.set(0.5, 1);
//     const popup = L.popup({ className: "pixi-popup" })
//       .setLatLng(markerLatLng)
//       .setContent("<b>Hello world!</b><br>I am a popup.");

//     const openPopup = () => {
//       if (!markerPopupOpen.current) {
//         markerPopupOpen.current = true;
//         setTimeout(() => {
//           popup.openOn(map);
//         }, 0);
//         popup.on("remove", () => {
//           markerPopupOpen.current = false;
//         });
//       } else {
//         setTimeout(() => {
//           popup.openOn(map);
//         }, 0);
//       }
//     };

//     marker.interactive = true;
//     marker.cursor = "pointer";
//     marker.on("click", openPopup);

//     markers.push({ marker, latLng: markerLatLng });
//   });
//   markers.forEach((markerInfo) => {
//     pixiContainer.addChild(markerInfo.marker);
//   });

//   const pixiOverlay = L.pixiOverlay((utils) => {
//     const zoom = utils.getMap().getZoom();
//     const container = utils.getContainer();
//     const renderer = utils.getRenderer();
//     const project = utils.latLngToLayerPoint;
//     const scale = utils.getScale();

//     if (firstDraw) {
//       places.forEach((place) => {
//         const placeLatLng = [+place.coordinates.lat, +place.coordinates.lng];
//         const markerCoords = project(placeLatLng);
//         const markerInfo = markers.find(
//           (markerInfo) =>
//             markerInfo.latLng[0] === placeLatLng[0] &&
//             markerInfo.latLng[1] === placeLatLng[1]
//         );
//         if (markerInfo) {
//           const marker = markerInfo.marker;
//           marker.x = markerCoords.x;
//           marker.y = markerCoords.y;
//           marker.anchor.set(0.5, 1);
//         }
//       });
//     }
//     if (firstDraw || prevZoom !== zoom) {
//       pixiContainer.children.forEach((child) => child.scale.set(1 / scale));
//     }
//     // if (firstDraw) {
//     //   setFirstDraw(false);
//     // }

//     setPrevZoom(zoom);

//     renderer.render(container);
//   }, pixiContainer);

//   pixiOverlay.addTo(map);

//   return () => {
//     // Usuń markery z kontenera i z pamięci WebGL przed demontażem komponentu
//     markers.forEach((markerInfo) => {
//       markerInfo.marker.texture.destroy(); // Zwolnienie zasobów tekstury markera z pamięci WebGL
//       markerInfo.marker.destroy(); // Usunięcie tekstury markera z pamięci WebGL
//       pixiContainer.removeChild(markerInfo.marker); // Usunięcie markera z kontenera
//     });

//     // Czyszczenie lub usuwanie overlaya przy demontowaniu komponentu
//     map.removeLayer(pixiOverlay);
//   };
// }, [map, places]);
