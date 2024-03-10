"use server";

import { z } from "zod";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const FormSchema = z.object({
  id: z.string(),
  name: z.string(),
});

const CreateTag = FormSchema.omit({ id: true, date: true });

export async function createTag(prevState, formData) {
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
