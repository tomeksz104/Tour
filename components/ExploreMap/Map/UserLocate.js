import { useEffect } from "react";
import { useMap } from "react-leaflet";

import Locate from "leaflet.locatecontrol";
import "leaflet.locatecontrol/dist/L.Control.Locate.min.css";
import * as L from "leaflet";

const UserLocate = () => {
  const map = useMap();
  let locateControl;

  useEffect(() => {
    locateControl = L.control
      .locate({
        position: "topright",
        strings: {
          title: "Show me where I am, yo!",
        },
        icon: "leaflet-control-locate-location-icon",
        flyTo: true,
      })
      .addTo(map);

    // return () => {
    //   if (locateControl) {
    //     locateControl.remove();
    //   }
    // };
  }, [map]);

  return null;
};

export default UserLocate;
