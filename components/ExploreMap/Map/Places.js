import React, { memo, useEffect, useContext, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { createRoot } from "react-dom/client";
import { Marker, useMap } from "react-leaflet";
import { PlacesContext } from "@/contexts/PlacesContext";
import { WatchlistContext } from "@/contexts/WatchlistContext";
import L from "leaflet";
import "node_modules/leaflet-canvas-marker/src/_full.js";

import { getIcon, getVisibleMarkers } from "@/utils/mapUtils";

import PlacePopup from "./PlacePupup";

const Places = memo((props) => {
  const router = useRouter();
  const map = useMap();
  const placesCtx = useContext(PlacesContext);
  const watchlistCtx = useContext(WatchlistContext);
  const searchParams = useSearchParams();
  const [placesToRender, setPlacesToRender] = useState([]);

  const ciLayerRef = useRef(null);
  const markersRef = useRef([]);

  const idToZoom = searchParams.get("id");

  // Filtering places
  useEffect(() => {
    if (placesCtx.places.length > 0) {
      if (props.interactiveMap === true) props.isLoading(true);
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

      if (props.selectedCategories?.length > 0) {
        newPlacesToRender = newPlacesToRender.filter((place) =>
          props.selectedCategories.includes(place.category)
        );
      }

      setPlacesToRender(newPlacesToRender);
      const newVisiblePlaces = getVisibleMarkers(map, newPlacesToRender);
      if (props.interactiveMap === true) {
        props.onChangeVisiblePlaces(newVisiblePlaces);
        props.isLoading(false);
      }
    }
  }, [
    props.selectedCategories,
    props.isShowWatchlist,
    placesCtx.places,
    watchlistCtx.watchlist,
    map,
    props.interactiveMap,
  ]);

  // Map movement
  useEffect(() => {
    const handleMoveEnd = () => {
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
  }, [placesToRender, map, props.interactiveMap]);

  // Flight to location based on ID
  useEffect(() => {
    if (idToZoom && placesToRender) {
      const placeToFlyTo = placesToRender.find(
        (place) => place._id === idToZoom
      );

      if (placeToFlyTo) {
        handleZoomToPlace(placeToFlyTo);

        router.replace("/map", undefined, { shallow: true });
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
    if (!map) return;

    if (
      placesToRender.length === 0 &&
      markersRef.current.length > 0 &&
      ciLayerRef.current !== null
    ) {
      markersRef.current.forEach((marker) => {
        ciLayerRef.current.removeMarker(marker);
      });
      ciLayerRef.current.redraw();
      return;
    }

    if (placesToRender.length === 0) return;

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
      canvasLayer.classList.add("opacity-50");
    };

    const showCanvasOnZoomEnd = () => {
      canvasLayer.classList.remove("opacity-50");
      canvasLayer.classList.add("opacity-100");
    };

    map.on("zoomstart", hideCanvasOnZoomStart);
    map.on("zoomend", showCanvasOnZoomEnd);

    const markers = [];

    placesToRender.forEach((place) => {
      const popupContent = document.createElement("div");
      popupContent.style.width = "301px";

      const popupRoot = createRoot(popupContent);
      popupRoot.render(<PlacePopup place={place} router={router} />);

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
