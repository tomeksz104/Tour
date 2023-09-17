import { getCommentsByPlaceId } from "@/actions/getCommentsByPlaceId";
import { getPlaceById } from "@/actions/getPlaceById";

import CommentCard from "@/components/Comment/CommentCard";
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

  return (
    <>
      <div className="relative">
        <div className="w-full absolute overflow-hidden bg-black">
          <div className="block">
            <div
              className="absolute w-full h-full opacity-30 bg-cover bg-center bg-no-repeat"
              style={{
                backgroundImage: `url(${place.image})`,
              }}
            ></div>
            <div className="relative mx-auto h-[480px] max-w-5xl shadow-[0_0_64px_0px_rgba(0,0,0,0.5)]">
              <div className="absolute w-full content-[''] bg-gradient-to-b from-[rgba(0,0,0,0.75)] to-transparent h-[250px]"></div>
              <img
                className="h-[480px] object-cover"
                alt="Photo of LEGOLAND Florida Resort"
                height="480"
                width="1024"
                src={`${place.image}`}
              />
            </div>
          </div>
        </div>
        <div className="relative mx-auto h-[480px] max-w-5xl">
          <h1 className="text-4xl font-bold text-white pl-5 pt-5 ">
            {place.title}
          </h1>
        </div>
      </div>
      <div className="bg-slate-200 py-3">
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
      </div>
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
          </div>
          <div className="col-span-2">
            <PlaceDetailsMap place={place} />
          </div>
        </div>
      </div>
    </>
  );
}
