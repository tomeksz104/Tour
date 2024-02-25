"use server";

import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/authOptions";
import { z } from "zod";
import { db } from "@/lib/db";
import { PlaceType } from "@prisma/client";
import { getPlaceById } from "./getPlaceById";
import createSlug from "@/utils/createSlug";

import { uploadFile, deleteFile } from "./fileManager";

const timeSchema = z.string().regex(/^\d{2}:\d{2}$/, {
  message: "Invalid time format. Expected format is HH:MM.",
});

const daySchema = z
  .object({
    isOpen: z.boolean().optional().or(z.literal("")),
    open: timeSchema.optional().or(z.literal("")),
    close: timeSchema.optional().or(z.literal("")),
  })
  .optional();

const openingHoursSchema = z
  .object({
    MONDAY: daySchema,
    TUESDAY: daySchema,
    WEDNESDAY: daySchema,
    THURSDAY: daySchema,
    FRIDAY: daySchema,
    SATURDAY: daySchema,
    SUNDAY: daySchema,
  })
  .optional();

const FormSchema = z.object({
  type: z.nativeEnum(PlaceType, {
    errorMap: () => {
      return { message: "Typ miejsca nie może być pusty" };
    },
  }),

  latitude: z.coerce
    .number({
      invalid_type_error: "Nieprawidłowa szerokość geograficzna",
      message: "Nieprawidłowa szerokość geograficzna",
    })
    .transform((val, ctx) => {
      if (val.length < 5) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Nieprawidłowa szerokość geograficzna",
        });
      }
      return parseFloat(val);
    })
    .refine((val) => val >= -90 && val <= 90, {
      message: "Szerokość geograficzna musi wynosić od -90 do 90",
    }),
  longitude: z.coerce
    .number({
      invalid_type_error: "Nieprawidłowa długość geograficzna",
      message: "Nieprawidłowa długość geograficzna",
    })
    .transform((val, ctx) => {
      if (val.length < 5) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Nieprawidłowa długość geograficzna",
        });
      }
      return parseFloat(val);
    })
    .refine((val) => val >= -180 && val <= 180, {
      message: "Długość geograficzna musi wynosić od -180 do 180",
    }),
  title: z.string().min(5, { message: "Tytuł musi mieć minimum 5 znaków" }),
  description: z.string().optional().or(z.literal("")),
  googleMapUrl: z
    .string()
    .url({ message: "Nieprawidłowy adres url" })
    .optional()
    .or(z.literal("")),
  categoryId: z.coerce
    .number({
      message: "Musisz wybrać kategorię",
    })
    .positive({ message: "Kategoria nie może być pusta" })
    .int(),
  provinceId: z.coerce.number().optional().or(z.literal("")),
  cityId: z.coerce.number().optional().or(z.literal("")),
  phone: z
    .string()
    .min(9, { message: "Nieprawidłowy numer telefonu" })
    .max(14, { message: "Nieprawidłowy numer telefonu" })
    .optional()
    .or(z.literal("")),
  email: z
    .string()
    .email("Nieprawidłowy adres email")
    .optional()
    .or(z.literal("")),
  website: z.string().url().optional().or(z.literal("")),
  address: z.string().optional().or(z.literal("")),
  slogan: z.string().optional().or(z.literal("")),

  childFriendly: z.coerce.boolean().optional(),
  childAmenites: z.array(z.number().int()).optional(),
  topics: z.array(z.number().int()).optional(),
  tags: z.array(z.number().int()).optional(),
  openingHours: openingHoursSchema.optional(),
});

const UpsertPlace = FormSchema.omit({ id: true, date: true });

export async function insertPlace(prevState, formData) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return {
      errors: "",
      message: "Nie jesteś zalogowany",
    };
  }

  // Validate form using Zod
  const validatedFields = UpsertPlace.safeParse({
    type: formData.type,
    latitude: formData.latitude || null,
    longitude: formData.longitude || null,
    // mainPhotoPath: formData.mainPhotoPath,
    title: formData.title,
    description: formData.description,
    googleMapUrl: formData.googleMapUrl,
    categoryId: formData.categoryId || null,
    provinceId: formData.provinceId || null,
    cityId: formData.cityId || null,
    phone: formData.phone,
    email: formData.email,
    website: formData.website,
    address: formData.address,
    slogan: formData.slogan,

    childFriendly: +formData.childFriendly,
    childAmenites: formData.childAmenites,
    topics: formData.topics,
    tags: formData.tags,
    openingHours: formData.openingHours,
  });

  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    console.log(validatedFields.error.flatten().fieldErrors);
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Brakujące pola. Nie udało się utworzyć miejsca.",
    };
  }

  const formFileData = formData.fileData;

  let mainPhotoPath;

  if (formFileData.has("file")) {
    mainPhotoPath = await uploadFile(formFileData, "file");

    if (mainPhotoPath.error) {
      return {
        errors: "Błąd przesyłania pliku",
        message: "Przesłany plik nie jest obrazem.",
      };
    }
  }

  const galleryImagePaths = [];

  for (let i = 0; formFileData.has(`galleryImage${i}`); i++) {
    const galleryImagePath = await uploadFile(formFileData, `galleryImage${i}`);

    if (galleryImagePath.error) {
      return {
        errors: "Błąd przesyłania galerii zdjęć",
        message: "Przesłane zdjęcia w galerii nie są obrazami.",
      };
    }

    galleryImagePaths.push(galleryImagePath);
  }

  // Insert data into the database
  try {
    const slug = createSlug(validatedFields.data.title);
    const dataFields = validatedFields.data;

    let dataToCreate = {
      userId: session.user.id,
      type: dataFields.type,
      title: dataFields.title,
      slug: slug,
      categoryId: dataFields.categoryId,
      latitude: dataFields.latitude,
      longitude: dataFields.longitude,

      ...(dataFields.slogan && { slogan: dataFields.slogan }),
      ...(dataFields.description && { description: dataFields.description }),
      ...(dataFields.provinceId && { provinceId: dataFields.provinceId }),
      ...(dataFields.cityId && { cityId: dataFields.cityId }),

      ...(dataFields.googleMapUrl && { googleMapUrl: dataFields.googleMapUrl }),
      ...(dataFields.email && { email: dataFields.email }),
      ...(dataFields.phone && { phone: dataFields.phone }),
      ...(dataFields.website && { website: dataFields.website }),
      ...(dataFields.address && { address: dataFields.address }),
      ...(dataFields.childFriendly && {
        childFriendly: dataFields.childFriendly,
      }),
    };

    if (mainPhotoPath && mainPhotoPath.filePath) {
      dataToCreate.mainPhotoPath = mainPhotoPath.filePath;
    }

    if (galleryImagePaths && galleryImagePaths.length > 0) {
      dataToCreate.photos = {
        create: galleryImagePaths.map(({ filePath }) => ({
          url: filePath,
        })),
      };
    }

    if (
      dataFields.openingHours &&
      Object.keys(dataFields.openingHours).length > 0
    ) {
      dataToCreate.openingHours = {
        create: Object.entries(dataFields.openingHours).map(([day, hours]) => ({
          day: day,
          isOpen: hours.isOpen,
          openTime: hours.open,
          closeTime: hours.close,
        })),
      };
    }

    if (dataFields.childAmenites && dataFields.childAmenites.length > 0) {
      dataToCreate.childFriendlyAmenities = {
        connect: dataFields.childAmenites.map((id) => ({ id })),
      };
    }

    if (dataFields.tags && dataFields.tags.length > 0) {
      dataToCreate.tags = {
        connect: dataFields.tags.map((id) => ({ id })),
      };
    }

    if (dataFields.topics && dataFields.topics.length > 0) {
      dataToCreate.topics = {
        connect: dataFields.topics.map((id) => ({ id })),
      };
    }

    await db.place.create({ data: dataToCreate });
  } catch (error) {
    return {
      errors: "Błąd bazy danych",
      message: "Błąd bazy danych: Nie udało się utworzyć miejsca..",
    };
  } finally {
    return {
      message: "Pomyślnie utworzono miejsce",
    };
  }
}

export async function updatePlace(placeId, state, formData) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return new NextResponse(
      JSON.stringify({
        error: "You are not logged in.",
      }),
      {
        status: 401,
      }
    );
  }

  const existingPlace = await getPlaceById(placeId);
  const existingPhotos = existingPlace.photos;

  // Validate form using Zod
  const validatedFields = UpsertPlace.safeParse({
    type: formData.type,
    latitude: formData.latitude || null,
    longitude: formData.longitude || null,
    // mainPhotoPath: formData.mainPhotoPath,
    title: formData.title,
    description: formData.description || undefined,
    googleMapUrl: formData.googleMapUrl || undefined,
    categoryId: formData.categoryId || null,
    provinceId: formData.provinceId || null,
    cityId: formData.cityId || null,
    phone: formData.phone || undefined,
    email: formData.email || undefined,
    website: formData.website || undefined,
    address: formData.address || undefined,
    slogan: formData.slogan || undefined,

    childFriendly: +formData.childFriendly,
    childAmenites: formData.childAmenites,
    topics: formData.topics,
    tags: formData.tags,
    openingHours: formData.openingHours,
  });

  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Brakujące pola. Nie udało się utworzyć miejsca.",
    };
  }

  const formFileData = formData.fileData;

  let mainPhotoPath;
  if (
    formFileData.has("file") &&
    typeof formFileData.get(`file`) === "object"
  ) {
    mainPhotoPath = await uploadFile(formFileData, "file");

    if (mainPhotoPath.error) {
      return {
        errors: "Błąd przesyłania pliku",
        message: "Przesłany plik nie jest obrazem.",
      };
    }
  } else if (formFileData.get(`file`) === null) {
    mainPhotoPath = formFileData.get(`file`);
    deleteFile(existingPlace.mainPhotoPath);
  }

  const galleryImagePaths = [];
  for (let i = 0; formFileData.has(`galleryImage${i}`); i++) {
    const photo = formFileData.get(`galleryImage${i}`);

    if (typeof photo === "object") {
      const galleryImagePath = await uploadFile(
        formFileData,
        `galleryImage${i}`
      );

      if (galleryImagePath.error) {
        return {
          errors: "Błąd przesyłania galerii zdjęć",
          message: "Przesłane zdjęcia w galerii nie są obrazami.",
        };
      }

      galleryImagePaths.push(galleryImagePath);
    } else {
      galleryImagePaths.push({ success: false, filePath: photo });
    }
  }

  // Insert data into the database
  try {
    const slug = createSlug(validatedFields.data.title);
    const dataFields = validatedFields.data;

    let dataToCreate = {
      userId: session.user.id,
      type: dataFields.type,
      title: dataFields.title,
      slug: slug,
      categoryId: dataFields.categoryId,
      latitude: dataFields.latitude,
      longitude: dataFields.longitude,

      ...(dataFields.slogan && { slogan: dataFields.slogan }),
      ...(dataFields.description && { description: dataFields.description }),
      ...(dataFields.provinceId && { provinceId: dataFields.provinceId }),
      ...(dataFields.cityId && { cityId: dataFields.cityId }),

      ...(dataFields.googleMapUrl && { googleMapUrl: dataFields.googleMapUrl }),
      ...(dataFields.email && { email: dataFields.email }),
      ...(dataFields.phone && { phone: dataFields.phone }),
      ...(dataFields.website && { website: dataFields.website }),
      ...(dataFields.address && { address: dataFields.address }),
      ...(dataFields.childFriendly && {
        childFriendly: dataFields.childFriendly,
      }),
    };

    if (mainPhotoPath && mainPhotoPath.filePath) {
      dataToCreate.mainPhotoPath = mainPhotoPath.filePath;
    } else if (mainPhotoPath === null) {
      dataToCreate.mainPhotoPath = null;
    }

    // Prepare a list of URLs of existing images
    const existingPhotoUrls = existingPhotos.map((photo) => photo.url);

    // Finding photos to delete
    const photosToRemove = existingPhotos.filter(
      (photo) =>
        !galleryImagePaths.some((newPhoto) => newPhoto.filePath === photo.url)
    );

    // Finding new photos to add
    const newPhotosToAdd = galleryImagePaths.filter(
      (newPhoto) => !existingPhotoUrls.includes(newPhoto.filePath)
    );

    // Removing old photos from the database
    if (photosToRemove.length > 0) {
      await db.photo.deleteMany({
        where: {
          id: {
            in: photosToRemove.map((photo) => photo.id),
          },
        },
      });
      await Promise.all(photosToRemove.map((file) => deleteFile(file.url)));
    }

    // Adding new photos to the database
    if (newPhotosToAdd.length > 0) {
      await db.photo.createMany({
        data: newPhotosToAdd.map(({ filePath }) => ({
          url: filePath,
          placeId: placeId,
        })),
      });
    }

    if (
      dataFields.openingHours &&
      Object.keys(dataFields.openingHours).length > 0
    ) {
      const newOpeningHours = dataFields.openingHours;
      const existingOpeningHours = existingPlace.openingHours;

      // Find days that need to be updated or deleted
      for (const existing of existingOpeningHours) {
        if (newOpeningHours[existing.day]) {
          // Update if opening hours have been changed
          if (
            newOpeningHours[existing.day].open !== existing.openTime ||
            newOpeningHours[existing.day].close !== existing.closeTime ||
            newOpeningHours[existing.day].isOpen !== existing.isOpen
          ) {
            await db.openingHours.update({
              where: { id: existing.id },
              data: {
                isOpen: newOpeningHours[existing.day].isOpen,
                openTime: newOpeningHours[existing.day].open,
                closeTime: newOpeningHours[existing.day].close,
              },
            });
          }
          // Remove the day from the new data to avoid adding it again
          delete newOpeningHours[existing.day];
        } else {
          // Remove days that are no longer needed
          await db.openingHours.delete({ where: { id: existing.id } });
        }
      }

      // Add new days
      for (const [day, hours] of Object.entries(newOpeningHours)) {
        await db.openingHours.create({
          data: {
            day: day,
            openTime: hours.open,
            closeTime: hours.close,
            placeId: placeId,
          },
        });
      }
    }

    if (dataFields.childAmenites && dataFields.childAmenites.length > 0) {
      dataToCreate.childFriendlyAmenities = {}; // Initialize the object
      dataToCreate.childFriendlyAmenities.disconnect =
        existingPlace.childFriendlyAmenities
          .filter((item) => !formData.childAmenites.includes(item.id))
          .map((item) => ({ id: item.id }));

      dataToCreate.childFriendlyAmenities.connect = formData.childAmenites
        .filter(
          (id) =>
            !existingPlace.childFriendlyAmenities
              .map((item) => item.id)
              .includes(id)
        )
        .map((id) => ({ id }));
    }

    if (dataFields.tags && dataFields.tags.length > 0) {
      dataToCreate.tags = {}; // Initialize the object
      dataToCreate.tags.disconnect = existingPlace.tags
        .filter((t) => !formData.tags.includes(t.id))
        .map((t) => ({ id: t.id }));

      dataToCreate.tags.connect = formData.tags
        .filter((id) => !existingPlace.tags.map((t) => t.id).includes(id))
        .map((id) => ({ id }));
    }

    if (dataFields.topics && dataFields.topics.length > 0) {
      dataToCreate.topics = {}; // Initialize the object
      dataToCreate.topics.connect = dataFields.topics.map((id) => ({ id }));

      dataToCreate.topics.disconnect = existingPlace.topics
        .filter((t) => !formData.topics.includes(t.id))
        .map((t) => ({ id: t.id }));

      dataToCreate.topics.connect = formData.topics
        .filter((id) => !existingPlace.topics.map((t) => t.id).includes(id))
        .map((id) => ({ id }));
    }

    await db.place.update({
      where: { id: placeId },
      data: dataToCreate,
    });
  } catch (error) {
    return {
      errors: "Błąd bazy danych",
      message: "Błąd bazy danych: Nie udało się utworzyć miejsca..",
    };
  } finally {
    return {
      message: "Pomyślnie zaaktualizowano miejsce",
    };
  }
}
