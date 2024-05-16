"use server";

import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/authOptions";
import { z } from "zod";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { deleteFile, uploadFile } from "../fileManager";

import { Role } from "@prisma/client";

const FormSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  svgIconPath: z.string(),
});

const CreateCategory = FormSchema.omit({ id: true, date: true });

export async function getCategoryById(id) {
  return await db.category.findUnique({
    where: { id: parseInt(id) },
  });
}

export async function createCategory(prevState, formData) {
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
  const validatedFields = CreateCategory.safeParse({
    name: formData.get("name"),
    description: formData.get("description"),
    svgIconPath: formData.get("svgIconPath"),
  });

  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      success: false,
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Błąd walidacji danych. Nie udało się dodać kategorii",
    };
  }

  let mainPhotoPath;

  if (formData.has("file")) {
    mainPhotoPath = await uploadFile(
      formData,
      "file",
      "public/categories/markers/"
    );

    if (mainPhotoPath.error) {
      return {
        success: false,
        message: "Przesłany plik nie jest obrazem.",
      };
    }
  }

  // Insert data into the database
  try {
    const { name, description, svgIconPath } = validatedFields.data;

    let dataToCreate = {
      name,
      description,
      svgIconPath,
    };

    if (mainPhotoPath && mainPhotoPath.filePath) {
      dataToCreate.iconPath = mainPhotoPath.filePath;
    }

    await db.category.create({ data: dataToCreate });

    // Revalidate the cache for the child-friendly-amenity page
    revalidatePath("/admin/categories");

    return {
      success: true,
      message: "Kategoria została dodana pomyślnie!",
    };
  } catch (error) {
    return {
      success: false,
      message: "Nie udało się dodać kategorii. Spróbuj ponownie.",
    };
  }
}

export async function updateCategory(id, prevState, formData) {
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
  const validatedFields = CreateCategory.safeParse({
    name: formData.get("name"),
    description: formData.get("description"),
    svgIconPath: formData.get("svgIconPath"),
  });

  const existingCategory = await getCategoryById(id);

  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      success: false,
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Błąd walidacji danych. Nie udało się zaaktualizować kategorii",
    };
  }

  let mainPhotoPath;
  if (formData.has("file") && typeof formData.get(`file`) === "object") {
    if (existingCategory.iconPath !== null) {
      await deleteFile(existingCategory.iconPath);
    }

    mainPhotoPath = await uploadFile(
      formData,
      "file",
      "public/categories/markers/"
    );

    if (mainPhotoPath.error) {
      return {
        success: false,
        message: "Przesłany plik nie jest obrazem.",
      };
    }
  } else if (
    formData.get(`file`) === null &&
    existingCategory.iconPath !== null
  ) {
    mainPhotoPath = formData.get(`file`);
    deleteFile(existingCategory.iconPath);
  }

  // Insert data into the database
  try {
    const { name, description, svgIconPath } = validatedFields.data;

    let dataToCreate = {
      name,
      description,
      svgIconPath,
    };

    if (mainPhotoPath && mainPhotoPath.filePath) {
      dataToCreate.iconPath = mainPhotoPath.filePath;
    } else if (mainPhotoPath === null) {
      dataToCreate.iconPath = null;
    }

    await db.category.update({
      where: { id: id },
      data: dataToCreate,
    });

    // Revalidate the cache for the categories page
    revalidatePath("/admin/categories");

    return {
      success: true,
      message: "Kategoria została zaaktualizowana pomyślnie!!",
    };
  } catch (error) {
    return {
      success: false,
      message: "Nie udało się zaaktualizować kategorii. Spróbuj ponownie.",
    };
  }
}

export async function deleteCategory(id) {
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

  try {
    const category = await getCategoryById(id);

    if (category && category.iconPath) {
      await deleteFile(category.iconPath);
    }

    await db.category.delete({
      where: { id },
    });
    // Revalidate the cache for the categories page
    revalidatePath("/admin/categories");

    return { success: true, message: "Kategoria została usunięta!." };
  } catch (error) {
    return {
      success: false,
      message: "Nie udało się usunąć kategorii. Spróbuj ponownie.",
    };
  }
}
