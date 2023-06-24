import { useEffect, useState } from "react";
import { Marker, Popup, useMap } from "react-leaflet";

const svgIcon = L.divIcon({
  html: `<div class="pin w-8 h-8 flex items-center justify-center w-full h-full">
     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 text-white -rotate-45 ">
    <path stroke-linecap="round" stroke-linejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
  </svg> </div>
`,
  className: "rounded-full",
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  //labelAnchor: [-6, 0],
  //popupAnchor: [0, -15],
});

const geticon = (zoom) => {
  let iconSize = 40;

  if (zoom <= 14 && zoom > 10) {
    iconSize = 32;
  } else if (zoom <= 10 && zoom > 8) {
    iconSize = 24;
  } else if (zoom <= 8 && zoom > 6) {
    iconSize = 20;
  } else if (zoom <= 6 && zoom > 4) {
    iconSize = 16;
  } else if (zoom <= 4) {
    iconSize = 8;
  }

  const svgIcon = L.divIcon({
    html: `<div class="pin flex items-center justify-center w-full h-full">
           <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="text-white -rotate-45" style="width: ${
             0.75 * iconSize + "px"
           }; height: ${0.75 * iconSize + "px"}">
          <path stroke-linecap="round" stroke-linejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
        </svg> </div>
      `,
    className: "rounded-full",
    iconSize: [iconSize, iconSize],
    iconAnchor: [iconSize / 2, iconSize],
    // labelAnchor: [-6, 0],
    // popupAnchor: [0, -15],
  });

  return svgIcon;
};

const GetCoordinates = () => {
  const map = useMap();
  const [zoom, setZoom] = useState(13);
  const [markerIcon, setMarkerIcon] = useState(svgIcon);

  useEffect(() => {
    const handleMapZoom = () => {
      const zoom = map.getZoom();

      const updatedIcon = geticon(zoom);

      setMarkerIcon(updatedIcon);
    };

    map.on("zoomend", handleMapZoom);

    return () => {
      map.off("zoomend", handleMapZoom);
    };
  }, [map]);

  return (
    <Marker position={[51.9713, 15]} icon={markerIcon}>
      <Popup>
        <span>
          A pretty CSS3 popup. <br /> Easily customizable.
        </span>
      </Popup>
    </Marker>
  );
};

export default GetCoordinates;
