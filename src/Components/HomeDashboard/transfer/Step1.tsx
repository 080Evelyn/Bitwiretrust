import { FC } from "react";
import { UseFormReturn } from "react-hook-form";
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
} from "../../ui/command";
import { BankList } from "@/types/dashboard";
import { cn } from "@/lib/utils";

interface Step1FormProps {
  form: UseFormReturn<Step1Values>;
  selectedBank: BankList | null;
  setSelectedBank: (bank: BankList | null) => void;
  bankListData?: BankList[];
  open: boolean;
  setOpen: (open: boolean) => void;
  isVerifying: boolean;
  accountName: string | null;
  verifyBankAccountMutationPending: boolean;
  createRecipientMutationPending: boolean;
  onSubmit: (values: Step1Values) => void;
  watchedAccountNumber: string;
  selectedBankCode?: string;
}

export type Step1Values = {
  account: string;
};

export const Step1Form: FC<Step1FormProps> = ({
  form,
  selectedBank,
  setSelectedBank,
  bankListData,
  open,
  setOpen,
  isVerifying,
  accountName,
  verifyBankAccountMutationPending,
  createRecipientMutationPending,
  onSubmit,
  watchedAccountNumber,
  selectedBankCode,
}) => {
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="pt-10 sm:pt-20">
        <div className="flex flex-col gap-3 px-5">
          <div className="relative w-full">
            <span className="absolute left-4 text-xs top-1/2 transform -translate-y-1/2 z-10">
              Recipient Bank:
            </span>

            <button
              type="button"
              onClick={() => setOpen(true)}
              role="combobox"
              aria-expanded={open}
              className="w-full h-10 !bg-white !rounded-sm !border-0 text-right px-3 text-sm flex items-center justify-between z-50 relative"
            >
              {selectedBank?.name || "Select Bank"}
            </button>

            <CommandDialog
              open={open}
              onOpenChange={setOpen}
              title="Select Bank"
              description=""
              className="pt-2.5 p max-h-[350px] max-w-[80%] sm:max-w-[38%]"
            >
              <CommandInput
                placeholder="Search bank..."
                className="!h-6 sm:!h-7.5 w-[80%]"
              />
              <CommandEmpty>No bank found.</CommandEmpty>
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
                      onClick={(e) => e.stopPropagation()}
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
                <span className="absolute left-4 text-xs top-3 transform">
                  Recipient Account:
                </span>
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
                    className="w-full h-10 !bg-white !rounded-sm !border-0 text-right"
                    {...field}
                  />
                </FormControl>

                {watchedAccountNumber.length === 10 && selectedBankCode && (
                  <div className="mt-1 text-sm text-center">
                    {isVerifying ? (
                      <span className="text-gray-500 animate-pulse">
                        Verifying...
                      </span>
                    ) : accountName ? (
                      <span className="text-[#7910B1] text-lg font-medium">
                        {accountName}
                      </span>
                    ) : null}
                  </div>
                )}
                <FormMessage className="text-red-500 text-xs mt-1" />
              </FormItem>
            )}
          />

          <button
            type="submit"
            className={cn("btn-primary w-1/2 mx-auto mt-10", {
              "cursor-not-allowed": verifyBankAccountMutationPending,
            })}
            disabled={
              verifyBankAccountMutationPending || createRecipientMutationPending
            }
          >
            {createRecipientMutationPending ? "Verifying..." : "Continue"}
          </button>
        </div>
      </form>
    </Form>
  );
};
