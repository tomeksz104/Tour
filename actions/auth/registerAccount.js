"use server";

import { z } from "zod";
import { db } from "@/lib/db";
import { hash } from "bcryptjs";

const FormSchema = z.object({
  email: z.string().email("Nieprawidłowy adres email"),
  password: z.string(),
  confirmPassword: z.string(),
});

const CreateNewAccount = FormSchema.omit({ id: true, date: true });

export async function registerAccount(prevState, formData) {
  // Validate form using Zod
  const validatedFields = CreateNewAccount.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
  });

  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      success: false,
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Błąd walidacji danych. Nie udało się utworzyć konta",
    };
  }

  const { email, password, confirmPassword } = validatedFields.data;

  if (password !== confirmPassword) {
    return {
      success: false,
      message: "Hasła nie są takie same",
    };
  }

  try {
    const existingUser = await db.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return {
        success: false,
        message: "Użytkownik z tym adresem email już istnieje",
      };
    }

    const hashed_password = await hash(password, 12);

    await db.user.create({
      data: {
        email,
        password: hashed_password,
      },
    });

    return {
      success: true,
      message: "Konto zostało utworzone pomyślnie",
    };
  } catch (error) {
    return {
      success: false,
      message: "Nie udało się utworzyć konta",
    };
  }
}
