export function transformOpeningHoursToObject(openingHoursArray) {
  const transformedObject = {};

  openingHoursArray.forEach((item) => {
    transformedObject[item.day] = {
      isOpen: item.isOpen,
      open: item.openTime,
      close: item.closeTime,
    };
  });

  return transformedObject;
}
