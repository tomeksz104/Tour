"use client";

import { useState } from "react";
import CategoriesList from "./Categories/List";
import PlacesList from "./Places/List";

const ExploreCategory = ({ categories, categoriesWithPlaces, provinces }) => {
  const [selectedCategory, setSelectedCategory] = useState(1);

  const handleChangeCategory = (category) => {
    setSelectedCategory(category - 1);
  };

  return (
    <>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-20 my-20">
        <div class="flex flex-row">
          <div class="basis-2/3">
            <p className="tracking-widest text-sm text-green-500 font-bold">
              ODKRYJ KATEGORIE
            </p>
            <h3 className="text-2xl md:text-3xl lg:text-4xl 2xl:text-5xl font-extrabold leading-tight md:leading-tight lg:leading-tight 2xl:leading-tight pt-5 mb-10">
              Wyszukiwanie jest prostsze dzięki kategoriom
            </h3>
          </div>
          <div class="basis-1/3">
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
      <div className="relative bg-[url('https://gaviaspreview.com/wp/lestin/wp-content/uploads/2023/08/bg-15.jpg')] bg-fixed bg-center bg-no-repeat bg-cover -mt-56">
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
