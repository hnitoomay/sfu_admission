import { UpdateEducationData } from "../../types/model";
import api from "../our_axios";

export async function addEduction(data: UpdateEducationData) {
  const response = await api
    .post("/add/user/education", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .catch((error) => error);
  return response.data;
}

export async function updateEducation(data: UpdateEducationData) {
  const response = await api
    .post("/edit/user/education", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .catch((error) => error);
  return response.data;
}

export async function deleteEducation(id: { education_id: number }) {
  const response = await api
    .post("/delete/user/education", id)
    .catch((error) => error);
  return response.data;
}
