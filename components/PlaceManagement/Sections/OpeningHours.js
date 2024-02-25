import { useFieldArray } from "react-hook-form";

import { FormLabel } from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";

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

  const watchIsOpen = form.watch("openingHours");

  const check = (val) => {
    if (val?.isOpen === true) return true;

    return false;
  };

  return (
    <div className="py-4">
      <div className="px-5 pb-3">
        <p className="font-semibold text-xs text-gray-500 italic">Wskazówka:</p>
        <ul className="list-disc list-inside">
          <li className="text-xs text-gray-500 italic">
            Jeśli miejsce jest otwarte cały dzień, ustaw godziny otwarcia i
            zamknięcia na <strong>00:00 - 00:00</strong>.
          </li>
          <li className="text-xs text-gray-500 italic">
            Jeśli miejsce jest zamknięte, upewnij się, że{" "}
            <strong>pole wyboru</strong> jest odznaczone.
          </li>
        </ul>
      </div>

      {Object.keys(weekDay).map((key) => (
        <div key={key} className="grid grid-cols-3 px-5 items-center">
          <div className="flex items-center gap-x-3">
            <Checkbox
              id={`${weekDay[key]}-isOpen`}
              defaultChecked={check(watchIsOpen?.[weekDay[key]])}
              onCheckedChange={(isChecked) =>
                form.setValue(`openingHours.${weekDay[key]}.isOpen`, isChecked)
              }
              name={`openingHours.${weekDay[key]}.isOpen`}
              key={`${weekDay[key]}-isOpen`}
              {...form.register(`openingHours.${weekDay[key]}.isOpen`)}
            />

            <FormLabel
              htmlFor={`${weekDay[key]}-isOpen`}
              className="text-sm font-semibold text-gray-600 cursor-pointer"
            >
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
