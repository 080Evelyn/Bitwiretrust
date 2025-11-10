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
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { kycSubmission } from "@/api/kyc";
import { KycSubmitProps, ModalType } from "@/types";
import { getUserId } from "@/utils/AuthStorage";
import { toast } from "sonner";
import axios from "axios";
import ButtonLoading from "@/Components/common/ButtonLoading";

const stepOneSchema = z.object({
  income: z.string().min(1, { message: "Income is required" }),
  identificationNumber: z
    .string()
    .min(1, { message: "Identification number is required" }),
  documentType: z.enum(["nin", "Drivers_license", "Passport"], {
    message: "Identification type is required",
  }),
});

export type StepOneValues = z.infer<typeof stepOneSchema>;

const Step1Form = ({
  onNext,
  toggleModal,
}: {
  onNext: () => void;
  toggleModal: (modal: ModalType) => void;
}) => {
  const form = useForm<StepOneValues>({
    resolver: zodResolver(stepOneSchema),
    defaultValues: {
      income: "",
      documentType: "nin",
      identificationNumber: "",
    },
  });

  const submitKycMutation = useMutation({
    mutationFn: (data: KycSubmitProps) => kycSubmission(data),
  });

  function onSubmit(values: StepOneValues) {
    const requestData = {
      userId: getUserId() || "0",
      idNumber: values.identificationNumber,
      sourceOfIncome: values.income,
      documentType: values.documentType,
    };

    submitKycMutation.mutate(requestData, {
      onSuccess: (response) => {
        toast.success(response.data);
        form.reset();
        onNext(); // Move to Step 2
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
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 p-2.5">
        <div className="modal-header">
          <button className="back-btn" onClick={() => toggleModal("profile")}>
            Back
          </button>
          <h3 className="text-center !text-base font-semibold">
            KYC Verification - Step 1
          </h3>
        </div>

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
                  <SelectItem value="nin">NIN</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* ID number */}
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
          {isSubmitLoading ? <ButtonLoading /> : "Next Step"}
        </button>
      </form>
    </Form>
  );
};

export default Step1Form;
