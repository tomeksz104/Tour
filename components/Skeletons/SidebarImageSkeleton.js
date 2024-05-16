import { Camera, Heart, ZoomIn } from "lucide-react";
import { Button } from "../ui/button";

const SidebarImageSkeleton = ({ count }) => {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <article
          key={index}
          className="relative isolate flex flex-col gap-5 lg:flex-row mb-5 w-full border bg-white rounded-md"
        >
          <div className="relative aspect-[16/9] sm:aspect-[2/1] lg:aspect-square lg:w-64 lg:shrink-0">
            <div className="w-full h-full bg-gray-300 animate-pulse flex flex-col items-center justify-center">
              <svg
                className="w-10 h-10 text-gray-200 "
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 16 20"
              >
                <path d="M14.066 0H7v5a2 2 0 0 1-2 2H0v11a1.97 1.97 0 0 0 1.934 2h12.132A1.97 1.97 0 0 0 16 18V2a1.97 1.97 0 0 0-1.934-2ZM10.5 6a1.5 1.5 0 1 1 0 2.999A1.5 1.5 0 0 1 10.5 6Zm2.221 10.515a1 1 0 0 1-.858.485h-8a1 1 0 0 1-.9-1.43L5.6 10.039a.978.978 0 0 1 .936-.57 1 1 0 0 1 .9.632l1.181 2.981.541-1a.945.945 0 0 1 .883-.522 1 1 0 0 1 .879.529l1.832 3.438a1 1 0 0 1-.031.988Z"></path>
                <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.98 2.98 0 0 0 .13 5H5Z"></path>
              </svg>
            </div>

            <div className="absolute left-0 top-0 m-2">
              <div className="h-5 w-20 mt-1 bg-gray-200 rounded-full"></div>
            </div>
          </div>
          <div className="flex flex-col w-full py-3 px-3 lg:pl-0 lg:pr-3">
            <div className="flex items-center gap-x-4 text-xs">
              <div className="h-5 w-24 bg-gray-100 rounded-full w-[50%] animate-pulse"></div>
            </div>
            <div className="group relative w-full">
              <h3 className="mt-4 text-lg font-semibold leading-6 text-gray-900 group-hover:text-green-600">
                <div className="h-7 bg-gray-200 rounded-full w-[70%] animate-pulse"></div>
              </h3>

              <div className="h-5 bg-gray-200 rounded-full w-[50%] mt-1 mb-5 animate-pulse"></div>

              <div className="h-5 bg-gray-100 rounded-full w-[70%] mt-2 animate-pulse"></div>

              <div className="h-5 bg-gray-100 rounded-full w-[40%] mt-2 animate-pulse"></div>
            </div>

            <div className="mt-auto border-t border-gray-900/5 pt-6 animate-pulse">
              <div className="flex justify-between items-center gap-x-4">
                <div className="h-5 bg-gray-200 rounded-full w-[20%]"></div>

                <div className="space-x-2">
                  <Button
                    variant="secondary"
                    className="rounded-full h-8 w-8 p-1 text-gray-300"
                  >
                    <ZoomIn strokeWidth={2.5} size={16} />
                  </Button>
                  <Button
                    variant="secondary"
                    className="rounded-full h-8 w-8 p-1 text-gray-300"
                  >
                    <Camera strokeWidth={2.5} size={16} />
                  </Button>
                  <Button
                    variant="secondary"
                    className={`rounded-full h-8 w-8 p-1 text-gray-300`}
                  >
                    <Heart strokeWidth={2.5} size={16} />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </article>
      ))}
    </>
  );
};

export default SidebarImageSkeleton;
