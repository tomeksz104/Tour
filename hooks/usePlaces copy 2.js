import { useEffect, useState, useRef, useContext } from "react";
import { useSearchParams } from "next/navigation";
import { PlacesContext } from "@/contexts/PlacesContext";
import { useMap } from "react-leaflet";
import { getVisibleMarkers } from "@/utils/mapUtils";

function usePlaces(props) {
  const placesCtx = useContext(PlacesContext);
  const searchParams = useSearchParams();
  const map = useMap();
  const [placesToRender, setPlacesToRender] = useState([]);

  const idToZoom = searchParams.get("id");

  useEffect(() => {
    const newPlacesToRender =
      placesToRender > 0 ? placesToRender : placesCtx.places;
    setPlacesToRender(newPlacesToRender);
  }, [placesToRender, placesCtx.places]);

  useEffect(() => {
    if (placesCtx.places.length > 0) {
      if (map && props?.markerToRemove) {
        const filteredPlacesArr = placesCtx.places.filter(
          (element) => element._id !== props.markerToRemove
        );
        setPlacesToRender(filteredPlacesArr);
        console.log(placesCtx.places);
        console.log(filteredPlacesArr);
      }
    }
  }, [placesCtx.places, props.markerToRemove]);

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

  // Filtering places
  useEffect(() => {
    if (props.selectedCategories) {
      const filteredPlacesArr = placesCtx.places.filter((place) =>
        props.selectedCategories.includes(place.category)
      );
      //placesCtx.replaceFilteredPlacesList(filteredPlacesArr);
      setPlacesToRender(filteredPlacesArr);
      if (filteredPlacesArr.length > 0 && props.interactiveMap === true) {
        const newVisiblePlaces = getVisibleMarkers(map, filteredPlacesArr);
        props.onChangeVisiblePlaces(newVisiblePlaces);
      } else if (props.interactiveMap === true) {
        const newVisiblePlaces = getVisibleMarkers(map, placesCtx.places);
        props.onChangeVisiblePlaces(newVisiblePlaces);
      }
    }
  }, [props.selectedCategories, placesCtx.places, map, props.interactiveMap]);

  // Flight to location based on ID
  useEffect(() => {
    if (idToZoom && placesCtx) {
      const placeToFlyTo = placesCtx.places.find(
        (place) => place._id === idToZoom
      );

      if (placeToFlyTo) handleFlyToPlace(placeToFlyTo);
    }
  }, [idToZoom, placesCtx.places]);

  const handleFlyToPlace = (placeToFlyTo) => {
    map.setView(placeToFlyTo.coordinates, 18);
    const newVisiblePlaces = getVisibleMarkers(map, placesToRender);
    props.onChangeVisiblePlaces(newVisiblePlaces);
  };

  console.log(placesToRender.length);

  return {
    placesToRender,
  };
}

export default usePlaces;
