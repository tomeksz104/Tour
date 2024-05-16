export function parseLatLngFromUrl(url) {
  const latLngPattern = /@([\-\.0-9]+),([\-\.0-9]+)/;
  const match = url.match(latLngPattern);

  if (match) {
    return {
      lat: parseFloat(match[1]),
      lng: parseFloat(match[2]),
    };
  } else {
    return null;
  }
}
