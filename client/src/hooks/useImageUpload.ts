import { useState, useCallback } from "react";
import { toast } from "react-toastify";

export const useImageUpload = () => {
  const [isUploading, setIsUploading] = useState(false);

  const uploadImage = useCallback(
    async (file: File): Promise<string | null> => {
      if (!file) return null;

      setIsUploading(true);
      try {
        const formData = new FormData();
        formData.append("file", file);

        const response = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });

        if (!response.ok) {
          const error = await response.json();
          throw new Error(error.message || "Upload failed");
        }

        const { key } = await response.json();
        return key;
      } catch (error) {
        console.error("Image upload error:", error);
        toast.error(
          error instanceof Error ? error.message : "Image upload failed",
        );
        return null;
      } finally {
        setIsUploading(false);
      }
    },
    [],
  );

  return { isUploading, uploadImage };
};
