import { useState } from "react";
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
import { cryptoCurrencyFee, sendCrypto } from "@/api/crypto";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  NativeSelect,
  NativeSelectOption,
} from "@/Components/ui/native-select";
import { Check } from "lucide-react";
import axios from "axios";

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
  const [isSuccess, setIsSuccess] = useState(false);
  const [selectedNetwork, setSelectedNetwork] = useState<string | null>(null);
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      address: "",
      amount: "",
      network: "",
    },
  });

  const { data } = useQuery({
    queryFn: () =>
      cryptoCurrencyFee({
        currency: coin?.currency ?? "",
        network: selectedNetwork ?? "",
      }),
    queryKey: ["crypto-currency-fee", coin?.currency, selectedNetwork],
    enabled: !!selectedNetwork,
  });

  console.log("selected crypto fee:", data);

  const sendCryptoMutation = useMutation({
    mutationFn: sendCrypto,
    onSuccess: () => {
      setIsSuccess(true);
    },
    onError: (err) => {
      if (axios.isAxiosError(err)) {
        toast.error(err.response?.data?.responseDesc || "Something went wrong");
      } else {
        toast.error("Unexpected error occurred");
      }
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
      {isSuccess ? (
        <div className="flex flex-col items-center justify-center gap-6 py-10 animate-in fade-in zoom-in duration-400">
          <div className="bg-[#11C600]/50 rounded-full size-19 flex items-center justify-center">
            <div className="bg-[#0FA301] size-15.5 rounded-full flex items-center justify-center">
              <Check className="text-white size-10" />
            </div>
          </div>
          <div className="text-center space-y-2">
            <h3 className="text-xl font-bold">Transaction Successful!</h3>
            <p className="text-sm text-muted-foreground px-6">
              Your crypto has been sent successfully. The recipient will receive
              the funds shortly.
            </p>
          </div>
          <button onClick={closeModal} className="btn-primary w-full mt-4">
            Close
          </button>
        </div>
      ) : (
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
                      onChange={(e) => {
                        field.onChange(e);
                        setSelectedNetwork(e.target.value);
                      }}
                      value={field.value}
                      aria-label="Select Network"
                      className="w-full"
                    >
                      <NativeSelectOption value="" className="text-sm py-1">
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
                      type="number"
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
      )}
    </div>
  );
};

export default SendModal;
