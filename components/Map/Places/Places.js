import React, { memo, useEffect, useContext, useRef } from "react";
import { Marker, useMap } from "react-leaflet";

import L from "leaflet";
import "leaflet-canvas-marker";

import { PlacesContext } from "@/contexts/PlacesContext";

import { getIcon } from "@/utils/mapUtils";
//import useMarkerLayer from "@/hooks/useMarkerLayer";
import usePlaces from "@/hooks/usePlaces";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { createRoot } from "react-dom/client";
import PlacePopup from "./PlacePupup";

const Places = memo((props) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const placesCtx = useContext(PlacesContext);
  const map = useMap();
  const { placesToRender, handleFlyToPlace } = usePlaces(props);

  const ciLayerRef = useRef(null);
  const markersRef = useRef([]);

  const id = searchParams.get("id");

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
          placesCtx.replacePlacesList(data);

          if (id && placesCtx && props.interactiveMap === true) {
            const placeToFlyTo = placesCtx.places.find(
              (place) => place._id === id
            );

            if (placeToFlyTo) {
              handleFlyToPlace(placeToFlyTo);
            }
          } else if (props.interactiveMap === true) {
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

  // useMarkerLayer({
  //   map,
  //   placesToRender,
  //   ciLayerRef,
  //   markersRef,
  //   props,
  //   router,
  // });
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
      popupRoot.render(<PlacePopup place={place} router={router} />);
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

// 300 lines
