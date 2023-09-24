import { useEffect, useRef } from "react";

import { createRoot } from "react-dom/client";
import { getIcon } from "@/utils/mapUtils";
import PlacePopup from "@/components/Map/Places/PlacePupup";
import { useRouter } from "next/navigation";

import L from "leaflet";
import "leaflet-canvas-marker";

function useMarkerLayer({
  map,
  placesToRender,
  ciLayerRef,
  markersRef,
  props,
  router,
}) {
  // const ciLayerRef = useRef(null);
  // const markersRef = useRef([]);

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
}

export default useMarkerLayer;
