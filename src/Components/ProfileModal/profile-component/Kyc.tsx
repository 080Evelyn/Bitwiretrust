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

const formSchema = z.object({
  fullName: z.string().min(1, { message: "Full Name is required." }),
  dob: z.string().min(1, { message: "Date of Birth is required" }),
  gender: z.enum(["male", "female", "other"], {
    message: "Gender is required",
  }),
  email: z.string().email("Invalid email address"),
  phone_number: z.string().min(1, { message: "Phone number is required" }),
  address: z.string().min(1, { message: "Address is required" }),
  income: z.string().min(1, { message: "Income is required" }),
  identificationNumber: z
    .string()
    .min(1, { message: "Identification number is required" }),
  identificationType: z.enum(["nin_card", "license", "passport", "nin_slip"], {
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
      fullName: "",
      dob: "",
      gender: "male",
      email: "",
      phone_number: "",
      address: "",
      income: "",
      identificationType: "nin_slip",
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
  // const handleFaceUpload = (
  //   e: React.ChangeEvent<HTMLInputElement>,
  //   field: ControllerRenderProps<z.infer<typeof formSchema>, "faceVerification">
  // ) => {
  //   const file = e.target.files?.[0];
  //   if (file) {
  //     setFacePreview(URL.createObjectURL(file));
  //     field.onChange(e.target.files);
  //   }
  // };

  function onSubmit(values: z.infer<typeof formSchema>) {
    const file = values.utilityBill?.[0];
    console.log({
      ...values,
      utilityBill: file?.name,
    });
  }

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
          {/* Full Name */}
          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Date of Birth */}
          <FormField
            control={form.control}
            name="dob"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Date of Birth</FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Gender */}
          <FormField
            control={form.control}
            name="gender"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Gender</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger className="w-full bg-[#F9EDFF] rounded-[5px]">
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="z-1000">
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Email */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email Address</FormLabel>
                <FormControl>
                  <Input type="email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Phone Number */}
          <FormField
            control={form.control}
            name="phone_number"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone Number</FormLabel>
                <FormControl>
                  <Input type="tel" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Address */}
          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Residential Address</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

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

          {/* ID Upload */}
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
            name="identificationType"
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
                    <SelectItem value="nin_slip">NIN Slip</SelectItem>
                    <SelectItem value="nin_card">NIN Card</SelectItem>
                    <SelectItem value="passport">
                      International Passport
                    </SelectItem>
                    <SelectItem value="license">Drivers License</SelectItem>
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

          {/* Face Upload */}
          {/* <FormField
            control={form.control}
            name="faceVerification"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Faciel Verification</FormLabel>
                <FormControl>
                  <>
                    {facePreview && (
                      <div className="my-2">
                        <img
                          src={facePreview}
                          alt="Preview"
                          className="max-h-30"
                        />
                      </div>
                    )}

                    <label
                      htmlFor="upload-face"
                      className="flex flex-col items-center gap-2 justify-center rounded-md py-8 cursor-pointer bg-[#F9EDFF] hover:bg-[#f5e8fc]"
                    >
                      <img
                        src={GalleryAdd}
                        className="size-12"
                        alt="Upload Icon"
                      />
                      <span className="!text-sm text-center w-full lg:px-1.5 font-medium tracking-[-0.17px]">
                        Upload a photo of yourself clearly showing your face
                      </span>
                      <input
                        id="upload-face"
                        className="hidden"
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleFaceUpload(e, field)}
                      />
                    </label>
                  </>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          /> */}

          <button type="submit" className="btn-primary mt-7 w-full">
            Submit
          </button>
        </form>
      </Form>
    </div>
  );
};

export default UserKyc;
