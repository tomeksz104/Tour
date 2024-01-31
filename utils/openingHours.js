export const daysInEnglishToPolish = {
  MONDAY: "Poniedziałek",
  TUESDAY: "Wtorek",
  WEDNESDAY: "Środa",
  THURSDAY: "Czwartek",
  FRIDAY: "Piątek",
  SATURDAY: "Sobota",
  SUNDAY: "Niedziela",
};

// export function isOpenNow(openingHours) {
//   const now = new Date();
//   const dayOfWeek = now
//     .toLocaleDateString("en-US", { weekday: "long" })
//     .toUpperCase();
//   const currentTime = now.toTimeString().substr(0, 5);

//   const todayHours = openingHours.find((day) => day.day === dayOfWeek);

//   if (!todayHours) {
//     return false; // Zamknięte, jeśli nie znaleziono godzin dla dzisiaj
//   }

//   const { openTime, closeTime } = todayHours;
//   return currentTime >= openTime && currentTime <= closeTime;
// }

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

  if (!currentDayHours) {
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
