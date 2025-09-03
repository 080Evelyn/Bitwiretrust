import { fetchWalletAddress, fetchWalletAddressByNetwork } from "@/api/crypto";
import { QrCode, solar_copy } from "@/assets";
import ButtonLoading from "@/Components/common/ButtonLoading";
import { Button } from "@/Components/ui/button";
import { Label } from "@/Components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/Components/ui/tabs";
import {
  CoinWalletProps,
  IndividualNetworkWalletPops,
  NetworkWalletsProps,
  WalletAddressProps,
} from "@/types/crypto";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Check, Loader } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

type DepositProps = {
  coinWalletAddress?: string;
  network: { id: string; name: string };
  onGenerateWallet: (networkId: string) => void;
  isLoading: boolean;
  isFetching: boolean;
};

const Deposit = ({
  coinWalletAddress,
  network,
  onGenerateWallet,
  isLoading,
  isFetching,
}: DepositProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (!coinWalletAddress) return;
    navigator.clipboard.writeText(coinWalletAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <div className="flex flex-col gap-2 items-center">
      <img src={QrCode} alt="qr code" className="max-w-40 max-md:my-4" />

      <div className="text-foreground flex flex-col items-center gap-2 mb-4">
        <span className="text-sm text-center  capitalize font-medium">
          To ensure your deposit is received, please use the right network
          selected.
        </span>
      </div>

      {isFetching ? (
        <div>
          <Loader className="animate-spin size-8 text-[#7910B1]" />
        </div>
      ) : (
        <>
          <div className="flex justify-between items-center w-full">
            <span className="font-semibold tracking-[-0.17px]">
              Wallet Address
            </span>

            {coinWalletAddress ? (
              <div className="flex items-center gap-1.5 font-medium text-sm tracking-[-0.17px]">
                {copied ? (
                  <>
                    <span>Copied</span>
                    <Check className="size-5 text-[#7910B1]" />
                  </>
                ) : (
                  <div
                    className="flex items-center gap-1.5 cursor-pointer"
                    onClick={handleCopy}
                  >
                    <span>Copy Address</span>
                    <img
                      src={solar_copy}
                      alt="copy icon"
                      className="size-5 cursor-pointer"
                    />
                  </div>
                )}
              </div>
            ) : (
              <Button
                onClick={() => onGenerateWallet(network.id)}
                disabled={isLoading}
              >
                {isLoading ? <ButtonLoading /> : "Generate Address"}
              </Button>
            )}
          </div>

          <div
            id="wallet-address"
            className="bg-[#F9EDFF] w-full px-2 py-4 rounded-md text-[15px] text-center font-medium tracking-[-0.17px] break-words"
          >
            {coinWalletAddress || "Click the button above to generate address"}
          </div>
        </>
      )}
    </div>
  );
};

const DepositModal = ({ coin }: CoinWalletProps) => {
  const queryClient = useQueryClient();

  // get cached wallets
  const { data: networkWalletsResponse, isFetching } =
    useQuery<NetworkWalletsProps>({
      queryKey: ["network-wallets", coin?.currency],
      queryFn: () => fetchWalletAddressByNetwork(coin?.currency ?? ""),
      enabled: !!coin?.currency,
    });

  const networkWallets = networkWalletsResponse?.data?.data?.data ?? [];

  // map wallet addresses by network id
  const walletMap: Record<string, string> = {};
  networkWallets.forEach((wallet: IndividualNetworkWalletPops) => {
    walletMap[wallet.network] = wallet.address;
  });

  const generateWalletMutation = useMutation({
    mutationFn: (data: WalletAddressProps) => fetchWalletAddress(data),
    onSuccess: () => {
      toast.success(
        "Generation initiated successfully, this may take a while."
      );
      setTimeout(
        () =>
          queryClient.invalidateQueries({
            queryKey: ["network-wallets", coin?.currency],
          }),
        25000
      );
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

  const handleGenerateWallet = (networkId: string) => {
    generateWalletMutation.mutate({
      currency: coin?.currency ?? "",
      network: networkId,
    });
  };

  const isLoading = generateWalletMutation.isPending;

  return (
    <div>
      <Label htmlFor="tabs" className="mt-4 md:text-sm flex justify-center">
        Available Networks:
      </Label>
      <Tabs defaultValue={coin?.networks?.[0]?.id}>
        <TabsList className="flex flex-1 flex-wrap items-center gap-2 w-full mt-2">
          {coin?.networks?.map((network) => (
            <TabsTrigger
              key={network.id}
              value={network.id}
              className="bg-[#F9EDFF] cursor-pointer text-foreground py-2 rounded-[6px] text-xs data-[state=active]:bg-[#7910B1] data-[state=active]:text-white"
            >
              {network.name}
            </TabsTrigger>
          ))}
        </TabsList>

        <div className="mt-2">
          {coin?.networks?.map((network) => (
            <TabsContent key={network.id} value={network.id}>
              <Deposit
                coinWalletAddress={walletMap[network.id]}
                network={network}
                onGenerateWallet={handleGenerateWallet}
                isLoading={isLoading}
                isFetching={isFetching}
              />
            </TabsContent>
          ))}
        </div>
      </Tabs>
    </div>
  );
};

export default DepositModal;
