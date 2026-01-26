import { full_logo, passcode_lock } from "@/assets";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import { useCreatePin } from "@/hooks/signup/useCreatePin";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/Components/ui/input-otp";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/Components/ui/form";
import { CreatePinFormData } from "@/lib/schemas/signup";

interface CreatePasscodeProps {
  onSuccess: () => void;
}

const CreatePin = ({ onSuccess }: CreatePasscodeProps) => {
  const { form, onSubmit, isLoading } = useCreatePin();
  const [isConfirming, setIsConfirming] = useState(false);

  const handleReEnter = () => {
    setIsConfirming(false);
    form.reset();
  };

  const handleFormSubmit = (data: CreatePinFormData) => {
    if (!isConfirming) {
      setIsConfirming(true);
    } else {
      onSubmit(data, onSuccess);
    }
  };

  return (
    <div className="right-side create-passcode !w-full">
      <div className="app-logo">
        <img src={full_logo} alt="Bitwire" />
      </div>
      <h2 className="mt-5">
        {isConfirming
          ? "Confirm Your Transaction Pin"
          : "Create a Transaction Pin"}
      </h2>
      <p className="text-center font-medium mt-2">
        {isConfirming
          ? "Please re-enter your 4-digit pin to confirm."
          : "Set up your 4-digit transaction pin."}
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
          <div className="form-group passcode-form-group">
            <div className="passcode-lock">
              <img src={passcode_lock} alt="lock" />
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
                          className="size-13 md:!size-15 rounded-full"
                          masked
                        />
                        <InputOTPSlot
                          index={1}
                          className="size-13 md:!size-15 rounded-full"
                          masked
                        />
                        <InputOTPSlot
                          index={2}
                          className="size-13 md:!size-15 rounded-full"
                          masked
                        />
                        <InputOTPSlot
                          index={3}
                          className="size-13 md:!size-15 rounded-full"
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
            <button
              type="submit"
              className={`next-button ${
                (isConfirming
                  ? form.watch("confirmPin")?.length === 4
                  : form.watch("pin")?.length === 4) && !isLoading
                  ? "enabled"
                  : "disabled"
              }`}
              disabled={isLoading}
            >
              {isLoading ? "Processing..." : isConfirming ? "Submit" : "Next"}
            </button>

            {isConfirming && (
              <button
                type="button"
                className="text-[#6c0aa1] text-sm flex gap-2 justify-center items-center cursor-pointer mt-4"
                onClick={handleReEnter}
              >
                <ArrowLeft className="size-5" />
                <span>Re-enter pin</span>
              </button>
            )}
          </div>
        </form>
      </Form>
    </div>
  );
};

export default CreatePin;
