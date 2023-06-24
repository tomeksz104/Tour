import Beach from "@/public/assets/icons/categories/beach.svg";
import Castle from "@/public/assets/icons/categories/castle.svg";
import Cave from "@/public/assets/icons/categories/cave.svg";
import Desert from "@/public/assets/icons/categories/desert.svg";
import Fun from "@/public/assets/icons/categories/fun.svg";
import Lake from "@/public/assets/icons/categories/lake.svg";
import Museum from "@/public/assets/icons/categories/museum.svg";
import Park from "@/public/assets/icons/categories/park.svg";
import Waterpark from "@/public/assets/icons/categories/waterpark.svg";

export const categories_list = [
  {
    title: "Zamki",
    icon: <Castle className="w-8 h-8" />,
    description: "This property is close to the beach!",
  },
  {
    title: "Jeziora",
    icon: <Lake className="w-8 h-8" />,
    description: "This property is has windmills!",
  },
  {
    title: "Jaskinie",
    icon: <Cave className="w-8 h-8" />,
    description: "This property is modern!",
  },
  {
    title: "Atrakcje",
    icon: <Fun className="w-8 h-8" />,
    description: "This property is in the countryside!",
  },
  {
    title: "Parki",
    icon: <Park className="w-8 h-8" />,
    description: "This is property has a beautiful pool!",
  },
  {
    title: "Pustynie",
    icon: <Desert className="w-8 h-8" />,
    description: "This property is on an island!",
  },
  {
    title: "Plaże",
    icon: <Beach className="w-8 h-8" />,
    description: "This property is near a lake!",
  },
  {
    title: "Parki wodne",
    icon: <Waterpark className="w-8 h-8" />,
    description: "This property has skiing activies!",
  },
  {
    title: "Muzea",
    icon: <Museum className="w-8 h-8" />,
    description: "This property is an ancient castle!",
  },
];

const Categories = () => {
  return (
    <div>
      Moje kategorie
      {categories_list.map((category) => (
        <div key={category.title}>
          <div>{category.title}</div>
          {category.icon}
          <div>{category.description}</div>
        </div>
      ))}
    </div>
  );
};

export default Categories;
