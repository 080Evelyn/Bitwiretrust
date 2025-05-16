import { Input } from "@/Components/ui/input";
import { usePinModal } from "@/context/PinModalContext";
import { Coin } from "@/types";
import { useState } from "react";

interface BuyModalProps {
  coin: Coin | null;
  closeModal: () => void;
}

const BuyModal = ({ closeModal, coin }: BuyModalProps) => {
  const { openPinModal } = usePinModal();
  const [amount, setAmount] = useState<number>(0);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    openPinModal((pin) => {
      console.log("PIN entered:", pin);
      // API call here
    });
    closeModal();
  };

  const ngnValue = parseFloat(coin?.value?.replace(/,/g, "") || "0");
  const converted = ngnValue ? amount / ngnValue : 0;

  return (
    <div className="pt-3">
      <span className="flex py-2 justify-center font-medium tracking-[-0.17px]">
        {coin?.amount} {coin?.symbol} = {coin?.value} NGN
      </span>

      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <div className="relative">
          <span className="absolute top-3 left-3 font-semibold text-[#7910B1] tracking-[-0.17px]">
            NGN
          </span>
          <Input
            type="tel"
            className="!pl-15"
            value={amount || ""}
            onChange={(e) => setAmount(parseFloat(e.target.value) || 0)}
          />
        </div>

        <div className="relative">
          <span className="absolute top-3 left-3 font-semibold text-[#7910B1] tracking-[-0.17px]">
            {coin?.symbol}
          </span>
          <Input
            type="text"
            readOnly
            value={converted ? converted.toFixed(6) : ""}
            className="!pl-15 bg-[#F9F9F9]"
          />
        </div>

        <button className="btn-primary w-full" type="submit">
          Proceed
        </button>
      </form>
    </div>
  );
};

export default BuyModal;
