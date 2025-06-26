import BalanceOverview from "@/Components/HomeDashboard/BalanceOverview";
import { Skeleton } from "@/Components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/Components/ui/tabs";
import Airtime from "@/Components/VirtualTopUp/Airtime";
import Beneficiary from "@/Components/VirtualTopUp/Beneficiary";
import Data from "@/Components/VirtualTopUp/Data";
import PhoneNumberProvider from "@/Components/VirtualTopUp/PhoneNumberContext";
import { useServiceIdentifiers } from "@/hooks/utility-payments/useServiceIdentifiers";

const VirtualTopUp = () => {
  const { isPending } = useServiceIdentifiers("data");

  return (
    <PhoneNumberProvider>
      <div className="h-screen">
        <div className="hidden md:block">
          <BalanceOverview pathName="Virtual Top Up" />
        </div>
        <div className="hidden md:grid grid-cols-3 gap-5 w-full">
          {isPending ? (
            <>
              <Skeleton className="h-[300px] w-full" />
              <Skeleton className="h-[300px] w-full" />
              <Skeleton className="h-[300px] w-full" />
            </>
          ) : (
            <>
              <Beneficiary />
              <Airtime />
              <Data />
            </>
          )}
        </div>

        <div className="md:hidden w-full">
          <h2 className="font-medium text-lg text-foreground mb-6 flex justify-center ">
            Virtual Top Up
          </h2>

          <div className="mb-5">
            <span className="text-xs font-bold px-2 mb-20"> Beneficiary </span>
            <Beneficiary />
          </div>

          <Tabs defaultValue="airtime">
            <TabsList className="flex gap-5 w-full">
              <TabsTrigger
                value="airtime"
                className="bg-[#B71FFF66]  cursor-pointer text-foreground px-4 py-5.5 rounded-[5.16px] text-sm data-[state=active]:bg-[#7910B1] data-[state=active]:text-white"
              >
                Airtime
              </TabsTrigger>
              <TabsTrigger
                value="data"
                className="bg-[#B71FFF66] cursor-pointer text-foreground px-4 py-5.5 rounded-[5.16px] text-sm data-[state=active]:bg-[#7910B1]  data-[state=active]:text-white"
              >
                Data
              </TabsTrigger>
            </TabsList>
            <div className="mt-2">
              {isPending ? (
                <Skeleton className="h-[300px] w-full" />
              ) : (
                <>
                  <TabsContent value="airtime">
                    <Airtime />
                  </TabsContent>
                  <TabsContent value="data">
                    <Data />
                  </TabsContent>
                </>
              )}
            </div>
          </Tabs>
        </div>
      </div>
    </PhoneNumberProvider>
  );
};

export default VirtualTopUp;
