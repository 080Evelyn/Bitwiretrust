import { useState, useRef } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { cn } from "@/lib/utils";
import { Padlock } from "@/assets";

interface PinModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (pin: string) => void;
}

const PinModal = ({ isOpen, onClose, onConfirm }: PinModalProps) => {
  const [pin, setPin] = useState<string[]>(["", "", "", ""]);
  const [error, setError] = useState<string>("");
  const [shake, setShake] = useState<boolean>(false);
  const [activeIndex, setActiveIndex] = useState<number>(0);

  const inputsRef = useRef<Array<HTMLInputElement | null>>([]);

  const handleChange = (value: string, index: number) => {
    if (!/^\d?$/.test(value)) return;

    const newPin = [...pin];
    newPin[index] = value;
    setPin(newPin);

    if (value && index < pin.length - 1) {
      inputsRef.current[index + 1]?.focus();
    }

    setError("");
  };

  const handleFocus = (index: number) => {
    setActiveIndex(index);
    inputsRef.current[index]?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Backspace" && !pin[index] && index > 0) {
      const newPin = [...pin];
      newPin[index - 1] = "";
      setPin(newPin);
      inputsRef.current[index - 1]?.focus();
    }
  };

  const handleSubmit = () => {
    const enteredPin = pin.join("");

    if (enteredPin.length < 4) {
      setError("This field cannot be incomplete.");
      triggerShake();
      return;
    }

    onConfirm(enteredPin);
    resetState();
  };

  const triggerShake = () => {
    setShake(true);
    setTimeout(() => setShake(false), 500);
  };

  const resetState = () => {
    setPin(["", "", "", ""]);
    setError("");
    setShake(false);
    setActiveIndex(0);
    onClose();
  };

  const handleClose = () => {
    resetState();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="w-[95dvw] md:w-[440px] xl:max-w-md rounded-2xl p-4 md:p-6 space-y-5 relative md:fixed bottom-0 md:bottom-auto overflow-y-auto h-auto max-h-[90dvh]">
        <DialogHeader>
          <DialogTitle className="text-center font-semibold">
            Confirm Pin
          </DialogTitle>
        </DialogHeader>

        <div className="text-center space-y-2">
          <h1 className="text-2xl font-bold">Enter your transaction pin</h1>
          <p className="text-sm text-foreground font-medium">
            It's important to keep your transaction PIN confidential and not
            share it with anyone.
          </p>
        </div>

        <div className="flex justify-center items-center gap-2 text-sm text-foreground font-medium">
          <img src={Padlock} alt="padlock" />
          <span>Enter passcode to continue</span>
        </div>

        <div
          className={cn("flex justify-center gap-4 transition-all", {
            "animate-shake": shake,
          })}
        >
          {pin.map((digit, idx) => (
            <div
              key={idx}
              className={cn(
                "relative w-6 h-6 border border-gray-300 rounded-full flex items-center justify-center transition-all",
                {
                  "border-[#7910B1] ring-1 ring-[#7910B1]": activeIndex === idx,
                }
              )}
              onClick={() => inputsRef.current[idx]?.focus()}
            >
              {digit && <span className="w-4 h-4 bg-[#7910B1] rounded-full" />}
              <input
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(e.target.value, idx)}
                onKeyDown={(e) => handleKeyDown(e, idx)}
                onFocus={() => handleFocus(idx)}
                ref={(el) => (inputsRef.current[idx] = el)}
                className="absolute inset-0 opacity-0 cursor-pointer"
                autoFocus={idx === 0}
              />
            </div>
          ))}
        </div>

        {error && <p className="text-center text-sm text-red-500">{error}</p>}

        <button onClick={handleSubmit} className="btn-primary w-full">
          Submit
        </button>
      </DialogContent>
    </Dialog>
  );
};

export default PinModal;
