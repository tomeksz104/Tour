import { MapContainer, Marker, TileLayer, useMap } from "react-leaflet";

import "./MapWrapper.css";

import { useEffect } from "react";

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

const MapWrapper = ({ children, ...props }) => {
  return (
    <MapContainer {...props} minZoom={2}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://api.maptiler.com/maps/streets-v2/256/{z}/{x}/{y}.png?key=S5C6vNCfw7EkBYlmw0xf"
      />
      {/* <MarkerClusterGroup
        showCoverageOnHover={false}
        spiderfyDistanceMultiplier={2}
        iconCreateFunction={createClusterCustomIcon}
      >
        <Marker position={[49.8397, 24.0297]} icon={customMarker} />
        <Marker position={[52.2297, 21.0122]} icon={customMarker} />
        <Marker position={[51.5074, -0.0901]} icon={customMarker} />
      </MarkerClusterGroup> */}
      {/* <Marker position={[49.8397, 24.0297]} icon={customMarker}>
        dsadas
      </Marker> */}
      {children}
    </MapContainer>
  );
};

export default MapWrapper;
