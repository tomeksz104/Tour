"use server";

import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { z } from "zod";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

const FormSchema = z.object({
  content: z.string().optional().or(z.literal("")),
  rating: z.coerce.number().optional().or(z.literal("")),
});

const UpsertReview = FormSchema.omit({ id: true, date: true });

export async function getReviewsByPlaceId(id) {
  return await db.review.findUnique({
    where: { id: parseInt(id) },
  });
}

export async function insertReview(placeId, prevState, formData) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return {
      errors: "",
      message: "Nie jesteś zalogowany",
    };
  }

  // Validate form using Zod
  const validatedFields = UpsertReview.safeParse({
    content: formData.content,
    rating: formData.rating ? formData.rating : null,
  });

  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Nie udało się zaaktualizować komentarza.",
    };
  }

  try {
    await db.review.create({
      data: {
        placeId: placeId,
        userId: session.user.id,
        ...validatedFields.data,
      },
    });

    revalidatePath(`/place/${placeId}`);

    return {
      message: "Pomyślnie zaaktualizowano komentarz",
    };
  } catch (error) {
    return {
      errors: "Błąd bazy danych",
      message: "Błąd bazy danych: Nie udało się zaaktualizować komentarza.",
    };
  }
}

export async function updateReview(reviewId, prevState, formData) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return {
      errors: "",
      message: "Nie jesteś zalogowany",
    };
  }

  // Validate form using Zod
  const validatedFields = UpsertReview.safeParse({
    content: formData.content,
    rating: formData.rating ? formData.rating : null,
  });

  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Nie udało się zaaktualizować komentarza.",
    };
  }

  const { content, rating } = validatedFields.data;

  try {
    await db.review.update({
      where: { id: reviewId },
      data: { content, rating: formData.rating === null ? null : rating },
    });

    revalidatePath(`/place`);

    return {
      message: "Pomyślnie zaaktualizowano komentarz",
    };
  } catch (error) {
    return {
      errors: "Błąd bazy danych",
      message: "Błąd bazy danych: Nie udało się zaaktualizować komentarza.",
    };
  }
}

export async function deleteReview(reviewId) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return {
      errors: "",
      message: "Nie jesteś zalogowany",
    };
  }

  try {
    const review = await db.review.findUnique({
      where: { id: parseInt(reviewId) },
    });

    if (!review) {
      return {
        errors: "",
        message: "Nie znaleziono opinii",
      };
    }

    if (session.user.id !== review.userId && session.user.role !== "ADMIN") {
      return {
        errors: "",
        message: "Nie masz uprawnień do usunięcia tej opinii",
      };
    }

    await db.review.delete({
      where: { id: parseInt(reviewId) },
    });

    revalidatePath(`/place`);

    return {
      message: "Pomyślnie usunięto opinię",
    };
  } catch (error) {
    return {
      errors: "Błąd bazy danych",
      message: "Błąd bazy danych: Nie udało się usunąć opinii.",
    };
  }
}
