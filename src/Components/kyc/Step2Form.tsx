import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/Components/ui/form";
import { z } from "zod";
import { useForm, ControllerRenderProps } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { GalleryAdd } from "@/assets";
import { useMutation } from "@tanstack/react-query";
import { utilityUpload } from "@/api/kyc";
import { ModalType } from "@/types";
import { getUserId } from "@/utils/AuthStorage";
import { toast } from "sonner";
import axios from "axios";
import ButtonLoading from "@/Components/common/ButtonLoading";

const stepTwoSchema = z.object({
  utilityBill: z
    .any()
    .refine((files) => files instanceof FileList && files.length === 1, {
      message: "You must upload exactly one file.",
    })
    .refine(
      (files) => {
        const file = files?.[0];
        return file && file.type.startsWith("image/");
      },
      { message: "Only image files are allowed." }
    ),
});

export type StepTwoValues = z.infer<typeof stepTwoSchema>;

const Step2Form = ({
  onBack,
}: {
  toggleModal: (modal: ModalType) => void;
  onBack: () => void;
}) => {
  const [preview, setPreview] = useState<string | null>(null);

  const form = useForm<StepTwoValues>({
    resolver: zodResolver(stepTwoSchema),
  });

  const handleUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: ControllerRenderProps<StepTwoValues, "utilityBill">
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
      field.onChange(e.target.files);
    }
  };

  const submitMutation = useMutation({
    mutationFn: (formData: FormData) => utilityUpload(formData),
  });

  async function onSubmit(values: StepTwoValues) {
    try {
      const userId = getUserId() || "0";
      const file = values.utilityBill?.[0];

      const formData = new FormData();
      formData.append("userId", userId);
      formData.append("file", file);

      await submitMutation.mutateAsync(formData);
      toast.success("Utility bill uploaded successfully");
      form.reset();
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        const msg =
          error.response?.data?.responseDesc || "Something went wrong";
        toast.error(msg);
      } else {
        toast.error("Unexpected error occurred");
      }
    }
  }

  const isLoading = submitMutation.isPending;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 p-2.5">
        <div className="modal-header">
          <button onClick={onBack} className="back-btn">
            Back
          </button>
          <h3 className="text-center !text-base font-semibold">
            KYC Verification - Step 2
          </h3>
        </div>

        <FormField
          control={form.control}
          name="utilityBill"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Upload Utility Bill</FormLabel>
              <FormControl>
                <>
                  {preview && (
                    <div className="my-2">
                      <img src={preview} alt="Preview" className="max-h-30" />
                    </div>
                  )}
                  <label
                    htmlFor="upload-id"
                    className="flex flex-col items-center gap-2 justify-center rounded-md py-8 cursor-pointer bg-[#F9EDFF] hover:bg-[#f5e8fc]"
                  >
                    <img src={GalleryAdd} className="size-12" alt="Upload" />
                    <span className="!text-sm text-center w-full font-medium tracking-[-0.17px]">
                      Upload a picture of your Utility Bill
                    </span>
                    <input
                      id="upload-id"
                      className="hidden"
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleUpload(e, field)}
                    />
                  </label>
                </>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <button
          type="submit"
          disabled={isLoading}
          className="btn-primary mt-7 w-full"
        >
          {isLoading ? <ButtonLoading /> : "Submit"}
        </button>
      </form>
    </Form>
  );
};

export default Step2Form;
