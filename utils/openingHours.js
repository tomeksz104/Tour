export const daysInEnglishToPolish = {
  MONDAY: "Poniedziałek",
  TUESDAY: "Wtorek",
  WEDNESDAY: "Środa",
  THURSDAY: "Czwartek",
  FRIDAY: "Piątek",
  SATURDAY: "Sobota",
  SUNDAY: "Niedziela",
};

export function initializeWeekDays() {
  const weekDays = {
    MONDAY: { isOpen: false },
    TUESDAY: { isOpen: false },
    WEDNESDAY: { isOpen: false },
    THURSDAY: { isOpen: false },
    FRIDAY: { isOpen: false },
    SATURDAY: { isOpen: false },
    SUNDAY: { isOpen: false },
  };

  return weekDays;
}

export function getCurrentDayOpeningHours(openingHours) {
  const today = new Date();
  const dayOfWeek = today
    .toLocaleDateString("en-US", { weekday: "long" })
    .toUpperCase();

  return openingHours.find((day) => day.day === dayOfWeek);
}

export function isOpenNow(openingHours) {
  const today = new Date();
  const dayOfWeek = today
    .toLocaleDateString("en-US", { weekday: "long" })
    .toUpperCase();

  const currentDayHours = openingHours.find((day) => day.day === dayOfWeek);

  if (!currentDayHours || currentDayHours.isOpen === false) {
    return false;
  }

  const now = today.toTimeString().substr(0, 5);

  if (
    currentDayHours.openTime === "00:00" &&
    currentDayHours.closeTime === "00:00"
  ) {
    return true;
  }

  return now >= currentDayHours.openTime && now <= currentDayHours.closeTime;
}

export const getWeekDay = () => {
  const currentDay = new Date().getDay();
  const days = [
    "SUNDAY",
    "MONDAY",
    "TUESDAY",
    "WEDNESDAY",
    "THURSDAY",
    "FRIDAY",
    "SATURDAY",
  ];
  return days[currentDay];
};
