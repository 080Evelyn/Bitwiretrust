import { useCallback } from "react";
import Cropper from "react-easy-crop";
import { Button } from "@/Components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogOverlay,
  DialogTitle,
} from "@/Components/ui/dialog";
import { uploadProfileImage } from "@/api/user";
import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getUserId } from "@/utils/AuthStorage";

interface ImageCropModalProps {
  imageSrc: string | null;
  crop: { x: number; y: number };
  zoom: number;
  croppedAreaPixels: {
    width: number;
    height: number;
    x: number;
    y: number;
  } | null;
  isCropModalOpen: boolean;
  onCropChange: (crop: { x: number; y: number }) => void;
  onZoomChange: (zoom: number) => void;
  onCropComplete: (
    croppedArea: { width: number; height: number; x: number; y: number },
    croppedAreaPixels: {
      width: number;
      height: number;
      x: number;
      y: number;
    },
  ) => void;
  onModalClose: () => void;
}

const ImageCropModal = ({
  imageSrc,
  crop,
  zoom,
  croppedAreaPixels,
  isCropModalOpen,
  onCropChange,
  onZoomChange,
  onCropComplete,
  onModalClose,
}: ImageCropModalProps) => {
  const queryClient = useQueryClient();
  const userId = getUserId();

  const uploadMutation = useMutation({
    mutationFn: uploadProfileImage,
    onSuccess: () => {
      toast.success("Profile image uploaded successfully!");
      queryClient.invalidateQueries({ queryKey: ["user", userId] });
      onModalClose();
    },
    onError: (error) => {
      console.error("Upload error:", error);
      toast.error("Failed to upload profile image. Please try again.");
    },
  });

  const handleSaveCrop = useCallback(async () => {
    if (imageSrc && croppedAreaPixels) {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      const image = new Image();

      image.onload = () => {
        canvas.width = croppedAreaPixels.width;
        canvas.height = croppedAreaPixels.height;

        ctx?.drawImage(
          image,
          croppedAreaPixels.x,
          croppedAreaPixels.y,
          croppedAreaPixels.width,
          croppedAreaPixels.height,
          0,
          0,
          croppedAreaPixels.width,
          croppedAreaPixels.height,
        );

        canvas.toBlob(
          (blob) => {
            if (blob) {
              const formData = new FormData();
              formData.append("file", blob, "profile-image.jpg");
              uploadMutation.mutate(formData);
            }
          },
          "image/jpeg",
          0.95,
        );
      };

      image.src = imageSrc;
    }
  }, [imageSrc, croppedAreaPixels, uploadMutation]);

  return (
    <Dialog open={isCropModalOpen} onOpenChange={onModalClose}>
      <DialogOverlay className="z-1000" />
      <DialogContent className="max-w-md z-1000">
        <DialogHeader>
          <DialogTitle>Crop Your Profile Picture</DialogTitle>
        </DialogHeader>

        <div className="relative h-64 w-full">
          {imageSrc && (
            <Cropper
              image={imageSrc}
              crop={crop}
              zoom={zoom}
              aspect={1}
              onCropChange={onCropChange}
              onZoomChange={onZoomChange}
              onCropComplete={onCropComplete}
            />
          )}
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <label className="text-sm font-medium">Zoom:</label>
            <input
              type="range"
              min={1}
              max={3}
              step={0.1}
              value={zoom}
              onChange={(e) => onZoomChange(Number(e.target.value))}
              className="flex-1"
            />
          </div>

          <div className="flex gap-2 justify-end">
            <Button
              variant="outline"
              onClick={onModalClose}
              disabled={uploadMutation.isPending}
            >
              Cancel
            </Button>
            <Button
              onClick={handleSaveCrop}
              disabled={uploadMutation.isPending}
            >
              {uploadMutation.isPending ? "Uploading..." : "Save"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ImageCropModal;
