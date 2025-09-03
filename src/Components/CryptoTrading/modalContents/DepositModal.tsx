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
import { Check, Loader } from "lucide-react";
import { useState, useEffect, useMemo } from "react";
import { toast } from "sonner";

type DepositProps = {
  coinWalletAddress?: string;
  network: { id: string; name: string };
  isFetching: boolean;
  isPendingNetwork?: boolean;
  isGenerating?: boolean;
  onGenerateWallet: (networkId: string) => void;
};

const Deposit = ({
  coinWalletAddress,
  network,
  isFetching,
  isPendingNetwork = false,
  isGenerating = false,
  onGenerateWallet,
}: DepositProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (!coinWalletAddress) return;
    navigator.clipboard.writeText(coinWalletAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const showSpinner = isFetching || isPendingNetwork;

  return (
    <div className="flex flex-col gap-2 items-center">
      <img src={QrCode} alt="qr code" className="max-w-40 max-md:my-4" />

      <div className="text-foreground flex flex-col items-center gap-2 mb-4">
        <span className="text-sm text-center capitalize font-medium">
          To ensure your deposit is received, please use the right network
          selected.
        </span>
      </div>

      {showSpinner ? (
        <div className="flex flex-col items-center gap-2">
          <Loader className="animate-spin size-8 text-[#7910B1]" />
          {isPendingNetwork && (
            <p className="text-sm text-muted-foreground">Generating...</p>
          )}
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
                disabled={isGenerating}
              >
                {isGenerating ? <ButtonLoading /> : "Generate Address"}
              </Button>
            )}
          </div>

          <div
            id="wallet-address"
            className="bg-[#F9EDFF] w-full px-2 py-4 rounded-md text-sm md:text-[15px] text-center font-medium tracking-[-0.17px] break-words"
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

  const [pendingNetworks, setPendingNetworks] = useState<Record<string, true>>(
    {}
  );
  const [generatingNetwork, setGeneratingNetwork] = useState<string | null>(
    null
  );

  const anyPending = useMemo(
    () => Object.keys(pendingNetworks).length > 0,
    [pendingNetworks]
  );

  const { data: networkWalletsResponse, isFetching } =
    useQuery<NetworkWalletsProps>({
      queryKey: ["network-wallets", coin?.currency],
      queryFn: () => fetchWalletAddressByNetwork(coin?.currency ?? ""),
      enabled: !!coin?.currency,
      refetchInterval: anyPending ? 10000 : false,
    });

  const networkWallets = useMemo(
    () => networkWalletsResponse?.data?.data?.data ?? [],
    [networkWalletsResponse]
  );

  // map wallet addresses by network id
  const walletMap: Record<string, string> = {};
  networkWallets.forEach((wallet: IndividualNetworkWalletPops) => {
    walletMap[wallet.network] = wallet.address;
  });

  useEffect(() => {
    if (!networkWallets || networkWallets.length === 0) return;
    setPendingNetworks((prev) => {
      let changed = false;
      const next = { ...prev };
      for (const w of networkWallets) {
        if (w.address && next[w.network]) {
          delete next[w.network];
          changed = true;
        }
      }
      return changed ? next : prev;
    });
  }, [networkWallets]);

  const generateWalletMutation = useMutation({
    mutationFn: (data: WalletAddressProps) => fetchWalletAddress(data),
    onMutate: (vars) => {
      setPendingNetworks((prev) => ({ ...prev, [vars.network]: true }));
      setGeneratingNetwork(vars.network);
    },
    onSuccess: () => {
      toast.success(
        "Wallet address is now generating, this may take a while.",
        {
          duration: 10000,
        }
      );
      queryClient.invalidateQueries({
        queryKey: ["network-wallets", coin?.currency],
      });
      setGeneratingNetwork(null);
    },
    onError: (_error, vars) => {
      const networkId = vars?.network;
      if (networkId) {
        setPendingNetworks((prev) => {
          if (!prev[networkId]) return prev;
          const copy = { ...prev };
          delete copy[networkId];
          return copy;
        });
      }
      setGeneratingNetwork(null);

      toast.error("Failed to generate wallet address");
    },
  });

  const handleGenerateWallet = (networkId: string) => {
    generateWalletMutation.mutate({
      currency: coin?.currency ?? "",
      network: networkId,
    });
  };

  const isGenerating = generateWalletMutation.isPending;

  return (
    <div>
      <Label htmlFor="tabs" className="mt-4 md:text-sm flex justify-center">
        Available Network(s):
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
                isFetching={isFetching}
                isPendingNetwork={!!pendingNetworks[network.id]}
                isGenerating={generatingNetwork === network.id && isGenerating}
                onGenerateWallet={handleGenerateWallet}
              />
            </TabsContent>
          ))}
        </div>
      </Tabs>
    </div>
  );
};

export default DepositModal;
