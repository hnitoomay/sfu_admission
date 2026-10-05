import api from "./our_axios";
import { LoginVType } from "../lib/validation/auth/login";
import { OtpData, RegisterUserData } from "../types/model";
import { ForgetPasswordVType } from "../lib/validation/auth/forgetPassword";

export async function register(data: RegisterUserData) {
  const response = await api.post(`/register`, data).catch((error) => {
    return error;
  });
  return response.data;
}

export async function login(data: LoginVType) {
  const response = await api
    .post(`/login`, {
      phone: data.phone,
      password: data.password,
    })
    .catch((error) => {
      return error;
    });

  return response.data;
}

export async function getOtp(data: OtpData) {
  const response = await api.post("/otp", data).catch((error) => error);
  return response.data;
}

export async function forgetPassword(data: ForgetPasswordVType) {
  const response = await api.post("/forget/otp", data).catch((error) => error);
  return response.data;
}

export async function changePassword(data: {
  phone: string;
  new_password: string;
}) {
  const response = await api
    .post("/forget/password", data)
    .catch((error) => error);
  return response.data;
}
