import User from "@/models/user";
import dbConnect from "@/utils/dbConnect";

export const POST = async (request) => {
  const data = await request.json();
  const { enteredEmail: email, enteredPassword: password } = data;

  try {
    await dbConnect();

    const newUser = await User.create({ email, password });

    return new Response(JSON.stringify(newUser), { status: 201 });
  } catch (error) {
    return new Response("Failed to create a new prompt", { status: 500 });
  }
};
