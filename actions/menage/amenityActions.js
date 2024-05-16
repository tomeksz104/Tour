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

const CreateAmenity = FormSchema.omit({ id: true, date: true });

export async function createAmenity(prevState, formData) {
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
  const validatedFields = CreateAmenity.safeParse({
    name: formData.get("name"),
  });

  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      success: false,
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Błąd walidacji danych. Nie udało się dodać udogodnienia",
    };
  }

  const { name } = validatedFields.data;

  // Insert data into the database
  try {
    await db.amenity.create({ data: { name } });

    // Revalidate the cache for the amenities page and redirect the user.
    revalidatePath("/admin/amenities");

    return { success: true, message: "Udogodnienie zostało dodane pomyślnie!" };
  } catch (error) {
    return {
      success: false,
      message: "Nie udało się dodać udogodnienia. Spróbuj ponownie.",
    };
  }
}

export async function updateAmenity(amenityId, prevState, formData) {
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
  const validatedFields = CreateAmenity.safeParse({
    name: formData.get("name"),
  });

  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      success: false,
      errors: validatedFields.error.flatten().fieldErrors,
      message:
        "Błąd walidacji danych. Nie udało się zaaktualizować udogodnienia",
    };
  }

  const { name } = validatedFields.data;

  // Insert data into the database
  try {
    await db.amenity.update({
      where: { id: amenityId },
      data: { name },
    });

    // Revalidate the cache for the topics page and redirect the user.
    revalidatePath("/admin/amenities");

    return {
      success: true,
      message: "Udogodnienie zostało zaaktualizowane pomyślnie!",
    };
  } catch (error) {
    return {
      success: false,
      message: "Nie udało się zaaktualizować udogodnienia. Spróbuj ponownie.",
    };
  }
}

export async function deleteAmenity(id) {
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
    await db.amenity.delete({
      where: { id },
    });

    // Revalidate the cache for the topics page and redirect the user.
    revalidatePath("/admin/amenities");

    return {
      success: true,
      message: "Udogodnienie zostało usunięte pomyślnie.",
    };
  } catch (error) {
    return {
      success: false,
      message: "Nie udało się usunąć udogodnienia. Spróbuj ponownie.",
    };
  }
}
