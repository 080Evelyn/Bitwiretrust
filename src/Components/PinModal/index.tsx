import { useState, useRef, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { cn } from "@/lib/utils";
import { Padlock } from "@/assets";
import { useMutation } from "@tanstack/react-query";
import { verifyPin } from "@/api/auth";
import axios from "axios";

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
  const enteredPin = pin.join("");

  const handleClose = () => {
    resetState();
    onClose();
  };

  const verifyPinMutation = useMutation({
    mutationFn: async (pin: string) => {
      return verifyPin(pin);
    },
    onSuccess: () => {
      resetState();
      onConfirm(enteredPin);
      handleClose();
    },
    onError: (error: unknown) => {
      if (axios.isAxiosError(error)) {
        const responseDesc =
          error.response?.data?.responseDesc ||
          "Incorrect PIN. Please try again.";
        setError(responseDesc);
      } else {
        setError("Unexpected error occurred");
      }
      triggerShake();

      setPin(["", "", "", ""]);

      setActiveIndex(0);
      setTimeout(() => {
        inputsRef.current[0]?.focus();
      }, 0);
    },
  });

  useEffect(() => {
    if (isOpen) {
      resetState();

      setTimeout(() => {
        inputsRef.current[0]?.focus();
      }, 0);
    }
  }, [isOpen]);

  const handleChange = (value: string, index: number) => {
    if (!/^\d?$/.test(value)) return;

    const newPin = [...pin];
    newPin[index] = value;
    setPin(newPin);
    setError("");

    if (value) {
      if (index < pin.length - 1) {
        inputsRef.current[index + 1]?.focus();
      }
      setActiveIndex(Math.min(index + 1, pin.length - 1));
    }
  };

  const handleFocus = (index: number) => {
    setActiveIndex(index);
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Backspace") {
      if (pin[index]) {
        const newPin = [...pin];
        newPin[index] = "";
        setPin(newPin);
        setActiveIndex(index);
      } else if (index > 0) {
        const newPin = [...pin];
        newPin[index - 1] = "";
        setPin(newPin);
        inputsRef.current[index - 1]?.focus();
        setActiveIndex(index - 1);
      }
      setError("");
      e.preventDefault();
    }
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
  };

  const handleSubmit = () => {
    if (enteredPin.length < 4 || pin.some((d) => d === "")) {
      setError("Please enter a complete 4-digit PIN.");
      triggerShake();

      const firstEmpty = pin.findIndex((d) => d === "");
      if (firstEmpty >= 0) {
        inputsRef.current[firstEmpty]?.focus();
        setActiveIndex(firstEmpty);
      }
      return;
    }

    verifyPinMutation.mutate(enteredPin);
  };

  const isVerifying = verifyPinMutation.isPending;

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="w-[95vw] max-sm:top-1/4 transform max-sm:-translate-y-1/4 md:w-[440px] xl:max-w-md rounded-2xl p-6 space-y-5">
        <DialogHeader>
          <DialogTitle className="text-center font-semibold">
            Confirm PIN
          </DialogTitle>
        </DialogHeader>

        <div className="text-center space-y-2">
          <h1 className="text-2xl font-bold">Enter your transaction PIN</h1>
          <p className="text-sm text-foreground font-medium">
            It's important to keep your transaction PIN confidential and not
            share it with anyone.
          </p>
        </div>

        <div className="flex justify-center items-center gap-2 text-sm text-foreground font-medium">
          <img src={Padlock} alt="padlock" className="inline-block" />
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
                "relative size-10 border border-gray-300 rounded-full flex items-center justify-center transition-all",
                {
                  "border-[#7910B1] ring-1 ring-[#7910B1]": activeIndex === idx,
                }
              )}
              onClick={() => {
                inputsRef.current[idx]?.focus();
                setActiveIndex(idx);
              }}
            >
              {digit && <span className="size-10 bg-[#7910B1] rounded-full" />}
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
                autoFocus={idx === 0 && isOpen}
                disabled={isVerifying}
              />
            </div>
          ))}
        </div>

        {error && <p className="text-center text-sm text-red-500">{error}</p>}

        <button
          onClick={handleSubmit}
          className="btn-primary w-full flex justify-center items-center"
          disabled={isVerifying}
        >
          {isVerifying ? (
            <>
              Verifying...
              <svg
                className="ml-2 w-4 h-4 border-2 border-t-transparent border-white rounded-full animate-spin"
                viewBox="0 0 24 24"
              ></svg>
            </>
          ) : (
            "Submit"
          )}
        </button>
      </DialogContent>
    </Dialog>
  );
};

export default PinModal;
