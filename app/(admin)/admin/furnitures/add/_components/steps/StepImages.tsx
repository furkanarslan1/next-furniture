"use client";
import React, { useEffect, useRef, useState } from "react";
import { UseFormReturn } from "react-hook-form";
import { FurnitureFormInput } from "../FurnitureAddForm";
import { ImageFile } from "@/types/ImageFileType";
import { toast } from "sonner";
import imageCompression from "browser-image-compression";
import { FormItem, FormLabel } from "@/components/ui/form";
import { Loader2, Star, UploadCloud, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface StepImagesProps {
  form: UseFormReturn<FurnitureFormInput>;
  onImagesChange: (images: ImageFile[]) => void;
  coverImage?: string;
  onSetCover: (url: string) => void;
}

export default function StepImages({
  form,
  onImagesChange,
  coverImage,
  onSetCover,
}: StepImagesProps) {
  const [imageFiles, setImageFiles] = useState<ImageFile[]>([]);
  const [isCompressing, setIsCompressing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
  const ACCEPTED_TYPES = ["image/jpeg", "image/png", "image/webp"];

  useEffect(() => {
    if (!coverImage && imageFiles.length > 0) {
      onSetCover(imageFiles[0].preview);
    }
  }, [imageFiles, coverImage, onSetCover]);

  const validateFile = (file: File): boolean => {
    if (!ACCEPTED_TYPES.includes(file.type)) {
      toast.error(
        `Unsupported format: ${file.name}. Please use JPG, PNG or WEBP.`,
      );
      return false;
    }
    if (file.size > MAX_FILE_SIZE) {
      toast.error(
        `File too large: ${file.name}. Maximum limit is 5MB before compression.`,
      );
      return false;
    }
    return true;
  };
  // imageFiles her değiştiğinde ana formu bilgilendir
  // Inform the main form whenever the imageFiles change
  useEffect(() => {
    onImagesChange(imageFiles);

    const imageDataForForm = imageFiles.map((img) => ({
      url: img.preview,
      alt: img.file.name,
    }));
    // Formu bu yeni obje dizisiyle güncelliyoruz
    // We are updating the form with this new array of objects.
    form.setValue("images", imageDataForForm, { shouldValidate: true });
  }, [imageFiles, onImagesChange, form]);

  const processFiles = async (files: FileList | File[]) => {
    const rawFiles = Array.from(files);
    const validFiles = rawFiles.filter(validateFile);

    if (validFiles.length === 0) return;

    setIsCompressing(true);

    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 1920,
      useWebWorker: true,
    };

    try {
      const newImages: ImageFile[] = [];

      for (const file of validFiles) {
        const compressed = await imageCompression(file, options);
        if (compressed.size > 2 * 1024 * 1024) {
          toast.warning(
            `${file.name} is still over 2MB after compression. Performance might be affected.`,
          );
        }

        newImages.push({
          file: compressed,
          preview: URL.createObjectURL(compressed),
          isCover: false,
        });
      }

      setImageFiles((prev) => [...prev, ...newImages]);
    } catch (error) {
      console.error("Compression error:", error);
      toast.error("An error occurred while processing images.");
    } finally {
      setIsCompressing(false);
      // Reset input value to allow selecting same file again
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const removeImage = (index: number) => {
    setImageFiles((prev) => {
      const removed = prev[index];
      const updated = prev.filter((_, i) => i !== index);

      if (removed && coverImage === removed.preview) {
        if (updated.length > 0) {
          onSetCover(updated[0].preview);
        } else {
          onSetCover("");
        }
      }

      return updated;
    });
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <FormItem>
        <FormLabel>Product Photos ({imageFiles.length})</FormLabel>
        <div
          onDragOver={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
          onDrop={(e) => {
            e.preventDefault();
            e.stopPropagation();
            if (e.dataTransfer.files) processFiles(e.dataTransfer.files);
          }}
          onClick={() => fileInputRef.current?.click()}
          className={`border-4 border-dashed rounded-2xl p-16 flex flex-col items-center justify-center gap-4 transition-all cursor-pointer ${
            isCompressing
              ? "bg-muted animate-pulse"
              : "hover:bg-primary/5 hover:border-primary/40 border-muted-foreground/20"
          }`}
        >
          <input
            type="file"
            multiple
            hidden
            ref={fileInputRef}
            accept={ACCEPTED_TYPES.join(",")}
            onChange={(e) => e.target.files && processFiles(e.target.files)}
          />
          {isCompressing ? (
            <Loader2 className="w-12 h-12 text-primary animate-spin" />
          ) : (
            <UploadCloud className="w-16 h-16 text-primary/60" />
          )}
          <div className="text-center">
            <p className="text-xl font-semibold">
              Drop images or click to browse
            </p>
            <p className="text-muted-foreground text-sm">
              Max 5MB per file. Supports JPG, PNG, WEBP.
            </p>
          </div>
        </div>
      </FormItem>
      {/* SHOW NEW IMAGES (Yeni Resimler) */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {imageFiles.map((img, index) => {
          // Yeni resimler için de 'coverImage' state'ine bakıyoruz
          // We're also checking 'cover image' state nine for new images.
          const isCover = coverImage === img.preview;

          return (
            <div
              key={`new-${index}`}
              className={`relative aspect-square rounded-xl overflow-hidden border-2 transition-all ${
                isCover ? "border-primary shadow-md" : "border-transparent"
              }`}
            >
              <img
                src={img.preview}
                alt="New"
                className="object-cover w-full h-full"
              />
              <div className="absolute inset-0 bg-black/50 opacity-0 hover:opacity-100 transition-opacity flex flex-col justify-between p-2">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeImage(index);
                  }}
                  className="self-end bg-destructive text-white p-1 rounded-full"
                >
                  <X size={14} />
                </button>
                <Button
                  type="button"
                  size="sm"
                  variant={isCover ? "default" : "secondary"}
                  className="w-full text-[10px] h-7 font-bold shadow-sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    onSetCover(img.preview); // Yeni resmin preview URL'ini kapak yap
                    // Use the preview URL of the new image as the cover image.
                  }}
                >
                  {isCover ? (
                    <span className="flex items-center gap-1">
                      <Star size={10} fill="currentColor" /> Main Photo
                    </span>
                  ) : (
                    "Set as Main"
                  )}
                </Button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
