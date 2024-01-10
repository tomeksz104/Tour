"use server";

import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { z } from "zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import createSlug from "@/utils/createSlug";
import { PlaceType } from "@prisma/client";

const timeSchema = z.string().regex(/^\d{2}:\d{2}$/, {
  message: "Invalid time format. Expected format is HH:MM.",
});

const daySchema = z.object({
  open: timeSchema.or(z.literal("")),
  close: timeSchema.or(z.literal("")),
});

const openingHoursSchema = z.object({
  MONDAY: daySchema,
  TUESDAY: daySchema,
  WEDNESDAY: daySchema,
  THURSDAY: daySchema,
  FRIDAY: daySchema,
  SATURDAY: daySchema,
  SUNDAY: daySchema,
});

const FormSchema = z.object({
  type: z.nativeEnum(PlaceType, {
    errorMap: () => {
      return { message: "Typ miejsca nie może być pusty" };
    },
  }),

  latitude: z
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
  longitude: z
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
  // mainPhotoPath: z.string().optional(),
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
    .min(9, { message: "Must be a valid mobile number" })
    .max(14, { message: "Must be a valid mobile number" })
    .optional()
    .or(z.literal("")),
  email: z.string().email().optional().or(z.literal("")),
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

export async function upsertPlace(prevState, formData) {
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

  console.log(formData);
  console.log("------------------------------");

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
      message: "Missing Fields. Failed to Create Invoice.",
    };
  }

  console.log(validatedFields.data);

  // Insert data into the database
  try {
    const slug = createSlug(validatedFields.data.title);
    const dataFields = validatedFields.data;

    // const openingHoursData = Object.entries(
    //   validatedFields.data.openingHours
    // ).map(([day, hours]) => ({
    //   day: day,
    //   openTime: hours.open,
    //   closeTime: hours.close,
    // }));

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

    if (
      dataFields.openingHours &&
      Object.keys(dataFields.openingHours).length > 0
    ) {
      dataToCreate.openingHours = {
        create: Object.entries(dataFields.openingHours).map(([day, hours]) => ({
          day: day,
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
    // await db.place.create({
    //   data: {
    //     userId: session.user.id,
    //     type: validatedFields.data.type,
    //     title: validatedFields.data.title,
    //     slogan: validatedFields.data.slogan,
    //     slug: slug,
    //     description: validatedFields.data.description,
    //     categoryId: validatedFields.data.categoryId,
    //     provinceId: validatedFields.data.provinceId,
    //     cityId: validatedFields.data.cityId,

    //     email: validatedFields.data.email,
    //     phone: validatedFields.data.phone,
    //     website: validatedFields.data.website,
    //     address: validatedFields.data.address,

    //     googleMapUrl: validatedFields.data.googleMapUrl,
    //     latitude: validatedFields.data.latitude,
    //     longitude: validatedFields.data.longitude,

    //     childFriendly: validatedFields.data.childFriendly,

    //     childFriendlyAmenities: {
    //       connect: validatedFields.data.childAmenites.map((id) => ({ id })),
    //     },
    //     tags: {
    //       connect: validatedFields.data.topics.map((id) => ({ id })),
    //     },
    //     topics: {
    //       connect: validatedFields.data.tags.map((id) => ({ id })),
    //     },
    //     openingHours: {
    //       create: openingHoursData,
    //     },
    //   },
    // });
  } catch (error) {
    console.log(error);
    return {
      message: "Database Error: Failed to Create Invoice.",
    };
  }

  // Revalidate the cache for the invoices page and redirect the user.
  revalidatePath("/place/new");
  redirect("/place/new");
}
