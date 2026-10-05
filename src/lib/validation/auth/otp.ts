import { InferType, object, string } from "yup";

export const otpSchema = object({
  otp1: string().required().max(1),
  otp2: string().required().max(1),
  otp3: string().required().max(1),
  otp4: string().required().max(1),
  otp5: string().required().max(1),
  otp6: string().required().max(1),
})

export type OtpVType = InferType<typeof otpSchema>;