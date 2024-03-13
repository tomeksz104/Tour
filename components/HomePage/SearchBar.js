"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Bed, FerrisWheel, Search, Soup } from "lucide-react";

import { PlaceType as placeTypes } from "@prisma/client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const placeTypeIcons = {
  Atrakcja: <FerrisWheel size={16} />,
  Nocleg: <Bed size={16} />,
  Jedzenie: <Soup size={16} />,
};

const SearchBar = ({ categories, provinces }) => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState(null);
  const [category, setCategory] = useState(null);
  const [province, setProvince] = useState(null);

  const handleRedirectToMapWithParams = () => {
    const currentParams = new URLSearchParams();

    if (searchTerm) currentParams.set("searchTerm", searchTerm);
    if (category) currentParams.set("category", category);
    if (province) currentParams.set("province", province);

    router.replace(`/map?${currentParams.toString()}`, undefined, {
      shallow: true,
    });
  };

  return (
    <>
      <div className="relative mx-auto w-full lg:w-4/6 my-6 2xl:my-12">
        <div className="bg-white/10 rounded-md p-5 backdrop-blur-sm border border-white/30">
          <div className="bg-white shadow-sm flex flex-col lg:flex-row items-center rounded-md p-5 divide-y lg:divide-x lg:divide-y-0 gap-3">
            <Input
              onChange={(event) => {
                setSearchTerm(event.target.value);
              }}
              className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0 text-md"
              type="text"
              placeholder="Czego szukasz?"
              aria-label="Wyszukiwany termin"
            />

            <Select
              onValueChange={(category) => {
                setCategory(category);
              }}
            >
              <SelectTrigger
                className="w-full border-0 focus:ring-0 focus:ring-offset-0 text-md"
                aria-label="Kategoria"
              >
                <SelectValue placeholder="Kategoria" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>

            <Select
              onValueChange={(province) => {
                setProvince(province);
              }}
            >
              <SelectTrigger
                className="w-full border-0 focus:ring-0 focus:ring-offset-0 text-md"
                aria-label="Województwo"
              >
                <SelectValue placeholder="Województwo" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {provinces.map((province) => (
                    <SelectItem key={province.id} value={province.id}>
                      {province.name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            <Button
              onClick={handleRedirectToMapWithParams}
              className="w-full mt-3 lg:mt-0 ml-3 bg-green-500 hover:bg-green-600 font-bold text-md h-12 px-10"
            >
              <Search size={18} className="mr-3" />
              Szukaj
            </Button>
          </div>
        </div>
        <div className="flex flex-wrap items-center mt-5 gap-2">
          <span className="relative font-semibold text-white">
            Lub wybierz typ miejsca:
            <div
              className="absolute w-[55px] h-[29px] top-full right-[-12px] mt-[3px] bg-center bg-no-repeat bg-transparent"
              style={{
                backgroundImage: "url('/home-icons/arrow-1.png')",
              }}
            ></div>
          </span>

          {Object.keys(placeTypes).map((key) => (
            <Button
              asChild
              key={key}
              className={`rounded-md h-8 space-x-2 cursor-pointer bg-gray-500/50 hover:bg-green-500/80`}
            >
              <Link href={`/map?placeType=${placeTypes[key]}`}>
                {placeTypeIcons[key]}
                <span htmlFor={placeTypes[key]} className="text-center text-xs">
                  {placeTypes[key]}
                </span>
              </Link>
            </Button>
          ))}
        </div>
      </div>
    </>
  );
};

export default SearchBar;
