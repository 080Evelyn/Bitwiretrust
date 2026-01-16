import { useState } from "react";
import { full_logo } from "@/assets";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { DialogOverlay } from "@radix-ui/react-dialog";
import TermsAndCondition from "@/constants/TermsAndCondition";
import { Link } from "react-router-dom";
import { ScrollArea } from "../ui/scroll-area";
import { useCreateAccount } from "@/hooks/signup/useCreateAccount";
import { CreateAccountFormData } from "@/lib/schemas/signup";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Checkbox } from "../ui/checkbox";
import { Button } from "../ui/button";
import { Step } from "@/types";

interface CreateAccountProps {
  getLeftSideClass: () => string;
  getStepBackground: () => string;
  onSuccess: (email: string) => void;
  setCurrentStep: (step: Step) => void;
}

const CreateAccount = ({ onSuccess }: CreateAccountProps) => {
  const { form, onSubmit, isLoading } = useCreateAccount();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showDialog, setShowDialog] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleSubmit = (data: CreateAccountFormData) => {
    onSubmit(data, onSuccess);
  };

  return (
    <ScrollArea className="h-[96dvh] w-full">
      <div className="flex flex-1 flex-col">
        <div className="app-logo flex justify-center ">
          <Link to="/">
            <img src={full_logo} alt="Bitwire logo" />
          </Link>
        </div>
        <h2 className="text-lg font-medium max-md:text-center">
          Create an account
        </h2>
        <p className="text-sm text-gray-600 max-md:text-center">
          Let's get you started
        </p>
        <div className="flex max-md:justify-center mb-6 items-center gap-2 ">
          <div className="font-medium text-sm text-gray-600">
            Already have an account?
          </div>
          <Link to="/login">
            <button className="text-blue-700 cursor-pointer hover:!underline text-sm font-medium transition-colors">
              Login
            </button>
          </Link>
        </div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="flex flex-col w-full gap-3"
          >
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem className="custom-form-group">
                  <FormLabel>Enter Your First Name</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="First Name"
                      className="form-input"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem className="custom-form-group">
                  <FormLabel>Enter Your Last Name</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Last Name"
                      className="form-input"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="custom-form-group">
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="email"
                      placeholder="example@email.com"
                      className="form-input"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem className="custom-form-group">
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="tel"
                      placeholder="0803 456 7890"
                      className="form-input"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="custom-form-group">
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        {...field}
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        className="!pr-14 form-input placeholder:text-xl"
                      />
                      <button
                        type="button"
                        className="absolute top-1/2 right-4 cursor-pointer transform -translate-y-1/2 focus:text-[#7910B1]"
                        onClick={togglePasswordVisibility}
                      >
                        {showPassword ? (
                          <FaEyeSlash className="size-4.5" />
                        ) : (
                          <FaEye className="size-4.5" />
                        )}
                      </button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem className="custom-form-group">
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        {...field}
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="••••••••"
                        className="!pr-14 form-input placeholder:text-xl"
                      />
                      <button
                        type="button"
                        className="absolute top-1/2 right-4 cursor-pointer transform -translate-y-1/2 focus:text-[#7910B1]"
                        onClick={toggleConfirmPasswordVisibility}
                      >
                        {showConfirmPassword ? (
                          <FaEyeSlash className="size-4.5" />
                        ) : (
                          <FaEye className="size-4.5" />
                        )}
                      </button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="terms"
              render={({ field }) => (
                <FormItem className="flex px-4 gap-3 items-center">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      className="!w-4 !h-4"
                    />
                  </FormControl>
                  <label
                    htmlFor="terms"
                    className="!underline text-sm cursor-pointer text-blue-700 hover:text-foreground"
                    onClick={() => setShowDialog(true)}
                  >
                    Accept Terms and Condition
                  </label>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Dialog open={showDialog} onOpenChange={setShowDialog}>
              <DialogOverlay>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Terms and Conditions</DialogTitle>
                  </DialogHeader>
                  <DialogDescription>
                    <TermsAndCondition />
                  </DialogDescription>
                </DialogContent>
              </DialogOverlay>
            </Dialog>

            <Button
              type="submit"
              className="btn-primary mx-4"
              disabled={isLoading}
            >
              {isLoading ? "Processing..." : "Next"}
            </Button>
          </form>
        </Form>
      </div>
    </ScrollArea>
  );
};

export default CreateAccount;
