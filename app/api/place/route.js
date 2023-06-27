import Place from "@/models/place";
import dbConnect from "@/utils/dbConnect";
import { NextResponse } from "next/server";

export const GET = async (request) => {
  try {
    await dbConnect();

    const places = await Place.find({});

    return new Response(JSON.stringify(places), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch all places", { status: 500 });
  }
};
