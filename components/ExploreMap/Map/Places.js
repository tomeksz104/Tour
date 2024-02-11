import React, { memo, useEffect, useContext, useRef, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { createRoot } from "react-dom/client";
import { Marker, useMap } from "react-leaflet";
import { PlacesContext } from "@/contexts/PlacesContext";
import { WatchlistContext } from "@/contexts/WatchlistContext";
import { LocateContext } from "@/contexts/LocateContext";
import L from "leaflet";

import "leaflet-canvas-markers";

import {
  getIcon,
  getVisibleMarkers,
  haversineDistance,
} from "@/utils/mapUtils";

import PlacePopup from "./PlacePupup";
import { useDebouncedCallback } from "use-debounce";

const Places = memo((props) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const map = useMap();
  const placesCtx = useContext(PlacesContext);
  const watchlistCtx = useContext(WatchlistContext);
  const locateCtx = useContext(LocateContext);
  const [placesToRender, setPlacesToRender] = useState([]);

  const markersRef = useRef([]);

  const idToZoom = searchParams.get("id");
  const selectedCategories = searchParams.getAll("category");
  const placeTypeParamsValue = searchParams.getAll("placeType");
  const provinceParamsValue = searchParams.get("province");
  const cityParamsValue = searchParams.get("city");
  const nearMeParamsValue = searchParams.get("nearMe");
  const nearMeDistanceParamsValue = searchParams.get("nearMeDistance");
  const familyFriendlyParamsValue = searchParams.get("familyFriendly");
  const tagParamsValue = searchParams.getAll("tag");
  const topicParamsValue = searchParams.getAll("topic");
  const childAmienityParamsValue = searchParams.getAll("childAmenity");
  const isOpenParamsValue = searchParams.get("open");
  const sortByParamsValue = searchParams.get("sortBy");
  const isLoadingParams = searchParams.getAll("loading");

  // Filtering places
  useEffect(() => {
    if (placesCtx.places.length > 0) {
      let newPlacesToRender = placesCtx.places;

      if (nearMeParamsValue !== null || nearMeDistanceParamsValue !== null) {
        newPlacesToRender = newPlacesToRender.filter((place) => {
          const placeCoords = {
            latitude: place.latitude,
            longitude: place.longitude,
          };
          const distance = haversineDistance(
            locateCtx.coordinates,
            placeCoords
          );
          const radius = nearMeDistanceParamsValue
            ? +nearMeDistanceParamsValue
            : 50;

          return distance <= radius;
        });
      }

      if (map && props?.markerToRemove) {
        newPlacesToRender = newPlacesToRender.filter(
          (element) => element.id !== props.markerToRemove
        );
      }

      if (props.isShowWatchlist) {
        newPlacesToRender = newPlacesToRender.filter((place) =>
          watchlistCtx.watchlist.includes(place.id)
        );
      }

      if (selectedCategories.length > 0) {
        newPlacesToRender = newPlacesToRender.filter((place) =>
          selectedCategories.includes(place.categoryId.toString())
        );
      }

      if (placeTypeParamsValue.length > 0) {
        newPlacesToRender = newPlacesToRender.filter((place) =>
          placeTypeParamsValue.includes(place.type)
        );
      }

      if (familyFriendlyParamsValue !== null) {
        newPlacesToRender = newPlacesToRender.filter(
          (place) =>
            place.childFriendly.toString() === familyFriendlyParamsValue
        );
      }

      if (provinceParamsValue !== null) {
        newPlacesToRender = newPlacesToRender.filter(
          (place) => place.provinceId?.toString() === provinceParamsValue
        );
      }

      if (provinceParamsValue !== null && cityParamsValue !== null) {
        newPlacesToRender = newPlacesToRender.filter(
          (place) => place.cityId?.toString() === cityParamsValue
        );
      }

      if (tagParamsValue.length > 0) {
        newPlacesToRender = newPlacesToRender.filter((place) =>
          place.tags.some((tag) => tagParamsValue.includes(tag.id.toString()))
        );
      }

      if (topicParamsValue.length > 0) {
        newPlacesToRender = newPlacesToRender.filter((place) =>
          place.topics.some((topic) =>
            topicParamsValue.includes(topic.id.toString())
          )
        );
      }

      if (childAmienityParamsValue.length > 0) {
        newPlacesToRender = newPlacesToRender.filter((place) =>
          place.childFriendlyAmenities.some((amenity) =>
            childAmienityParamsValue.includes(amenity.id.toString())
          )
        );
      }

      if (isOpenParamsValue !== null) {
        newPlacesToRender = newPlacesToRender.filter(
          (place) => place.isOpen === true
        );
      }

      if (sortByParamsValue !== null && sortByParamsValue === "most_reviewed") {
        newPlacesToRender = newPlacesToRender.sort(
          (a, b) => b.reviewsCount - a.reviewsCount
        );
      }

      if (sortByParamsValue !== null && sortByParamsValue === "highest_rated") {
        newPlacesToRender = newPlacesToRender.sort(
          (a, b) => b.averageRating - a.averageRating
        );
      }

      setPlacesToRender(newPlacesToRender);

      if (props.interactiveMap === true) {
        const newVisiblePlaces = getVisibleMarkers(map, newPlacesToRender);
        props.onChangeVisiblePlaces(newVisiblePlaces);
      }
    }
  }, [
    searchParams,
    props.isShowWatchlist,
    placesCtx.places,
    watchlistCtx.watchlist,
    map,
    props.interactiveMap,
    nearMeDistanceParamsValue,
  ]);

  // Using useDebouncedCallback to delay handleMoveEnd function
  const handleMoveEnd = useDebouncedCallback(() => {
    const currentParams = new URLSearchParams(
      Array.from(searchParams.entries())
    );

    const newVisiblePlaces = getVisibleMarkers(map, placesToRender);
    props.onChangeVisiblePlaces(newVisiblePlaces);

    currentParams.delete("loading");

    router.replace(`${pathname}?${currentParams.toString()}`, undefined, {
      shallow: true,
    });
  }, 1000);

  const handleMoveStart = useDebouncedCallback(() => {
    if (isLoadingParams.length > 0) return;

    const currentParams = new URLSearchParams(
      Array.from(searchParams.entries())
    );
    currentParams.append("loading", "true");

    router.replace(`${pathname}?${currentParams.toString()}`, undefined, {
      shallow: true,
    });
  }, 100);

  // Map movement
  useEffect(() => {
    if (map && props.interactiveMap === true) {
      map.on("moveend", handleMoveEnd);
      map.on("movestart", handleMoveStart);
    }

    return () => {
      if (map && props.interactiveMap === true) {
        map.off("moveend", handleMoveEnd);
        map.off("movestart", handleMoveStart);
      }
    };
  }, [placesToRender, map, props.interactiveMap]);

  // Flight to location based on ID
  useEffect(() => {
    if (idToZoom && placesToRender) {
      const placeToFlyTo = placesToRender.find(
        (place) => place._id === idToZoom
      );

      if (placeToFlyTo) {
        handleZoomToPlace(placeToFlyTo);

        const currentParams = new URLSearchParams(
          Array.from(searchParams.entries())
        );
        currentParams.delete("id");

        router.replace(`${pathname}?${currentParams.toString()}`, undefined, {
          shallow: true,
        });
      }
    }
  }, [idToZoom, placesToRender]);

  const handleZoomToPlace = (placeToFlyTo) => {
    map.setView(placeToFlyTo.coordinates, 18);
    const newVisiblePlaces = getVisibleMarkers(map, placesToRender);
    if (props.interactiveMap === true)
      props.onChangeVisiblePlaces(newVisiblePlaces);
  };

  useEffect(() => {
    if (!map || placesToRender === 0) return;

    const canvasLayer = document.querySelector("canvas.leaflet-zoom-animated");

    const hideCanvasOnZoomStart = () => {
      if (canvasLayer) {
        canvasLayer.classList.add("transition-[opacity]");
        canvasLayer.classList.add("ease-in-out");
        canvasLayer.classList.add("duration-500");
        canvasLayer.classList.remove("opacity-100");
        canvasLayer.classList.add("opacity-50");
      }
    };

    const showCanvasOnZoomEnd = () => {
      if (canvasLayer) {
        canvasLayer.classList.remove("opacity-50");
        canvasLayer.classList.add("opacity-100");
      }
    };

    map.on("zoomstart", hideCanvasOnZoomStart);
    map.on("zoomend", showCanvasOnZoomEnd);

    markersRef.current.forEach((marker) => {
      map.removeLayer(marker);
    });

    let markers = [];
    placesToRender.forEach((place) => {
      const popupContent = document.createElement("div");
      popupContent.style.width = "301px";

      const marker = L.canvasMarker([place.latitude, place.longitude], {
        radius: 0,
        img: {
          //url: getIconPath(place.category), //image link
          url: place.category.iconPath,
          size: [18, 23], //image size
          rotate: 0, //image base rotate
          offset: { x: 0, y: 0 }, //image offset
        },
      }).addTo(map);

      marker
        .on("popupopen", () => {
          const popupRoot = createRoot(popupContent);
          popupRoot.render(<PlacePopup place={place} />);
          if (props.interactiveMap === true) {
            props.onOpenMarker(place);
          }
        })
        .bindPopup(popupContent);

      markers.push(marker);
    });

    markersRef.current = markers;
  }, [map, placesToRender]);

  if (props.hoveredPlace) {
    const animatedCircleIcon = L.divIcon({
      html: `<div class="dot med">
      <span class="point">
        <span class="pulse"></span>
      </span>
    </div>`,
      iconSize: [12, 12],
    });

    return (
      <>
        <Marker
          position={[props.hoveredPlace.latitude, props.hoveredPlace.longitude]}
          icon={animatedCircleIcon}
          key={1}
        ></Marker>
        <Marker
          position={[props.hoveredPlace.latitude, props.hoveredPlace.longitude]}
          icon={getIcon(props.hoveredPlace.category)}
          key={2}
        ></Marker>
      </>
    );
  } else {
    return null;
  }
});

export default Places;
