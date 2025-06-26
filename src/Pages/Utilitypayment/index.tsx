import BalanceOverview from "@/Components/HomeDashboard/BalanceOverview";
import Betting from "@/Components/UtilityPayment/Betting";
import Electricity from "@/Components/UtilityPayment/Electricity";
import MediaSubscriptions from "@/Components/UtilityPayment/MediaSubscriptions";
import { Skeleton } from "@/Components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/Components/ui/tabs";
import { best_rate } from "@/assets";
import { useServiceIdentifiers } from "@/hooks/utility-payments/useServiceIdentifiers";

const Utilitypayment = () => {
  const { isPending } = useServiceIdentifiers("electricity-bill");

  return (
    <>
      {/* desktop view */}
      <div className="hidden md:block">
        <BalanceOverview pathName="Utility Payments" />
      </div>
      {isPending ? (
        <div className="hidden md:grid grid-cols-3 gap-5 w-full">
          <Skeleton className="h-[300px] w-full" />
          <Skeleton className="h-[300px] w-full" />
          <Skeleton className="h-[300px] w-full" />
        </div>
      ) : (
        <div className="hidden md:grid grid-cols-3 gap-5 w-full">
          <Electricity />
          <MediaSubscriptions />
          <Betting />
        </div>
      )}
      {/* mobile view */}
      <div className="md:hidden w-full">
        <h2 className="font-medium text-lg text-foreground mb-6 flex justify-center ">
          Utility Patments
        </h2>

        <Tabs defaultValue="electricity">
          <TabsList className="flex w-full border border-[#7910B1] rounded-[5.16px] overflow-hidden">
            {[
              { label: "Electricity", value: "electricity" },
              { label: "Cable", value: "media-subscriptions" },
              { label: "Betting", value: "betting" },
            ].map((tab, index, arr) => (
              <TabsTrigger
                key={tab.value}
                value={tab.value}
                className={`w-full text-[#7910B1] text-sm py-5.5 cursor-pointer transition-all 
        data-[state=active]:bg-[#7910B1] data-[state=active]:text-white 
        ${index !== arr.length - 1 ? " border-r-[#7910B1] rounded-none" : ""}
      `}
              >
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>

          {isPending ? (
            <Skeleton className="mt-2 h-[400px] w-full" />
          ) : (
            <>
              <TabsContent value="electricity">
                <Electricity />
              </TabsContent>
              <TabsContent value="media-subscriptions">
                <MediaSubscriptions />
              </TabsContent>
              <TabsContent value="betting">
                <Betting />
              </TabsContent>
            </>
          )}
        </Tabs>
      </div>
      <div className="hidden md:block mt-4 w-full relative">
        <span className="font-medium text-3xl text-[#28003E] w-[247px] absolute top-[25%] left-10">
          Best Rates, Secure Payment
        </span>
        <img
          src={best_rate}
          alt="rate img"
          className="w-full object-contain "
        />
      </div>
    </>
  );
};

export default Utilitypayment;
