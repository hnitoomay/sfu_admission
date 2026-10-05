import { InferType, object, ref, string } from "yup";
import {
  maxLenErrMsg,
  minLenErrMsg,
  requiredErrMsg,
} from "../validation-message";
import { PASSWORD_MAX_LEN, PASSWORD_MIN_LEN } from "../validation-format";

export const forgetPasswordSchema = object({
  phone: string().required(requiredErrMsg("Phone")),
});

export const changePasswordSchema = object({
  password: string()
    .required(requiredErrMsg("Password"))
    .min(PASSWORD_MIN_LEN, minLenErrMsg(PASSWORD_MIN_LEN))
    .max(PASSWORD_MAX_LEN, maxLenErrMsg(PASSWORD_MAX_LEN)),
  confirm_password: string()
    .label("confirm password")
    .required(requiredErrMsg("Confirm Password"))
    .oneOf([ref("password")], "Passwords must match"),
});

export type ForgetPasswordVType = InferType<typeof forgetPasswordSchema>;
export type ChangePasswordVType = InferType<typeof changePasswordSchema>;
