import { InferType, object, string } from "yup";
import {
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
    "auth.validation.phoneRequired": requiredErrMsg("Phone"),
    "auth.validation.passwordRequired": requiredErrMsg("Password"),
    "auth.validation.phoneInvalid": "Phone number is not valid",
    "auth.validation.passwordMin": minLenErrMsg(PASSWORD_MIN_LEN),
    "auth.validation.passwordMax": maxLenErrMsg(PASSWORD_MAX_LEN),
  };

  return messages[key] ?? key;
};

export const getUserLoginSchema = (t: Translate = fallbackT) =>
  object({
  phone: string()
    .required(t("auth.validation.phoneRequired"))
    .matches(PHONE_FORMAT_REGEX, t("auth.validation.phoneInvalid")),
  password: string()
    .required(t("auth.validation.passwordRequired"))
    .min(PASSWORD_MIN_LEN, t("auth.validation.passwordMin"))
    .max(PASSWORD_MAX_LEN, t("auth.validation.passwordMax")),
  });

export const userLoginSchema = getUserLoginSchema();

export type LoginVType = InferType<typeof userLoginSchema>;
