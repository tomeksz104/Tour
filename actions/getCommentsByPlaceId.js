export const getCommentsByPlaceId = async (id) => {
  const response = await fetch(
    `http://127.0.0.1:3000/api/comment/place/${id}`,
    {
      cache: "no-store",
    }
  );

  if (!response.ok) {
    throw new Error("Error fetching comments by place ID");
  }

  const data = await response.json();

  return data;
};
