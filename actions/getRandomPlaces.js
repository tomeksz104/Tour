import "server-only";

export const getRandomPlaces = async (count) => {
  const response = await fetch(
    `http://127.0.0.1:3000/api/places/random/${count}`,
    {
      cache: "no-store",
    }
  );

  if (!response.ok) {
    throw new Error("Error fetching places");
  }

  const data = await response.json();

  if (!data) {
    throw new Error("Empty response from server");
  }

  return data;
};
