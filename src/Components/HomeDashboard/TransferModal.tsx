import { WithrawalImage } from "@/assets";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogOverlay,
} from "../ui/dialog";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import TransferConfirmation from "./TransferConfirmation";
import { useEffect, useState } from "react";
import { ArrowLeft } from "lucide-react";

interface TransferModalProps {
  isWithdrawalOpen: boolean;
  setIsWithdrawalOpen: () => void;
}

const transferSchema = z.object({
  account: z
    .string()
    .min(1, "Account number is required")
    .regex(/^\d+$/, "Account number must contain only digits")
    .min(10, "Account number is too short"),

  amount: z
    .string()
    .min(1, "Amount is required")
    .regex(/^\d+$/, "Amount must contain only digits"),

  remark: z.string().optional(),
});

type TransferFormValues = z.infer<typeof transferSchema>;

const TransferModal = ({
  isWithdrawalOpen,
  setIsWithdrawalOpen,
}: TransferModalProps) => {
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [submittedData, setSubmittedData] = useState<TransferFormValues | null>(
    null
  );

  const form = useForm<TransferFormValues>({
    resolver: zodResolver(transferSchema),
    defaultValues: {
      account: "",
      amount: "",
      remark: "",
    },
  });

  useEffect(() => {
    if (!isWithdrawalOpen) {
      form.reset();
    }
  }, [isWithdrawalOpen, form]);

  const onSubmit = (data: TransferFormValues) => {
    setSubmittedData(data);
    setIsWithdrawalOpen();
    setIsConfirmationOpen(true);
    form.reset();
  };

  return (
    <>
      <Dialog open={isWithdrawalOpen} onOpenChange={setIsWithdrawalOpen}>
        <DialogOverlay>
          <DialogContent className="m-0 p-0 max-md:top-0 transform max-md:translate-y-0 md:px-0 md:pb-[5px] md:pt-2 max-md:rounded-none max-md:h-screen max-md:max-w-screen z-50 [&>button.absolute]:hidden">
            <div
              className="relative bg-[#F9F9F9] pb-8"
              style={{ fontFamily: "Poppins, sans-serif" }}
            >
              <div className="hidden md:flex pl-35 py-3 justify-around items-center bg-white w-full px-3">
                <img
                  src={WithrawalImage}
                  className="size-[85px] rounded-full absolute top-12 left-20 transform -translate-x-1/2 -translate-y-1/2"
                  alt="withdrawal icon"
                />
                <h4 className="font-medium text-[#221D7A]">Transfer Page</h4>
                <span className="size-[17px] bg-[#221d7a] rounded-full text-end" />
              </div>
              <div className="relative md:hidden flex items-center justify-center pt-8 pb-4">
                <DialogClose className="absolute left-4 cursor-pointer">
                  <ArrowLeft />
                </DialogClose>
                <div className="font-medium text-xl">Withdrawal</div>
              </div>

              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="pt-5 md:pt-20"
                >
                  <div className="flex flex-col gap-3 px-5">
                    <div className="relative w-full">
                      <span className="absolute left-4 text-xs top-1/2 transform -translate-y-1/2">
                        Recipient Bank:
                      </span>
                      <input
                        type="text"
                        placeholder="Access Bank"
                        className="w-full h-10 !bg-white !rounded-sm placeholder:text-right placeholder:text-xs placeholder:text-black !border-0"
                        readOnly
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="account"
                      render={({ field }) => (
                        <FormItem className="relative w-full">
                          <span className="absolute left-4 text-xs top-3 transform">
                            Recipient Account:
                          </span>
                          <FormControl>
                            <input
                              type="tel"
                              className="w-full h-10 !bg-white !rounded-sm !border-0 text-right"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage className="text-red-500 text-xs mt-1" />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="amount"
                      render={({ field }) => (
                        <FormItem className="relative w-full">
                          <span className="left-4 text-xs top-1/2 transform -translate-y-1/2">
                            Amount
                          </span>
                          <FormControl>
                            <input
                              type="tel"
                              placeholder="1,000,000"
                              className="w-full h-10 !bg-white !rounded-sm !border-0"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage className="text-red-500 text-xs mt-1" />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="remark"
                      render={({ field }) => (
                        <FormItem className="relative w-full">
                          <span className="left-4 text-xs top-1/2 transform -translate-y-1/2">
                            Remark
                          </span>
                          <FormControl>
                            <input
                              type="text"
                              placeholder="Add a remark"
                              className="w-full h-10 !bg-white !rounded-sm !border-0"
                              {...field}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    <button
                      type="submit"
                      className="btn-primary w-1/2 mx-auto mt-10"
                    >
                      Pay
                    </button>
                  </div>
                </form>
              </Form>
            </div>
          </DialogContent>
        </DialogOverlay>
      </Dialog>

      {submittedData && (
        <TransferConfirmation
          isConfirmationOpen={isConfirmationOpen}
          setIsConfirmationOpen={setIsConfirmationOpen}
          data={submittedData}
        />
      )}
    </>
  );
};

export default TransferModal;
