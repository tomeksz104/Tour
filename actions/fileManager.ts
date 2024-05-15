import { writeFile, unlink } from "fs/promises";
import path from "path";
import { v4 as uuidv4 } from "uuid";
import mime from "mime";
import { put, del } from "@vercel/blob";

export async function uploadFile(data: any, formField: any, savePath: string) {
  const file = data.get(formField);
  if (!file) {
    throw new Error("No file uploaded");
  }

  // Check the MIME type of the file
  const fileType = mime.getType(file.name);

  // Check if the file is an image (MIME type starts with "image/")
  if (!fileType || !fileType.startsWith("image/")) {
    return { error: "Przesłany plik nie jest obrazem" };
  }

  const MAX_FILE_SIZE = 4.5 * 1024 * 1024; // 4.5 MB in bytes
  if (file.size > MAX_FILE_SIZE) {
    return { error: "Rozmiar pliku przekracza maksymalny limit 4,5 MB" };
  }

  // const bytes = await file.arrayBuffer();
  // const buffer = Buffer.from(bytes);

  const originalFileName = file.name;
  const fileExtension = originalFileName.split(".").pop();

  const generatedFileName = `${uuidv4()}.${fileExtension}`;

  // const path = `${savePath}${generatedFileName}`;

  // await writeFile(path, buffer);

  // const filePathWithoutPublic = path.replace("public/", "");

  const { url } = await put(file.name, file, {
    access: "public",
  });

  return {
    success: true,
    filePath: url,
  };

  // Return the path of the saved file
  // return {
  //   success: true,
  //   filePath: `/${filePathWithoutPublic}`,
  // };
}

export async function deleteFile(fileUrl: any) {
  const fullPath = path.join("public", fileUrl);

  try {
    // Delete file
    await del(fileUrl);
    // await unlink(fullPath);
    console.log(`Deleted file at: ${fullPath}`);

    return { success: true };
  } catch (error) {
    console.error(`Error deleting file at: ${fullPath}`, error);
    return { success: false, error: error.message };
  }
}
