import Link from "next/link";
import dynamic from "next/dynamic";
import { getPlaceById } from "@/actions/getPlaceById";

import CommentCard from "@/components/Comment/CommentCard";
import Slideshow from "@/components/Slideshow/Slideshow";

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
                <Slideshow images={gallery} />
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
          <div className="col-span-2 space-y-3">
            <p className="text-center text-gray-700">{place.title} map</p>
            <PlaceDetailsMap place={place} />
          </div>
        </div>
      </div>
    </>
  );
}
