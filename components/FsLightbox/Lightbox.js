"use client";

import React, { memo, useState } from "react";
import { createPortal } from "react-dom";
import FsLightbox from "fslightbox-react";

const Lightbox = memo(({ images, isOpen }) => {
  const isBrowser = typeof document !== "undefined";
  const portalRoot = isBrowser ? document.getElementById("fslightbox") : null;

  if (!portalRoot) return null;

  return (
    <>
      {createPortal(
        <FsLightbox
          toggler={isOpen}
          sources={images}
          slide={1}
          // loadOnlyCurrentSource={true}
        />,
        portalRoot
      )}
    </>
  );
});

export default Lightbox;
