"use client";

import { useState } from "react";
import { useInView } from "react-intersection-observer";

export default function Image({ src, alt, style, className }) {
  const [isLoading, setIsLoading] = useState(true);

  const { ref, inView } = useInView({
    threshold: 0,
    triggerOnce: true,
  });

  return (
    <div className={className} ref={ref} style={style}>
      <img
        className="w-full h-full object-cover"
        src={inView ? src : null}
        alt={alt}
        onLoad={() => setIsLoading(false)}
        onError={() => setIsLoading(false)}
        style={{ display: "block" }}
      />
    </div>
  );
}
