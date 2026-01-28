import { ModalType } from "@/types";
import { useState, useCallback } from "react";
import ProfileHeader from "./ProfileHeader";
import ProfileOptions from "./ProfileOptions";
import ImageCropModal from "./ImageCropModal";

interface profileProps {
  toggleModal: (modal: ModalType) => void;
  fullName: string;
  handleClose: () => void;
}

const Profile = ({ toggleModal, fullName, handleClose }: profileProps) => {
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
    (
      _croppedArea: {
        width: number;
        height: number;
        x: number;
        y: number;
      },
      croppedAreaPixels: {
        width: number;
        height: number;
        x: number;
        y: number;
      },
    ) => {
      setCroppedAreaPixels(croppedAreaPixels);
    },
    [],
  );

  return (
    <div className="modal profile-modal">
      <ProfileHeader fullName={fullName} onImageSelect={handleImageSelect} />

      <ProfileOptions toggleModal={toggleModal} />

      <button className="close-modal-btn" onClick={handleClose}>
        Close
      </button>

      <ImageCropModal
        imageSrc={imageSrc}
        crop={crop}
        zoom={zoom}
        croppedAreaPixels={croppedAreaPixels}
        isCropModalOpen={isCropModalOpen}
        onCropChange={setCrop}
        onZoomChange={setZoom}
        onCropComplete={onCropComplete}
        onModalClose={() => {
          setIsCropModalOpen(false);
          setImageSrc(null);
        }}
      />
    </div>
  );
};

export default Profile;
