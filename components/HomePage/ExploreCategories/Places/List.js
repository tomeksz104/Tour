"use client";

import { Suspense, lazy, useState } from "react";

import Card from "./Card";
import { Swiper, SwiperSlide } from "swiper/react";
import { Grid } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import "swiper/css/grid";

const Lightbox = lazy(() => import("@/components/FsLightbox/Lightbox"));

import createLightboxSources from "@/utils/createLightboxSources";

const PlacesList = ({ selectedCategory, categoriesWithPlaces, provinces }) => {
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
      <div className="px-5">
        <Swiper
          modules={[Grid]}
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
              slidesPerView: 3,
              grid: {
                rows: 1,
                fill: "row",
              },
            },
            1024: {
              slidesPerView: 5,
              grid: {
                rows: 1,
                fill: "row",
              },
            },
          }}
        >
          {categoriesWithPlaces[selectedCategory].places.map((place) => (
            <SwiperSlide key={place.id} className="p-[1px] h-full">
              <Card
                place={place}
                category={categoriesWithPlaces[selectedCategory].category}
                province={provinces[place.categoryId].name}
                onOpenLightbox={() => handleOpenLightbox(place)}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
};

export default PlacesList;
