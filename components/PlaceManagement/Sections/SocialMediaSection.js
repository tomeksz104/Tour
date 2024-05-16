import { useEffect } from "react";
import { useFieldArray } from "react-hook-form";

const { default: Input } = require("@/components/Input");
import { Label } from "@/components/ui/label";

import { icons } from "@/components/User/Sections/Settings/Settings";

const SocialMediaSection = ({ form, socialMediaPlatforms }) => {
  const control = form.control;
  const { fields, append, remove } = useFieldArray({
    control,
    name: "socialMediaLinks",
  });

  return (
    <div className="px-5 py-4 space-y-5">
      {socialMediaPlatforms.map((platform, index) => (
        <div key={platform.id} className="flex flex-col gap-1">
          <Label
            htmlFor={platform.name}
            className="text-sm font-semibold text-gray-600"
          >
            {platform.name}
          </Label>
          {/* <Input
            id={platform.name}
            type="text"
            className="bg-gray-50"
            icon={icons[platform.name]}
            placeholder={platform.placeholder}
            onChange={() => {
              console.log(platform.id);
            }}
            {...form.register(`socialMediaLinks.${index}`)}
          /> */}
          <Input
            id={`socialMediaLinks.${index}.link`}
            type="text"
            className="bg-gray-50"
            icon={icons[platform.name]}
            placeholder={platform.placeholder}
            {...form.register(`socialMediaLinks.${index}.link`)}
          />
          <input
            type="hidden"
            value={platform.id}
            {...form.register(`socialMediaLinks.${index}.platformId`)}
          />
        </div>
      ))}
    </div>
  );
};

export default SocialMediaSection;
