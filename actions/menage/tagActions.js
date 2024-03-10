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

const CreateTag = FormSchema.omit({ id: true, date: true });

export async function createTag(prevState, formData) {
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
  const validatedFields = CreateTag.safeParse({
    name: formData.get("name"),
  });

  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      success: false,
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Błąd walidacji danych. Nie udało się dodać tagu",
    };
  }

  const { name } = validatedFields.data;

  // Insert data into the database
  try {
    await db.tag.create({ data: { name } });

    // Revalidate the cache for the tags page and redirect the user.
    revalidatePath("/admin/tags");

    return { success: true, message: "Tag został dodany pomyślnie!" };
  } catch (error) {
    return {
      success: false,
      message: "Nie udało się dodać tagu. Spróbuj ponownie.",
    };
  }
}

export async function updateTag(tagId, prevState, formData) {
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
  const validatedFields = CreateTag.safeParse({
    name: formData.get("name"),
  });

  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      success: false,
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Błąd walidacji danych. Nie udało się zaaktualizować tagu",
    };
  }

  const { name } = validatedFields.data;

  // Insert data into the database
  try {
    await db.tag.update({
      where: { id: tagId },
      data: { name },
    });

    // Revalidate the cache for the tags page and redirect the user.
    revalidatePath("/admin/tags");

    return { success: true, message: "Tag został zaaktualizowany pomyślnie!" };
  } catch (error) {
    return {
      success: false,
      message: "Nie udało się zaaktualizować tagu. Spróbuj ponownie.",
    };
  }
}

export async function deleteTag(id) {
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
    await db.tag.delete({
      where: { id },
    });

    // Revalidate the cache for the tags page and redirect the user.
    revalidatePath("/admin/tags");

    return { success: true, message: "Tag został usunięty pomyślnie." };
  } catch (error) {
    return {
      success: false,
      message: "Nie udało się usunąć tagu. Spróbuj ponownie.",
    };
  }
}
