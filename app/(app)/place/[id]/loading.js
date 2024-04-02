const Loading = () => {
  return (
    <>
      <div className="w-full h-56 sm:h-[480px]">
        <div className="absolute w-full h-56 sm:h-[480px] bg-gray-200"></div>
        <div className="mx-auto max-w-7xl w-full h-56 sm:h-[480px]">
          <div className="relative flex flex-col group overflow-hidden z-0 max-w-7xl h-56 sm:h-[480px]">
            <div className="flex items-start relative w-full h-full">
              <div className="absolute inset-0 overflow-hidden z-0 overflow-hidden z-0 select-none">
                <div className="w-full h-full bg-gray-300 animate-pulse flex flex-col items-center justify-center">
                  <svg
                    className="w-10 h-10 text-gray-200"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 16 20"
                  >
                    <path d="M14.066 0H7v5a2 2 0 0 1-2 2H0v11a1.97 1.97 0 0 0 1.934 2h12.132A1.97 1.97 0 0 0 16 18V2a1.97 1.97 0 0 0-1.934-2ZM10.5 6a1.5 1.5 0 1 1 0 2.999A1.5 1.5 0 0 1 10.5 6Zm2.221 10.515a1 1 0 0 1-.858.485h-8a1 1 0 0 1-.9-1.43L5.6 10.039a.978.978 0 0 1 .936-.57 1 1 0 0 1 .9.632l1.181 2.981.541-1a.945.945 0 0 1 .883-.522 1 1 0 0 1 .879.529l1.832 3.438a1 1 0 0 1-.031.988Z"></path>
                    <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.98 2.98 0 0 0 .13 5H5Z"></path>
                  </svg>
                </div>
              </div>
            </div>

            <div className="absolute flex justify-between items-start sm:items-center top-2 inset-x-4 sm:inset-x-5 pointer-events-none">
              <div className="w-[30%] h-6 bg-gray-200 rounded-full mt-3 animate-pulse flex flex-col items-center justify-center"></div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full mx-auto mt-12">
        <div className="flex items-center space-x-3 justify-center">
          <div className="h-8 w-24 bg-gray-200 rounded-full"></div>
          <div className="h-8 w-24 bg-gray-200 rounded-full"></div>
          <div className="h-8 w-24 bg-gray-200 rounded-full"></div>
          <div className="h-8 w-24 bg-gray-200 rounded-full"></div>
          <div className="h-8 w-24 bg-gray-200 rounded-full"></div>
        </div>
      </div>

      <div className="relative mx-auto max-w-7xl w-full px-3 xl:px-0 mb-10">
        <div className="mt-8 grid grid-cols-1 gap-y-6 lg:gap-x-6 lg:w-full lg:grid-cols-6">
          <div className="col-span-4 space-y-5">
            <div className="space-y-3 bg-white rounded-md p-5">
              <h2 className="text-xl font-semibold text-gray-700 md:text-2xl">
                Opis
              </h2>
              <div className="animate-pulse">
                <p className="w-[90%] h-4 bg-gray-200 rounded-full mt-1"></p>
                <p className="w-[90%] h-4 bg-gray-200 rounded-full mt-2"></p>
                <p className="w-[60%] h-4 bg-gray-200 rounded-full mt-2"></p>
              </div>
            </div>
            <div className="space-y-3 bg-white rounded-md p-5">
              <h2 className="text-xl font-semibold text-gray-700 md:text-2xl">
                Tematyka
              </h2>
              <div className="grid grid-cols-2 gap-y-3">
                <div className="h-4 bg-gray-200 rounded-full w-[50%] animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded-full w-[50%] animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded-full w-[50%] animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded-full w-[50%] animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded-full w-[50%] animate-pulse"></div>
              </div>
            </div>
            <div className="space-y-3 bg-white rounded-md p-5">
              <h2 className="text-xl font-semibold text-gray-700 md:text-2xl">
                Tagi
              </h2>
              <div className="grid grid-cols-2 gap-y-3">
                <div className="h-4 bg-gray-200 rounded-full w-[50%] animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded-full w-[50%] animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded-full w-[50%] animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded-full w-[50%] animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded-full w-[50%] animate-pulse"></div>
              </div>
            </div>
          </div>
          <div className="col-span-2 space-y-3">
            <div className="w-full flex justify-between items-center bg-white rounded-md px-5 py-4">
              <div className="h-5 bg-gray-200 rounded-full w-[30%] animate-pulse"></div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-chevron-down h-4 w-4 text-gray-300 shrink-0"
              >
                <path d="m6 9 6 6 6-6"></path>
              </svg>
            </div>
            <div className="space-y-3 bg-white rounded-md px-5 py-4">
              <h2 className="text-xl font-semibold text-gray-700 md:text-2xl">
                Dojazd
              </h2>
              <div className="w-full h-48 bg-gray-300 rounded-md animate-pulse flex flex-col items-center justify-center">
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
              <div className="flex items-center justify-between">
                <div className="h-5 bg-gray-200 rounded-full w-44 animate-pulse"></div>
                <div className="h-5 bg-gray-200 rounded-full w-24 animate-pulse"></div>
              </div>
            </div>
            <div className="space-y-3 bg-white rounded-md p-5">
              <h2 className="text-xl font-semibold text-gray-700 md:text-2xl">
                Dane kontaktowe
              </h2>
              <div className="flex items-center space-x-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-link text-gray-300"
                >
                  <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
                  <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
                </svg>
                <div className="h-5 bg-gray-200 rounded-full w-[60%] animate-pulse"></div>
              </div>
              <div className="flex items-center space-x-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-phone text-gray-300"
                >
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                </svg>
                <div className="h-5 bg-gray-200 rounded-full w-[30%] animate-pulse"></div>
              </div>
              <div className="flex items-center space-x-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-at-sign text-gray-300"
                >
                  <circle cx="12" cy="12" r="4"></circle>
                  <path d="M16 8v5a3 3 0 0 0 6 0v-1a10 10 0 1 0-4 8"></path>
                </svg>
                <div className="h-5 bg-gray-200 rounded-full w-[55%] animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Loading;
