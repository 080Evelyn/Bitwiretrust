import { fetchWalletAddress, fetchWalletAddressByNetwork } from "@/api/crypto";
import { Label } from "@/Components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/Components/ui/tabs";
import {
  CoinWalletProps,
  IndividualNetworkWalletPops,
  NetworkWalletsProps,
  WalletAddressProps,
} from "@/types/crypto";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState, useEffect, useMemo } from "react";
import { toast } from "sonner";
import DepositContent from "./DepositContent";

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
              <DepositContent
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
