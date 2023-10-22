import "server-only";

export const getRandomPlaces = async (count) => {
  const apiUrl = process.env.REACT_APP_API_URL || "http://127.0.0.1:3000";

  // const response = await fetch(
  //   `https://tour-fn48fza9i-tomeksz104.vercel.app/api/places/random/${count}`,
  //   {
  //     cache: "no-store",
  //   }
  // );

  const response = await fetch(`${apiUrl}/api/places/random/${count}`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Error fetching places");
  }

  const data = await response.json();

  if (!data) {
    throw new Error("Empty response from server");
  }

  return data;
};
