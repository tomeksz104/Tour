import {
  memo,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import { Source, Layer, Popup, useMap, FlyToInterpolator } from "react-map-gl";
import { useDebouncedCallback } from "use-debounce";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { getVisibleMarkersML, haversineDistance } from "@/utils/mapUtils";
import { useDispatch, useSelector } from "react-redux";
import { setIsLoading } from "@/redux/slices/mapSlice";
import { LocateContext } from "@/contexts/LocateContext";
import { WatchlistContext } from "@/contexts/WatchlistContext";

import { setVisiblePlaces } from "@/redux/slices/mapSlice";

import { trailData } from "./layerUtils";

const layerStyle = {
  id: "places",
  type: "symbol",
  source: "places",
  layout: {
    "icon-image": ["get", "icon"],
    "icon-size": [
      "interpolate",
      ["linear"],
      ["zoom"],
      3,
      0.1,
      4,
      0.2,
      5,
      0.3,
      6,
      0.4,
      7,
      0.5,
      8,
      0.6,
      9,
      0.7,
      10,
      0.8,
    ],
    "icon-allow-overlap": true,
  },
};

const labelLayerStyle = {
  id: "places-labels",
  type: "symbol",
  source: "places",
  layout: {
    "text-field": ["get", "label"],
    "text-size": 13,
    "text-anchor": "left",
    "text-offset": [1, 0],
  },
  paint: {
    "text-color": "#000000",
    "text-halo-color": "#ffffff",
    "text-halo-width": 3,
  },
  minzoom: 9.5,
  maxzoom: 22,
};

const Layers = ({ isShowWatchlist, categories }) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const { places, isLoading, isSidebarOpen, isSearchWhenMapMoving } =
    useSelector((state) => state.map);
  const dispatch = useDispatch();

  const locateCtx = useContext(LocateContext);
  const watchlistCtx = useContext(WatchlistContext);

  const { current: map } = useMap();
  const [iconsLoaded, setIconsLoaded] = useState(false);

  const [filteredPlaces, setFilteredPlaces] = useState([]);

  const idToZoom = searchParams.get("id");
  const nearMeParamsValue = searchParams.get("nearMe");
  const nearMeDistanceParamsValue = searchParams.get("nearMeDistanceMe");
  const provinceParamsValue = searchParams.get("province");
  const cityParamsValue = searchParams.get("city");
  const selectedCategories = searchParams.getAll("category");
  const isOpen = searchParams.get("open");

  const sortByParamsValue = searchParams.get("sortBy");

  const generateFeatures = useCallback(() => {
    let filteredPlaces = places.filter((place) => {
      // Filtrowanie "blisko mnie"
      if (nearMeParamsValue === "true") {
        const placeCoords = {
          latitude: place.latitude,
          longitude: place.longitude,
        };
        const distance = haversineDistance(locateCtx.coordinates, placeCoords);
        const radius = nearMeDistanceParamsValue
          ? +nearMeDistanceParamsValue
          : 50; // domyślny promień 50km

        if (distance > radius) {
          return false;
        }
      }

      // Filtrowanie według watchlisty
      if (isShowWatchlist && !watchlistCtx.watchlist.includes(place.id)) {
        return false;
      }

      // Filtrowanie według województwa
      if (
        provinceParamsValue !== null &&
        place.provinceId?.toString() !== provinceParamsValue
      ) {
        return false;
      }

      // Filtrowanie według miasta
      if (
        cityParamsValue !== null &&
        place.cityId?.toString() !== cityParamsValue
      ) {
        return false;
      }

      // Filtrowanie według kategorii
      if (
        selectedCategories.length > 0 &&
        !selectedCategories.includes(place.categoryId.toString())
      ) {
        return false;
      }

      // Filtrowanie otwartych teraz miejsc
      if (isOpen !== null && !place.isOpen) {
        return false;
      }

      return true;
    });

    // Sortowanie według najczęściej recenzowanych
    if (sortByParamsValue === "most_reviewed") {
      filteredPlaces = filteredPlaces.sort(
        (a, b) => b.reviewsCount - a.reviewsCount
      );
    }

    // Sortowanie według najlepiej ocenianych
    if (sortByParamsValue === "highest_rated") {
      filteredPlaces = filteredPlaces.sort(
        (a, b) => b.averageRating - a.averageRating
      );
    }

    setFilteredPlaces(filteredPlaces);

    return filteredPlaces.map((place) => ({
      type: "Feature",
      properties: {
        icon: place.category.iconPath,
        id: place.id,
        lat: place.latitude,
        lng: place.longitude,
        label: place.title,
      },
      geometry: {
        type: "Point",
        coordinates: [place.longitude, place.latitude],
      },
    }));
  }, [places, searchParams, isShowWatchlist, dispatch]);

  const placesLayer = useMemo(() => {
    const features = generateFeatures();

    const collection = {
      type: "FeatureCollection",
      features,
    };

    return collection;
  }, [places, map, searchParams, isShowWatchlist]);

  useEffect(() => {
    if (filteredPlaces.length > 0 && isSidebarOpen === true) {
      const newVisiblePlaces = getVisibleMarkersML(map, filteredPlaces);

      dispatch(setVisiblePlaces(newVisiblePlaces));
    }
  }, [filteredPlaces, dispatch, isSidebarOpen, isSearchWhenMapMoving]);

  useEffect(() => {
    const loadIcons = async () => {
      const loadImage = (path, name) =>
        new Promise((resolve, reject) => {
          map.loadImage(path, (error, image) => {
            if (error) {
              reject(error);
              return;
            }
            if (!map.hasImage(name)) {
              map.addImage(name, image);
            }
            resolve();
          });
        });

      const promises = categories.map((category) => {
        const path = category.iconPath;
        return loadImage(path, path);
      });

      try {
        await Promise.all(promises);
        setIconsLoaded(true);
      } catch (error) {
        console.error("Failed to load icons:", error);
      }
    };

    if (map && categories.length > 0 && !iconsLoaded) {
      loadIcons();
    }
  }, [map, categories]);

  // Using useDebouncedCallback to delay handleMoveEnd function
  const handleMoveEnd = useDebouncedCallback(() => {
    if (isSearchWhenMapMoving === true && isSidebarOpen === true) {
      const newVisiblePlaces = getVisibleMarkersML(map, filteredPlaces);

      dispatch(setVisiblePlaces(newVisiblePlaces));

      dispatch(setIsLoading(false));
    }
  }, 1000);

  const handleMoveStart = useDebouncedCallback(() => {
    if (isLoading === true) return;

    if (isSearchWhenMapMoving === true && isSidebarOpen === true) {
      dispatch(setIsLoading(true));
    }
  }, 100);

  useEffect(() => {
    if (!map) return;

    if (isSearchWhenMapMoving === true && isSidebarOpen === true) {
      map.on("moveend", handleMoveEnd);
      map.on("movestart", handleMoveStart);
    }

    return () => {
      map.off("moveend", handleMoveEnd);
      map.off("movestart", handleMoveStart);
    };
  }, [map, isSidebarOpen]);

  useEffect(() => {
    if (idToZoom && places) {
      const placeToFlyTo = places.find(
        (place) => place.id.toString() === idToZoom
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
  }, [idToZoom, places]);

  const handleZoomToPlace = (placeToFlyTo) => {
    const coordinates = [placeToFlyTo.longitude, placeToFlyTo.latitude];
    if (map) {
      const mapIns = map.getMap();
      mapIns.flyTo({
        center: coordinates,
        zoom: 16,
        speed: 2,
        curve: 2,
        essential: true,
      });
    }
  };

  if (iconsLoaded === false) return;

  return (
    <>
      {/* <Source id="trail-source" type="geojson" data={trailData}>
        <Layer
          id="trail-line"
          type="line"
          source="trail-source"
          layout={{
            "line-join": "round",
            "line-cap": "round",
          }}
          paint={{
            "line-color": "#1A202C", // Kolor linii
            "line-width": 3, // Szerokość linii
            "line-dasharray": [2, 2], // Definiowanie przerywanej linii
          }}
        />
      </Source> */}
      <Source id="places-source" type="geojson" data={placesLayer}>
        <Layer {...layerStyle} />
        <Layer {...labelLayerStyle} />
      </Source>
    </>
  );
};

export default memo(Layers);
