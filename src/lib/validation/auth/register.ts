import { InferType, object, ref, string } from "yup";
import {
  emailErrMsg,
  maxLenErrMsg,
  minLenErrMsg,
  requiredErrMsg,
} from "../validation-message";
import {
  PASSWORD_MAX_LEN,
  PASSWORD_MIN_LEN,
  PHONE_FORMAT_REGEX,
} from "../validation-format";

type Translate = (key: string) => string;

const fallbackT: Translate = (key) => {
  const messages: Record<string, string> = {
    "auth.validation.nameRequired": requiredErrMsg("Name"),
    "auth.validation.emailRequired": requiredErrMsg("Email"),
    "auth.validation.phoneRequired": requiredErrMsg("Phone"),
    "auth.validation.passwordRequired": requiredErrMsg("Password"),
    "auth.validation.confirmPasswordRequired": requiredErrMsg("Confirm Password"),
    "auth.validation.emailInvalid": emailErrMsg(),
    "auth.validation.phoneInvalid": "Phone number is not valid",
    "auth.validation.passwordMin": minLenErrMsg(PASSWORD_MIN_LEN),
    "auth.validation.passwordMax": maxLenErrMsg(PASSWORD_MAX_LEN),
    "auth.validation.passwordsMustMatch": "Passwords must match",
    "auth.validation.emailMax": maxLenErrMsg(50),
  };

  return messages[key] ?? key;
};

export const getUserRegisterSchema = (t: Translate = fallbackT) =>
  object({
  name: string().required(t("auth.validation.nameRequired")),
  email: string()
    .email(t("auth.validation.emailInvalid"))
    .required(t("auth.validation.emailRequired"))
    .max(50, t("auth.validation.emailMax")),
  phone: string()
    .required(t("auth.validation.phoneRequired"))
    .matches(PHONE_FORMAT_REGEX, t("auth.validation.phoneInvalid")),
  password: string()
    .required(t("auth.validation.passwordRequired"))
    .min(PASSWORD_MIN_LEN, t("auth.validation.passwordMin"))
    .max(PASSWORD_MAX_LEN, t("auth.validation.passwordMax")),
  confirm_password: string()
    .label("confirm password")
    .required(t("auth.validation.confirmPasswordRequired"))
    .oneOf([ref("password")], t("auth.validation.passwordsMustMatch")),
  });

export const userRegisterSchema = getUserRegisterSchema();

export type RegisterVType = InferType<typeof userRegisterSchema>;
