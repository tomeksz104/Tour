import { useFieldArray } from "react-hook-form";

import { FormLabel } from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

import { WeekDay as weekDay } from "@prisma/client";

export const daysInEnglishToPolish = {
  MONDAY: "Poniedziałek",
  TUESDAY: "Wtorek",
  WEDNESDAY: "Środa",
  THURSDAY: "Czwartek",
  FRIDAY: "Piątek",
  SATURDAY: "Sobota",
  SUNDAY: "Niedziela",
};

const OpeningHours = ({ form }) => {
  const control = form.control;
  const { fields, append, remove } = useFieldArray({
    control,
    name: "openingHours",
  });

  return (
    <div className="py-4">
      {Object.keys(weekDay).map((key) => (
        <div key={key} className="grid grid-cols-3 px-5 items-center">
          <div>
            <FormLabel className="text-sm font-semibold text-gray-600">
              {daysInEnglishToPolish[key]}
            </FormLabel>
          </div>

          <div className="flex items-end gap-2 ">
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-2">
                <div className="grid w-full text-center items-center gap-1.5">
                  {weekDay[key] === "MONDAY" && (
                    <Label htmlFor={`${weekDay[key]}-open`} className="text-xs">
                      Od
                    </Label>
                  )}
                  <Input
                    name={`openingHours.${weekDay[key]}.open`}
                    key={`${weekDay[key]}-open`}
                    aria-label="Choose time"
                    className="w-full"
                    type="time"
                    {...form.register(`openingHours.${weekDay[key]}.open`)}
                  />
                </div>
              </div>
            </CardContent>
          </div>

          <div className="flex items-end gap-2 ">
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-2">
                <div className="grid w-full text-center items-center gap-1.5">
                  {weekDay[key] === "MONDAY" && (
                    <Label
                      htmlFor={`${weekDay[key]}-close`}
                      className="text-xs"
                    >
                      Do
                    </Label>
                  )}
                  <Input
                    name={`openingHours.${weekDay[key]}.close`}
                    key={`${weekDay[key]}-close`}
                    aria-label="Choose time"
                    className="w-full"
                    type="time"
                    {...form.register(`openingHours.${weekDay[key]}.close`)}
                  />
                </div>
              </div>
            </CardContent>
          </div>
        </div>
      ))}
    </div>
  );
};

export default OpeningHours;
