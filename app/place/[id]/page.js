import Link from "next/link";
import dynamic from "next/dynamic";
import { getPlaceById } from "@/actions/getPlaceById";

import CommentCard from "@/components/Comment/CommentCard";
import Slideshow from "@/components/Slideshow/Slideshow";

import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import WatchlistButton from "@/components/WatchlistButton";
import CircleButton from "@/components/CircleButton";

const PlaceDetailsMap = dynamic(() => import("@/components/PlaceDetails/Map"), {
  loading: () => <p>loading...</p>,
  ssr: false,
});

export default async function PlaceDetailsPage({ params }) {
  const place = await getPlaceById(params?.id);
  const session = await getServerSession(authOptions);

  const isUserAdmin = session?.user?.role === "admin";
  const isCreator = session?.user?._id === place.userId;

  let gallery = [{ url: place.image, accepted: true }, ...place.images];
  gallery = gallery.filter((item) => item.accepted !== false);

  return (
    <>
      <div className="w-full h-56 sm:h-[480px]">
        <div
          className="absolute w-full h-56 sm:h-[480px] bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${place.image})`,
          }}
        >
          <div className="w-full h-full backdrop-blur-md"></div>
        </div>
        <div className="mx-auto max-w-5xl w-full h-56 sm:h-[480px]">
          <div className="relative flex flex-col group overflow-hidden z-0 max-w-5xl h-56 sm:h-[480px]">
            <div className="flex items-start relative w-full h-full">
              <div className="absolute inset-0 overflow-hidden z-0 overflow-hidden z-0 select-none	">
                <Slideshow images={gallery} />
              </div>
            </div>
            <div className="absolute w-full content-[''] bg-gradient-to-b from-[rgba(0,0,0,0.75)] to-transparent h-[200px] pointer-events-none"></div>
            <div className="absolute flex justify-between items-start sm:items-center top-2 inset-x-4 sm:inset-x-5 pointer-events-none">
              <h3 className="block text-xl sm:text-2xl font-semibold text-white line-clamp-2">
                {place.title}
              </h3>
              <div className="flex items-center">
                <WatchlistButton id={place._id} />

                {isUserAdmin || isCreator ? (
                  <Link href={`/place/update/${place._id}`}>
                    <CircleButton className="ml-3 hover:bg-blue-50">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="w-5 h-5 text-blue-500"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
                        ></path>
                      </svg>
                    </CircleButton>
                  </Link>
                ) : null}
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
