import { categories_list } from "./categories";

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
    console.log(places);
    const visiblePlaces = places.filter((place) =>
      map.getBounds().contains(L.latLng(place.latitude, place.longitude))
    );
    return visiblePlaces;
  }

  return [];
};
