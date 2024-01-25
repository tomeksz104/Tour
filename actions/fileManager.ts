import { writeFile, unlink } from "fs/promises";
import path from "path";
import { v4 as uuidv4 } from "uuid";
import mime from "mime";

export async function uploadFile(data: any, formField: any) {
  const file = data.get(formField);
  if (!file) {
    throw new Error("No file uploaded");
  }

  // Check the MIME type of the file
  const fileType = mime.getType(file.name);

  // Check if the file is an image (MIME type starts with "image/")
  if (!fileType || !fileType.startsWith("image/")) {
    return { error: "Uploaded file is not an image" };
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const originalFileName = file.name;
  const fileExtension = originalFileName.split(".").pop();

  const generatedFileName = `${uuidv4()}.${fileExtension}`;

  const path = `public/upload/${generatedFileName}`;

  await writeFile(path, buffer);

  const filePathWithoutPublic = path.replace("public/", "");

  // Return the path of the saved file
  return {
    success: true,
    filePath: `${process.env.REACT_APP_API_URL}${filePathWithoutPublic}`,
  };
}

export async function deleteFile(fileUrl: any) {
  // Convert URL to file path
  const filePath = fileUrl.replace(`${process.env.REACT_APP_API_URL}`, "");
  const fullPath = path.join("public", filePath);

  try {
    // Delete file
    await unlink(fullPath);
    console.log(`Deleted file at: ${fullPath}`);

    return { success: true };
  } catch (error) {
    console.error(`Error deleting file at: ${fullPath}`, error);
    return { success: false, error: error.message };
  }
}
