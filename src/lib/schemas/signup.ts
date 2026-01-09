import { z } from "zod";

export const createAccountSchema = z
  .object({
    first_name: z.string().min(1, "First name is required"),
    last_name: z.string().min(1, "Last name is required"),
    phone: z
      .string()
      .min(1, "Phone number is required")
      .regex(/^\+?[0-9\s\-()]+$/, "Invalid phone number format"),
    email: z.string().email("Invalid email address"),
    username: z.string().min(1, "Username is required"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
        "Password must contain at least one uppercase letter, one lowercase letter, and one number"
      ),
    confirmPassword: z.string(),
    terms: z.boolean().refine((val) => val === true, {
      message: "Terms and conditions required",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export const verifyEmailSchema = z.object({
  otp: z.string().length(4, "OTP must be 4 digits"),
});

export const getStartedSchema = z.object({
  email: z.string().min(1, "Email is required"),
  password: z.string().min(1, "Password is required"),
});

export const createPasscodeSchema = z
  .object({
    passcode: z.string().length(4, "pin must be 4 digits"),
    confirmPasscode: z
      .string()
      .length(4, "pin must be 4 digits")
      .or(z.literal("")),
  })
  .refine(
    (data) => {
      if (data.confirmPasscode === "") return true;
      return data.passcode === data.confirmPasscode;
    },
    {
      message: "pin does not match",
      path: ["confirmPasscode"],
    }
  );

export type CreateAccountFormData = z.infer<typeof createAccountSchema>;
export type VerifyEmailFormData = z.infer<typeof verifyEmailSchema>;
export type GetStartedFormData = z.infer<typeof getStartedSchema>;
export type CreatePasscodeFormData = z.infer<typeof createPasscodeSchema>;
