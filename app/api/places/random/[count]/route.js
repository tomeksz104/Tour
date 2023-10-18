import dbConnect from "@/libs/dbConnect";
import Place from "@/models/place";

export const GET = async (request, { params }) => {
  const count = params.count;

  try {
    await dbConnect();

    const numberOfPlaces = parseInt(count, 10);

    if (isNaN(numberOfPlaces)) {
      return new NextResponse(
        JSON.stringify({
          error: { global: "Invalid count parameter" },
        }),
        {
          status: 404,
        }
      );
    }

    const randomPlaces = await Place.aggregate([
      { $sample: { size: numberOfPlaces } },
    ]);

    if (!randomPlaces || randomPlaces.length === 0) {
      return new NextResponse(
        JSON.stringify({
          error: { global: "No Places Found" },
        }),
        {
          status: 404,
        }
      );
    }

    return new Response(JSON.stringify(randomPlaces), { status: 200 });
  } catch (error) {
    return new NextResponse(
      JSON.stringify({
        error: { global: "Error fetching random places" },
      }),
      {
        status: 500,
      }
    );
  }
};
