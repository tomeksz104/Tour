import React, { memo, useEffect, useState, useRef, useContext } from "react";
import ReactDOM from "react-dom";
import { Marker, useMap } from "react-leaflet";

import { categories_list } from "../Categories/Categories";
import Link from "next/link";

import "leaflet-canvas-marker";
import L from "leaflet";

import { createRoot } from "react-dom/client";
import { PlacesContext } from "@/contexts/PlacesContext";

import { LazyLoadImage } from "react-lazy-load-image-component";
import { useRouter, useSearchParams } from "next/navigation";

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
  const router = useRouter();
  const searchParams = useSearchParams();
  const placesCtx = useContext(PlacesContext);
  //const [places, setPlaces] = useState([]);
  const [filteredPlaces, setFilteredPlaces] = useState([]);
  const map = useMap();

  const ciLayerRef = useRef(null);
  const markersRef = useRef([]);

  const id = searchParams.get("id");

  useEffect(() => {
    if (id && placesCtx) {
      const placeToFlyTo = placesCtx.places.find((place) => place._id === id);

      if (placeToFlyTo) {
        map.setView(placeToFlyTo.coordinates, 18);
        const newVisiblePlaces = getVisibleMarkers(map, placesToRender);
        props.onChangeVisiblePlaces(newVisiblePlaces);
      }
    }
  }, [id, placesCtx]);

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
          //setPlaces(data);
          placesCtx.replacePlacesList(data);
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
    if (placesCtx.places.length === 0) {
      fetchData();
    }
  }, [placesCtx.places]);

  useEffect(() => {
    const handleMoveEnd = () => {
      const placesToRender =
        filteredPlaces.length > 0 ? filteredPlaces : placesCtx.places;
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
  }, [filteredPlaces, placesCtx.places, map]);

  useEffect(() => {
    if (props.selectedCategories) {
      const filteredPlaces = placesCtx.places.filter((place) =>
        props.selectedCategories.includes(place.category)
      );
      setFilteredPlaces(filteredPlaces);
      if (filteredPlaces.length > 0 && props.interactiveMap === true) {
        const newVisiblePlaces = getVisibleMarkers(map, filteredPlaces);
        props.onChangeVisiblePlaces(newVisiblePlaces);
        //props.onChangeVisiblePlaces(filteredPlaces);
      } else if (props.interactiveMap === true) {
        const newVisiblePlaces = getVisibleMarkers(map, placesCtx.places);
        props.onChangeVisiblePlaces(newVisiblePlaces);
        //props.onChangeVisiblePlaces(placesCtx.places);
      }
    }
  }, [props.selectedCategories]);

  const placesToRender =
    filteredPlaces.length > 0 ? filteredPlaces : placesCtx.places;

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

    const hideCanvasOnZoomStart = () => {
      canvasLayer.classList.add("transition-[opacity]");
      canvasLayer.classList.add("ease-in-out");
      canvasLayer.classList.add("duration-500");

      canvasLayer.classList.remove("opacity-100");
      canvasLayer.classList.add("opacity-0");
    };

    const showCanvasOnZoomEnd = () => {
      canvasLayer.classList.remove("opacity-0");
      canvasLayer.classList.add("opacity-100");
    };

    map.on("zoomstart", hideCanvasOnZoomStart);
    map.on("zoomend", showCanvasOnZoomEnd);

    const markers = [];

    placesToRender.forEach((place) => {
      const popupContent = document.createElement("div");

      const popupRoot = createRoot(popupContent);
      popupRoot.render(<CustomPopupContent place={place} router={router} />);
      // ReactDOM.render(
      //   <CustomPopupContent place={place} router={router} />,
      //   popupContent
      // );

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
        ></Marker>
      </>
    );
  } else {
    return null;
  }
});

export default Places;

const CustomPopupContent = ({ place, router }) => {
  const handleEditPlace = () => {
    router.push(`/place/update/${place._id}`);
  };

  const handleShowPlaceDetails = () => {
    router.push(`/place/${place._id}`);
  };

  return (
    <div className="group rounded-3xl">
      <div className="relative overflow-hidden rounded-t-xl">
        <button
          onClick={handleEditPlace}
          // onClick={() => {
          //   router.push(`/place/update/${place._id}`);
          // }}
          href={`/place/update/${place._id}`}
          className="absolute top-2 right-2 z-[1] bg-white rounded-full p-1 shadow-sm duration-300 hover:scale-110"
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
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
            />
          </svg>
        </button>
        {/* <img
        src={place.image}
        alt={place.title}
        loading="lazy"
        class="h-32 w-full object-cover object-top"
      /> */}
        <LazyLoadImage
          className="h-32 w-full object-cover object-top"
          src={place.image}
          alt={place.title}
        />
      </div>
      <div class="py-2 px-3 relative">
        <button
          onClick={handleShowPlaceDetails}
          // href={`/place/${place._id}`}
          className="text-md font-semibold hover:underline"
          style={{ color: "#000000" }}
        >
          {place.title}
        </button>
        <p class="pt-1 text-gray-600 hidden md:line-clamp-3">
          {place.description}
        </p>
      </div>
    </div>
  );
};
