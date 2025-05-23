import { z } from "zod";

export const phoneNumberSchema = z
  .string()
  .min(1, "Phone number is required")
  .regex(/^\+?\d{10,13}$/, "Enter a valid phone number");

export const amountSchema = z
  .string()
  .min(1, "Amount is required")
  .refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
    message: "Amount must be a number",
  });

export const quantitySchema = z
  .string()
  .min(1, "Number of cards is required")
  .regex(/^\d+$/, "Enter a valid number");

export const emailSchema = z
  .string()
  .min(1, "Email is required")
  .email("Enter a valid email address");
