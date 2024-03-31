import { LngLat } from "mapbox-gl";

export const getIcon = (category) => {
  const icon = new L.icon({
    iconUrl: category.iconPath,
    iconSize: [18, 23],
    iconAnchor: [9, 11],
    //iconSize: [30, 38],
    //iconAnchor: [15, 18],
  });

  return icon;
};

export const getIconPathByCategoryId = (categoryId, categories = null) => {
  const selectedCategory = categories.find((item) => item.id === categoryId);

  if (selectedCategory && selectedCategory.iconPath) {
    const iconPath = selectedCategory.iconPath;

    const icon = new L.icon({
      iconUrl: iconPath,
      iconSize: [18, 23],
      iconAnchor: [9, 11],
      //iconSize: [30, 38],
      //iconAnchor: [15, 18],
    });

    return icon;
  }
};

export const getDefaultIcon = () => {
  const icon = new L.icon({
    iconUrl: "https://unpkg.com/leaflet@1.5.1/dist/images/marker-icon.png",
    iconSize: [18, 23],
    iconAnchor: [9, 11],
    //iconSize: [30, 38],
    //iconAnchor: [15, 18],
  });

  return icon;
};

export const getVisibleMarkers = (map, places) => {
  if (map) {
    const visiblePlaces = places.filter((place) =>
      map.getBounds().contains(L.latLng(place.latitude, place.longitude))
    );
    return visiblePlaces;
  }

  return [];
};

export const getVisibleMarkersML = (map, places) => {
  if (!map) return [];

  const bounds = map.getBounds();

  const visiblePlaces = places.filter((place) => {
    const placeLngLat = new LngLat(place.longitude, place.latitude);
    return bounds.contains(placeLngLat);
  });

  return visiblePlaces;
};

export const haversineDistance = (coords1, coords2) => {
  function toRad(x) {
    return (x * Math.PI) / 180;
  }

  const R = 6371;
  const dLat = toRad(coords2.latitude - coords1.latitude);
  const dLon = toRad(coords2.longitude - coords1.longitude);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(coords1.latitude)) *
      Math.cos(toRad(coords2.latitude)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};
