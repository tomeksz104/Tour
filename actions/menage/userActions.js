"use server";

import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/authOptions";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { db } from "@/lib/db";

import { Role } from "@prisma/client";

const FormSchema = z.object({
  email: z.string().optional().or(z.literal("")),
  username: z.string().nullable().optional().or(z.literal("")),
  firstName: z.string().nullable().optional().or(z.literal("")),
  lastName: z.string().nullable().optional().or(z.literal("")),
  aboutme: z.string().nullable().optional().or(z.literal("")),
  role: z.nativeEnum(Role, {
    errorMap: () => {
      return { message: "Rola użytkownika nie może być pusta" };
    },
  }),
});

const CreateUser = FormSchema.omit({ id: true, date: true });

export async function updateUser(userId, prevState, formData) {
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
  const validatedFields = CreateUser.safeParse({
    email: formData.get("email"),
    username: formData.get("username"),
    firstName: formData.get("firstName"),
    lastName: formData.get("lastName"),
    aboutme: formData.get("aboutme"),
    role: formData.get("role"),
  });

  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    console.log(validatedFields.error.flatten().fieldErrors);
    return {
      success: false,
      errors: validatedFields.error.flatten().fieldErrors,
      message:
        "Błąd walidacji danych. Nie udało się zaaktualizować użytkownika",
    };
  }

  const { email, username, firstName, lastName, aboutme, role } =
    validatedFields.data;

  console.log(validatedFields.data);

  try {
    const result = await db.user.update({
      where: { id: userId },
      data: {
        email,
        username: username ? username : null,
        firstName: firstName,
        lastName: lastName,
        aboutme: aboutme,
        role,
      },
    });

    console.log(result);
    // Revalidate the cache for the topics page and redirect the user.
    revalidatePath("/admin/users");

    return {
      success: true,
      message: "Użytkownik został zaaktualizowany pomyślnie!",
    };
  } catch (error) {
    return {
      success: false,
      message: "Nie udało się zaaktualizować użytkownika. Spróbuj ponownie.",
    };
  }
}

export async function deleteUser(id) {
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
    await db.user.delete({
      where: { id },
    });

    // Revalidate the cache for the reports page and redirect the user.
    revalidatePath("/admin/users");

    return { success: true, message: "Użytkownik został usunięty pomyślnie." };
  } catch (error) {
    return {
      success: false,
      message: "Nie udało się usunąć użytkownika. Spróbuj ponownie.",
    };
  }
}
