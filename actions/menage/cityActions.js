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
  provinceId: z.coerce.number().optional().or(z.literal("")),
});

const CreateCity = FormSchema.omit({ id: true, date: true });

export async function createCity(prevState, formData) {
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
  const validatedFields = CreateCity.safeParse({
    name: formData.get("name"),
    provinceId: formData.get("provinceId"),
  });

  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      success: false,
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Błąd walidacji danych. Nie udało się dodać miasta",
    };
  }

  const { name, provinceId } = validatedFields.data;

  // Insert data into the database
  try {
    await db.city.create({ data: { name, provinceId } });

    // Revalidate the cache for the cities page and redirect the user.
    revalidatePath("/admin/cities");

    return { success: true, message: "Miasto zostało dodane pomyślnie!" };
  } catch (error) {
    return {
      success: false,
      message: "Nie udało się dodać miasta. Spróbuj ponownie.",
    };
  }
}

export async function updateCity(cityId, prevState, formData) {
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
  const validatedFields = CreateCity.safeParse({
    name: formData.get("name"),
    provinceId: formData.get("provinceId"),
  });

  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      success: false,
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Błąd walidacji danych. Nie udało się zaaktualizować miasta",
    };
  }

  const { name, provinceId } = validatedFields.data;

  // Insert data into the database
  try {
    await db.city.update({
      where: { id: cityId },
      data: { name, provinceId },
    });

    // Revalidate the cache for the cities page and redirect the user.
    revalidatePath("/admin/cities");

    return {
      success: true,
      message: "Miasto zostało zaaktualizowane pomyślnie!",
    };
  } catch (error) {
    return {
      success: false,
      message: "Nie udało się zaaktualizować miasta. Spróbuj ponownie.",
    };
  }
}

export async function deleteCity(id) {
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
    await db.city.delete({
      where: { id },
    });

    // Revalidate the cache for the cities page and redirect the user.
    revalidatePath("/admin/cities");

    return {
      success: true,
      message: "Miasto zostało usunięte pomyślnie.",
    };
  } catch (error) {
    return {
      success: false,
      message: "Nie udało się usunąć miasta. Spróbuj ponownie.",
    };
  }
}
