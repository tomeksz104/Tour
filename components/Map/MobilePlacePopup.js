import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

const infoText =
  "Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati a deserunt distinctio vitae! Dolores officiis animi ab ut officia consequuntur fuga, possimus et eligendi, facilis libero nulla repellat modi magnam!";

const MobilePlacePopup = () => {
  const infoContainer = useRef(document.createElement("div"));

  useEffect(() => {
    const portalRoot = document.getElementById("mobile-place-popup");
    portalRoot.appendChild(infoContainer.current);

    return () => {
      portalRoot.removeChild(infoContainer.current);
    };
  }, []);

  return createPortal(
    <div className="absolute p-5 rounded overflow-hidden z-10 border border-green-500 bottom-0 left-0 top-auto md:hidden w-full bg-white">
      {infoText}
    </div>,
    infoContainer.current
  );
};

export default MobilePlacePopup;
