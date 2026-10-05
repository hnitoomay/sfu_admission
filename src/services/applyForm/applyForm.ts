import {
  CreateApplyDocumentData,
  CreateApplyProgramData,
  CreatePersonalInfoData,
} from "../../types/model";
import api from "../our_axios";

export async function createPersonalInfo(data: CreatePersonalInfoData) {
  const response = await api
    .post(`/apply/personal-info`, data)
    .catch((error) => {
      return error;
    });
  return response;
}

export async function createApplyDocument(data: CreateApplyDocumentData) {
  const response = await api
    .post("/apply/document", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .catch((error) => {
      return error;
    });
  return response;
}

export async function createApplyProgram(data: CreateApplyProgramData) {
  const response = await api.post("/apply/program", data).catch((error) => {
    return error;
  });
  return response.data;
}
