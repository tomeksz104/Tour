"use server";

import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { z } from "zod";
import { db } from "@/lib/db";

const FormSchema = z.object({
  content: z
    .string({
      required_error: "Pole z opisem błędu jest wymagane",
      invalid_type_error: "Pole z opisem błędu musi być tekstem",
    })
    .trim(),
  pageUrl: z.string(),
});

const InsertErrorReport = FormSchema.omit({ id: true, date: true });

export async function insertErrorReport(prevState, formData) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return {
      errors: "",
      message: "Nie jesteś zalogowany",
    };
  }

  // Validate form using Zod
  const validatedFields = InsertErrorReport.safeParse({
    content: formData.content,
    pageUrl: formData.pageUrl,
  });

  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Nie udało się przesłać zgłoszenia",
    };
  }

  try {
    await db.errorReport.create({
      data: {
        userId: session.user.id,
        ...validatedFields.data,
      },
    });

    return {
      message: "Zgłoszenie zostało przesłane",
    };
  } catch (error) {
    return {
      errors: "Błąd bazy danych",
      message: "Błąd bazy danych: Nie udało się przesłać zgłoszenia.",
    };
  }
}
