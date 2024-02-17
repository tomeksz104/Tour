"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Grid } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/grid";
import Card from "./Card";

const CategoriesList = ({ selectedCategory, categories, onChangeCategory }) => {
  return (
    <Swiper
      modules={[Grid]}
      spaceBetween={20}
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
            rows: 1,
            fill: "row",
          },
        },
        1024: {
          slidesPerView: 3,
          grid: {
            rows: 2,
            fill: "row",
          },
        },
      }}
    >
      {categories.map((category) => (
        <SwiperSlide key={category.id} className="p-[1px] h-full">
          <Card
            selectedCategory={selectedCategory}
            category={category}
            onChange={onChangeCategory}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default CategoriesList;
