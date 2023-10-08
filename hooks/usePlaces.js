import { useEffect, useState, useRef, useContext, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { PlacesContext } from "@/contexts/PlacesContext";
import { useMap } from "react-leaflet";
import { getVisibleMarkers } from "@/utils/mapUtils";
import { WatchlistContext } from "@/contexts/WatchlistContext";

function arraysAreEqual(arr1, arr2) {
  if (arr1.length !== arr2.length) {
    return false;
  }

  for (let i = 0; i < arr1.length; i++) {
    if (arr1[i] !== arr2[i]) {
      return false;
    }
  }

  return true;
}

function usePlaces(props) {
  const placesCtx = useContext(PlacesContext);
  const watchlistCtx = useContext(WatchlistContext);
  const searchParams = useSearchParams();
  const map = useMap();
  const [placesToRender, setPlacesToRender] = useState([]);

  const idToZoom = searchParams.get("id");
  const allPlaces = useMemo(() => placesCtx.places, [placesCtx.places]);

  useEffect(() => {
    let newPlacesToRender =
      placesToRender.length > 0 ? placesToRender : allPlaces;

    if (map && props?.markerToRemove) {
      newPlacesToRender = newPlacesToRender.filter(
        (element) => element._id !== props.markerToRemove
      );
    }
    if (!arraysAreEqual(newPlacesToRender, placesToRender)) {
      setPlacesToRender(newPlacesToRender);
    }
  }, [placesToRender, allPlaces]);

  // Filtering places
  useEffect(() => {
    if (props.isShowWatchlist) {
      const filteredPlaces = allPlaces.filter((place) =>
        watchlistCtx.watchlist.includes(place._id)
      );

      if (!arraysAreEqual(filteredPlaces, placesToRender)) {
        setPlacesToRender(filteredPlaces);
        const newVisiblePlaces = getVisibleMarkers(map, filteredPlaces);
        props.onChangeVisiblePlaces(newVisiblePlaces);
      }
    } else if (props.selectedCategories) {
      const filteredPlacesArr = allPlaces.filter((place) =>
        props.selectedCategories.includes(place.category)
      );

      if (!arraysAreEqual(filteredPlacesArr, placesToRender)) {
        setPlacesToRender(filteredPlacesArr);
      }
      if (filteredPlacesArr.length > 0 && props.interactiveMap === true) {
        const newVisiblePlaces = getVisibleMarkers(map, filteredPlacesArr);
        props.onChangeVisiblePlaces(newVisiblePlaces);
      } else if (props.interactiveMap === true) {
        const newVisiblePlaces = getVisibleMarkers(map, placesCtx.places);
        props.onChangeVisiblePlaces(newVisiblePlaces);
      }
    }
  }, [
    props.selectedCategories,
    props.isShowWatchlist,
    allPlaces,
    map,
    props.interactiveMap,
  ]);

  // Filtering places
  // useEffect(() => {
  //   let newPlacesToRender =
  //     placesToRender.length > 0 ? placesToRender : allPlaces;

  //   if (map && props?.markerToRemove) {
  //     newPlacesToRender = newPlacesToRender.filter(
  //       (element) => element._id !== props.markerToRemove
  //     );
  //   }

  //   if (!arraysAreEqual(newPlacesToRender, placesToRender)) {
  //     setPlacesToRender(newPlacesToRender);
  //   }

  //   if (props.selectedCategories) {
  //     newPlacesToRender = allPlaces.filter((place) =>
  //       props.selectedCategories.includes(place.category)
  //     );

  //     if (!arraysAreEqual(newPlacesToRender, placesToRender)) {
  //       setPlacesToRender(newPlacesToRender);
  //     }

  //     if (newPlacesToRender.length > 0 && props.interactiveMap === true) {
  //       const newVisiblePlaces = getVisibleMarkers(map, newPlacesToRender);
  //       props.onChangeVisiblePlaces(newVisiblePlaces);
  //     } else if (props.interactiveMap === true) {
  //       const newVisiblePlaces = getVisibleMarkers(map, placesCtx.places);
  //       props.onChangeVisiblePlaces(newVisiblePlaces);
  //     }
  //   }
  // }, [
  //   props.selectedCategories,
  //   placesToRender,
  //   allPlaces,
  //   map,
  //   props.interactiveMap,
  // ]);

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

      if (placeToFlyTo) handleZoomToPlace(placeToFlyTo);
    }
  }, [idToZoom, placesToRender]);

  const handleZoomToPlace = (placeToFlyTo) => {
    map.setView(placeToFlyTo.coordinates, 18);
    const newVisiblePlaces = getVisibleMarkers(map, placesToRender);
    props.onChangeVisiblePlaces(newVisiblePlaces);
  };

  return {
    placesToRender,
  };
}

export default usePlaces;
