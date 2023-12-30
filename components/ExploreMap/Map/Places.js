import React, { memo, useEffect, useContext, useRef, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { createRoot } from "react-dom/client";
import { Marker, useMap } from "react-leaflet";
import { PlacesContext } from "@/contexts/PlacesContext";
import { WatchlistContext } from "@/contexts/WatchlistContext";
import L from "leaflet";

import "node_modules/leaflet-canvas-markers/leaflet-canvas-markers.js";

import { getIcon, getIconPath, getVisibleMarkers } from "@/utils/mapUtils";

import PlacePopup from "./PlacePupup";
import { useDebouncedCallback } from "use-debounce";

const Places = memo((props) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const map = useMap();
  const placesCtx = useContext(PlacesContext);
  const watchlistCtx = useContext(WatchlistContext);
  const [placesToRender, setPlacesToRender] = useState([]);

  const markersRef = useRef([]);

  const idToZoom = searchParams.get("id");
  const selectedCategories = searchParams.getAll("category");
  const isLoadingParams = searchParams.getAll("loading");

  // Filtering places
  useEffect(() => {
    if (placesCtx.places.length > 0) {
      let newPlacesToRender = placesCtx.places;

      if (map && props?.markerToRemove) {
        newPlacesToRender = newPlacesToRender.filter(
          (element) => element._id !== props.markerToRemove
        );
      }

      if (props.isShowWatchlist) {
        newPlacesToRender = newPlacesToRender.filter((place) =>
          watchlistCtx.watchlist.includes(place._id)
        );
      }

      if (selectedCategories.length > 0) {
        newPlacesToRender = newPlacesToRender.filter((place) =>
          selectedCategories.includes(place.category)
        );
      }

      setPlacesToRender(newPlacesToRender);
      const newVisiblePlaces = getVisibleMarkers(map, newPlacesToRender);
      if (props.interactiveMap === true) {
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

      const marker = L.canvasMarker(
        [place.coordinates.lat, place.coordinates.lng],
        {
          radius: 0,
          img: {
            url: getIconPath(place.category), //image link
            size: [18, 23], //image size
            rotate: 0, //image base rotate
            offset: { x: 0, y: 0 }, //image offset
          },
        }
      ).addTo(map);

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
          icon={getIconPath(props.hoveredMarkerId.category)}
          key={2}
        ></Marker>
      </>
    );
  } else {
    return null;
  }
});

export default Places;
