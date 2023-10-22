export const getCommentsByPlaceId = async (id) => {
  const apiUrl = process.env.REACT_APP_API_URL || "http://127.0.0.1:3000";

  // const response = await fetch(
  //   `https://tour-fn48fza9i-tomeksz104.vercel.app/api/comment/place/${id}`,
  //   {
  //     cache: "no-store",
  //   }
  // );

  const response = await fetch(`${apiUrl}/api/comment/place/${id}`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Error fetching comments by place ID");
  }

  const data = await response.json();

  return data;
};
