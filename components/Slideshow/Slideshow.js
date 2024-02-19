"use client";

import { useState } from "react";
import Image from "next/image";

import CardImage from "./CardImage";
import { Button } from "../ui/button";

import { Heart, Maximize2, Pencil } from "lucide-react";

import "./Slideshow.css";
import Link from "next/link";

export default function ManualSlideshow({
  placeId,
  hasPermission,
  images,
  placeTitle,
}) {
  const [imgIndex, setImgIndex] = useState(0);

  return (
    <div className="slideshow">
      <div className="absolute w-full content-[''] bg-gradient-to-b from-[rgba(0,0,0,0.75)] to-transparent h-[200px] pointer-events-none z-[1]"></div>
      <div className="absolute top-0 right-0 z-10 flex items-center gap-x-2 p-3">
        {hasPermission && (
          <Button
            asChild
            variant="secondary"
            className="bg-white/10 hover:bg-green-500 backdrop-blur-md rounded-full h-8 w-8 p-1 text-gray-300 hover:text-white"
          >
            <Link href={`/place/update/${placeId}`}>
              <Pencil strokeWidth={1.75} size={14} />
            </Link>
          </Button>
        )}

        <Button
          variant="secondary"
          className={`bg-white/10 hover:bg-white/10 backdrop-blur-md rounded-full h-8 w-8 p-1 text-gray-300 hover:text-red-500`}
        >
          <Heart strokeWidth={1.75} size={14} />
        </Button>
        <Button
          variant="secondary"
          className="bg-white/10 hover:bg-white/10 backdrop-blur-md rounded-full h-8 px-3 py-1 text-gray-300 font-bold text-xs"
        >
          {imgIndex + 1} / {images.length}
        </Button>
        <Button
          variant="secondary"
          className="bg-white/10 hover:bg-green-500 backdrop-blur-md rounded-full h-8 w-8 p-1 text-gray-300 hover:text-white"
        >
          <Maximize2 strokeWidth={1.75} size={14} />
        </Button>
      </div>
      <div className="slides overflow-hidden">
        {images.map((image, index) => (
          <CardImage
            fill
            className="slide"
            key={index}
            src={image.url ? image.url : "/images/noImage.jpg"}
            alt={`The photo shows ${placeTitle}`}
            style={{
              transform: `translateX(${-imgIndex * 100}%)`,
              transition: "0.8s",
            }}
            loading="lazy"
          />
        ))}
      </div>
      <div className="max-w-sm md:max-w-2xl mt-8 absolute -translate-x-2/4 -translate-y-full left-2/4 top-full">
        <div
          className="relative flex gap-x-3 whitespace-nowrap z-[1] bg-gray-100 p-2 rounded-md
          before:content-[' '] before:bg-[radial-gradient(circle_at_left_top,transparent_70%,rgb(243,246,248)_69%)] before:absolute before:z-10 before:w-[10px] before:h-[10px] before:-left-[10px] before:bottom-8
          after:content-[' '] after:bg-[radial-gradient(circle_at_right_top,transparent_70%,rgb(243,246,248)_69%)] after:absolute after:z-10 after:w-[10px] after:h-[10px] after:-right-[10px] after:bottom-8
          "
        >
          {images.map((image, index) => (
            <div
              key={index}
              onClick={() => {
                setImgIndex(index);
              }}
              className="relative w-32 h-16	cursor-pointer"
            >
              <Image
                src={image.url ? image.url : "/images/noImage.jpg"}
                width="0"
                height="0"
                sizes="100vw"
                alt={`The photo shows ${placeTitle}`}
                className={`w-full h-full object-cover rounded-md ${
                  imgIndex === index ? "" : "opacity-70"
                }`}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
