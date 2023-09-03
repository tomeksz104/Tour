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
      <PixiOverlay places={places} />
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

const PixiOverlay = ({ places }) => {
  const map = useMap();

  const [firstDraw, setFirstDraw] = useState(true);
  const [prevZoom, setPrevZoom] = useState(null);
  const markerPopupOpen = useRef(false); // Użyj ref zamiast stanu

  // useEffect(() => {
  //   if (!places || !map) return;
  //   console.log("HERE");
  //   const markerTexture = PIXI.Texture.from(
  //     "https://unpkg.com/leaflet@1.5.1/dist/images/marker-icon.png"
  //   );
  //   const markerLatLng = [51.5, -0.09];
  //   const marker = new PIXI.Sprite(markerTexture);
  //   marker.anchor.set(0.5, 1);
  //   const popup = L.popup({ className: "pixi-popup" })
  //     .setLatLng(markerLatLng)
  //     .setContent("<b>Hello world!</b><br>I am a popup.");

  //   const openPopup = () => {
  //     if (!markerPopupOpen.current) {
  //       markerPopupOpen.current = true;
  //       setTimeout(() => {
  //         popup.openOn(map);
  //       }, 0);
  //       popup.on("remove", () => {
  //         markerPopupOpen.current = false; // Resetuj flagę po zamknięciu popupa
  //       });
  //     }
  //   };

  //   marker.interactive = true;
  //   marker.cursor = "pointer";
  //   marker.on("click", openPopup); // Dodaj obsługę kliknięcia na marker

  //   const pixiContainer = new PIXI.Container();
  //   pixiContainer.addChild(marker);

  //   const pixiOverlay = L.pixiOverlay((utils) => {
  //     const zoom = utils.getMap().getZoom();
  //     const container = utils.getContainer();
  //     const renderer = utils.getRenderer();
  //     const project = utils.latLngToLayerPoint;
  //     const scale = utils.getScale();

  //     if (firstDraw) {
  //       const markerCoords = project(markerLatLng);
  //       marker.x = markerCoords.x;
  //       marker.y = markerCoords.y;
  //     }
  //     if (firstDraw || prevZoom !== zoom) {
  //       marker.scale.set(1 / scale);
  //     }
  //     if (firstDraw) {
  //       setFirstDraw(false);
  //     }

  //     setPrevZoom(zoom);

  //     renderer.render(container);
  //   }, pixiContainer);

  //   pixiOverlay.addTo(map);

  //   return () => {
  //     // Czyszczenie lub usuwanie overlaya przy demontowaniu komponentu
  //     map.removeLayer(pixiOverlay);
  //   };
  // }, [map, places]);

  useEffect(() => {
    if (places.length === 0 || !map) return;

    const markerTexture = PIXI.Texture.from(
      "https://unpkg.com/leaflet@1.5.1/dist/images/marker-icon.png"
    );
    const markerLatLng = [51.5, -0.09];
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
          markerPopupOpen.current = false; // Resetuj flagę po zamknięciu popupa
        });
      }
    };

    marker.interactive = true;
    marker.cursor = "pointer";
    marker.on("click", openPopup); // Dodaj obsługę kliknięcia na marker

    const pixiContainer = new PIXI.Container();
    pixiContainer.addChild(marker);

    const markers = []; // Przechowuje referencje do utworzonych markerów

    places.forEach((place) => {
      const markerLatLng = [+place.coordinates.lat, +place.coordinates.lng];
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
            markerPopupOpen.current = false; // Resetuj flagę po zamknięciu popupa
          });
        }
      };

      marker.interactive = true;
      marker.cursor = "pointer";
      marker.on("click", openPopup); // Dodaj obsługę kliknięcia na marker
      // Pozostała część tworzenia markera...
      markers.push({ marker, latLng: markerLatLng }); // Dodaj marker do tablicy markers
    });
    markers.forEach((markerInfo) => {
      pixiContainer.addChild(markerInfo.marker); // Dodaj każdy marker do kontenera
    });

    // places.forEach((place) => {
    //   const markerLatLng = [+place.coordinates.lat, +place.coordinates.lng];
    //   const marker = new PIXI.Sprite(markerTexture);
    //   marker.anchor.set(0.5, 1);
    //   const popup = L.popup({ className: "pixi-popup" })
    //     .setLatLng(markerLatLng)
    //     .setContent("<b>Hello world!</b><br>I am a popup.");

    //   const openPopup = () => {
    //     if (!markerPopupOpen.current) {
    //       markerPopupOpen.current = true;
    //       setTimeout(() => {
    //         popup.openOn(map);
    //       }, 0);
    //       popup.on("remove", () => {
    //         markerPopupOpen.current = false; // Resetuj flagę po zamknięciu popupa
    //       });
    //     }
    //   };

    //   marker.interactive = true;
    //   marker.cursor = "pointer";
    //   marker.on("click", openPopup); // Dodaj obsługę kliknięcia na marker

    //   const project = (latLng) => map.latLngToLayerPoint(latLng);
    //   const markerCoords = project(markerLatLng);
    //   marker.x = markerCoords.x;
    //   marker.y = markerCoords.y;

    //   pixiContainer.addChild(marker);
    // });

    const pixiOverlay = L.pixiOverlay((utils) => {
      const zoom = utils.getMap().getZoom();
      const container = utils.getContainer();
      const renderer = utils.getRenderer();
      const project = utils.latLngToLayerPoint;
      const scale = utils.getScale();

      if (firstDraw) {
        const markerCoords = project(markerLatLng);
        marker.x = markerCoords.x;
        marker.y = markerCoords.y;

        // places.forEach((place) => {
        //   const placeLatLng = [
        //     +place.coordinates.lat,
        //     +place.coordinates.lng,
        //   ];
        //   const markerCoords = project(placeLatLng);
        //   const marker = pixiContainer.children.find(
        //     (child) => child._latLng === markerLatLng
        //   );
        //   if (marker) {
        //     marker.x = markerCoords.x;
        //     marker.y = markerCoords.y;
        //     marker.anchor.set(0.5, 1);
        //   }
        // });
        places.forEach((place) => {
          const placeLatLng = [+place.coordinates.lat, +place.coordinates.lng];
          const markerCoords = project(placeLatLng);
          const markerInfo = markers.find(
            (markerInfo) =>
              markerInfo.latLng[0] === placeLatLng[0] &&
              markerInfo.latLng[1] === placeLatLng[1]
          );
          console.log(markerInfo);
          if (markerInfo) {
            const marker = markerInfo.marker;
            marker.x = markerCoords.x;
            marker.y = markerCoords.y;
            marker.anchor.set(0.5, 1);
          }
        });
      }
      if (firstDraw || prevZoom !== zoom) {
        marker.scale.set(1 / scale);

        pixiContainer.children.forEach((child) => child.scale.set(1 / scale));
      }
      if (firstDraw) {
        setFirstDraw(false);
      }

      setPrevZoom(zoom);

      renderer.render(container);
    }, pixiContainer);

    pixiOverlay.addTo(map);
    return () => {
      // Czyszczenie lub usuwanie overlaya przy demontowaniu komponentu
      map.removeLayer(pixiOverlay);
    };
  }, [map, places]);

  return null; // Ten komponent nie renderuje nic w drzewie React
};
