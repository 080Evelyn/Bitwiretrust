import { useState } from "react";
import { Gallery } from "@/assets";
import {
  Dialog,
  DialogContent,
  DialogOverlay,
  DialogTrigger,
} from "../ui/dialog";
import { GiftCardAmountProps } from "@/types";
import { Camera, X } from "lucide-react";

const GiftCardAmount = ({ selectedCard, amount }: GiftCardAmountProps) => {
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const totalAmount = amount !== null && amount * selectedCard.rate;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newImages = Array.from(files).map((file) =>
        URL.createObjectURL(file)
      );
      setUploadedImages((prev) => [...prev, ...newImages]);
    }
  };

  const handleTakePhoto = () => {
    document.getElementById("camera-input")?.click();
  };

  const handleCameraCapture = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newImages = Array.from(files).map((file) =>
        URL.createObjectURL(file)
      );
      setUploadedImages((prev) => [...prev, ...newImages]);
    }
  };

  const removeImage = (index: number) => {
    setUploadedImages((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="text-center font-medium hidden md:block desktop-card-container rounded-[4px] py-1.75">
        Enter Amount
      </div>
      <div className="flex flex-col gap-2 desktop-card-container rounded-md p-2 py-2">
        <div className="flex flex-col gap-1.5 relative">
          <span className="font-medium text-xs tracking-[-0.13px]">
            Enter E-code (Optional)
          </span>
          <div className="w-full">
            <input
              type="tel"
              className="h-11 w-full !bg-[#FCF6FF] !rounded-[4.91px] outline-none "
            />
          </div>
        </div>
        <div className="flex flex-col gap-1.5 relative">
          <span className="font-medium text-xs tracking-[-0.13px]">
            No. of cards
          </span>
          <div className="w-full">
            <input
              type="tel"
              placeholder="1"
              className="h-11 w-full !bg-[#FCF6FF] !rounded-[4.91px] outline-none "
            />
          </div>
        </div>
        <div className="flex flex-col py-1 gap-[3px] bg-[#FCF6FF] items-center justify-center rounded-md font-medium text-[11px]">
          <span className="tracking-[-0.13px]"> You will recieve</span>
          <h2 className="text-xl text-[#7910B1] font-semibold">
            ₦{totalAmount}
          </h2>
          <span className="tracking-[-0.13px]">
            rate = ₦{selectedCard?.rate}
          </span>
        </div>
        <Dialog>
          <DialogTrigger className="btn-primary w-full">
            Upload Card
          </DialogTrigger>
          <DialogOverlay>
            <DialogContent className="flex flex-col gap-6 p-6 w-[95dvw] md:w-100 md:max-h-[94%] overflow-y-auto">
              <h3 className="text-center font-semibold tracking-[-0.17px]">
                Upload Card
              </h3>

              {/* Take Photo */}
              <div
                onClick={handleTakePhoto}
                className="flex flex-col items-center justify-center rounded-2xl px-4 py-8 cursor-pointer bg-[#7910B1] hover:bg-[#7910B1]/90 text-white"
              >
                <Camera className="size-5 mb-2" />
                <span>Take a photo of your gift card</span>
                <input
                  type="file"
                  id="camera-input"
                  accept="image/*"
                  capture="environment"
                  onChange={handleCameraCapture}
                  className="hidden"
                />
              </div>

              {/* Upload Photo from Gallery */}
              <label
                htmlFor="upload-photo"
                className="flex flex-col items-center justify-center rounded-2xl px-4 py-8 cursor-pointer border-[1.5px] border-[#7910B1] hover:bg-[#f7f7f7]"
              >
                <img src={Gallery} alt="gallery img" />
                <span className=" !text-[#7910B1]">
                  Upload a photo of your card
                </span>
                <input
                  type="file"
                  id="upload-photo"
                  multiple
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </label>

              {/* Preview Uploaded Images */}
              {uploadedImages.length > 0 && (
                <div className="grid grid-cols-3 gap-3">
                  {uploadedImages.map((imgSrc, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={imgSrc}
                        alt={`uploaded-${index}`}
                        className="w-full h-24 object-cover rounded-lg"
                      />
                      <button
                        onClick={() => removeImage(index)}
                        className="absolute top-1 cursor-pointer right-1 bg-black/60 text-white rounded-full p-1 opacity-100 lg:opacity-0 group-hover:opacity-100 transition"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              <button className="btn-primary">Done</button>
            </DialogContent>
          </DialogOverlay>
        </Dialog>
      </div>
    </div>
  );
};

export default GiftCardAmount;
