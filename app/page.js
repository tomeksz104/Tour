import { getRandomPlaces } from "@/actions/getRandomPlaces";
import Button from "@/components/Button";

import CardSlider from "@/components/HomePage/CardSlider";
import ExploreCategories from "@/components/HomePage/ExploreCategories";

export default async function Home() {
  const randomPlaces = await getRandomPlaces(9);

  return (
    <>
      <section class="pb-20 2xl:pb-28 pt-10 2xl:pt-20 relative">
        <div class="absolute -bottom-52 left-0 -z-10">
          <svg
            class="w-full"
            width="301"
            height="691"
            viewBox="0 0 301 691"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g filter="url(#filter0_f_1423_12670)">
              <path
                d="M-70 634.739L-261.912 378.673L-19.4497 196.956C51.2609 143.961 151.544 158.322 204.539 229.033C257.534 299.744 243.173 400.027 172.462 453.022L-70 634.739Z"
                fill="#F0FDFA"
              ></path>
            </g>
            <g filter="url(#filter1_f_1423_12670)">
              <path
                d="M-154 255.221L-51.9803 105L90.2602 201.6C131.743 229.772 142.533 286.238 114.361 327.72C86.1887 369.203 29.7227 379.993 -11.7596 351.821L-154 255.221Z"
                fill="#FEFCE8"
              ></path>
            </g>
            <defs>
              <filter
                id="filter0_f_1423_12670"
                x="-317.912"
                y="108.979"
                width="610.428"
                height="581.759"
                filterUnits="userSpaceOnUse"
                color-interpolation-filters="sRGB"
              >
                <feFlood
                  flood-opacity="0"
                  result="BackgroundImageFix"
                ></feFlood>
                <feBlend
                  mode="normal"
                  in="SourceGraphic"
                  in2="BackgroundImageFix"
                  result="shape"
                ></feBlend>
                <feGaussianBlur
                  stdDeviation="28"
                  result="effect1_foregroundBlur_1423_12670"
                ></feGaussianBlur>
              </filter>
              <filter
                id="filter1_f_1423_12670"
                x="-259"
                y="0"
                width="494.053"
                height="472.514"
                filterUnits="userSpaceOnUse"
                color-interpolation-filters="sRGB"
              >
                <feFlood
                  flood-opacity="0"
                  result="BackgroundImageFix"
                ></feFlood>
                <feBlend
                  mode="normal"
                  in="SourceGraphic"
                  in2="BackgroundImageFix"
                  result="shape"
                ></feBlend>
                <feGaussianBlur
                  stdDeviation="52.5"
                  result="effect1_foregroundBlur_1423_12670"
                ></feGaussianBlur>
              </filter>
            </defs>
          </svg>
        </div>
        <div class="absolute -top-40 right-0 -z-10">
          <svg
            class="w-full"
            width="1262"
            height="1356"
            viewBox="0 0 1262 1356"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g filter="url(#filter0_f_1423_12669)">
              <ellipse
                rx="295.353"
                ry="293.376"
                transform="matrix(-1 0 0 1 973.353 275.376)"
                fill="#BBF7D0"
              ></ellipse>
            </g>
            <circle
              cx="795.5"
              cy="440.5"
              r="253.5"
              stroke="white"
              stroke-width="50"
            ></circle>
            <g filter="url(#filter1_f_1423_12669)">
              <ellipse
                cx="785.5"
                cy="572.5"
                rx="285.5"
                ry="283.5"
                fill="#FEF9C3"
              ></ellipse>
            </g>
            <g filter="url(#filter2_f_1423_12669)">
              <circle cx="1008" cy="186" r="325" fill="#F0FDFA"></circle>
            </g>
            <defs>
              <filter
                id="filter0_f_1423_12669"
                x="178"
                y="-518"
                width="1590.71"
                height="1586.75"
                filterUnits="userSpaceOnUse"
                color-interpolation-filters="sRGB"
              >
                <feFlood
                  flood-opacity="0"
                  result="BackgroundImageFix"
                ></feFlood>
                <feBlend
                  mode="normal"
                  in="SourceGraphic"
                  in2="BackgroundImageFix"
                  result="shape"
                ></feBlend>
                <feGaussianBlur
                  stdDeviation="250"
                  result="effect1_foregroundBlur_1423_12669"
                ></feGaussianBlur>
              </filter>
              <filter
                id="filter1_f_1423_12669"
                x="0"
                y="-211"
                width="1571"
                height="1567"
                filterUnits="userSpaceOnUse"
                color-interpolation-filters="sRGB"
              >
                <feFlood
                  flood-opacity="0"
                  result="BackgroundImageFix"
                ></feFlood>
                <feBlend
                  mode="normal"
                  in="SourceGraphic"
                  in2="BackgroundImageFix"
                  result="shape"
                ></feBlend>
                <feGaussianBlur
                  stdDeviation="250"
                  result="effect1_foregroundBlur_1423_12669"
                ></feGaussianBlur>
              </filter>
              <filter
                id="filter2_f_1423_12669"
                x="560"
                y="-262"
                width="896"
                height="896"
                filterUnits="userSpaceOnUse"
                color-interpolation-filters="sRGB"
              >
                <feFlood
                  flood-opacity="0"
                  result="BackgroundImageFix"
                ></feFlood>
                <feBlend
                  mode="normal"
                  in="SourceGraphic"
                  in2="BackgroundImageFix"
                  result="shape"
                ></feBlend>
                <feGaussianBlur
                  stdDeviation="61.5"
                  result="effect1_foregroundBlur_1423_12669"
                ></feGaussianBlur>
              </filter>
            </defs>
          </svg>
        </div>
        <div class="absolute z-10 hidden xl:block opacity-25 2xl:opacity-100 top-0 bottom-0 right-0 left-0">
          <span class="absolute left-16 bottom-0">
            <svg
              width="101"
              height="75"
              viewBox="0 0 101 75"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                width="3.1317"
                height="3.13172"
                transform="matrix(0.707116 0.707097 -0.707116 0.707097 2.2146 0)"
                fill="#14B8A6"
              ></rect>
              <rect
                width="3.1317"
                height="3.13172"
                transform="matrix(0.707116 0.707097 -0.707116 0.707097 21.4348 0)"
                fill="#14B8A6"
              ></rect>
              <rect
                width="3.1317"
                height="3.13172"
                transform="matrix(0.707116 0.707097 -0.707116 0.707097 40.6553 0)"
                fill="#14B8A6"
              ></rect>
              <rect
                width="3.1317"
                height="3.13172"
                transform="matrix(0.707116 0.707097 -0.707116 0.707097 59.8757 0)"
                fill="#14B8A6"
              ></rect>
              <rect
                width="3.1317"
                height="3.13172"
                transform="matrix(0.707116 0.707097 -0.707116 0.707097 79.0962 0)"
                fill="#14B8A6"
              ></rect>
              <rect
                width="3.1317"
                height="3.13172"
                transform="matrix(0.707116 0.707097 -0.707116 0.707097 98.3164 0)"
                fill="#14B8A6"
              ></rect>
              <rect
                width="3.1317"
                height="3.13172"
                transform="matrix(0.707116 0.707097 -0.707116 0.707097 2.2146 17.5488)"
                fill="#14B8A6"
              ></rect>
              <rect
                width="3.1317"
                height="3.13172"
                transform="matrix(0.707116 0.707097 -0.707116 0.707097 2.2146 35.0986)"
                fill="#14B8A6"
              ></rect>
              <rect
                width="3.1317"
                height="3.13172"
                transform="matrix(0.707116 0.707097 -0.707116 0.707097 2.2146 52.6475)"
                fill="#14B8A6"
              ></rect>
              <rect
                width="3.1317"
                height="3.13172"
                transform="matrix(0.707116 0.707097 -0.707116 0.707097 2.2146 70.1963)"
                fill="#14B8A6"
              ></rect>
              <rect
                width="3.1317"
                height="3.13172"
                transform="matrix(0.707116 0.707097 -0.707116 0.707097 21.4348 17.5488)"
                fill="#14B8A6"
              ></rect>
              <rect
                width="3.1317"
                height="3.13172"
                transform="matrix(0.707116 0.707097 -0.707116 0.707097 21.4348 35.0986)"
                fill="#14B8A6"
              ></rect>
              <rect
                width="3.1317"
                height="3.13172"
                transform="matrix(0.707116 0.707097 -0.707116 0.707097 21.4348 52.6475)"
                fill="#14B8A6"
              ></rect>
              <rect
                width="3.1317"
                height="3.13172"
                transform="matrix(0.707116 0.707097 -0.707116 0.707097 21.4348 70.1963)"
                fill="#14B8A6"
              ></rect>
              <rect
                width="3.1317"
                height="3.13172"
                transform="matrix(0.707116 0.707097 -0.707116 0.707097 40.6553 17.5488)"
                fill="#14B8A6"
              ></rect>
              <rect
                width="3.1317"
                height="3.13172"
                transform="matrix(0.707116 0.707097 -0.707116 0.707097 40.6553 35.0986)"
                fill="#14B8A6"
              ></rect>
              <rect
                width="3.1317"
                height="3.13172"
                transform="matrix(0.707116 0.707097 -0.707116 0.707097 40.6553 52.6475)"
                fill="#14B8A6"
              ></rect>
              <rect
                width="3.1317"
                height="3.13172"
                transform="matrix(0.707116 0.707097 -0.707116 0.707097 40.6553 70.1963)"
                fill="#14B8A6"
              ></rect>
              <rect
                width="3.1317"
                height="3.13172"
                transform="matrix(0.707116 0.707097 -0.707116 0.707097 59.8757 17.5488)"
                fill="#14B8A6"
              ></rect>
              <rect
                width="3.1317"
                height="3.13172"
                transform="matrix(0.707116 0.707097 -0.707116 0.707097 59.8757 35.0986)"
                fill="#14B8A6"
              ></rect>
              <rect
                width="3.1317"
                height="3.13172"
                transform="matrix(0.707116 0.707097 -0.707116 0.707097 59.8757 52.6475)"
                fill="#14B8A6"
              ></rect>
              <rect
                width="3.1317"
                height="3.13172"
                transform="matrix(0.707116 0.707097 -0.707116 0.707097 59.8757 70.1963)"
                fill="#14B8A6"
              ></rect>
              <rect
                width="3.1317"
                height="3.13172"
                transform="matrix(0.707116 0.707097 -0.707116 0.707097 79.0962 17.5488)"
                fill="#14B8A6"
              ></rect>
              <rect
                width="3.1317"
                height="3.13172"
                transform="matrix(0.707116 0.707097 -0.707116 0.707097 79.0962 35.0986)"
                fill="#14B8A6"
              ></rect>
              <rect
                width="3.1317"
                height="3.13172"
                transform="matrix(0.707116 0.707097 -0.707116 0.707097 79.0962 52.6475)"
                fill="#14B8A6"
              ></rect>
              <rect
                width="3.1317"
                height="3.13172"
                transform="matrix(0.707116 0.707097 -0.707116 0.707097 79.0962 70.1963)"
                fill="#14B8A6"
              ></rect>
              <rect
                width="3.1317"
                height="3.13172"
                transform="matrix(0.707116 0.707097 -0.707116 0.707097 98.3164 17.5488)"
                fill="#14B8A6"
              ></rect>
              <rect
                width="3.1317"
                height="3.13172"
                transform="matrix(0.707116 0.707097 -0.707116 0.707097 98.3164 35.0986)"
                fill="#14B8A6"
              ></rect>
              <rect
                width="3.1317"
                height="3.13172"
                transform="matrix(0.707116 0.707097 -0.707116 0.707097 98.3164 52.6475)"
                fill="#14B8A6"
              ></rect>
              <rect
                width="3.1317"
                height="3.13172"
                transform="matrix(0.707116 0.707097 -0.707116 0.707097 98.3164 70.1963)"
                fill="#14B8A6"
              ></rect>
            </svg>
          </span>
          <span class="animate-2 absolute left-28 bottom-52">
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="10" cy="10" r="10" fill="#14B8A6"></circle>
            </svg>
          </span>
          <span class="animate-3 absolute left-32 top-40">
            <svg
              width="38"
              height="38"
              viewBox="0 0 38 38"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M0.651129 19.1367C10.928 19.0878 19.2461 10.8072 19.2657 0.592236C19.2849 10.6462 27.3431 18.8262 37.3956 19.1283L37.3951 19.1451C27.5222 19.442 19.5732 27.3379 19.2744 37.1447C19.2686 37.1449 19.2628 37.1451 19.257 37.1453C18.9536 27.1781 10.7477 19.1847 0.651129 19.1367ZM0.46822 19.1367C0.311684 19.1359 0.155604 19.1333 0 19.1288C0.000156532 19.134 0.00031529 19.1393 0.000476273 19.1446C0.155922 19.1401 0.311844 19.1374 0.46822 19.1367ZM19.2738 0.000481984C19.2687 0.172956 19.266 0.34602 19.2657 0.519642C19.2653 0.345857 19.2626 0.172632 19.2575 0L19.2738 0.000481984Z"
                fill="#14B8A6"
              ></path>
            </svg>
          </span>
          <span class="animate-2 absolute left-96 top-20">
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="10" cy="10" r="10" fill="#14B8A6"></circle>
            </svg>
          </span>
          <span class="animate-3 absolute right-96 top-0">
            <svg
              width="101"
              height="75"
              viewBox="0 0 101 75"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                width="3.1317"
                height="3.13172"
                transform="matrix(0.707116 0.707097 -0.707116 0.707097 2.2146 0)"
                fill="#14B8A6"
              ></rect>
              <rect
                width="3.1317"
                height="3.13172"
                transform="matrix(0.707116 0.707097 -0.707116 0.707097 21.4348 0)"
                fill="#14B8A6"
              ></rect>
              <rect
                width="3.1317"
                height="3.13172"
                transform="matrix(0.707116 0.707097 -0.707116 0.707097 40.6553 0)"
                fill="#14B8A6"
              ></rect>
              <rect
                width="3.1317"
                height="3.13172"
                transform="matrix(0.707116 0.707097 -0.707116 0.707097 59.8757 0)"
                fill="#14B8A6"
              ></rect>
              <rect
                width="3.1317"
                height="3.13172"
                transform="matrix(0.707116 0.707097 -0.707116 0.707097 79.0962 0)"
                fill="#14B8A6"
              ></rect>
              <rect
                width="3.1317"
                height="3.13172"
                transform="matrix(0.707116 0.707097 -0.707116 0.707097 98.3164 0)"
                fill="#14B8A6"
              ></rect>
              <rect
                width="3.1317"
                height="3.13172"
                transform="matrix(0.707116 0.707097 -0.707116 0.707097 2.2146 17.5488)"
                fill="#14B8A6"
              ></rect>
              <rect
                width="3.1317"
                height="3.13172"
                transform="matrix(0.707116 0.707097 -0.707116 0.707097 2.2146 35.0986)"
                fill="#14B8A6"
              ></rect>
              <rect
                width="3.1317"
                height="3.13172"
                transform="matrix(0.707116 0.707097 -0.707116 0.707097 2.2146 52.6475)"
                fill="#14B8A6"
              ></rect>
              <rect
                width="3.1317"
                height="3.13172"
                transform="matrix(0.707116 0.707097 -0.707116 0.707097 2.2146 70.1963)"
                fill="#14B8A6"
              ></rect>
              <rect
                width="3.1317"
                height="3.13172"
                transform="matrix(0.707116 0.707097 -0.707116 0.707097 21.4348 17.5488)"
                fill="#14B8A6"
              ></rect>
              <rect
                width="3.1317"
                height="3.13172"
                transform="matrix(0.707116 0.707097 -0.707116 0.707097 21.4348 35.0986)"
                fill="#14B8A6"
              ></rect>
              <rect
                width="3.1317"
                height="3.13172"
                transform="matrix(0.707116 0.707097 -0.707116 0.707097 21.4348 52.6475)"
                fill="#14B8A6"
              ></rect>
              <rect
                width="3.1317"
                height="3.13172"
                transform="matrix(0.707116 0.707097 -0.707116 0.707097 21.4348 70.1963)"
                fill="#14B8A6"
              ></rect>
              <rect
                width="3.1317"
                height="3.13172"
                transform="matrix(0.707116 0.707097 -0.707116 0.707097 40.6553 17.5488)"
                fill="#14B8A6"
              ></rect>
              <rect
                width="3.1317"
                height="3.13172"
                transform="matrix(0.707116 0.707097 -0.707116 0.707097 40.6553 35.0986)"
                fill="#14B8A6"
              ></rect>
              <rect
                width="3.1317"
                height="3.13172"
                transform="matrix(0.707116 0.707097 -0.707116 0.707097 40.6553 52.6475)"
                fill="#14B8A6"
              ></rect>
              <rect
                width="3.1317"
                height="3.13172"
                transform="matrix(0.707116 0.707097 -0.707116 0.707097 40.6553 70.1963)"
                fill="#14B8A6"
              ></rect>
              <rect
                width="3.1317"
                height="3.13172"
                transform="matrix(0.707116 0.707097 -0.707116 0.707097 59.8757 17.5488)"
                fill="#14B8A6"
              ></rect>
              <rect
                width="3.1317"
                height="3.13172"
                transform="matrix(0.707116 0.707097 -0.707116 0.707097 59.8757 35.0986)"
                fill="#14B8A6"
              ></rect>
              <rect
                width="3.1317"
                height="3.13172"
                transform="matrix(0.707116 0.707097 -0.707116 0.707097 59.8757 52.6475)"
                fill="#14B8A6"
              ></rect>
              <rect
                width="3.1317"
                height="3.13172"
                transform="matrix(0.707116 0.707097 -0.707116 0.707097 59.8757 70.1963)"
                fill="#14B8A6"
              ></rect>
              <rect
                width="3.1317"
                height="3.13172"
                transform="matrix(0.707116 0.707097 -0.707116 0.707097 79.0962 17.5488)"
                fill="#14B8A6"
              ></rect>
              <rect
                width="3.1317"
                height="3.13172"
                transform="matrix(0.707116 0.707097 -0.707116 0.707097 79.0962 35.0986)"
                fill="#14B8A6"
              ></rect>
              <rect
                width="3.1317"
                height="3.13172"
                transform="matrix(0.707116 0.707097 -0.707116 0.707097 79.0962 52.6475)"
                fill="#14B8A6"
              ></rect>
              <rect
                width="3.1317"
                height="3.13172"
                transform="matrix(0.707116 0.707097 -0.707116 0.707097 79.0962 70.1963)"
                fill="#14B8A6"
              ></rect>
              <rect
                width="3.1317"
                height="3.13172"
                transform="matrix(0.707116 0.707097 -0.707116 0.707097 98.3164 17.5488)"
                fill="#14B8A6"
              ></rect>
              <rect
                width="3.1317"
                height="3.13172"
                transform="matrix(0.707116 0.707097 -0.707116 0.707097 98.3164 35.0986)"
                fill="#14B8A6"
              ></rect>
              <rect
                width="3.1317"
                height="3.13172"
                transform="matrix(0.707116 0.707097 -0.707116 0.707097 98.3164 52.6475)"
                fill="#14B8A6"
              ></rect>
              <rect
                width="3.1317"
                height="3.13172"
                transform="matrix(0.707116 0.707097 -0.707116 0.707097 98.3164 70.1963)"
                fill="#14B8A6"
              ></rect>
            </svg>
          </span>
          <span class="absolute right-52 top-60">
            <svg
              width="38"
              height="38"
              viewBox="0 0 38 38"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M0.651129 19.1367C10.928 19.0878 19.2461 10.8072 19.2657 0.592236C19.2849 10.6462 27.3431 18.8262 37.3956 19.1283L37.3951 19.1451C27.5222 19.442 19.5732 27.3379 19.2744 37.1447C19.2686 37.1449 19.2628 37.1451 19.257 37.1453C18.9536 27.1781 10.7477 19.1847 0.651129 19.1367ZM0.46822 19.1367C0.311684 19.1359 0.155604 19.1333 0 19.1288C0.000156532 19.134 0.00031529 19.1393 0.000476273 19.1446C0.155922 19.1401 0.311844 19.1374 0.46822 19.1367ZM19.2738 0.000481984C19.2687 0.172956 19.266 0.34602 19.2657 0.519642C19.2653 0.345857 19.2626 0.172632 19.2575 0L19.2738 0.000481984Z"
                fill="#14B8A6"
              ></path>
            </svg>
          </span>
          <span class="absolute right-1/3 bottom-20">
            <svg
              width="93"
              height="75"
              viewBox="0 0 93 75"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                width="3.00513"
                height="3.00514"
                transform="matrix(0.676024 0.736879 -0.676024 0.736879 2.03162 0)"
                fill="#FACC15"
              ></rect>
              <rect
                width="3.00513"
                height="3.00514"
                transform="matrix(0.676024 0.736879 -0.676024 0.736879 19.6641 0)"
                fill="#FACC15"
              ></rect>
              <rect
                width="3.00513"
                height="3.00514"
                transform="matrix(0.676024 0.736879 -0.676024 0.736879 37.2966 0)"
                fill="#FACC15"
              ></rect>
              <rect
                width="3.00513"
                height="3.00514"
                transform="matrix(0.676024 0.736879 -0.676024 0.736879 54.9293 0)"
                fill="#FACC15"
              ></rect>
              <rect
                width="3.00513"
                height="3.00514"
                transform="matrix(0.676024 0.736879 -0.676024 0.736879 72.5621 0)"
                fill="#FACC15"
              ></rect>
              <rect
                width="3.00513"
                height="3.00514"
                transform="matrix(0.676024 0.736879 -0.676024 0.736879 90.1945 0)"
                fill="#FACC15"
              ></rect>
              <rect
                width="3.00513"
                height="3.00514"
                transform="matrix(0.676024 0.736879 -0.676024 0.736879 2.03162 17.5488)"
                fill="#FACC15"
              ></rect>
              <rect
                width="3.00513"
                height="3.00514"
                transform="matrix(0.676024 0.736879 -0.676024 0.736879 2.03162 35.0986)"
                fill="#FACC15"
              ></rect>
              <rect
                width="3.00513"
                height="3.00514"
                transform="matrix(0.676024 0.736879 -0.676024 0.736879 2.03162 52.6475)"
                fill="#FACC15"
              ></rect>
              <rect
                width="3.00513"
                height="3.00514"
                transform="matrix(0.676024 0.736879 -0.676024 0.736879 2.03162 70.1963)"
                fill="#FACC15"
              ></rect>
              <rect
                width="3.00513"
                height="3.00514"
                transform="matrix(0.676024 0.736879 -0.676024 0.736879 19.6641 17.5488)"
                fill="#FACC15"
              ></rect>
              <rect
                width="3.00513"
                height="3.00514"
                transform="matrix(0.676024 0.736879 -0.676024 0.736879 19.6641 35.0986)"
                fill="#FACC15"
              ></rect>
              <rect
                width="3.00513"
                height="3.00514"
                transform="matrix(0.676024 0.736879 -0.676024 0.736879 19.6641 52.6475)"
                fill="#FACC15"
              ></rect>
              <rect
                width="3.00513"
                height="3.00514"
                transform="matrix(0.676024 0.736879 -0.676024 0.736879 19.6641 70.1963)"
                fill="#FACC15"
              ></rect>
              <rect
                width="3.00513"
                height="3.00514"
                transform="matrix(0.676024 0.736879 -0.676024 0.736879 37.2966 17.5488)"
                fill="#FACC15"
              ></rect>
              <rect
                width="3.00513"
                height="3.00514"
                transform="matrix(0.676024 0.736879 -0.676024 0.736879 37.2966 35.0986)"
                fill="#FACC15"
              ></rect>
              <rect
                width="3.00513"
                height="3.00514"
                transform="matrix(0.676024 0.736879 -0.676024 0.736879 37.2966 52.6475)"
                fill="#FACC15"
              ></rect>
              <rect
                width="3.00513"
                height="3.00514"
                transform="matrix(0.676024 0.736879 -0.676024 0.736879 37.2966 70.1963)"
                fill="#FACC15"
              ></rect>
              <rect
                width="3.00513"
                height="3.00514"
                transform="matrix(0.676024 0.736879 -0.676024 0.736879 54.9293 17.5488)"
                fill="#FACC15"
              ></rect>
              <rect
                width="3.00513"
                height="3.00514"
                transform="matrix(0.676024 0.736879 -0.676024 0.736879 54.9293 35.0986)"
                fill="#FACC15"
              ></rect>
              <rect
                width="3.00513"
                height="3.00514"
                transform="matrix(0.676024 0.736879 -0.676024 0.736879 54.9293 52.6475)"
                fill="#FACC15"
              ></rect>
              <rect
                width="3.00513"
                height="3.00514"
                transform="matrix(0.676024 0.736879 -0.676024 0.736879 54.9293 70.1963)"
                fill="#FACC15"
              ></rect>
              <rect
                width="3.00513"
                height="3.00514"
                transform="matrix(0.676024 0.736879 -0.676024 0.736879 72.5621 17.5488)"
                fill="#FACC15"
              ></rect>
              <rect
                width="3.00513"
                height="3.00514"
                transform="matrix(0.676024 0.736879 -0.676024 0.736879 72.5621 35.0986)"
                fill="#FACC15"
              ></rect>
              <rect
                width="3.00513"
                height="3.00514"
                transform="matrix(0.676024 0.736879 -0.676024 0.736879 72.5621 52.6475)"
                fill="#FACC15"
              ></rect>
              <rect
                width="3.00513"
                height="3.00514"
                transform="matrix(0.676024 0.736879 -0.676024 0.736879 72.5621 70.1963)"
                fill="#FACC15"
              ></rect>
              <rect
                width="3.00513"
                height="3.00514"
                transform="matrix(0.676024 0.736879 -0.676024 0.736879 90.1945 17.5488)"
                fill="#FACC15"
              ></rect>
              <rect
                width="3.00513"
                height="3.00514"
                transform="matrix(0.676024 0.736879 -0.676024 0.736879 90.1945 35.0986)"
                fill="#FACC15"
              ></rect>
              <rect
                width="3.00513"
                height="3.00514"
                transform="matrix(0.676024 0.736879 -0.676024 0.736879 90.1945 52.6475)"
                fill="#FACC15"
              ></rect>
              <rect
                width="3.00513"
                height="3.00514"
                transform="matrix(0.676024 0.736879 -0.676024 0.736879 90.1945 70.1963)"
                fill="#FACC15"
              ></rect>
            </svg>
          </span>
          <span class="absolute right-16 bottom-32">
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="10" cy="10" r="10" fill="#14B8A6"></circle>
            </svg>
          </span>
        </div>
        <div class="container mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
          <div class="grid items-center grid-cols-1 lg:grid-cols-5 gap-8">
            <div class="hero-content xl:pr-20 lg:col-span-3">
              <span class="-rotate-2	 inline-flex items-center justify-center bg-green-500 text-green-900 text-xs lg:text-base font-medium rounded-full transition-all duration-500 px-4 py-2 mb-2">
                BIGGEST INTERACTIVE MAP
              </span>
              <h2 class="text-3xl lg:text-4xl 2xl:text-6xl leading-tight font-bold text-gray-900">
                Find the <span className="bg-yellow-100">BEST</span> Place
                <span class="text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-green-600 inline-block">
                  on our interactive map
                </span>
              </h2>
              <p class="text-lg md:text-xl leading-tight font-medium text-gray-600 my-6 2xl:my-12">
                Our collection of more than 1,500 remarkable places will take
                your trip to the next level. Look for illustrations on our maps
                and visit unique places!
              </p>
              <div class="flex flex-wrap items-center">
                <Button type="button" className="w-64">
                  Explore the map
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="ml-3 w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                    />
                  </svg>
                </Button>
              </div>
            </div>
            <div class="lg:col-span-2 aos-init aos-animate" data-aos="fade-up">
              <img
                class="w-full max-w-xl hidden lg:block"
                src="https://html-etheum.netlify.app/assets/images/hero-image.png"
                alt="title"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Random places section */}
      {/* <div class="mx-auto px-4 sm:px-6 lg:px-8 md:w-3/5 mb-10">
        <h2 class="text-center text-3xl font-bold text-gray-900 dark:text-white md:text-4xl lg:text-5xl">
          Guide to Enchanting Places
        </h2>
        <p class="mt-4 text-center text-gray-600 dark:text-gray-300 max-w-xl mx-auto">
          Discover extraordinary places that will take your breath away and
          leave you with unforgettable memories. Our app will take you on a
          journey through fascinating corners of the world, from mystical
          ancient ruins to picturesque beaches and surprising natural wonders.
          Are you ready for amazing adventures? Start your journey now!
        </p>
      </div> */}
      <CardSlider places={randomPlaces} />

      {/* Categories section */}
      <ExploreCategories />

      {/* On all your devices section */}
      <div class="bg-green-50 dark:bg-green-900/10 py-16">
        <div class="container m-auto space-y-8 px-6 md:px-12 lg:px-20">
          <div class="items-center justify-center gap-16 text-center md:flex md:text-left">
            <div class="order-last mb-6 space-y-6 md:mb-0 md:w-7/12 lg:w-6/12">
              <h1 class="text-4xl font-bold text-green-900 md:text-5xl dark:text-white">
                On all your devices
              </h1>
              <p class="text-lg text-gray-600 dark:text-gray-300">
                Our app is designed to work perfectly on any device, providing a
                smooth and responsive experience.
              </p>
            </div>
            <img
              src="https://roadtrippers.com/wp-content/uploads/2022/10/Cross-Device-Asset@2x-1-1024x667.png"
              width="832"
              height="608"
              class="m-auto md:w-5/12"
              loading="lazy"
              alt="mobility_illustration"
            />
          </div>
        </div>
      </div>

      {/* Ready to start section */}
      <section class="py-24 sm:py-32">
        <div class="max-w-screen-xl px-4 mx-auto sm:px-6 lg:px-8">
          <img
            alt=""
            loading="lazy"
            width="295"
            height="125"
            decoding="async"
            data-nimg="1"
            class="mx-auto w-72"
            // style="color:transparent"
            src="https://bright.tailwindawesome.com/_next/static/media/sunrise.09b39020.svg"
          />
          <h2 class="max-w-screen-md mx-auto mt-6 text-center text-gray-900 text-6xl font-bold">
            <span class="block">Ready to start </span>
            <span class="relative block">
              <span class="relative">
                <img
                  alt=""
                  loading="lazy"
                  width="1126"
                  height="64"
                  decoding="async"
                  data-nimg="1"
                  class="absolute inset-0 transform translate-y-9 sm:translate-y-11 xl:translate-y-14"
                  // style="color:transparent"
                  src="https://bright.tailwindawesome.com/_next/static/media/underline-simple-light-purple.ff6e5b29.svg"
                />
                <span class="relative">your adventure?</span>
              </span>
            </span>
          </h2>
          <div class="flex justify-center mt-12 xl:mt-14">
            <Button type="button" className="w-64">
              Explore the map
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="ml-3 w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                />
              </svg>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
