import { memo, useContext, useEffect, useState } from "react";
import { useMap } from "react-leaflet";

import Locate from "leaflet.locatecontrol";
import "leaflet.locatecontrol/dist/L.Control.Locate.min.css";
import * as L from "leaflet";

const UserLocate = memo(() => {
  const map = useMap();
  const [locateControl, setLocateControl] = useState(null);

  if (locateControl === null) {
    const locate = L.control.locate({
      position: "topright",
      strings: {
        title: "Show me where I am, yo!",
      },
      icon: "leaflet-control-locate-location-icon",
      showPopup: false,
      //flyTo: true,
      setView: false,
    });

    locate.addTo(map);

    setLocateControl(locate);
  }

  return null;
});

export default UserLocate;
