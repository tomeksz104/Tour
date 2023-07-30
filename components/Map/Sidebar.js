import React, { useEffect, useState } from "react";

const mobileMediaQuery = "(min-width: 768px)";

const Sidebar = ({ places, onMarkerHover }) => {
  const [showSidebar, setShowSidebar] = useState(
    window.matchMedia(mobileMediaQuery).matches
  );
  const [hoverTimeout, setHoverTimeout] = useState(null);

  const handleToggleSidebar = () => {
    setShowSidebar((current) => !current);
  };

  const handleMouseEnter = (markerId) => {
    clearTimeout(hoverTimeout);

    const timeoutId = setTimeout(() => {
      onMarkerHover(markerId);
    }, 1000);

    setHoverTimeout(timeoutId);
  };

  const handleMouseLeave = () => {
    clearTimeout(hoverTimeout);
    onMarkerHover(null);
  };

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
            <span class="font-semibold">{places.length}</span>
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

        <div className="flex flex-wrap p-1 overflow-y-auto overflow-x-hidden">
          {places.map((place, index) => (
            <div
              className="box-border p-1 flex-[0_0_50%]"
              onMouseEnter={() => handleMouseEnter(place._id)}
              onMouseLeave={handleMouseLeave}
              key={index}
            >
              <div className="relative pb-[100%]">
                <div className="flex flex-col h-full left-0 absolute top-0 w-full">
                  <a
                    href="#"
                    className="rounded-sm text-white overflow-hidden relative flex-[1_1_100%] hover:opacity-90"
                  >
                    <img
                      alt="Babylon Tours Paris"
                      className="bg-gray-400 block h-full object-cover w-full"
                      loading="lazy"
                      src={place.image}
                    />
                    <div class="bottom-0 box-border left-0 p-3 absolute w-full bg-gradient-to-b from-transparent to-black/80 to-90%">
                      <div className="line-clamp-3 hover:underline">
                        {place.title}
                      </div>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default Sidebar;
