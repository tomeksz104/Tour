import { MapContainer, TileLayer } from "react-leaflet";

import "./MapWrapper.css";
import "leaflet/dist/leaflet.css";

const MapWrapper = ({ children, ...props }) => {
  return (
    <MapContainer
      {...props}
      minZoom={2}
      preferCanvas={true}
      attributionControl={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://api.maptiler.com/maps/streets-v2/256/{z}/{x}/{y}.png?key=S5C6vNCfw7EkBYlmw0xf"
      />

      {children}
    </MapContainer>
  );
};

export default MapWrapper;
