import { useRouter } from "next/navigation";
import Link from "next/link";

import WatchlistButton from "@/components/WatchlistButton";
import CircleButton from "@/components/CircleButton";
import Image from "next/image";

const Card = ({ place, onMouseEnter, onMouseLeave }) => {
  const router = useRouter();

  const handleFlyToPlace = () => {
    router.push(`?id=${place._id}`, undefined, { shallow: true });
  };

  return (
    <article
      className="box-border p-1 flex-[0_0_50%]"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className="relative pb-[100%]">
        <div className="flex flex-col h-full left-0 absolute top-0 w-full">
          <div className="rounded-md text-white overflow-hidden relative flex-[1_1_100%] group hover:opacity-90">
            <Image
              fill
              src={place.image}
              className="bg-gray-400 block h-full object-cover w-full"
              alt={place.title}
            />
            <div className="absolute top-2 right-2 hidden group-hover:flex space-x-2 z-[1]">
              <WatchlistButton id={place._id} />

              <CircleButton
                onClick={handleFlyToPlace}
                className="hover:bg-blue-50"
              >
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
                    d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                  />
                </svg>
              </CircleButton>
            </div>

            <Link
              href={`/place/${place._id}`}
              className="bottom-0 box-border left-0 p-3 absolute w-full bg-gradient-to-b from-transparent to-black/80 to-90%"
            >
              <div className="text-sm sm:text-base line-clamp-3 hover:underline leading-none">
                {place.title}
              </div>
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
};
export default Card;
