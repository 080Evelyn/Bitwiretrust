import { passcode_lock } from "@/assets";
import { ModalType } from "@/types";
import { useState } from "react";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/Components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/Components/ui/input-otp";
import { Button } from "@/Components/ui/button";
import { useCreatePin } from "@/hooks/signup/useCreatePin";
import { toast } from "sonner";
import { CreatePinFormData } from "@/lib/schemas/signup";

interface TransactionPinProps {
  toggleModal: (modal: ModalType) => void;
}

const TransactionPin = ({ toggleModal }: TransactionPinProps) => {
  const { form, onSubmit, isLoading } = useCreatePin();
  const [isConfirming, setIsConfirming] = useState(false);

  const handleBack = () => {
    if (isConfirming) {
      setIsConfirming(false);
    } else {
      toggleModal("settings");
    }

    form.reset();
  };

  const onSuccess = () => {
    toggleModal("settings");
    toast.success("Transaction pin updated successfully");
  };

  const handleFormSubmit = (data: CreatePinFormData) => {
    if (!isConfirming) {
      setIsConfirming(true);
    } else {
      onSubmit(data, onSuccess);
    }
  };

  return (
    <div className="modal transaction-pin-modal">
      <div className="modal-header">
        <button
          className="back-btn"
          onClick={() => {
            handleBack();
          }}
        >
          Back
        </button>
        <h3>Transaction Pin</h3>
      </div>
      <p className="text-center font-medium mt-2">
        {isConfirming
          ? "Please re-enter your 4-digit pin to confirm."
          : "Update your 4-digit transaction pin."}
        <br />
        <span className="text-center text-sm">
          Please, do not share this pin with anyone.
        </span>
      </p>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleFormSubmit)}
          className="w-full mt-5"
        >
          <div className="flex flex-col gap-4 justify-center items-center">
            <div className="flex flex-col gap-2 items-center">
              <img src={passcode_lock} alt="lock" className="size-10" />
              <p>{isConfirming ? "Confirm Pin" : "Enter Pin"}</p>
            </div>

            <FormField
              control={form.control}
              name={isConfirming ? "confirmPin" : "pin"}
              render={({ field }) => (
                <FormItem className="flex flex-col gap-4 justify-center items-center">
                  <FormControl>
                    <InputOTP
                      maxLength={4}
                      value={field.value}
                      onChange={field.onChange}
                      pattern={REGEXP_ONLY_DIGITS}
                    >
                      <InputOTPGroup className="gap-3">
                        <InputOTPSlot
                          index={0}
                          className="size-12! rounded-full"
                          masked
                        />
                        <InputOTPSlot
                          index={1}
                          className="size-12! rounded-full"
                          masked
                        />
                        <InputOTPSlot
                          index={2}
                          className="size-12! rounded-full"
                          masked
                        />
                        <InputOTPSlot
                          index={3}
                          className="size-12! rounded-full"
                          masked
                        />
                      </InputOTPGroup>
                    </InputOTP>
                  </FormControl>
                  <FormMessage className="!text-red-600" />
                </FormItem>
              )}
            />
          </div>

          <div className="button-container mt-10">
            <Button
              type="submit"
              className={`w-full ${
                (isConfirming
                  ? form.watch("confirmPin")?.length === 4
                  : form.watch("pin")?.length === 4) && !isLoading
                  ? "enabled"
                  : "disabled"
              }`}
              disabled={isLoading}
            >
              {isLoading ? "Processing..." : isConfirming ? "Submit" : "Next"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default TransactionPin;
