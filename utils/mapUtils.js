import { categories_list } from "@/components/Categories/Categories";

export const getIcon = (category) => {
  const selectedCategory = categories_list.find(
    (item) => item.title === category
  );

  if (selectedCategory && selectedCategory.iconPath) {
    const iconPath = selectedCategory.iconPath;

    const icon = new L.icon({
      iconUrl: iconPath,
      iconSize: [30, 38],
      iconAnchor: [15, 18],
    });

    return icon;
  }
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
