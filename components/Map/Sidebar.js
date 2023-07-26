import React, { useEffect, useState } from "react";
import Link from "next/link";

const mobileMediaQuery = "(min-width: 768px)";

const Sidebar = () => {
  const [showSidebar, setShowSidebar] = useState(
    window.matchMedia(mobileMediaQuery).matches
  );

  const handleToggleSidebar = () => {
    setShowSidebar((current) => !current);
  };

  const cardContent = (
    <div class="relative flex flex-row space-x-5 rounded-xl p-3">
      <div class="w-1/5 bg-white grid place-items-center">
        <img
          src="https://images.pexels.com/photos/4381392/pexels-photo-4381392.jpeg?auto=compress&amp;cs=tinysrgb&amp;dpr=1&amp;w=500"
          alt="tailwind logo"
          class="rounded-xl"
        />
      </div>
      <div class="w-4/5 bg-white flex flex-col space-y-2 p-3">
        <h3 class="font-black text-gray-800">
          The Majestic and Wonderful Bahamas
        </h3>
        <p class="text-sm text-gray-500 ">
          The best kept secret of The Bahamas is the country’s sheer size and
          diversity. With 16 major islands, The Bahamas is an unmatched
          destination
        </p>
      </div>
    </div>
  );

  const repeatedContent = Array.from({ length: 10 }, (_, index) => (
    <React.Fragment key={index}>{cardContent}</React.Fragment>
  ));

  //   useEffect(() => {
  //     const handleWindowResize = () => {
  //       if (window.innerWidth >= 768) {
  //         setShowSidebar(true);
  //       } else {
  //         setShowSidebar(false);
  //       }
  //     };

  //     window.addEventListener("resize", handleWindowResize);

  //     handleWindowResize();

  //     return () => {
  //       window.removeEventListener("resize", handleWindowResize);
  //     };
  //   }, []);

  useEffect(() => {
    const query = window.matchMedia(mobileMediaQuery);

    function handleQueryChange(queryEvent) {
      /* The matches property will be true if the window width is above the mobile size. */
      setShowSidebar(queryEvent.matches);
    }

    query.addEventListener("change", handleQueryChange);

    return () => {
      query.removeEventListener("change", handleQueryChange);
    };
  }, []);

  return (
    <>
      <button
        onClick={handleToggleSidebar}
        className={` ${
          showSidebar ? "hidden" : "fixed"
        } z-10 focus:outline-none p-2 ml-5 mt-5 bg-white rounded-full shadow-md border
       `}
      >
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
            d="M8.25 4.5l7.5 7.5-7.5 7.5"
          />
        </svg>
      </button>

      <section
        className={`flex flex-col z-20 w-full max-w-xl bg-white focus:outline-none ease-in-out duration-300
            ${showSidebar ? "translate-x-0 " : "-translate-x-full"}`}
      >
        <div className="flex items-center justify-between px-5 py-3">
          <div class="flex justify-end text-slate-500 text-xs gap-1">
            <span class="font-semibold">544</span>
            <span>places on the map</span>
          </div>
          <button
            onClick={handleToggleSidebar}
            className="p-2 text-slate-500 hover:text-slate-400 hover:bg-slate-400/10 rounded-full"
          >
            <svg
              className="w-5 h-5"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          </button>
        </div>

        <div className="p-3 overflow-y-auto overflow-x-hidden">
          {repeatedContent}
        </div>
      </section>
    </>
  );
};

export default Sidebar;
