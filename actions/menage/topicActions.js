"use server";

import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/authOptions";
import { z } from "zod";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

import { Role } from "@prisma/client";

const FormSchema = z.object({
  id: z.string(),
  name: z.string(),
});

const CreateTopic = FormSchema.omit({ id: true, date: true });

export async function createTopic(prevState, formData) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return {
      success: false,
      message: "Nie jesteś zalogowany",
    };
  }

  // Check if the user has the ADMIN role
  if (session.user.role !== Role.ADMIN) {
    return {
      success: false,
      message: "Nie masz uprawnień aby wykonać tę akcję",
    };
  }

  // Validate form using Zod
  const validatedFields = CreateTopic.safeParse({
    name: formData.get("name"),
  });

  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      success: false,
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Błąd walidacji danych. Nie udało się dodać tematu",
    };
  }

  const { name } = validatedFields.data;

  // Insert data into the database
  try {
    await db.topic.create({ data: { name } });

    // Revalidate the cache for the topics page and redirect the user.
    revalidatePath("/admin/topics");

    return { success: true, message: "Temat został dodany pomyślnie!" };
  } catch (error) {
    return {
      success: false,
      message: "Nie udało się dodać tematu. Spróbuj ponownie.",
    };
  }
}

export async function updateTopic(topicId, prevState, formData) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return {
      success: false,
      message: "Nie jesteś zalogowany",
    };
  }

  // Check if the user has the ADMIN role
  if (session.user.role !== Role.ADMIN) {
    return {
      success: false,
      message: "Nie masz uprawnień do wykonania tej akcji",
    };
  }

  // Validate form using Zod
  const validatedFields = CreateTopic.safeParse({
    name: formData.get("name"),
  });

  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      success: false,
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Błąd walidacji danych. Nie udało się zaaktualizować tematu",
    };
  }

  const { name } = validatedFields.data;

  // Insert data into the database
  try {
    await db.topic.update({
      where: { id: topicId },
      data: { name },
    });

    // Revalidate the cache for the topics page and redirect the user.
    revalidatePath("/admin/topics");

    return {
      success: true,
      message: "Temat został zaaktualizowany pomyślnie!",
    };
  } catch (error) {
    return {
      success: false,
      message: "Nie udało się zaaktualizować tematu. Spróbuj ponownie.",
    };
  }
}

export async function deleteTopic(id) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return {
      success: false,
      message: "Nie jesteś zalogowany",
    };
  }

  // Check if the user has the ADMIN role
  if (session.user.role !== Role.ADMIN) {
    return {
      success: false,
      message: "Nie masz uprawnień do wykonania tej akcji",
    };
  }

  try {
    await db.topic.delete({
      where: { id },
    });

    // Revalidate the cache for the topics page and redirect the user.
    revalidatePath("/admin/topics");

    return { success: true, message: "Temat został usunięty pomyślnie." };
  } catch (error) {
    return {
      success: false,
      message: "Nie udało się usunąć tematu. Spróbuj ponownie.",
    };
  }
}
