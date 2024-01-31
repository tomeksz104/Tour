import ReviewForm from "./ReviewForm";
import Review from "./Review";
import { db } from "@/lib/db";

export default async function ReviewCard({ place }) {
  const comments = await db.review.findMany({
    where: { placeId: parseInt(place.id) },
    include: {
      author: true,
    },
  });

  return (
    <section className="bg-white rounded-md p-5 antialiased">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-700 md:text-2xl">
          Opinie ({comments.length})
        </h2>
      </div>

      <ReviewForm placeId={place.id} totalComments={comments.length} />

      {comments.map((comment, index) => (
        <Review comment={comment} key={index} />
      ))}
    </section>
  );
}
