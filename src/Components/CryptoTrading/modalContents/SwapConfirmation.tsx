import { Button } from "@/Components/ui/button";

const SwapConfirmation = () => {
  return (
    <div className="w-full">
      <div className="flex flex-col items-center gap-8">
        <div className="bg-primary/15 font-medium text-xl py-5  px-8 rounded-md">
          5 BTC = $5,000
        </div>
        <Button className="w-full">Confirm (9 sec)</Button>
      </div>
    </div>
  );
};

export default SwapConfirmation;
