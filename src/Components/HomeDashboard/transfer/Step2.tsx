import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from "@/Components/ui/form";
import { UseFormReturn } from "react-hook-form";

interface Step2FormProps {
  form: UseFormReturn<Step2Values>;
  selectedBank: { name?: string } | null;
  accountDetails: { account: string } | null;
  onSubmit: (values: Step2Values) => void;
  onBack: () => void;
  accountName: string | null;
}

export type Step2Values = {
  amount: number;
  remark?: string;
};
export function Step2Form({
  form,
  selectedBank,
  accountDetails,
  onSubmit,
  onBack,
  accountName,
}: Step2FormProps) {
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="pt-5 sm:pt-20">
        <div className="flex flex-col gap-3 px-5">
          <div className="flex flex-col max-sm:gap-2 w-full sm:-mt-5 text-center">
            <span className="text-xs font-semibold">
              {selectedBank?.name || ""}
            </span>
            <span className="text-sm">{accountDetails?.account || ""}</span>
            <span className=" text-sm font-medium text-[#7910d7]">
              {accountName || ""}
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
                    type="tel"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    placeholder="1,000,000"
                    className="w-full h-10 !bg-white !rounded-sm !border-0"
                    value={field.value === 0 ? "" : field.value}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, "");
                      field.onChange(value === "" ? undefined : Number(value));
                    }}
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
                <span className="left-4 text-xs">Remark</span>
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

          <button type="submit" className="btn-primary w-1/2 mx-auto mt-10">
            Pay
          </button>

          <button
            type="button"
            onClick={onBack}
            className="hidden sm:block rounded-sm cursor-pointer bg-white hover:bg-[#f7f7f7] py-1.5 border border-[#221D7A] w-1/2 mx-auto mt-2"
          >
            Back
          </button>
        </div>
      </form>
    </Form>
  );
}
