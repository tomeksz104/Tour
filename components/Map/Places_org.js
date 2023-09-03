import React, { memo, useEffect, useState, cloneElement } from "react";
import { renderToString } from "react-dom/server";
import { Marker, Popup, useMap } from "react-leaflet";

import { categories_list } from "../Categories/Categories";
import Link from "next/link";

import L from "leaflet"; // Dodaj import obiektu L

export const getIcon = (category, id, hoveredMarker) => {
  const selectedCategory = categories_list.find(
    (item) => item.title === category
  );

  if (selectedCategory && selectedCategory.icon) {
    const svgIcon = cloneElement(selectedCategory.icon, {
      className: "w-5 h-5 -rotate-45 text-white",
    });

    const icon = L.divIcon({
      html: `<div class="pin ${
        selectedCategory.colors
      } w-8 h-8 flex items-center justify-center w-full h-full">${renderToString(
        svgIcon
      )}</div>`,
      className: `rounded-full ${
        hoveredMarker === id ? "pulsating-marker" : ""
      }`,
      style: { zIndex: 499 },
      iconSize: [32, 32],
      iconAnchor: [16, 32],
    });

    return icon;
  }
};

const getVisibleMarkers = (map, places) => {
  if (map) {
    const visibleMarkers = [];
    const visiblePlaces = [];

    map.eachLayer((layer) => {
      if (
        layer instanceof L.Marker &&
        map.getBounds().contains(layer.getLatLng())
      ) {
        visibleMarkers.push(layer);

        const place = places.find(
          (place) =>
            place.coordinates.lat === layer.getLatLng().lat &&
            place.coordinates.lng === layer.getLatLng().lng
        );
        if (place) {
          visiblePlaces.push(place);
        }
      }
    });
    return visiblePlaces;
  }

  return [];
};

const Places_org = memo((props) => {
  const [places, setPlaces] = useState([]);
  const [filteredPlaces, setFilteredPlaces] = useState([]);
  const map = useMap();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/place", { method: "GET" });
        if (response.ok) {
          const data = await response.json();
          setPlaces(data);
          props.onChangeVisiblePlaces(data);
        } else {
          console.error("Failed to fetch placess:", response.status);
        }
      } catch (error) {
        console.error("Failed to fetch places:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const handleMoveEnd = () => {
      const newVisiblePlaces = getVisibleMarkers(map, places);
      props.onChangeVisiblePlaces(newVisiblePlaces);
    };

    if (map) {
      map.on("moveend", handleMoveEnd);
    }

    return () => {
      if (map) {
        map.off("moveend", handleMoveEnd);
      }
    };
  }, [places, map]);

  useEffect(() => {
    if (props.selectedCategories) {
      const filteredPlaces = places.filter((place) =>
        props.selectedCategories.includes(place.category)
      );
      setFilteredPlaces(filteredPlaces);
      if (filteredPlaces.length > 0) {
        props.onChangeVisiblePlaces(filteredPlaces);
      } else {
        props.onChangeVisiblePlaces(places);
      }
    }
  }, [props.selectedCategories]);

  const placesToRender = filteredPlaces.length > 0 ? filteredPlaces : places;

  return (
    <>
      {/* <PixiOverlay /> */}
      {/* <RandomMarkers /> */}
      <PlacesToRender places={placesToRender} />
      {/* {placesToRender.map((place, index) => (
        <Marker
          position={[place.coordinates.lat, place.coordinates.lng]}
          icon={getIcon(place.category, place._id, props?.hoveredMarkerId)}
          key={index}
          classNames="pulsating-marker"
          eventHandlers={{
            click: (e) => {
              props.onOpenMarker(place);
            },
          }}
        >
          <Popup closeButton={false} className="w-64">
            <div class="group rounded-3xl">
              <div class="relative overflow-hidden rounded-t-xl">
                <Link
                  href={`/place/update/${place._id}`}
                  className="absolute top-2 right-2 z-[1] bg-white rounded-full p-1 shadow-sm ransition duration-300 hover:scale-110"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-3 h-3 text-blue-500"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
                    />
                  </svg>
                </Link>
                <img
                  src={place.image}
                  alt={place.title}
                  loading="lazy"
                  width="1000"
                  height="667"
                  class="h-32 w-full object-cover object-top"
                />
              </div>
              <div class="py-2 px-3 relative">
                <h3 class="text-md font-semibold text-gray-800 dark:text-white">
                  {place.title}
                </h3>
                <p class="pt-1 text-gray-600 dark:text-gray-300 hidden md:block">
                  {place.description}
                </p>
              </div>
            </div>
          </Popup>
        </Marker>
      ))} */}
    </>
  );
});

export default Places_org;

const PlacesToRender = memo((props) => {
  return (
    <>
      {props.places.map((place, index) => (
        <Marker
          position={[place.coordinates.lat, place.coordinates.lng]}
          icon={getIcon(place.category, place._id, props?.hoveredMarkerId)}
          key={index}
          classNames="pulsating-marker"
          eventHandlers={{
            click: (e) => {
              props.onOpenMarker(place);
            },
          }}
        >
          <Popup closeButton={false} className="w-64">
            <div class="group rounded-3xl">
              <div class="relative overflow-hidden rounded-t-xl">
                <Link
                  href={`/place/update/${place._id}`}
                  className="absolute top-2 right-2 z-[1] bg-white rounded-full p-1 shadow-sm ransition duration-300 hover:scale-110"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-3 h-3 text-blue-500"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
                    />
                  </svg>
                </Link>
                <img
                  src={place.image}
                  alt={place.title}
                  loading="lazy"
                  width="1000"
                  height="667"
                  class="h-32 w-full object-cover object-top"
                />
              </div>
              <div class="py-2 px-3 relative">
                <h3 class="text-md font-semibold text-gray-800 dark:text-white">
                  {place.title}
                </h3>
                <p class="pt-1 text-gray-600 dark:text-gray-300 hidden md:block">
                  {place.description}
                </p>
              </div>
            </div>
          </Popup>
        </Marker>
      ))}
    </>
  );
});

const PixiOverlay = () => {
  const map = useMap();

  const polygonLatLngs = [
    [51.509, -0.08],
    [51.503, -0.06],
    [51.51, -0.047],
    [51.509, -0.08],
  ];
  let projectedPolygon;
  const triangle = new PIXI.Graphics();

  const markerTexture = PIXI.Assets.load(
    "https://unpkg.com/leaflet@1.5.1/dist/images/marker-icon.png"
  );
  const markerLatLng = [51.5, -0.09];
  const marker = new PIXI.Sprite(markerTexture);
  marker.anchor.set(0.5, 1);

  const pixiContainer = new PIXI.Container();
  pixiContainer.addChild(triangle);
  pixiContainer.addChild(marker);

  let firstDraw = true;
  let prevZoom;

  const pixiOverlay = L.pixiOverlay((utils) => {
    const zoom = utils.getMap().getZoom();
    const container = utils.getContainer();
    const renderer = utils.getRenderer();
    const project = utils.latLngToLayerPoint;
    const scale = utils.getScale();

    if (firstDraw) {
      const markerCoords = project(markerLatLng);
      marker.x = markerCoords.x;
      marker.y = markerCoords.y;

      projectedPolygon = polygonLatLngs.map((coords) => project(coords));
    }
    if (firstDraw || prevZoom !== zoom) {
      marker.scale.set(1 / scale);

      triangle.clear();
      triangle.lineStyle(3 / scale, 0x3388ff, 1);
      triangle.beginFill(0x3388ff, 0.2);
      projectedPolygon.forEach((coords, index) => {
        if (index == 0) triangle.moveTo(coords.x, coords.y);
        else triangle.lineTo(coords.x, coords.y);
      });
      triangle.endFill();
    }
    firstDraw = false;
    prevZoom = zoom;
    renderer.render(container);
  }, pixiContainer);

  pixiOverlay.addTo(map);

  return null; // Ten komponent nie renderuje nic w drzewie React
};

const customMarker = new L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.5.1/dist/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [10, 41],
  popupAnchor: [2, -40],
});

const createClusterCustomIcon = function (cluster) {
  return L.divIcon({
    html: `<span>${cluster.getChildCount()}</span>`,
    className: "marker-cluster-custom",
    iconSize: L.point(40, 40, true),
  });
};

// Function to generate random coordinates
const generateRandomCoordinates = () => {
  const minLat = 49;
  const maxLat = 55;
  const minLng = 14;
  const maxLng = 24;

  const lat = Math.random() * (maxLat - minLat) + minLat;
  const lng = Math.random() * (maxLng - minLng) + minLng;

  return { lat, lng };
};

const RandomMarkers = () => {
  const [markers, setMarkers] = useState([]);

  useEffect(() => {
    const numMarkers = 2000;
    const generatedMarkers = [];

    for (let i = 0; i < numMarkers; i++) {
      const { lat, lng } = generateRandomCoordinates();

      generatedMarkers.push({ lat, lng });
    }

    setMarkers(generatedMarkers);
  }, []);

  return (
    <MarkerClusterGroup iconCreateFunction={createClusterCustomIcon}>
      <Markers markers={markers} />
      {/* {markers.map((marker, index) => (
        <Marker
          key={index}
          position={[marker.lat, marker.lng]}
          icon={customMarker}
        />
      ))} */}
    </MarkerClusterGroup>
  );
};

const Markers = React.memo(({ markers }) => {
  return (
    <>
      {markers.map((marker, index) => (
        <Marker
          key={index}
          position={[marker.lat, marker.lng]}
          icon={customMarker}
        />
      ))}
    </>
  );
});
