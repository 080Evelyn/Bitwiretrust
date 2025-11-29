import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from "@/Components/ui/form";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/Components/ui/command";
import { BankList, BankListInfo } from "@/types/dashboard";
import { cn } from "@/lib/utils";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  addBankAccount,
  bankList,
  verifyBankAccount,
} from "@/api/wallet-service";
import { Link, useNavigate } from "react-router-dom";
import { full_logo } from "@/assets";
import { ChevronsUpDown, Loader, Loader2 } from "lucide-react";
import { Button } from "../ui/button";
import { AddBankProps } from "@/types";
import { toast } from "sonner";
import axios from "axios";

const step1Schema = z.object({
  account: z.string().min(10, "Account number must be at least 10 digits"),
});

interface AddBankAccountProps {
  getLeftSideClass: () => string;
  getStepBackground: () => string;
}

const AddBankAccount = ({
  getLeftSideClass,
  getStepBackground,
}: AddBankAccountProps) => {
  const [selectedBank, setSelectedBank] = useState<BankList | null>(null);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const form = useForm<{ account: string }>({
    resolver: zodResolver(step1Schema),
    defaultValues: { account: "" },
    mode: "onSubmit",
  });

  const watchedAccountNumber = form.watch("account");

  const { data: apiResponse, isPending: bankListIsPending } =
    useQuery<BankListInfo>({
      queryKey: ["bankList"],
      queryFn: bankList,
      staleTime: Infinity,
      gcTime: Infinity,
    });

  const {
    data: bankUserDetails,
    isLoading: isVerifying,
    isError: verificationError,
  } = useQuery({
    queryKey: ["bankUserDetails", watchedAccountNumber, selectedBank?.code],
    queryFn: () =>
      verifyBankAccount({
        accountNumber: watchedAccountNumber,
        bankCode: selectedBank!.code,
      }),
    enabled: !!selectedBank?.code && watchedAccountNumber.length === 10,
    staleTime: 30 * 60 * 1000,
  });

  const bankListData = useMemo(() => apiResponse?.data, [apiResponse]);

  const addBankAccountMutation = useMutation({
    mutationFn: (data: AddBankProps) => addBankAccount(data),
    onSuccess: () => {
      toast.success("Bank account added successfully!");
      form.reset();
      navigate("/dashboard");
    },
    onError: (error: unknown) => {
      if (axios.isAxiosError(error)) {
        const responseDesc =
          error.response?.data?.responseDesc ||
          "Unexpected error occurred! Please try again.";
        toast.error(responseDesc);
      } else {
        toast.error("Unexpected error occurred");
      }
    },
  });

  const accountName = bankUserDetails?.data?.account_name;

  const addBankSubmission = () => {
    if (!accountName || !selectedBank) return;
    addBankAccountMutation.mutate({
      accountNumber: watchedAccountNumber,
      bankCode: selectedBank.code,
      accountName,
    });
  };

  const isSubmitting = addBankAccountMutation.isPending;

  return (
    <div className="flex w-full min-h-dvh">
      <div
        className={cn(
          "items-center justify-center hidden flex-1 sm:flex w-[55%]",
          getLeftSideClass()
        )}
        style={{ backgroundImage: `url(${getStepBackground()})` }}
      >
        <h2>
          Best Rates
          <br />
          Secure Payment
        </h2>
        <div className="progress-indicator">
          <div className="progress-dot active"></div>
          <div className="progress-dot active"></div>
          <div className="progress-dot active"></div>
        </div>
      </div>

      <div className="flex flex-1 mt-20 flex-col gap-2 w-full">
        <div className="app-logo">
          <Link to="/">
            <img src={full_logo} alt="Bitwire" />
          </Link>
        </div>
        <h2 className="text-lg font-medium text-center">Final Step!</h2>
        <p className="text-sm text-gray-500 px-4 text-center">
          Please add your bank account to continue
        </p>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(addBankSubmission)}
            className="pt-10 sm:pt-10"
          >
            <div className="flex md:max-w-md mx-auto flex-col gap-3 px-5">
              <div className="relative w-full">
                <Button
                  variant="outline"
                  role="combobox"
                  onClick={() => setOpen(true)}
                  className="w-full justify-between h-9"
                >
                  {selectedBank?.name || "Select Bank"}
                  <ChevronsUpDown className="opacity-50" />
                </Button>

                <CommandDialog
                  open={open}
                  onOpenChange={setOpen}
                  title="Select Bank"
                  description=""
                  className="pt-2.5 max-h-[350px] max-w-[80%] sm:max-w-[38%]"
                >
                  <CommandInput
                    placeholder="Search bank..."
                    className="!h-6 sm:!h-7.5 w-[80%]"
                  />
                  <CommandEmpty>
                    {bankListIsPending ? (
                      <div className="flex justify-center items-center p-4">
                        <Loader className="animate-spin size-5 text-primary mr-2" />
                        Loading Bank List...
                      </div>
                    ) : (
                      "No bank found."
                    )}
                  </CommandEmpty>
                  <CommandList>
                    <CommandGroup>
                      {bankListData?.map((bank) => (
                        <CommandItem
                          key={bank.code}
                          value={bank.name}
                          onSelect={() => {
                            setSelectedBank(bank);
                            setOpen(false);
                          }}
                        >
                          {bank.name}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </CommandDialog>
              </div>

              {/* Account input */}
              <FormField
                control={form.control}
                name="account"
                render={({ field }) => (
                  <FormItem className="relative w-full">
                    <FormControl>
                      <input
                        type="tel"
                        inputMode="numeric"
                        pattern="[0-9]*"
                        maxLength={10}
                        onInput={(e) => {
                          e.currentTarget.value = e.currentTarget.value.replace(
                            /\D/g,
                            ""
                          );
                        }}
                        className="w-full h-9 !rounded-sm border px-3"
                        {...field}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Verification status */}
              <div className="min-h-8 mt-2">
                {isVerifying && (
                  <div className="flex justify-center items-center">
                    <span className="mr-2 text-sm">Verifying account...</span>
                    <Loader2 className="animate-spin size-5 text-primary" />
                  </div>
                )}

                {verificationError && (
                  <div className="text-sm text-red-600 text-center">
                    Error verifying account. Please check details and try again.
                  </div>
                )}

                {accountName && (
                  <div className=" text-primary font-semibold text-center">
                    {accountName}
                  </div>
                )}
              </div>

              <Button
                type="submit"
                className="btn-primary w-1/2 mx-auto mt-5 md:mt-0"
                disabled={isVerifying || isSubmitting}
              >
                {isVerifying
                  ? "Verifying..."
                  : isSubmitting
                  ? "Adding..."
                  : "Add Account"}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default AddBankAccount;
