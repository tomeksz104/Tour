const Loading = () => {
  return (
    <>
      <div className="w-full h-56 sm:h-[480px]">
        <div className="absolute w-full h-56 sm:h-[480px] bg-gray-100">
          <div className="w-full h-full backdrop-blur-md"></div>
        </div>
        <div className="mx-auto max-w-5xl w-full h-56 sm:h-[480px]">
          <div className="relative flex flex-col group overflow-hidden z-0 max-w-5xl h-56 sm:h-[480px]">
            <div className="flex items-start relative w-full h-full">
              <div className="absolute inset-0 overflow-hidden z-0 overflow-hidden z-0 select-none	">
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
              </div>
            </div>

            <div className="absolute flex justify-between items-start sm:items-center top-2 inset-x-4 sm:inset-x-5 pointer-events-none">
              <div className="w-[50%] h-5 bg-gray-200 rounded-full mt-3 animate-pulse flex flex-col items-center justify-center">
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
              <div className="flex items-center"></div>
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
              <div className="animate-pulse">
                <p className="w-[90%] h-3 bg-gray-200 rounded-full mt-1"></p>
                <p className="w-[90%] h-3 bg-gray-200 rounded-full mt-2"></p>
                <p className="w-[60%] h-3 bg-gray-200 rounded-full mt-2"></p>
              </div>
            </div>
          </div>
          <div className="col-span-2 space-y-3">
            <p className="mx-auto w-[50%] h-3 bg-gray-200 rounded-full mt-2"></p>
            <div className="w-full h-48 bg-gray-300 rounded-3xl animate-pulse flex flex-col items-center justify-center">
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
          </div>
        </div>
      </div>
    </>
  );
};

export default Loading;
