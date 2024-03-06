"use server";

import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/authOptions";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { db } from "@/lib/db";

import { ErrorReportStatus } from "@prisma/client";

const FormSchema = z.object({
  content: z
    .string({
      required_error: "Pole z opisem błędu jest wymagane",
      invalid_type_error: "Pole z opisem błędu musi być tekstem",
    })
    .trim(),
  pageUrl: z.string(),
  status: z.nativeEnum(ErrorReportStatus, {
    errorMap: () => {
      return { message: "Status zgłoszenia nie może być pusty" };
    },
  }),
});

const CreateErrorReport = FormSchema.omit({ id: true, date: true });

export async function createErrorReport(prevState, formData) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return {
      errors: "",
      message: "Nie jesteś zalogowany",
    };
  }

  // Validate form using Zod
  const validatedFields = CreateErrorReport.safeParse({
    content: formData.get("content"),
    pageUrl: formData.get("pageUrl"),
    status: ErrorReportStatus.NEW,
  });

  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Nie udało się przesłać zgłoszenia",
    };
  }

  try {
    await db.ErrorReport.create({
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

export async function updateErrorReport(reportId, prevState, formData) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return {
      errors: "",
      message: "Nie jesteś zalogowany",
    };
  }

  // Validate form using Zod
  const validatedFields = CreateErrorReport.safeParse({
    content: formData.get("content"),
    pageUrl: formData.get("pageUrl"),
    status: formData.get("status"),
  });

  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Nie udało się przesłać zgłoszenia",
    };
  }

  const { content, pageUrl, status } = validatedFields.data;

  try {
    await db.ErrorReport.update({
      where: { id: reportId },
      data: {
        content,
        pageUrl,
        status,
      },
    });

    // Revalidate the cache for the topics page and redirect the user.
    revalidatePath("/admin/reports");

    return {
      success: true,
      message: "Zgłoszenie zostało zaaktualizowane pomyślnie!",
    };
  } catch (error) {
    return {
      success: false,
      message: "Nie udało się zaaktualizować zgłoszenia. Spróbuj ponownie.",
    };
  }
}

export async function deleteReport(id) {
  try {
    await db.errorReport.delete({
      where: { id },
    });

    // Revalidate the cache for the reports page and redirect the user.
    revalidatePath("/admin/topics");

    return { success: true, message: "Zgłoszenie zostało usunięte pomyślnie." };
  } catch (error) {
    return {
      success: false,
      message: "Nie udało się usunąć zgłoszenia. Spróbuj ponownie.",
    };
  }
}
