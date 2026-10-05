import { UpdateProfileData } from "../../types/model";
import api from "../our_axios";

export async function updateProfile(data: UpdateProfileData) {
  const response = await api
    .post("/edit/profile", data)
    .catch((error) => error);
  return response.data;
}
