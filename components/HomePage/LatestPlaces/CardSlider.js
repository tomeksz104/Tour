"use client";

import { Suspense, lazy, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Grid } from "swiper/modules";

import Card from "./Card";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import "swiper/css/grid";

import createLightboxSources from "@/utils/createLightboxSources";
const Lightbox = lazy(() => import("@/components/FsLightbox/Lightbox"));

const CardSlider = ({ places = null }) => {
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [lightboxSources, setLightboxSources] = useState([]);

  const handleOpenLightbox = (place) => {
    const sources = createLightboxSources(place.mainPhotoPath, place.photos);

    setLightboxSources(sources);

    if (sources.length > 0) setIsLightboxOpen((prevState) => !prevState);
  };

  return (
    <>
      <Suspense>
        <Lightbox images={lightboxSources} isOpen={isLightboxOpen} />
      </Suspense>

      <Swiper
        modules={[Grid, Autoplay]}
        // className="grid"
        spaceBetween={20}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        breakpoints={{
          640: {
            slidesPerView: 1,

            grid: {
              rows: 1,
              fill: "row",
            },
          },
          768: {
            slidesPerView: 2,

            grid: {
              rows: 2,
              fill: "row",
            },
          },
          1024: {
            slidesPerView: 3,

            grid: {
              rows: 3,
              fill: "row",
            },
          },
        }}
      >
        {places.map((place, index) => (
          <SwiperSlide key={index} className="p-[1px] h-full">
            <Card
              place={place}
              onOpenLightbox={() => handleOpenLightbox(place)}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default CardSlider;
