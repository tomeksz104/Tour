import { UploadDropzone } from "@/utils/uploadthing";
import { useState } from "react";

export default function UploadFile({ form }) {
  const [imagePath, setImagePath] = useState(null);

  const handleClientUploadComplete = (res) => {
    // Do something with the response
    console.log("Files: ", res);

    // Ustaw wartość pola formularza po zakończeniu wysyłania plików
    form.setValue("imagePath", "siema");
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <UploadDropzone
        register={form.register}
        name="imagePath"
        endpoint="imageUploader"
        onUploadComplete={(url) => setProfileImageUrl(url)}
        onUploadError={(error) => {
          // Do something with the error.
          alert(`ERROR! ${error.message}`);
        }}
      />
    </main>
  );
}
