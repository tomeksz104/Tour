"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Bed, FerrisWheel, Search, Soup } from "lucide-react";

import { PlaceType as placeTypes } from "@prisma/client";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import useMediaQuery from "@/hooks/useMediaQueryNEW";
import Link from "next/link";

const placeTypeIcons = {
  Atrakcja: <FerrisWheel size={16} />,
  Nocleg: <Bed size={16} />,
  Jedzenie: <Soup size={16} />,
};

const mobileMediaQuery = "(min-width: 1024px)";

const SearchBar = ({ categories, provinces }) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const isMobile = useMediaQuery(mobileMediaQuery);
  const [searchTerm, setSearchTerm] = useState(null);
  const [category, setCategory] = useState(null);
  const [province, setProvince] = useState(null);

  const handleRedirectToMapWithParams = () => {
    const currentParams = new URLSearchParams(searchParams);

    if (searchTerm) currentParams.set("searchTerm", searchTerm);
    if (category) currentParams.set("category", category);
    if (province) currentParams.set("province", province);

    router.replace(`/map?${currentParams.toString()}`, undefined, {
      shallow: true,
    });
  };

  return (
    <div>
      <div className="relative lg:absolute w-full lg:w-4/6 font-primary my-6 2xl:my-12">
        <div className="bg-white shadow-sm flex flex-col lg:flex-row items-center rounded-md p-5">
          <Input
            onChange={(event) => {
              setSearchTerm(event.target.value);
            }}
            className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0 text-md"
            type="text"
            placeholder="Czego szukasz?"
          />
          {isMobile ? (
            <Separator orientation="vertical" className="h-[40px] mx-3" />
          ) : (
            <Separator className="mx-3 my-3" />
          )}

          <Select
            onValueChange={(category) => {
              setCategory(category);
            }}
          >
            <SelectTrigger className="w-full border-0 focus:ring-0 focus:ring-offset-0 text-md">
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
          {isMobile ? (
            <Separator orientation="vertical" className="h-[40px] mx-3" />
          ) : (
            <Separator className="mx-3 my-3" />
          )}
          <Select
            onValueChange={(province) => {
              setProvince(province);
            }}
          >
            <SelectTrigger className="w-full border-0 focus:ring-0 focus:ring-offset-0 text-md">
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
        <div className="flex flex-wrap items-center mt-5 gap-2">
          <span className="relative font-semibold">
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
              className={`border rounded-md h-8 space-x-2 cursor-pointer bg-gray-400 hover:bg-green-500`}
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
    </div>
  );
};

export default SearchBar;
