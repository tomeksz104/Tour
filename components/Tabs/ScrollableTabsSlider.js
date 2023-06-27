import React, { useState, useRef } from "react";

const tabs = [
  "All",
  "Music",
  "Chess",
  "Live",
  "Gaming",
  "Editing",
  "Mixing consoles",
  "Comedy",
  "Computer Hardware",
  "News",
  "Computer Programming",
  "Video Editing Software",
  "Sports",
  "Mixing consoles",
  "Comedy",
  "Computer Hardware",
  "News",
  "Computer Programming",
  "Video Editing Software",
  "Sports",
];

import { categories_list } from "../Categories/Categories";

const ScrollableTabsSlider = () => {
  const tabsRef = useRef(null);
  const [activeTab, setActiveTab] = useState(0);
  const [isAtLeftEdge, setIsAtLeftEdge] = useState(true);
  const [isAtRightEdge, setIsAtRightEdge] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartX, setDragStartX] = useState(0);

  const handleTabClick = (index) => {
    setActiveTab(index);
  };

  const handleCheckSides = () => {
    const scrollContainer = tabsRef.current;
    setIsAtLeftEdge(scrollContainer.scrollLeft === 0);
    setIsAtRightEdge(
      scrollContainer.scrollLeft + scrollContainer.clientWidth ===
        scrollContainer.scrollWidth
    );
  };

  const handleScrollLeft = () => {
    const scrollAmount = tabsRef.current.scrollLeft - 200;
    tabsRef.current.scrollTo({
      left: scrollAmount,
      behavior: "smooth",
    });
  };

  const handleScrollRight = () => {
    const scrollAmount = tabsRef.current.scrollLeft + 200;
    tabsRef.current.scrollTo({
      left: scrollAmount,
      behavior: "smooth",
    });
  };

  const handleMouseDown = (event) => {
    setIsDragging(true);
    setDragStartX(event.clientX);
  };

  const handleMouseMove = (event) => {
    if (!isDragging) return;
    tabsRef.current.classList.add("dragging");
    const delta = event.clientX - dragStartX;
    tabsRef.current.scrollLeft -= delta;
    setDragStartX(event.clientX);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    tabsRef.current.classList.remove("dragging");
  };

  return (
    <div
      className="scrollable-tabs-container absolute z-[1] top-0 w-full overflow-hidden backdrop-blur-md bg-white/80"
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseDown={handleMouseDown}
      onMouseLeave={handleMouseUp}
    >
      <div
        onClick={handleScrollLeft}
        className={`absolute h-full w-[100px] items-center pointer-events-none px-2.5 py-0 top-0 bg-gradient-to-r from-white from-40% ${
          isAtLeftEdge ? "hidden" : "flex"
        }`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="2"
          stroke="currentColor"
          className="w-8 h-8 cursor-pointer text-black pointer-events-auto p-2 bg-white border border-gray-200 rounded-[50%]"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 19.5L8.25 12l7.5-7.5"
          />
        </svg>
      </div>

      <ul
        className={`flex gap-4 overflow-x-scroll scroll-smooth m-0 px-6 py-3`}
        ref={tabsRef}
        onScroll={handleCheckSides}
      >
        {categories_list.map((category, index) => (
          <li key={index}>
            <button
              className={`text-xs no-underline inline-block rounded-full select-none whitespace-nowrap px-6 py-1 border ${
                category.color[0]
              } ${category.color[2]}  ${
                index === activeTab ? category.color[1] : ""
              }`}
              onClick={() => handleTabClick(index)}
            >
              {category.title}
            </button>
          </li>
        ))}
      </ul>

      <div
        onClick={handleScrollRight}
        className={`absolute h-full w-[100px] items-center pointer-events-none px-2.5 py-0 justify-end top-0 right-0 bg-gradient-to-l from-white from-40% ${
          isAtRightEdge ? "hidden" : "flex"
        }`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="2"
          stroke="currentColor"
          className="w-8 h-8 cursor-pointer text-black pointer-events-auto p-2 bg-white border border-gray-200 rounded-[50%]"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8.25 4.5l7.5 7.5-7.5 7.5"
          />
        </svg>
      </div>
      {disableScrollbar}
    </div>
  );
};

export default ScrollableTabsSlider;

const disableScrollbar = (
  <style>
    {`
  .scrollable-tabs-container ul.dragging button {
    pointer-events: none;
  }
  
  .scrollable-tabs-container ul.dragging {
    scroll-behavior: auto;
  }
  
  .scrollable-tabs-container ul::-webkit-scrollbar {
    display: none;
  }
`}
  </style>
);
