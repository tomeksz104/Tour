import { categories_list } from "./categories";

export const getIcon = (category) => {
  const selectedCategory = categories_list.find(
    (item) => item.title === category
  );

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

export const getIconPath = (category) => {
  const selectedCategory = categories_list.find(
    (item) => item.title === category
  );

  if (selectedCategory && selectedCategory.iconPath) {
    return selectedCategory.iconPath;
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
      map
        .getBounds()
        .contains(L.latLng(place.coordinates.lat, place.coordinates.lng))
    );
    return visiblePlaces;
  }

  return [];
};
