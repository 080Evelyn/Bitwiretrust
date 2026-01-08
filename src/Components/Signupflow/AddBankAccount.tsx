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
  Command,
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
import { Check, ChevronsUpDown, Loader, Loader2 } from "lucide-react";
import { Button } from "../ui/button";
import { AddBankProps } from "@/types";
import { toast } from "sonner";
import axios from "axios";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/Components/ui/popover";
import { Input } from "../ui/input";

const step1Schema = z.object({
  account: z.string().min(10, "Account number must be at least 10 digits"),
});

const AddBankAccount = () => {
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
    <div className="flex flex-col gap-2 w-full min-h-dvh">
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
              <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-full max-w-sm justify-between h-9"
                  >
                    {selectedBank ? selectedBank.name : "Select Bank"}
                    <ChevronsUpDown className="opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-full max-w-xs lg:max-w-sm p-0">
                  <Command>
                    <CommandInput
                      placeholder="Search bank..."
                      className="!h-9"
                    />
                    <CommandList>
                      <CommandEmpty>
                        {bankListIsPending ? (
                          <div className="flex justify-center items-center p-4">
                            <Loader className="animate-spin size-5 text-primary mr-2" />
                            Loading...
                          </div>
                        ) : (
                          "No bank found."
                        )}
                      </CommandEmpty>
                      <CommandGroup>
                        {bankListData?.map((bank) => (
                          <CommandItem
                            key={bank.name}
                            value={bank.name}
                            onSelect={() => {
                              setSelectedBank(bank);
                              setOpen(false);
                            }}
                          >
                            {bank.name}
                            <Check
                              className={cn(
                                "ml-auto",
                                selectedBank?.code === bank.code
                                  ? "opacity-100"
                                  : "opacity-0"
                              )}
                            />
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
            </div>

            {/* Account input */}
            <FormField
              control={form.control}
              name="account"
              render={({ field }) => (
                <FormItem className="relative w-full">
                  <FormControl>
                    <Input
                      type="tel"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      maxLength={10}
                      placeholder="Account Number"
                      onInput={(e) => {
                        e.currentTarget.value = e.currentTarget.value.replace(
                          /\D/g,
                          ""
                        );
                      }}
                      className="!max-w-sm h-9 !bg-accent !rounded-sm px-3"
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
  );
};

export default AddBankAccount;
