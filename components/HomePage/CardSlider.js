"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, Grid } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import "swiper/css/grid";
import Card from "./Card";

const CardSlider = ({ places }) => {
  return (
    <>
      <div className="container mx-auto px-6 md:px-12 lg:px-20">
        <Swiper
          modules={[Grid, Autoplay]}
          className="mySwiper grid p-5"
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
            <SwiperSlide key={index} className="p-3 h-full">
              <Card place={place} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
};

export default CardSlider;