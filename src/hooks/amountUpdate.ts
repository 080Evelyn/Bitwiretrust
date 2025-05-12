import { useState } from "react";

const useAmount = () => {
  const [amount, setAmount] = useState<number | null>(null);

  function handleAmountChange(event: React.ChangeEvent<HTMLInputElement>) {
    const val = event.target.value;
    const num = parseInt(val, 10);
    if (!isNaN(num)) {
      setAmount(num);
    } else if (val === "") {
      setAmount(null);
    }
  }

  return { amount, setAmount, handleAmountChange };
};

export default useAmount;
