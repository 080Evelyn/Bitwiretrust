import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/Components/ui/form";
import { Input } from "@/Components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/Components/ui/select";
import { ModalType } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useState } from "react";
import { GalleryAdd } from "@/assets";
import { ControllerRenderProps } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { kycSubmission } from "@/api/kyc";
import { KycSubmitProps } from "@/types";
import { getUserId } from "@/utils/AuthStorage";
import { toast } from "sonner";
import axios from "axios";
import ButtonLoading from "@/Components/common/ButtonLoading";

const formSchema = z.object({
  income: z.string().min(1, { message: "Income is required" }),
  identificationNumber: z
    .string()
    .min(1, { message: "Identification number is required" }),
  documentType: z.enum(["nin", "Drivers_license", "Passport"], {
    message: "Identification type is required",
  }),
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
      {
        message: "Only image files are allowed.",
      }
    ),
  // faceVerification: z
  //   .any()
  //   .refine((files) => files instanceof FileList && files.length === 1, {
  //     message: "You must upload exactly one file.",
  //   })
  //   .refine(
  //     (files) => {
  //       const file = files?.[0];
  //       return file && file.type.startsWith("image/");
  //     },
  //     {
  //       message: "Only image files are allowed.",
  //     }
  //   ),
});

const UserKyc = ({
  toggleModal,
}: {
  toggleModal: (modal: ModalType) => void;
}) => {
  const [IdPreview, setIdPreview] = useState<string | null>(null);
  // const [facePreview, setFacePreview] = useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      income: "",
      documentType: "nin",
      identificationNumber: "",
      utilityBill: undefined,
      // faceVerification: undefined,
    },
  });

  const handleIdUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: ControllerRenderProps<z.infer<typeof formSchema>, "utilityBill">
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      setIdPreview(URL.createObjectURL(file));
      field.onChange(e.target.files);
    }
  };

  const submitKycMutation = useMutation({
    mutationFn: (data: KycSubmitProps) => kycSubmission(data),
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const requestData = {
      userId: getUserId() || "0",
      idNumber: values.identificationNumber,
      sourceOfIncome: values.income,
      documentType: values.documentType,
      utilityBillImageUrl: values.utilityBill?.[0]?.name,
    };

    submitKycMutation.mutate(requestData, {
      onSuccess: (response) => {
        toast.success(response.data);
        form.reset();
      },

      onError: (error: unknown) => {
        if (axios.isAxiosError(error)) {
          const responseDesc =
            error.response?.data?.responseDesc || "Something went wrong";
          toast.error(responseDesc);
        } else {
          toast.error("Unexpected error occurred");
        }
      },
    });
  }

  const isSubmitLoading = submitKycMutation.isPending;

  return (
    <div className="modal terms-conditions-modal">
      <div className="modal-header">
        <button className="back-btn" onClick={() => toggleModal("profile")}>
          Back
        </button>
        <h3 className="text-center !text-base font-semibold">
          KYC Verification
        </h3>
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 p-2.5"
        >
          {/* Income */}
          <FormField
            control={form.control}
            name="income"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Source of Income</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Utility Bill Upload */}
          <FormField
            control={form.control}
            name="utilityBill"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Upload Utility Bill</FormLabel>
                <FormControl>
                  <>
                    {IdPreview && (
                      <div className="my-2">
                        <img
                          src={IdPreview}
                          alt="Preview"
                          className="max-h-30"
                        />
                      </div>
                    )}

                    <label
                      htmlFor="upload-id"
                      className="flex flex-col items-center gap-2 justify-center rounded-md py-8 cursor-pointer bg-[#F9EDFF] hover:bg-[#f5e8fc]"
                    >
                      <img
                        src={GalleryAdd}
                        className="size-12"
                        alt="Upload Icon"
                      />
                      <span className="!text-sm text-center w-full font-medium tracking-[-0.17px]">
                        Upload a picture of your Utility Bill
                      </span>
                      <input
                        id="upload-id"
                        className="hidden"
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleIdUpload(e, field)}
                      />
                    </label>
                  </>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* ID Type */}
          <FormField
            control={form.control}
            name="documentType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>ID Type</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger className="w-full bg-[#F9EDFF] rounded-[5px]">
                      <SelectValue placeholder="Select ID type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="z-1000">
                    <SelectItem value="nin">NIN </SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* ID number  */}
          <FormField
            control={form.control}
            name="identificationNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>ID Number</FormLabel>
                <FormControl>
                  <Input type="tel" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <button
            type="submit"
            disabled={isSubmitLoading}
            className="btn-primary mt-7 w-full"
          >
            {isSubmitLoading ? <ButtonLoading /> : "Submit"}
          </button>
        </form>
      </Form>
    </div>
  );
};

export default UserKyc;
