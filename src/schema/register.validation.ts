import { z } from "zod";

export const registerValidationSchema = z.object({
  name: z
    .string({ required_error: "Name is required" })
    .min(5, "Name must be between 2 and 50 characters")
    .max(50, "Name must be between 2 and 50 characters"),
  username: z
    .string({ required_error: "Name is required" })
    .min(5, "Name must be between 2 and 50 characters")
    .max(50, "Name must be between 2 and 50 characters"),
  email: z
    .string({ required_error: "Email is required" })
    .email("Invalid email address"),
  password: z
    .string({ required_error: "Password is required" })
    .min(8, "Password must be at least 8 characters")
    .regex(/[a-zA-Z]/, "Password must contain at least one letter")
    .regex(
      /[!@#$%^&*(),.?":{}|<>]/,
      "Password must contain at least one special character"
    )
});
