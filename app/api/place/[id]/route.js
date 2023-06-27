import Place from "@/models/place";
import dbConnect from "@/utils/dbConnect";

export const GET = async (request, { params }) => {
  try {
    await dbConnect();

    const prompt = await Place.findById(params.id);
    if (!prompt) return new Response("Place Not Found", { status: 404 });

    return new Response(JSON.stringify(prompt), { status: 200 });
  } catch (error) {
    return new Response("Internal Server Error", { status: 500 });
  }
};

export const PATCH = async (request, { params }) => {
  const { prompt, tag } = await request.json();

  try {
    await dbConnect();

    // Find the existing place by ID
    const existingPlace = await Place.findById(params.id);

    if (!existingPlace) {
      return new Response("Place not found", { status: 404 });
    }

    // Update the place with new data
    existingPlace.prompt = prompt;
    existingPlace.tag = tag;

    await existingPlace.save();

    return new Response("Successfully updated the Place", { status: 200 });
  } catch (error) {
    return new Response("Error Updating Prompt", { status: 500 });
  }
};

export const DELETE = async (request, { params }) => {
  try {
    await dbConnect();

    // Find the place by ID and remove it
    await Place.findByIdAndRemove(params.id);

    return new Response("Place deleted successfully", { status: 200 });
  } catch (error) {
    return new Response("Error deleting place", { status: 500 });
  }
};
