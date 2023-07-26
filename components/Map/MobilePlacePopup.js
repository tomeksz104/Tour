import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

const MobilePlacePopup = ({ place }) => {
  const infoContainer = useRef(document.createElement("div"));

  useEffect(() => {
    const portalRoot = document.getElementById("mobile-place-popup");
    portalRoot.appendChild(infoContainer.current);

    return () => {
      portalRoot.removeChild(infoContainer.current);
    };
  }, []);

  return createPortal(
    <div className="absolute rounded overflow-hidden z-10 bottom-0 left-0 top-auto md:hidden w-full bg-white p-1 shadow-[0_1px_7px_0_rgba(0,0,0,0.5)]">
      <div class="relative flex flex-row items-center space-x-5 rounded-x">
        <div class="w-1/4 bg-white grid place-items-center">
          <img src={place.image} alt={place.title} class="rounded-sm" />
        </div>
        <div class="w-3/4 bg-white flex flex-col space-y-2 ">
          <h3 class="font-black text-gray-800">{place.title}</h3>
          <p class="text-xs text-gray-500 ">{place.description}</p>
        </div>
      </div>
    </div>,
    infoContainer.current
  );
};

export default MobilePlacePopup;
