"use client";

import { useState } from "react";
import { categories_list } from "../Categories/Categories";

const ExploreCategories = () => {
  const [selectedCategory, setSelectedCategory] = useState(0);

  return (
    <div class="py-16">
      <div class="container m-auto text-gray-600 px-4 sm:px-6 lg:px-8">
        <div class="bg-green-200 p-6 lg:p-16 rounded-3xl space-y-6 justify-center lg:items-center">
          <h2 class="text-center text-3xl lg:text-4xl font-bold text-gray-800">
            Browse by Category
          </h2>
          <div class="m-auto mt-12 items-center justify-center space-y-6 lg:flex lg:space-y-0 lg:space-x-6">
            <div class="w-full relative lg:flex">
              <div class="lg:w-5/12">
                <div class="relative h-full overflow-x-auto lg:overflow-hidden no-scrollbar">
                  <ul class="flex h-full w-max justify-center space-x-2 lg:w-full lg:flex-col lg:space-x-0 lg:space-y-1.5 lg:px-8 no-scrollbar">
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
              <div class="flex items-center lg:w-7/12">
                <img src="https://roadtrippers.com/wp-content/uploads/2022/10/Places-to-Camp-Web@2x-1024x757.png" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExploreCategories;
