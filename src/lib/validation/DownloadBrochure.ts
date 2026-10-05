import { InferType, object, string } from "yup";
import { emailErrMsg, maxErrMsg, maxLenErrMsg, minErrMsg, requiredErrMsg } from "./validation-message";

export const downloadBrochureSchema = object({
  name: string().required(requiredErrMsg("Name")),

  email: string()
    .email(emailErrMsg)
    .required(requiredErrMsg("Email"))
    .max(50, maxLenErrMsg(50)),

  phone: string()
    .required(requiredErrMsg("Phone"))
    .min(7, minErrMsg(7)) // ⚠️ better than 0
    .max(11, maxErrMsg(11)),

  program: string()
    .required(requiredErrMsg("Program")),
});

export type DownloadBrochureVType = InferType<typeof downloadBrochureSchema>;