import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/Components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/Components/ui/form";
import { CoinWalletProps } from "@/types/crypto";
import { sendCrypto } from "@/api/crypto";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  NativeSelect,
  NativeSelectOption,
} from "@/Components/ui/native-select";

const formSchema = z.object({
  address: z.string().min(1, "Recipient address is required"),
  amount: z
    .string()
    .min(1, "Amount is required")
    .refine((val) => !isNaN(Number(val)), {
      message: "Amount must be a valid number",
    })
    .refine((val) => parseFloat(val) > 0, {
      message: "Amount must be greater than zero",
    }),
  network: z.string().min(1, "Network is required"),
});

type FormData = z.infer<typeof formSchema>;

interface SendModalCryptoProps extends CoinWalletProps {
  closeModal: () => void;
}

const SendModal = ({ closeModal, coin }: SendModalCryptoProps) => {
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      address: "",
      amount: "",
      network: "",
    },
  });

  const sendCryptoMutation = useMutation({
    mutationFn: sendCrypto,
    onSuccess: () => {
      toast.success("Transaction sent successfully");
      closeModal();
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "Failed to send crypto");
    },
  });

  const onSubmit = (values: FormData) => {
    if (!coin) return;

    sendCryptoMutation.mutate({
      currency: coin.currency,
      amount: Number(values.amount),
      fundUid: values.address,
      narration: "crypto withdrawal",
      network: values.network,
      swapId: "",
      requestId: "",
      commissionWithdrawal: false,
    });
  };

  return (
    <div className="pt-3">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-3"
        >
          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="Enter Recipient's Address"
                    {...field}
                    aria-label="Enter Recipient's Address"
                  />
                </FormControl>
                <FormMessage />
                <p className="text-xs font-medium">
                  Available: {coin?.balance}
                </p>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="network"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <NativeSelect
                    onChange={field.onChange}
                    value={field.value}
                    aria-label="Select Network"
                  >
                    <NativeSelectOption value="">
                      Select Network
                    </NativeSelectOption>

                    {coin?.networks?.map((network) => (
                      <NativeSelectOption key={network.id} value={network.id}>
                        {network.name}
                      </NativeSelectOption>
                    ))}
                  </NativeSelect>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="amount"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    type="tel"
                    aria-label="Enter Amount to Send"
                    placeholder="Enter Amount to Send"
                    {...field}
                  />
                </FormControl>
                <p className="text-sm text-end font-medium">
                  Sending Fee: $5.00
                </p>
                <FormMessage />
              </FormItem>
            )}
          />

          <button
            className="btn-primary w-full"
            type="submit"
            disabled={sendCryptoMutation.isPending}
          >
            {sendCryptoMutation.isPending ? "Processing..." : "Proceed"}
          </button>
        </form>
      </Form>
    </div>
  );
};

export default SendModal;
