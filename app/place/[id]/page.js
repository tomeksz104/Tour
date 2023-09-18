import { getCommentsByPlaceId } from "@/actions/getCommentsByPlaceId";
import { getPlaceById } from "@/actions/getPlaceById";

import CommentCard from "@/components/Comment/CommentCard";
import ManualSlideshow from "@/components/Slideshow/ManualSlideshow";
//import PlaceDetails from "@/components/Place/Details/PlaceDetails";
import dynamic from "next/dynamic";
import { Comme } from "next/font/google";
import Link from "next/link";

const PlaceDetailsMap = dynamic(
  () => import("@/components/Place/Details/PlaceDetailsMap"),
  {
    loading: () => <p>loading...</p>,
    ssr: false,
  }
);

export default async function PlaceDetailsPage({ params }) {
  const place = await getPlaceById(params?.id);

  let gallery = [{ url: place.image, accepted: true }, ...place.images];
  gallery = gallery.filter((item) => item.accepted !== false);

  return (
    <>
      <div className="w-full h-[480px]">
        <div
          className="absolute w-full h-[480px] bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${place.image})`,
          }}
        >
          <div className="w-full h-full backdrop-blur-md"></div>
        </div>
        <div className="mx-auto max-w-5xl w-full h-[480px]">
          <div class="relative flex flex-col group overflow-hidden z-0 max-w-5xl h-[480px]">
            <div
              href="http://127.0.0.1:8000/quiz/jesli-w-kuchni-gotujesz-tylko-wode-na-herbate-nie-poradzisz=sobie-z-tym-quizem"
              class="flex items-start relative w-full h-full"
            >
              <div class="absolute inset-0 overflow-hidden z-0 overflow-hidden z-0 select-none	">
                <ManualSlideshow images={gallery} />
              </div>
            </div>
            <div className="absolute w-full content-[''] bg-gradient-to-b from-[rgba(0,0,0,0.75)] to-transparent h-[200px] pointer-events-none"></div>
            <div class="absolute flex justify-between items-center top-2 inset-x-4 sm:inset-x-5 pointer-events-none">
              <h3 class="block text-3xl font-semibold text-white line-clamp-2">
                {place.title}
              </h3>
              <div className="flex items-center">
                <button
                  type="button"
                  class="rounded-full p-2 duration-300 text-white hover:text-red-400 hover:scale-110 pointer-events-auto"
                >
                  <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24">
                    <path
                      fill-rule="evenodd"
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="1"
                      d="M11.995 7.23319C10.5455 5.60999 8.12832 5.17335 6.31215 6.65972C4.49599 8.14609 4.2403 10.6312 5.66654 12.3892L11.995 18.25L18.3235 12.3892C19.7498 10.6312 19.5253 8.13046 17.6779 6.65972C15.8305 5.18899 13.4446 5.60999 11.995 7.23319Z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                </button>
                <Link
                  href={`/place/update/${place._id}`}
                  class="rounded-full p-2 duration-300 text-white hover:text-blue-400 hover:scale-110 pointer-events-auto"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1"
                    stroke="currentColor"
                    className="w-10 h-10"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                    ></path>
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <div className="relative">
        <div className="w-full absolute overflow-hidden bg-white">
          <div className="block">
            <div
              className="absolute w-full h-full bg-cover bg-center bg-no-repeat blur-sm"
              style={{
                backgroundImage: `url(${place.image})`,
              }}
            ></div>
            <div className="relative mx-auto h-[480px] max-w-5xl ">
              <div className="absolute w-full content-[''] bg-gradient-to-b from-[rgba(0,0,0,0.75)] to-transparent h-[250px]"></div>
              <img
                className="h-[480px] object-cover"
                alt="Photo of LEGOLAND Florida Resort"
                height="480"
                width="1024"
                src={`${place.image}`}
              />
              <div className="h-[480px] object-cover">
                <ManualSlideshow images={images} />
              </div>
            </div>
          </div>
        </div>
        <div className="relative flex justify-between px-5 pt-5 mx-auto h-[480px] max-w-5xl">
          <h1 className="text-4xl font-bold text-white ">{place.title}</h1>
          <div>
            <a
              class="absolute top-5 right-5 z-[1] rounded-full p-2 shadow-sm duration-300 text-white hover:text-red-400 hover:scale-110 backdrop-blur-sm"
              href="/place/update/649dddaa0746d1e47248c758"
            >
              <svg className="w-10 h-12" fill="none" viewBox="0 0 24 24">
                <path
                  fill-rule="evenodd"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="1"
                  d="M11.995 7.23319C10.5455 5.60999 8.12832 5.17335 6.31215 6.65972C4.49599 8.14609 4.2403 10.6312 5.66654 12.3892L11.995 18.25L18.3235 12.3892C19.7498 10.6312 19.5253 8.13046 17.6779 6.65972C15.8305 5.18899 13.4446 5.60999 11.995 7.23319Z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </a>
          </div>
        </div>
      </div> */}

      {/* <div className="bg-slate-200 py-3">
        <div className="relative flex justify-between mx-auto max-w-5xl px-3 xl:px-0">
          <button
            type="button"
            className="relative flex items-center justify-center before:absolute before:inset-0 before:rounded-full before:bg-green-500 before:transition before:duration-300 hover:before:scale-105 active:duration-75 active:before:scale-95"
          >
            <span className="relative px-10 py-2 flex items-center text-sm font-semibold text-white dark:text-dark">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                className="w-4 h-4 mr-2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
                ></path>
              </svg>
              Add to Watchlist
            </span>
          </button>

          <div className="flex space-x-3">
            <Link href={place.googleMapUrl} target="_blank">
              <button className="flex items-center justify-center w-10 h-10 duration-300 text-neutral-800 border border-neutral-400 hover:text-green-500 hover:border-green-500 hover:shadow-lg hover:shadow-lime-600/20 rounded-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-5 h-5 -rotate-45 -mt-1"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
                  />
                </svg>
              </button>
            </Link>

            <button className="flex items-center justify-center w-10 h-10 duration-300 text-neutral-800 border border-neutral-400 hover:text-blue-500 hover:border-blue-500 hover:shadow-lg hover:shadow-blue-600/20 rounded-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z"
                />
              </svg>
            </button>
          </div>
        </div>
      </div> */}
      <div className="relative mx-auto max-w-5xl w-full px-3 xl:px-0">
        <div className="mt-5 grid grid-cols-1 gap-y-6 lg:gap-x-6 lg:w-full lg:grid-cols-6">
          <div className="col-span-4">
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-700 md:text-4xl">
                Overview
              </h2>
              <p className="text-gray-500">{place.description}</p>
            </div>
            <CommentCard place={place} />
            {/* <div className="h-[480px] max-w-5xl">
              <ManualSlideshow images={images} />
            </div> */}
          </div>
          <div className="col-span-2 space-y-3">
            <p className="text-center text-gray-700">{place.title} map</p>
            <PlaceDetailsMap place={place} />
          </div>
        </div>
      </div>
    </>
  );
}
