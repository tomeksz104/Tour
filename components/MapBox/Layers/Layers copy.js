import {
  memo,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import useMapContext from "@/hooks/useMapContext";
import { PlacesContext } from "@/contexts/PlacesContext";

import Map, {
  Source,
  Layer,
  NavigationControl,
  useMap,
} from "react-map-gl/maplibre";

const layerStyle = {
  id: "places",
  type: "symbol",
  source: "places",
  layout: {
    "icon-image": ["get", "icon"],
    "icon-size": 0.6,
    "icon-overlap": "always",
  },
};

const Layers = memo(() => {
  const { places } = useContext(PlacesContext);
  // const { map } = useMapContext();
  const { current: map } = useMap();
  const iconsLoaded = useRef(false);

  const generateFeatures = useCallback(() => {
    return places.map((place) => ({
      type: "Feature",
      properties: {
        icon: place.category.iconPath
          .split("/")
          .pop()
          .replace(/\.[^/.]+$/, ""), // usunięcie rozszerzenia pliku
      },
      geometry: {
        type: "Point",
        coordinates: [place.longitude, place.latitude],
      },
    }));
  }, [places]);

  const placesLayer = useMemo(() => {
    const features = generateFeatures();

    const collection = {
      type: "FeatureCollection",
      features,
    };

    return collection;
  }, [places, map]);

  useEffect(() => {
    const getIcons = async () => {
      let loadedIconsCount = 0;
      const uniqueIcons = new Set(
        places.map((place) => place.category.iconPath)
      );

      for (const iconPath of uniqueIcons) {
        const iconName = iconPath
          .split("/")
          .pop()
          .replace(/\.[^/.]+$/, "");

        if (!map.hasImage(iconName)) {
          loadedIconsCount++;
          const image = await map.loadImage(iconPath);

          if (!map.hasImage(iconName)) map.addImage(iconName, image.data);
        }
      }

      if (loadedIconsCount === uniqueIcons.size) {
        iconsLoaded.current = true;
      }
    };

    if (map && places.length > 0 && iconsLoaded.current === false) {
      getIcons();
    }

    // return () => {
    //   if (map && places) {

    //     places.forEach((place) => {
    //       const iconName = place.category.iconPath.split("/").pop();
    //       if (map.hasImage(iconName)) {
    //         map.removeImage(iconName);
    //       }
    //     });
    //   }
    // };
  }, [map, places]);

  if (iconsLoaded.current === false) return;

  return (
    <Source id="places-source" type="geojson" data={placesLayer}>
      <Layer {...layerStyle} />
    </Source>
  );
});

export default Layers;
