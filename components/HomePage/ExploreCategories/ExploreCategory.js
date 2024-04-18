"use client";

import { useState } from "react";
import CategoriesList from "./Categories/List";
import PlacesList from "./Places/List";

const ExploreCategory = ({ categories, categoriesWithPlaces, provinces }) => {
  const [selectedCategory, setSelectedCategory] = useState(1);

  const handleChangeCategory = (category) => {
    setSelectedCategory(category);
  };

  return (
    <>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-20 my-20">
        <div className="flex flex-col md:flex-row mb-5 md:mb-0">
          <div className="basis-2/3">
            <p className="text-center md:text-left tracking-widest text-sm text-green-600 font-bold">
              ODKRYJ KATEGORIE
            </p>
            <h3 className="text-center md:text-left text-2xl md:text-3xl lg:text-4xl 2xl:text-5xl font-extrabold leading-tight md:leading-tight lg:leading-tight 2xl:leading-tight pt-5 mb-10">
              Wyszukiwanie jest prostsze dzięki kategoriom
            </h3>
          </div>
          <div className="basis-2/3">
            <p className="text-gray-500 leading-relaxed">
              Niezależnie od tego, czy jesteś miłośnikiem przyrody, entuzjastą
              kultury, czy poszukiwaczem przygód, nasze zróżnicowane kategorie
              pomogą Ci odkryć skarby ukryte tuż za rogiem.
            </p>
          </div>
        </div>
        <div className="bg-gray-100 px-5 py-8 rounded-md">
          <CategoriesList
            selectedCategory={selectedCategory}
            categories={categories}
            onChangeCategory={handleChangeCategory}
          />
        </div>
      </div>
      <div className="relative bg-[url('/images/bg-15.webp')] bg-fixed bg-center bg-no-repeat bg-cover -mt-56">
        <div
          className="absolute top-0 left-0 w-full h-full"
          style={{
            backgroundImage:
              "linear-gradient(180deg, transparent 60%, #FFFFFF 95%)",
          }}
        ></div>

        <div className="mt-80">
          <PlacesList
            selectedCategory={selectedCategory}
            categoriesWithPlaces={categoriesWithPlaces}
            provinces={provinces}
          />
        </div>
      </div>
    </>
  );
};
export default ExploreCategory;
