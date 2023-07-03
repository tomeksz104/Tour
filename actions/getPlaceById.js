import "server-only";

export const getPlaceById = async (id) => {
  const response = await fetch(`http://127.0.0.1:3000/api/place/${id}`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Error fetching place by ID");
  }

  const data = await response.json();

  if (!data) {
    throw new Error("Empty response from server");
  }

  return data;
};
