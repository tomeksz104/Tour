import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { LazyLoadImage } from "react-lazy-load-image-component";

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
      <div className="relative flex flex-row items-center space-x-5 rounded-x">
        <div className="w-1/4 bg-white grid place-items-center">
          {/* <img src={place.image} alt={place.title} className="rounded-sm" /> */}
          <LazyLoadImage
            className="h-16 w-full object-cover object-center"
            src={place.image}
            alt={place.title}
          />
        </div>
        <div className="w-3/4 bg-white flex flex-col space-y-2 ">
          <Link
            href={`/place/${place._id}`}
            className="font-black text-gray-800 line-clamp-1"
          >
            {place.title}
          </Link>
          <p className="text-xs text-gray-500 line-clamp-2">
            {place.description}
          </p>
        </div>
      </div>
    </div>,
    infoContainer.current
  );
};

export default MobilePlacePopup;
