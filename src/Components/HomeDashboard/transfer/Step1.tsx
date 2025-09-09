import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from "@/Components/ui/form";
import { UserContext } from "@/types/user";
import { UseFormReturn } from "react-hook-form";
import { useOutletContext } from "react-router-dom";
import { Step1Values } from "../TransferModal";

interface FormData {
  form: UseFormReturn<Step1Values>;
  onSubmit: () => void;
}
export function Step1Form({ form, onSubmit }: FormData) {
  const { user } = useOutletContext<UserContext>();

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="pt-5 sm:pt-20">
        <div className="flex flex-col gap-3 px-5">
          <div className="flex flex-col max-sm:gap-2 w-full sm:-mt-5 text-center">
            <span className="text-xs font-semibold">
              {user?.bankDetails?.bank_name}
            </span>
            <span className="text-sm">{user?.bankDetails?.account_number}</span>
            <span className="text-sm font-medium text-primary">
              {user?.bankDetails?.account_name}
            </span>
          </div>

          <FormField
            control={form.control}
            name="amount"
            render={({ field }) => (
              <FormItem className="relative w-full">
                <span className="left-4 text-xs">Amount</span>
                <FormControl>
                  <input
                    inputMode="numeric"
                    pattern="[0-9]*"
                    placeholder="1,000,000"
                    className="w-full h-10 !bg-white !rounded-sm !border-0"
                    {...field}
                    value={field.value ?? ""}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <button type="submit" className="btn-primary w-1/2 mx-auto mt-10">
            Withdraw
          </button>
        </div>
      </form>
    </Form>
  );
}
