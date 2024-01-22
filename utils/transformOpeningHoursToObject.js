export function transformOpeningHoursToObject(openingHoursArray) {
  const transformedObject = {};

  openingHoursArray.forEach((item) => {
    transformedObject[item.day] = {
      open: item.openTime,
      close: item.closeTime,
    };
  });

  return transformedObject;
}
