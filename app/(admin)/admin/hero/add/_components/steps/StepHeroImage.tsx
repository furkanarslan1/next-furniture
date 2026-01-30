import { Button } from "@/components/ui/button";
import { HeroImage } from "@/types/HeroFileType";
import { StepHeroProps } from "@/types/StepPropsType";
import { Loader2, UploadCloud, X } from "lucide-react";
import React, { useRef, useState } from "react";
import { toast } from "sonner";
import imageCompression from "browser-image-compression";
import { UseFormReturn } from "react-hook-form";
import { HeroSlideFormInput } from "@/schemas/heroSlideSchema";

interface StepHeroImageProps {
  form: UseFormReturn<HeroSlideFormInput>;
  value: HeroImage | null;
  onChange: (image: HeroImage | null) => void;
}

export default function StepHeroImage({
  form,
  value,
  onChange,
}: StepHeroImageProps) {
  const [isCompressing, setIsCompressing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const MAX_FILE_SIZE = 5 * 1024 * 1024;
  const ACCEPTED_TYPES = ["image/jpeg", "image/png", "image/webp"];

  const validateFile = (file: File): boolean => {
    if (!ACCEPTED_TYPES.includes(file.type)) {
      toast.error("Only JPG, PNG and WEBP are allowed.");
      return false;
    }
    if (file.size > MAX_FILE_SIZE) {
      toast.error("Maximum file size is 5MB.");
      return false;
    }
    return true;
  };

  const processFile = async (file: File) => {
    if (!validateFile(file)) return;
    setIsCompressing(true);

    try {
      const compressed = await imageCompression(file, {
        maxSizeMB: 1,
        maxWidthOrHeight: 1920,
        useWebWorker: true,
      });

      const heroImage: HeroImage = {
        file: compressed,
        preview: URL.createObjectURL(compressed),
      };

      onChange(heroImage);
    } catch (error) {
      toast.error("Image processing failed.");
    } finally {
      setIsCompressing(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const removeImage = () => {
    onChange(null);
    form.setValue("image", null, { shouldValidate: true });
  };

  return (
    <div className="space-y-4">
      {!value ? (
        <div
          onClick={() => fileInputRef.current?.click()}
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            e.preventDefault();
            if (e.dataTransfer.files?.[0]) {
              processFile(e.dataTransfer.files[0]);
            }
          }}
          className="border-4 border-dashed rounded-2xl p-16 flex flex-col items-center justify-center gap-4 cursor-pointer hover:bg-primary/5"
        >
          <input
            type="file"
            hidden
            ref={fileInputRef}
            accept={ACCEPTED_TYPES.join(",")}
            onChange={(e) => e.target.files && processFile(e.target.files[0])}
          />

          {isCompressing ? (
            <Loader2 className="w-10 h-10 animate-spin" />
          ) : (
            <UploadCloud className="w-14 h-14 text-muted-foreground" />
          )}

          <p className="text-sm text-muted-foreground">
            Upload hero image (JPG, PNG, WEBP)
          </p>
        </div>
      ) : (
        <div className="relative aspect-video rounded-xl overflow-hidden border">
          <img
            src={value.preview}
            alt="Hero preview"
            className="w-full h-full object-cover"
          />

          <Button
            type="button"
            size="sm"
            variant="destructive"
            className="absolute top-2 right-2"
            onClick={removeImage}
          >
            <X size={14} />
          </Button>
        </div>
      )}
    </div>
  );
}
