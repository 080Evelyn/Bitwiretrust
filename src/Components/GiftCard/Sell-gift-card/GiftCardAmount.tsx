import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Gallery } from "@/assets";
import { Dialog, DialogContent } from "../../ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/Components/ui/form";
import { Input } from "@/Components/ui/input";
import { GiftCardAmountProps } from "@/types";
import { Camera, X } from "lucide-react";
import { Label } from "@/Components/ui/label";

const formSchema = z.object({
  numberOfCards: z
    .string()
    .min(1, "Number of cards is required")
    .refine((val) => !isNaN(Number(val)), {
      message: "Must be a number",
    }),
});

const GiftCardAmount = ({ selectedCard, amount }: GiftCardAmountProps) => {
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const totalAmount =
    amount && !isNaN(Number(amount))
      ? Number(amount) * selectedCard.rate
      : null;

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      numberOfCards: "",
    },
  });

  const onSubmit = ({ numberOfCards }: { numberOfCards: string }) => {
    form.clearErrors();
    const cardCount = Number(numberOfCards);

    if (!cardCount || isNaN(cardCount)) {
      form.setError("numberOfCards", {
        type: "manual",
        message: "Please enter a valid number of cards",
      });
      return;
    }

    if (!totalAmount || isNaN(totalAmount)) {
      form.setError("root", {
        type: "manual",
        message: "All fields are required",
      });
      return;
    }

    form.clearErrors("root");

    setDialogOpen(true);
  };

  useEffect(() => {
    if (totalAmount && totalAmount > 0) {
      form.clearErrors("root");
    }
  }, [totalAmount, form]);

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
      <div className="text-center font-medium hidden md:block card-container rounded-[4px] py-1.75">
        Enter Amount
      </div>

      <div className="flex flex-col gap-2 card-container rounded-md p-2 py-2">
        <div className="flex flex-col gap-1.5 relative">
          <span className="font-medium text-xs tracking-[-0.13px]">
            Enter E-code (Optional)
          </span>
          <Input type="tel" className="h-11 w-full !bg-[#FCF6FF]" />
        </div>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-1.5 relative"
          >
            <FormField
              control={form.control}
              name="numberOfCards"
              render={({ field }) => (
                <FormItem>
                  <Label className="font-medium text-xs tracking-[-0.13px]">
                    No. of cards
                  </Label>
                  <FormControl>
                    <Input
                      {...field}
                      type="tel"
                      placeholder="1"
                      className="h-11 w-full !bg-[#FCF6FF]"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex flex-col py-2.5 md:py-1 shadow-xs gap-[3px] bg-[#FCF6FF] items-center justify-center rounded-2xl font-medium text-sm md:text-[11px]">
              <span className="tracking-[-0.13px]"> You will receive</span>
              <h2 className="text-xl text-[#7910B1] font-semibold">
                ₦{totalAmount}
              </h2>
              <span className="tracking-[-0.13px]">
                rate = ₦{selectedCard?.rate}
              </span>
            </div>

            {form.formState.errors.root && (
              <p className="text-destructive text-xs font-medium text-center mt-1">
                {form.formState.errors.root.message}
              </p>
            )}

            <button
              type="submit"
              className="btn-primary w-full"
              disabled={form.formState.isSubmitting}
            >
              Upload Card
            </button>
          </form>
        </Form>
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="flex flex-col gap-6 p-6 w-[95dvw] md:w-100 max-h-[94%] overflow-y-auto">
          <h3 className="text-center font-semibold tracking-[-0.17px]">
            Upload Card
          </h3>

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

          <label
            htmlFor="upload-photo"
            className="flex flex-col items-center justify-center rounded-2xl px-4 py-8 cursor-pointer border-[1.5px] border-[#7910B1] hover:bg-[#f7f7f7]"
          >
            <img src={Gallery} alt="gallery icon" />
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
      </Dialog>
    </div>
  );
};

export default GiftCardAmount;
