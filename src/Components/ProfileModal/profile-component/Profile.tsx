import {
  // about_us,
  contact_us,
  edit_profile,
  // invite_friends,
  kyc,
  legal,
  settings,
} from "@/assets";
import { cn } from "@/lib/utils";
import { ModalType } from "@/types";
import { User } from "@/types/user";
import { IoIosArrowForward } from "react-icons/io";
import { useState, useCallback } from "react";
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
import { useMutation } from "@tanstack/react-query";

interface profileProps {
  toggleModal: (modal: ModalType) => void;
  fullName: string;
  profileImage: string;
  user: User | undefined;
  handleClose: () => void;
}

const Profile = ({
  toggleModal,
  fullName,
  profileImage,
  user,
  handleClose,
}: profileProps) => {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<{
    width: number;
    height: number;
    x: number;
    y: number;
  } | null>(null);
  const [isCropModalOpen, setIsCropModalOpen] = useState(false);

  const uploadMutation = useMutation({
    mutationFn: uploadProfileImage,
    onSuccess: () => {
      toast.success("Profile image uploaded successfully!");
      setIsCropModalOpen(false);
      setImageSrc(null);
      // TODO: Refresh profile image from parent component
    },
    onError: (error) => {
      console.error("Upload error:", error);
      toast.error("Failed to upload profile image. Please try again.");
    },
  });

  const handleImageSelect = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (file && file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onload = () => {
          setImageSrc(reader.result as string);
          setIsCropModalOpen(true);
        };
        reader.readAsDataURL(file);
      }
    },
    [],
  );

  const onCropComplete = useCallback(
    (croppedAreaPixels: {
      width: number;
      height: number;
      x: number;
      y: number;
    }) => {
      setCroppedAreaPixels(croppedAreaPixels);
    },
    [],
  );

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
    <div className="modal profile-modal">
      <div className="profile-header">
        {/* start profile image section   */}
        <div className="size-25 bg-[#E9A9FF80] relative rounded-full cursor-pointer p-1.25">
          <img
            src={profileImage}
            className="size-full rounded-full object-cover"
            alt="profile"
          />
          <label className="edit-icon bottom-1! right-1! cursor-pointer">
            <img src={edit_profile} alt="" className="edit-profile" />
            <input
              type="file"
              accept="image/*"
              onChange={handleImageSelect}
              className="hidden"
            />
          </label>
        </div>

        {/* end profile image section  */}
        <h3>{fullName}</h3>
        <p>{user?.email}</p>
        <span
          className={cn(
            "text-sm capitalize",
            user?.userKycVerificationStatus === "VERIFIED"
              ? "text-green-600"
              : user?.userKycVerificationStatus === "PENDING"
                ? "text-yellow-500"
                : "text-red-500",
          )}
        >
          {user?.userKycVerificationStatus}
        </span>
      </div>

      <div className="profile-options">
        {/* <div className="option" onClick={() => toggleModal("invite")}>
          <div className="option-left">
            <img
              src={invite_friends}
              alt=""
              className="option-icon invite-icon"
            />
            <span>Invite Friends</span>
          </div>
          <IoIosArrowForward />
        </div> */}

        {/* <div className="option">
          <div className="option-left">
            <img
              src={dark_mode}
              alt=""
              className="option-icon dark-mode-icon"
            />
            <span>Dark Mode</span>
          </div>
          <label className="toggle-switch">
            <input
              type="checkbox"
              checked={darkMode}
              onChange={toggleDarkMode}
            />
            <span className="slider round"></span>
          </label>
        </div> */}

        <div className="option" onClick={() => toggleModal("contact")}>
          <div className="option-left">
            <img
              src={contact_us}
              alt="contact-us"
              className="option-icon contact-icon"
            />
            <span>Contact Us</span>
          </div>
          <IoIosArrowForward />
        </div>

        <div className="option" onClick={() => toggleModal("settings")}>
          <div className="option-left">
            <img
              src={settings}
              alt="settings"
              className="option-icon settings-icon"
            />
            <span>Settings</span>
          </div>
          <IoIosArrowForward />
        </div>

        <div className="option" onClick={() => toggleModal("legal")}>
          <div className="option-left">
            <img src={legal} alt="legal" className="option-icon legal-icon" />
            <span>Legal</span>
          </div>
          <IoIosArrowForward />
        </div>

        <div className="option" onClick={() => toggleModal("kyc")}>
          <div className="option-left">
            <img src={kyc} alt="kyc" className="option-icon account-icon" />
            <span>Account Limitations (KYC)</span>
          </div>
          <IoIosArrowForward />
        </div>

        {/* <div className="option">
          <div className="option-left">
            <img
              src={about_us}
              alt="about-us"
              className="option-icon about-icon"
            />
            <span>About Us</span>
          </div>
          <IoIosArrowForward />
        </div> */}
      </div>

      <button className="close-modal-btn" onClick={handleClose}>
        Close
      </button>

      {/* Image Crop Modal */}
      <Dialog open={isCropModalOpen} onOpenChange={setIsCropModalOpen}>
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
                onCropChange={setCrop}
                onZoomChange={setZoom}
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
                onChange={(e) => setZoom(Number(e.target.value))}
                className="flex-1"
              />
            </div>

            <div className="flex gap-2 justify-end">
              <Button
                variant="outline"
                onClick={() => {
                  setIsCropModalOpen(false);
                  setImageSrc(null);
                }}
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
    </div>
  );
};

export default Profile;
