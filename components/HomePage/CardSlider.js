"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, Grid } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import "swiper/css/grid";
import Card from "./Card";

const CardSlider = ({ places }) => {
  const card = (
    <div class="group p-4 relative bg-white dark:bg-dark border border-gray-300 dark:border-gray-800 rounded-lg shadow-outline hover:shadow-hover hover:outline hover:outline-1 hover:outline-green-500">
      <button class="w-9 h-9 p-2 absolute top-7 right-7 flex items-center justify-center bg-gray-700/5 hover:bg-gray-700/10 rounded-full z-10">
        <svg width="18" height="18" viewBox="0 0 18 18">
          <path
            d="M0 6.71134V6.50744C0 4.05002 1.77609 1.954 4.19766 1.55041C5.76914 1.28357 7.43203 1.80599 8.57812 2.95384L9 3.37502L9.39023 2.95384C10.568 1.80599 12.1992 1.28357 13.8023 1.55041C16.2246 1.954 18 4.05002 18 6.50744V6.71134C18 8.17033 17.3953 9.56603 16.3266 10.561L9.97383 16.4918C9.71016 16.7379 9.36211 16.875 9 16.875C8.63789 16.875 8.28984 16.7379 8.02617 16.4918L1.67309 10.561C0.605742 9.56603 1.05469e-05 8.17033 1.05469e-05 6.71134H0Z"
            fill="#585C7B"
          ></path>
        </svg>
      </button>
      <a href="#">
        <div
          class="w-full h-56 bg-cover bg-center relative rounded-lg mb-4 flex items-end justify-center"
          style={{
            backgroundImage:
              "url(https://nftix-html.vercel.app/assets/img/images/vighnesh-dudani.jpg)",
          }}
        ></div>
      </a>
      <div class="flex items-center justify-between">
        <div class="flex items-center">
          <p class="font-normal text-gray-700 dark:text-white mr-2">
            Julian Canne
          </p>
          <svg
            class="w-3 h-3 fill-primary-500"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M8 0C9.15 0 10.15 0.646875 10.6531 1.59687C11.6812 1.25312 12.8156 1.53 13.6562 2.34313C14.4688 3.15625 14.6906 4.31875 14.4031 5.34688C15.3531 5.85 16 6.85 16 8C16 9.15 15.3531 10.15 14.4031 10.6531C14.7187 11.6812 14.4688 12.8156 13.6562 13.6562C12.8156 14.4688 11.6812 14.6906 10.6531 14.4031C10.15 15.3531 9.15 16 8 16C6.85 16 5.85 15.3531 5.34688 14.4031C4.31875 14.7187 3.15625 14.4688 2.34313 13.6562C1.53 12.8156 1.28125 11.6812 1.59687 10.6531C0.646875 10.15 0 9.15 0 8C0 6.85 0.646875 5.85 1.59687 5.34688C1.25312 4.31875 1.53 3.15625 2.34313 2.34313C3.15625 1.53 4.31875 1.28125 5.34688 1.59687C5.85 0.646875 6.85 0 8 0ZM11.0031 7.00313C11.3219 6.7375 11.3219 6.2625 11.0031 5.96875C10.7375 5.67812 10.2625 5.67812 9.96875 5.96875L7 8.94063L5.75313 7.71875C5.4875 7.42812 5.0125 7.42812 4.71875 7.71875C4.42812 8.0125 4.42812 8.4875 4.71875 8.75313L6.46875 10.5031C6.7625 10.8219 7.2375 10.8219 7.50313 10.5031L11.0031 7.00313Z"></path>
          </svg>
        </div>
        <button class="w-7 h-7 flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800">
          <svg
            class="w-[14px] h-[14px] fill-gray-600 dark:fill-gray-300"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M4.62963 8C4.62963 9.03 3.81718 9.86666 2.81481 9.86666C1.81245 9.86666 1 9.03 1 8C1 6.97 1.81245 6.13333 2.81481 6.13333C3.81718 6.13333 4.62963 6.97 4.62963 8ZM9.81481 8C9.81481 9.03 9.00139 9.86666 8 9.86666C6.99861 9.86666 6.18519 9.03 6.18519 8C6.18519 6.97 6.99861 6.13333 8 6.13333C9.00139 6.13333 9.81481 6.97 9.81481 8ZM11.3704 8C11.3704 6.97 12.1838 6.13333 13.1852 6.13333C14.1866 6.13333 15 6.97 15 8C15 9.03 14.1866 9.86666 13.1852 9.86666C12.1838 9.86666 11.3704 9.03 11.3704 8Z"></path>
          </svg>
        </button>
      </div>
      <a
        href="/#"
        class="text-xl font-medium text-gray-900 dark:text-white group-hover:text-green-500"
      >
        Dream World #50
      </a>
    </div>
  );

  return (
    <>
      <div className="container mx-auto px-6 md:px-12 lg:px-20">
        <Swiper
          modules={[Grid, Autoplay]}
          className="mySwiper grid p-5"
          spaceBetween={20}
          //pagination={{ clickable: true }}
          //slidesPerView={3}
          // grid={{
          //   rows: 3,
          //   fill: "row",
          // }}
          //slidesPerColumn={3}
          //slidesPerGroup={3}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          breakpoints={{
            // when window width is >= 640px
            640: {
              //width: 640,
              slidesPerView: 1,

              grid: {
                rows: 1,
                fill: "row",
              },
            },
            // when window width is >= 768px
            768: {
              //width: 768,
              slidesPerView: 2,

              grid: {
                rows: 2,
                fill: "row",
              },
            },
            1024: {
              //width: 1020,
              slidesPerView: 3,

              grid: {
                rows: 3,
                fill: "row",
              },
            },
          }}
          onSwiper={(swiper) => console.log(swiper)}
          onSlideChange={() => console.log("slide change")}
        >
          {places.map((place) => (
            <SwiperSlide className="p-3 h-full">
              <Card place={place} />
            </SwiperSlide>
          ))}
          {/* <SwiperSlide className="p-3">{card}</SwiperSlide>
          <SwiperSlide className="p-3">{card}</SwiperSlide>
          <SwiperSlide className="p-3">{card}</SwiperSlide>
          <SwiperSlide className="p-3">{card}</SwiperSlide>
          <SwiperSlide className="p-3">{card}</SwiperSlide>
          <SwiperSlide className="p-3">{card}</SwiperSlide>
          <SwiperSlide className="p-3">{card}</SwiperSlide>
          <SwiperSlide className="p-3">{card}</SwiperSlide>
          <SwiperSlide className="p-3">{card}</SwiperSlide> */}
        </Swiper>
      </div>
    </>
  );
};

export default CardSlider;
