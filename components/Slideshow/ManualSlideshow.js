"use client";

import { useEffect, useState } from "react";
import Image from "./Image";
import "./Slideshow.css";

export default function ManualSlideshow({ images }) {
  const [imgIndex, setImgIndex] = useState(0);
  const [dotsStyling, setDotsStyling] = useState({
    transform: "translateX(0px)",
    transition: "0.8s",
  });

  useEffect(() => {
    if (images.length > 4) {
      if (imgIndex > 1 && imgIndex < images.length - 2) {
        setDotsStyling({
          transform: `translateX(calc(${-imgIndex * 22}px + 44px))`,
          transition: "0.8s",
        });
      } else if (imgIndex === 0) {
        setDotsStyling({ transform: "translateX(0px)", transition: "0.8s" });
      } else if (imgIndex === images.length - 1) {
        setDotsStyling({
          transform: `translateX(calc(${-imgIndex * 22}px + 88px))`,
          transition: "0.8s",
        });
      }
    }
  }, [imgIndex, images.length]);

  return (
    <div className="slideshow">
      <div className="slideshow-btns">
        <svg
          className="slideshow-left h-6 w-6 fill-neutral-200 hover:fill-white cursor-pointer"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
          onClick={(e) => {
            imgIndex === 0
              ? setImgIndex(images.length - 1)
              : setImgIndex(imgIndex - 1);
            e.preventDefault();
          }}
        >
          <path d="M256 0C114.6 0 0 114.6 0 256c0 141.4 114.6 256 256 256s256-114.6 256-256C512 114.6 397.4 0 256 0zM384 288H205.3l49.38 49.38c12.5 12.5 12.5 32.75 0 45.25s-32.75 12.5-45.25 0L105.4 278.6C97.4 270.7 96 260.9 96 256c0-4.883 1.391-14.66 9.398-22.65l103.1-103.1c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25L205.3 224H384c17.69 0 32 14.33 32 32S401.7 288 384 288z" />
        </svg>

        <svg
          className="slideshow-right h-6 w-6 fill-neutral-200 hover:fill-white cursor-pointer"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
          onClick={(e) => {
            imgIndex === images.length - 1
              ? setImgIndex(0)
              : setImgIndex(imgIndex + 1);
            e.preventDefault();
          }}
        >
          <path d="M256 0C114.6 0 0 114.6 0 256c0 141.4 114.6 256 256 256s256-114.6 256-256C512 114.6 397.4 0 256 0zM406.6 278.6l-103.1 103.1c-12.5 12.5-32.75 12.5-45.25 0s-12.5-32.75 0-45.25L306.8 288H128C110.3 288 96 273.7 96 256s14.31-32 32-32h178.8l-49.38-49.38c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0l103.1 103.1C414.6 241.3 416 251.1 416 256C416 260.9 414.6 270.7 406.6 278.6z" />
        </svg>
      </div>
      <div className="slides">
        {images.map((image, index) => (
          <Image
            className="slide"
            key={index}
            src={image.url}
            alt={image.altText}
            style={{
              transform: `translateX(${-imgIndex * 100}%)`,
              transition: "0.8s",
            }}
            loading="lazy"
          />
        ))}
      </div>
      <div className="slideshow-dots-container">
        <div className="slideshow-dots" style={dotsStyling}>
          {images.map((_, index) => (
            <div
              key={index}
              className={`slideshow-dot${imgIndex === index ? " active" : ""}`}
              onClick={() => {
                setImgIndex(index);
              }}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
}
