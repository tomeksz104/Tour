"use client";

import { useState } from "react";
import { categories_list } from "@/utils/categories";

const ExploreCategories = () => {
  const [selectedCategory, setSelectedCategory] = useState(0);

  return (
    <div className="py-16">
      <div className="container m-auto text-gray-600 px-4 sm:px-6 lg:px-8">
        <div className="bg-green-200 px-3 py-10 lg:p-16 rounded-2xl space-y-6 justify-center lg:items-center">
          <h2 className="text-center text-3xl lg:text-4xl font-bold text-gray-800">
            Browse by Category
          </h2>
          <div className="m-auto mt-12 items-center justify-center space-y-6 lg:flex lg:space-y-0 lg:space-x-6">
            <div className="w-full relative lg:flex">
              <div className="lg:w-5/12">
                <div className="relative h-full overflow-x-auto lg:overflow-hidden no-scrollbar">
                  <ul className="flex h-full w-max justify-center space-x-2 lg:w-full lg:flex-col lg:space-x-0 lg:space-y-1.5 lg:px-8 no-scrollbar">
                    {categories_list.map((category, index) => (
                      <li key={index}>
                        <button
                          onClick={() => {
                            setSelectedCategory(index);
                          }}
                          className={`flex ${
                            selectedCategory === index
                              ? "bg-white shadow-sm"
                              : null
                          } w-full items-center gap-3 text-sm text-green-800 font-semibold rounded-full whitespace-nowrap px-6 py-2 transition duration-300`}
                        >
                          <div
                            className={`${category.color[3]} text-white rounded-full p-1.5`}
                          >
                            {category.icon}
                          </div>
                          {category.title}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="flex items-center lg:w-7/12">
                <img src={categories_list[selectedCategory].imagePath} />
              </div>
            </div>
          </div>
          <p class="max-w-5xl mx-auto text-lg leading-tight text-justify text-gray-600 p-2 my-6 2xl:my-12">
            Our collection of more than 1,500 remarkable places will take your
            trip to the next level. <br />
            Look for illustrations on our maps and visit unique places!
          </p>
        </div>
      </div>
    </div>
  );
};

export default ExploreCategories;
