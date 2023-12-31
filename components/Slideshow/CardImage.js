"use client";

import { useInView } from "react-intersection-observer";
import Image from "next/image";

export default function CardImage({ src, alt, style, className }) {
  const { ref, inView } = useInView({
    threshold: 0,
    triggerOnce: true,
  });

  return (
    <div className={className} ref={ref} style={style}>
      {inView && (
        <Image
          fill
          className="w-full h-full object-cover"
          src={src}
          alt={alt}
          style={{ display: "block" }}
        />
      )}
    </div>
  );
}
