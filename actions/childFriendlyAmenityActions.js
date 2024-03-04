"use server";

import { z } from "zod";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const FormSchema = z.object({
  id: z.string(),
  name: z.string(),
});

const CreateChildFriendlyAmenity = FormSchema.omit({ id: true, date: true });

export async function createChildFriendlyAmenity(prevState, formData) {
  // Validate form using Zod
  const validatedFields = CreateChildFriendlyAmenity.safeParse({
    name: formData.get("name"),
  });

  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Create child friendly amenity.",
    };
  }

  const { name } = validatedFields.data;

  // Insert data into the database
  try {
    await db.ChildFriendlyAmenity.create({ data: { name } });

    // Revalidate the cache for the child-friendly-amenity page and redirect the user.
    revalidatePath("/admin/child-friendly-amenity");

    return {
      success: true,
      message: "Udogodnienie dla dziecka zostało dodane pomyślnie!",
    };
  } catch (error) {
    return {
      success: false,
      message: "Nie udało się dodać udogodnienia. Spróbuj ponownie.",
    };
  }
}

export async function updateChildFriendlyAmenity(id, prevState, formData) {
  // Validate form using Zod
  const validatedFields = CreateChildFriendlyAmenity.safeParse({
    name: formData.get("name"),
  });

  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Update Topic.",
    };
  }

  const { name } = validatedFields.data;

  // Insert data into the database
  try {
    await db.ChildFriendlyAmenity.update({
      where: { id: id },
      data: { name },
    });

    // Revalidate the cache for the child-friendly-amenity page and redirect the user.
    revalidatePath("/admin/child-friendly-amenity");

    return {
      success: true,
      message: "Udogodnienie dla dziecka zostało zaaktualizowane pomyślnie!!",
    };
  } catch (error) {
    return {
      success: false,
      message: "Nie udało się zaaktualizować udogodnienia. Spróbuj ponownie.",
    };
  }
}

export async function deleteChildFriendlyAmenity(id) {
  try {
    await db.ChildFriendlyAmenity.delete({
      where: { id },
    });

    // Revalidate the cache for the child-friendly-amenity page and redirect the user.
    revalidatePath("/admin/child-friendly-amenity");

    return { success: true, message: "Udogodnienie zostało usunięte!." };
  } catch (error) {
    return {
      success: false,
      message: "Nie udało się usunąć udogodnienia. Spróbuj ponownie.",
    };
  }
}
