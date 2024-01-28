"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  daysInEnglishToPolish,
  getCurrentDayOpeningHours,
  isOpenNow,
} from "@/utils/openingHours";

function OpeningHours({ openingHours }) {
  return (
    <Accordion
      type="single"
      collapsible
      className="w-full bg-white rounded-md px-5"
    >
      <AccordionItem value="item-1" className="border-none">
        <AccordionTrigger className="flex items-center justify-between hover:no-underline	">
          <>
            {isOpenNow(openingHours) === true ? (
              <div className="text-green-500 hover:underline">Otwarte</div>
            ) : (
              <div className="text-red-500 hover:underline">Zamknięte</div>
            )}
          </>

          <div className="text-gray-700 text-xs font-normal">
            {(() => {
              const todayHours = getCurrentDayOpeningHours(openingHours);
              return todayHours
                ? `Godziny otwarcia dzisiaj: ${todayHours.openTime} - ${todayHours.closeTime}`
                : "Brak informacji o godzinach otwarcia";
            })()}
          </div>
        </AccordionTrigger>
        <AccordionContent>
          <div className="space-y-3 bg-white rounded-md px-1">
            {openingHours.map((openingHour) => (
              <div
                key={openingHour.id}
                className="flex items-center justify-between text-sm pb-3 border-b last:border-none last:pb-0"
              >
                <div>{daysInEnglishToPolish[openingHour.day]}</div>
                <div>
                  {openingHour.openTime} - {openingHour.closeTime}
                </div>
              </div>
            ))}
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}

export default OpeningHours;
