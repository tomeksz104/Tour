import React from "react";

import Beach from "@/public/categories/svgs/beach.svg";
import Castle from "@/public/categories/svgs/castle.svg";
import Cave from "@/public/categories/svgs/cave.svg";
import Desert from "@/public/categories/svgs/desert.svg";
import Fun from "@/public/categories/svgs/fun.svg";
import Lake from "@/public/categories/svgs/lake.svg";
import Museum from "@/public/categories/svgs/museum.svg";
import Park from "@/public/categories/svgs/park.svg";
import Waterpark from "@/public/categories/svgs/waterpark.svg";
import Garden from "@/public/categories/svgs/garden.svg";
import Mine from "@/public/categories/svgs/mine.svg";

export const categories_list = [
  {
    title: "Zamki i  pałace",
    icon: <Castle className="w-3 h-3 md:w-4 md:h-4" />,
    iconPath: "/categories/markers/castle.png",
    imagePath: "/categories/images/castle.png",
    description: "This property is close to the beach!",
    colors: "bg-violet-500 after:bg-violet-400",
    color: [
      "hover:text-violet-500",
      "bg-violet-100",
      "text-violet-500",
      "bg-violet-500",
    ],
    // color: ["border-violet-500", "bg-violet-100", "text-violet-500"],
  },
  {
    title: "Jeziora i zbiorniki",
    icon: <Lake className="w-3 h-3 md:w-4 md:h-4" />,
    iconPath: "/categories/markers/lake.png",
    imagePath: "/categories/images/lake.png",
    description: "This property is has windmills!",
    colors: "bg-blue-500 after:bg-blue-400",
    color: [
      "hover:text-blue-500",
      "bg-blue-100",
      "text-blue-500",
      "bg-blue-500",
    ],
    // color: ["border-blue-500", "bg-blue-100", "text-blue-500"],
  },
  {
    title: "Jaskinie",
    icon: <Cave className="w-3 h-3 md:w-4 md:h-4" />,
    iconPath: "/categories/markers/cave.png",
    imagePath: "/categories/images/cave.png",
    description: "This property is modern!",
    colors: "bg-teal-500 after:bg-teal-400",
    color: [
      "hover:text-teal-500",
      "bg-teal-100",
      "text-teal-500",
      "bg-teal-500",
    ],
    // color: ["border-teal-500", "bg-teal-100", "text-teal-500"],
  },
  {
    title: "Atrakcje",
    icon: <Fun className="w-3 h-3 md:w-4 md:h-4" />,
    iconPath: "/categories/markers/fun.png",
    imagePath: "/categories/images/fun.png",
    description: "This property is in the countryside!",
    colors: "bg-rose-500 after:bg-rose-400",
    color: [
      "hover:text-rose-500",
      "bg-rose-100",
      "text-rose-500",
      "bg-rose-500",
    ],
    // color: ["border-rose-500", "bg-rose-100", "text-rose-500"],
  },
  {
    title: "Parki narodowe / Skwery",
    icon: <Park className="w-3 h-3 md:w-4 md:h-4" />,
    iconPath: "/categories/markers/park.png",
    imagePath: "/categories/images/park.png",
    description: "This is property has a beautiful pool!",
    colors: "bg-green-500 after:bg-green-400",
    color: [
      "hover:text-green-500",
      "bg-green-100",
      "text-green-500",
      "bg-green-500",
    ],
    //  color: ["border-green-500", "bg-green-100", "text-green-500"],
  },
  {
    title: "Pustynie",
    icon: <Desert className="w-3 h-3 md:w-4 md:h-4" />,
    iconPath: "/categories/markers/desert.png",
    imagePath: "/categories/images/desert.png",
    description: "This property is on an island!",
    colors: "bg-yellow-500 after:bg-yellow-400",
    color: [
      "hover:text-yellow-500",
      "bg-yellow-100",
      "text-yellow-500",
      "bg-yellow-500",
    ],
    // color: ["border-yellow-500", "bg-yellow-100", "text-yellow-500"],
  },
  {
    title: "Plaże, wybrzeża",
    icon: <Beach className="w-3 h-3 md:w-4 md:h-4" />,
    iconPath: "/categories/markers/beach.png",
    imagePath: "/categories/images/beach.png",
    description: "This property is near a lake!",
    colors: "bg-amber-500 after:bg-amber-400",
    color: [
      "hover:text-amber-500",
      "bg-amber-100",
      "text-amber-500",
      "bg-amber-500",
    ],
    //color: ["border-amber-500", "bg-amber-100", "text-amber-500"],
  },
  {
    title: "Parki wodne",
    icon: <Waterpark className="w-3 h-3 md:w-4 md:h-4" />,
    iconPath: "/categories/markers/waterpark.png",
    imagePath: "/categories/images/waterpark.png",
    description: "This property has skiing activies!",
    colors: "bg-sky-500 after:bg-sky-400",
    color: ["hover:text-sky-500", "bg-sky-100", "text-sky-500", "bg-sky-500"],
    // color: ["border-sky-500", "bg-sky-100", "text-sky-500"],
  },
  {
    title: "Muzea i galerie sztuki",
    icon: <Museum className="w-3 h-3 md:w-4 md:h-4" />,
    iconPath: "/categories/markers/museum.png",
    imagePath: "/categories/images/museum.png",
    description: "This property is an ancient castle!",
    colors: "bg-indigo-500 after:bg-indigo-400",
    color: [
      "hover:text-indigo-500",
      "bg-indigo-100",
      "text-indigo-500",
      "bg-indigo-500",
    ],
  },
  {
    title: "Ogrody",
    icon: <Garden className="w-3 h-3 md:w-4 md:h-4" />,
    iconPath: "/categories/markers/garden.png",
    imagePath: "/categories/images/garden.png",
    description: "This property is an ancient castle!",
    colors: "bg-lime-500 after:bg-lime-400",
    color: [
      "hover:text-lime-500",
      "bg-lime-100",
      "text-lime-500",
      "bg-lime-500",
    ],
  },
  {
    title: "Kopalnie",
    icon: <Mine className="w-3 h-3 md:w-4 md:h-4" />,
    iconPath: "/categories/markers/mine.png",
    imagePath: "/categories/images/mine.png",
    description: "This property is an ancient castle!",
    colors: "bg-stone-500 after:bg-stone-400",
    color: [
      "hover:text-stone-500",
      "bg-stone-100",
      "text-stone-500",
      "bg-stone-500",
    ],
  },
  // {
  //   title: "Inne",
  //   icon: <Museum className="w-8 h-8" />,
  //   iconPath: "/assets/icons/category/others.png",
  //   description: "This property is an ancient castle!",
  //   colors: "bg-slate-500 after:bg-slate-400",
  //   color: ["hover:text-slate-500", "bg-slate-100", "text-slate-500"],
  // },
];
